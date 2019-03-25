<script>
import Path from '../../mixins/Marks/Path.js'
import checkPoints from '../../mixins/Marks/utils/checkPoints.js'
import { invalidPoint } from '../../utils/equals.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'
import * as d3 from 'd3-path'

export default {
  mixins: [Path],

  props: {
    strokeWidth: {
      type: [Number, Array],
      default: 1
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
          point = { coord: this.$$transform([x[i], y[i]]) }
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
          console.warn(`Skipped invalid point ${JSON.stringify(point.coord)} at index ${i}`)
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
      let path = d3.path()

      for (let ix = 0; ix < points.length - 1; ix++) {
        // Get start and end coordinates of line segment
        let [x1, y1] = points[ix].coord
        let [x2, y2] = points[ix + 1].coord

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

        // First calculate x and y offsets of main line
        let dX = x2 - x1
        let dY = y2 - y1

        // Calculate magnitude of main line
        let magnitude = Math.sqrt(dX ** 2 + dY ** 2)

        // Calculate unit vectors of main line
        let uX = dX / magnitude
        let uY = dY / magnitude

        // Calculate unit vectors of normal
        let normalX = -uY
        let normalY = uX

        // Calculate offset of normal in x an y directions
        // for starting point using strokewidth values at that point
        let rx1 = normalX * w1
        let ry1 = normalY * w1

        // Calculate offset of normal in x an y directions
        // for ending point using strokewidth values at that point
        let rx2 = normalX * w2
        let ry2 = normalY * w2

        // Calculate angle of arc
        // This value can be used for both start and end points
        // Since the angle of the normal at both points is the same
        let angle = Math.atan2(ry1, rx1)

        // Create a closed path for each segment in the multiline
        path.moveTo(x1 - rx1, y1 - ry1)
        path.lineTo(x2 - rx2, y2 - ry2)
        path.arc(x2, y2, w2, angle - Math.PI, angle)
        path.lineTo(x1 + rx1, y1 + ry1)
        path.arc(x1, y1, w1, angle, angle + Math.PI)
        path.closePath()
      }

      return path.toString()
    },

    renderSVG (createElement) {
      checkPoints(this.points, this.geometry, this.x, this.y, this.x2, this.y2, this._area)
      let aesthetics = this._props

      if (aesthetics.points || (aesthetics.x && aesthetics.y)) {
        let points = []
        if (aesthetics.points && aesthetics.points.length > 1) {
          let x = []
          let y = []
          for (let i = 0; i < aesthetics.points.length; i++) {
            if (aesthetics.points[i]) {
              if (aesthetics.points[i][0] && aesthetics.points[i][1]) {
                x.push(aesthetics.points[i][0])
                y.push(aesthetics.points[i][1])
              } else {
                console.warn('Skipped invalid point ' + aesthetics.points[i] + ' at index ' + i)
              }
            }
          }
          points = this.generatePoints(x, y, aesthetics)
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

          let events = this.events
          if (events.length > 0) {
            this.addToSpatialIndex(points, events)
          }

          // obtains path of trail mark
          let segments = this.createTrail(points)

          let totalAesthetics = { 'stroke': 'none', 'fill': aesthetics.fill, 'fillOpacity': aesthetics.fillOpacity, 'opacity': aesthetics.opacity }
          let element = createElement('path', {
            attrs: {
              'd': segments
            },
            style: createSVGStyle(totalAesthetics)
          })

          return element
        } else {
          console.warn('Not enough valid points to draw Mark')
        }
      } else {
        console.warn('Not enough valid points to draw Mark')
      }
    },

    addToSpatialIndex (points, events) {
      this.$$interactionManager.addItem(this.uuid, 'trail', points, this, events, this.sectionParentChain)
    }
  }
}
</script>
