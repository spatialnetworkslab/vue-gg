<script>
  import Path from '../../mixins/Marks/Path.js'
  import { createArc, createPath, interpolatePath, createGeoPath } from '../../components/Marks/utils/createPath.js'
  import checkPoints from '../../mixins/Marks/utils/checkPoints.js'
  import { invalidPoint } from '../../utils/equals.js'
  import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'
  import { line, curve, curveLinear, curveCardinal, curveCatmullRom } from 'd3-shape'

  export default {
    mixins: [Path],

    props: {
      data () {
        return {
          markType: 'trail-mark'
        }
      },

      fill: {
        type: String,
        default: '#000000'
      },

      // Not mappable
      strokeLinecap: {
        type: String,
        default: 'round'
      },

      stroke: {
        type: String,
        default: 'none'
      },

      strokeWidth: {
        type: [Number, Array],
        default: 0.5
      },

      fill: {
        type: String,
        default: '#000000'
      }
    },

    computed: {
      // tracks what the functions should look for as mappable
      mappable () {
        return ['strokeWidth']
      }

    },

    methods: {
      // This function generates the x-y coordinates + corresponding aesthetics that may need tobe sorted
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
                point = { coord: [x[i], y[i]]}
                for (let row in this.mappable){
                  point = this.storeAesthetic(point, aesthetics, this.mappable[row], i)
                }
              }
            } else if (y.length === 1) {
              for (let i = 0; i < x.length; ++i) {
                point = { coord: [x[i], y[i]] }
                for (let row in this.mappable){
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
            for (let row in this.mappable){
              point = this.storeAesthetic(point, aesthetics, this.mappable[row], i)
            }
            points.push(point)
          }
        }
        return this.filterInvalid(points)
      },

      // This function stores the aesthetic or the value corresponding to the index inside the aesthetic
      storeAesthetic(point, aesthetics, aesKey, index) {
        if (Array.isArray(aesthetics[aesKey])) {
          point[aesKey] = aesthetics[aesKey][index]
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
          if (invalidPoint(point).coord) {
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

      // Maps line aesthetics to the data and creates the segments wrt stroke widths
      // SIMPLIFY
      createTrail (points) {
        let top = [], bottom = []

        for (let ix = 0; ix < points.length - 1; ix++) {
          let total = [], point = {}, nextPt = {}
          point.coord = this.$$transform(points[ix].coord)
          nextPt.coord = this.$$transform(points[ix + 1].coord)
          let x1 = point.coord[0]
          let y1 = point.coord[1]
          let x2 = nextPt.coord[0]
          let y2 = nextPt.coord[1]
          let w1 = points[ix].strokeWidth/2
          let w2 = points[ix + 1].strokeWidth/2

          // to prevent strokes from disappearing completely
          if (w1 === 0) {
            w1 += 0.1
          }

          if (w2 === 0) {
            w2 += 0.1
          }

          // computes reference line segment - between start and end points
          let vector = [x1 - x2, y1 - y2]
          let magnitude = Math.sqrt(vector[0]**2 + vector[1]**2)
          let m = vector[1]/vector[0]
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
        // to smooth the first part of the trail
        segments.push(segments[0])
        segments.push(segments[1])
        return segments
      },

      renderSVG (createElement) {
        checkPoints(this.points, this.geometry, this.x, this.y, this.x2, this.y2, this._area)
        let aesthetics = this._props

        if (this.geometry) {
          let path = createGeoPath(aesthetics.geometry, this.$$transform)
          return createElement('path', {
            attrs: {
              'd': path
            },
            style: createSVGStyle(aesthetics)
          })
        } else {
          let points = [], segments = [], curveType

          if (aesthetics.points) {
            points = aesthetics.points
          } else {
            points = this.generatePoints(aesthetics.x, aesthetics.y, aesthetics)
          }
          // sort points while carrying aesthetics
          if (points.length > 1) {
            if (this.sort) {
              points = this.sortPoints(points)
            }

            // obtains polygon corresponding to multiline with stroke widths
            segments = this.createTrail(points)

            // creates line path
            const arcGenerator = line().curve(curveCardinal.tension(0.94))
            let path = arcGenerator(segments)
            let elements = []
            let totalAesthetics = {'stroke': this.stroke, 'fill': aesthetics.fill, 'fillOpacity': aesthetics.fillOpacity, 'opacity': aesthetics.opacity}
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
        }
      }
    }
  }
</script>
