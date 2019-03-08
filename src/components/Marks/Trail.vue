<script>
import Path from '../../mixins/Marks/Path.js'
import { arcGenerator } from './utils/createPath.js'

import checkPoints from '../../mixins/Marks/utils/checkPoints.js'
import { invalidPoint } from '../../utils/equals.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

export default {
  mixins: [Path],

  props: {
    strokeWidth: {
      type: [Number, Array],
      default: 1
    },

    geometry: {
      type: undefined,
      default: undefined,
      validator: () => { throw new Error('Cannot use geometry on Trail') }
    }
  },

  data () {
    return {
      markType: 'trail-mark'
    }
  },

  computed: {
    // tracks what the functions should look for as mappable
    // might add other properties later on (?) like linear gradients
    mappable () {
      return ['strokeWidth']
    }
  },

  beforeDestroy () {
    let uid = this.uuid
    if (this.events.length > 0) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    // This function generates the x-y coordinates + corresponding aesthetics
    // that need to be sorted alongside one another
    generatePoints (x, y, aesthetics) {
      let points = []
      let point = {}
      if (x.length !== y.length) {
        // x and y arrays should have equal length
        // if not we throw an error EXCEPT when one of the two arrays
        // has length 1, in which case we reuse that value for all points
        // relevant mappable aesthetics are stored alongside the coordinates for sorting purposes
        if (x.length === 1 || y.length === 1) {
          if (x.length === 1) {
            for (let i = 0; i < y.length; ++i) {
              point = { coord: [x, y[i]] }
              for (let row in this.mappable) {
                point = this.storeAesthetic(point, aesthetics, this.mappable[row], i)
              }
            }
          } else if (y.length === 1) {
            for (let i = 0; i < x.length; ++i) {
              point = { coord: [x[i], y] }
              for (let row in this.mappable) {
                point = this.storeAesthetic(point, aesthetics, this.mappable[row], i)
              }
              points.push(point)
            }
          }
        } else {
          throw new Error(`'x' and 'y' coordinate sets have different lengths`)
        }
      } else {
        for (let i = 0; i < x.length; ++i) {
          point = { coord: [x[i], y[i]] }
          for (let row in this.mappable) {
            point = this.storeAesthetic(point, aesthetics, this.mappable[row], i)
          }
          points.push(point)
        }
      }
      return this.filterInvalid(points)
    },

    // This function stores the aesthetic or the value corresponding to the index inside the aesthetic
    storeAesthetic (point, aesthetics, aesKey, index) {
      if (Array.isArray(aesthetics[aesKey])) {
        if (!isNaN(aesthetics[aesKey][index])) {
          point[aesKey] = aesthetics[aesKey][index]
        } else {
          point[aesKey] = aesthetics[aesKey][aesthetics.length - 1]
          console.warn(`Undefined value for ${JSON.stringify(point.coord)} at index ${index} for ${aesKey}, using previous value aesthetics ${[aesKey][aesthetics.length - 1]}`)
        }
      } else {
        point[aesKey] = aesthetics[aesKey]
      }
      return point
    },

    // This function filters invalid points based on the coordinate element in the point object
    filterInvalid (points) {
      let filtered = []
      for (let i = 0; i < points.length; i++) {
        let point = points[i]
        if (invalidPoint(point.coord)) {
          console.warn(`Skipped invalid point ${JSON.stringify(point)} at index ${i}`)
        } else {
          filtered.push(point)
        }
      }
      return filtered
    },

    // This function sorts points according to the x or y coordinate, bringing along with it
    // the aesthetics attached to the point
    sortPoints (points) {
      if (this.sort === 'x') {
        return points.sort((a, b) => a.coord[0] - b.coord[0])
      }
      if (this.sort === 'y') {
        return points.sort((a, b) => a.coord[1] - b.coord[1])
      }
    },

    closePoints (points) {
      // Check if polygon is closed
      let lastID = points.length - 1

      if (points[0].coord[0] !== points[lastID].coord[0] ||
        points[0].coord[1] !== points[lastID].coord[1]) {
        // If not, close
        points.push(points[0])
      }

      return points
    },

    // Maps line aesthetics to the data and creates the segments wrt stroke widths
    createTrail (points) {
      let top = []
      let bottom = []

      for (let ix = 0; ix < points.length - 1; ix++) {
        let point = {}
        let nextPt = {}
        point.coord = this.$$transform(points[ix].coord)
        nextPt.coord = this.$$transform(points[ix + 1].coord)
        let x1 = point.coord[0]
        let y1 = point.coord[1]
        let x2 = nextPt.coord[0]
        let y2 = nextPt.coord[1]
        let w1 = points[ix].strokeWidth / 2
        let w2 = points[ix + 1].strokeWidth / 2

        // to prevent strokes from disappearing completely
        // when scaling turns width to 0
        if (w1 === 0) {
          w1 += 0.1
        }

        if (w2 === 0) {
          w2 += 0.1
        }

        // computes reference line segment - between start and end points
        let vector = [x1 - x2, y1 - y2]
        let magnitude = Math.sqrt(vector[0] ** 2 + vector[1] ** 2)
        let uVector = [vector[0] / magnitude, vector[1] / magnitude]
        let uVectorP = [uVector[1], -uVector[0]]

        // Approach: One mark per two rows (point 1, stroke width 1 -> point 2, stroke width 2)
        // to calculate corners of 'polygon' composing 'line segment' with interpolated 'width' in any orientation
        // use the line equation parallel to the line defining the start and end points
        // and project the widths on the unit vector of these lines

        // start points
        let coord1 = [x1 + uVectorP[0] * w1, y1 + uVectorP[1] * w1]
        let coord4 = [x1 - uVectorP[0] * w1, y1 - uVectorP[1] * w1]

        // end points
        let coord2 = [x2 + uVectorP[0] * w2, y2 + uVectorP[1] * w2]
        let coord3 = [x2 - uVectorP[0] * w2, y2 - uVectorP[1] * w2]

        top.push(coord1)
        top.push(coord2)
        bottom.push(coord4)
        bottom.push(coord3)
      }

      let segments = top
      for (let b = bottom.length - 1; b >= 0; b--) {
        segments.push(bottom[b])
      }
      // to smooth the first curve of the trail - point 0
      segments.push(segments[0])
      segments.push(segments[1])

      let events = this.events
      if (events.length > 0) {
        this.addToSpatialIndex(segments, events)
      }

      return segments
    },

    renderSVG (createElement) {
      let area = this.pathType === 'area'
      checkPoints(this.points, this.geometry, this.x, this.y, this.x2, this.y2, area)
      let aesthetics = this._props

      let points = []
      let segments = []

      if (aesthetics.points) {
        points = aesthetics.points
      } else {
        points = this.generatePoints(aesthetics.x, aesthetics.y, aesthetics)
      }

      // sort points while carrying aesthetics, namely stroke widths
      if (points.length > 1) {
        if (this.sort) {
          points = this.sortPoints(points)
        }

        if (this.close) {
          points = this.closePoints(points)
        }

        // obtains polygon corresponding to multiline with stroke widths
        segments = this.createTrail(points)

        let path = arcGenerator(segments)
        let elements = []

        let totalAesthetics = {
          'stroke': 'none',
          'fill': aesthetics.fill,
          'fillOpacity': aesthetics.fillOpacity,
          'opacity': aesthetics.opacity
        }

        let element = createElement('path', {
          attrs: {
            'd': path
          },
          style: createSVGStyle(totalAesthetics)
        })
        elements.push(element)

        return createElement('g', elements)
      } else {
        console.warn('Not enough valid points to draw Mark')
      }
    },

    addToSpatialIndex (points, events) {
      this.$$interactionManager.addItem(this.uuid, 'trail', points, this, events)
    }
  }
}
</script>
