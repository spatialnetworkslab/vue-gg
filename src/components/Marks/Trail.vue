<script>
  import Path from '../../mixins/Marks/Path.js'
  import { createArc, createPath, interpolatePath, createGeoPath } from '../../components/Marks/utils/createPath.js'
  import checkPoints from '../../mixins/Marks/utils/checkPoints.js'
  import { invalidPoint } from '../../utils/equals.js'
  import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

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

      // Non-mappable
      strokeLinecap: {
        type: String,
        default: 'round'
      },

      stroke: {
        type: String,
        default: 'none'
      },
      //
      // strokeWidth: {
      //   type: [Number, Array],
      //   default: 0.5
      // },

      fill: {
        type: String,
        default: 'blue'
      },
    },

    computed: {
      // tracks what the functions should look for as mappable
      mappable () {
        return ['stroke', 'strokeWidth']
      }
    },

    methods: {
      isArray (obj) {
        if (typeof obj === Object) {
          return true
        } else {
          return false
        }
      },

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

      //This function maps line aesthetics to the data and creates the segments.
      enumAesthetics (points) {
        let top = []
        let bottom = [], segments = []
        if (points.length > 1) {
          /**
           * Calculate the points that make up each line segment.
           */

          for (let ix = 0; ix < points.length - 1; ix++) {
            let total = []
            let point = points[ix]
            let x1 = point.coord[0]
            let y1 = point.coord[1]
            let x2 = points[ix+1].coord[0]
            let y2 = points[ix + 1].coord[1]
            let w1 = points[ix].strokeWidth
            let w2 = points[ix + 1].strokeWidth

            // if (w1 === 0) {
            //   w1 += 0.05
            // }
            //
            // if (w2 === 0) {
            //   w2 += 0.05
            // }

            // computes reference line segment - between start and end points
            let vector = [x1 - x2, y1 - y2]
            let magnitude = Math.sqrt(vector[0]**2 + vector[1]**2)
            let m = vector[1]/vector[0]
            let b = y2 - m * x2
            let uVector = [vector[0] / magnitude, vector[1] / magnitude]
            let uVectorP = [uVector[1], -uVector[0]]

            // to calculate corners of 'polygon' composing 'line segment' with interpolated 'width' in any orientation
            // use the line equation parallel to the line defining the start and end points
            // and project the widths on the unit vector of these lines

            // start points
            let coord1 = [x1 + uVectorP[0] * w1, y1 + uVectorP[1] * w1]
            let coord4 = [x1 - uVectorP[0] * w1, y1 - uVectorP[1] * w1]

            // end points
            let coord2 = [x2 + uVectorP[0] * w2, y2 + uVectorP[1] * w2]
            let coord3 = [x2 - uVectorP[0] * w2, y2 - uVectorP[1] * w2]

            // to produce the curved edges between points
            if (ix > 1) {
              //let bTop = coord1[1] - (coord2[1] - coord1[1]) / (coord2[0] - coord1[0])* coord1[0]
              let vBottom = [coord3[0] - coord4[0], coord3[1] -  coord4[1]]
              let mBottom = vBottom[1]/vBottom[0]
              let bBottom = coord3[1] - mBottom * coord3[0]

              // let prevTopPair = [ top[ix - 1], top[ix] ]
              let prevCoord3 = bottom[ix-1]
              let prevCoord4 = bottom[ix-2]

              // let vectorTop = [prevTopPair[1][0] - prevTopPair[0][0], prevTopPair[1][1] - prevTopPair[0][1]]
              let prevVecBot = [prevCoord3[0] - prevCoord4[0], prevCoord3[1]- prevCoord4[1]]

              //let prevTopM = vectorTop[1] / vectorTop[0]
              let prevBotM = prevVecBot[1] / prevVecBot[0]

              //let prevTopB = prevTopPair[1][1] - prevTopM * prevTopPair[1][0]
              let prevBotB = prevCoord3[1] - prevBotM * prevCoord3[0]

              //let xTop = (bTop - prevTopB) / (prevTopM - m)
              //let yTop = prevTopM * prevTopPair[1][0] + prevTopB
              let xBot = (bBottom - prevBotB) / (prevBotM - mBottom)
              let yBot = prevBotM * xBot + prevBotB

            }

            top.push(coord1)
            top.push(coord2)
            bottom.push(coord4)
            bottom.push(coord3)
            console.log(coord1, coord2, coord3)

          }

          segments = { top, bottom }
          console.log(segments)
          return segments
        }
      },

      cloneObject(obj) {
        var clone = {};
        for(var i in obj) {
            if(obj[i] != null &&  typeof(obj[i])=="object")
                clone[i] = cloneObject(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone
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
          let points = [], segments = []

          if (aesthetics.points) {
            points = aesthetics.points
          } else {
            points = this.generatePoints(aesthetics.x, aesthetics.y, aesthetics)
          }

          if (points.length > 1) {
            if (this.sort) {
              points = this.sortPoints(points)
            }
            console.log(points)
            segments = this.enumAesthetics(points)
            let elements = [], totalPath = []


            for (let item in segments) {
              if (item === "top"){
                for (let t = 0; t < segments[item].length; t++){
                  totalPath.push(segments[item][t])
                }

              } else if (item === "bottom") {
                for (let b = segments[item].length - 1; b >= 0; b --) {
                  totalPath.push(segments[item][b])
                }
              }
            }
            totalPath.push(totalPath[0])

            let totalAesthetics = {'stroke': this.stroke, 'fill': aesthetics.fill, 'fillOpacity': aesthetics.fillOpacity, 'opacity': aesthetics.opacity, 'strokeWidth': 1}
            let element1 = createElement('path', {
              attrs: {
                'd': this.createPath(totalPath)
              },
              style: createSVGStyle(totalAesthetics)
            })
            elements.push(element1)

            return createElement('g', elements)

          } else {
            console.warn('Not enough valid points to draw Mark')
          }
        }
      }
    }
  }
</script>
