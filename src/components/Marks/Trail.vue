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

      // Non-mappable
      strokeLinecap: {
        type: String,
        default: 'round'
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

      /**
       * This function generates the x-y coordinates + corresponding aesthetics that may need tobe sorted
       */
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

      /**
       * This function stores the aesthetic or the value corresponding to the index inside the aesthetic
       */
      storeAesthetic(point, aesthetics, aesKey, index) {
        if (Array.isArray(aesthetics[aesKey])) {
          point[aesKey] = aesthetics[aesKey][index]
        } else {
          point[aesKey] = aesthetics[aesKey]
        }
        return point
      },

      /**
       * This function filters invalid points based on the coordinate element in the point object
       */
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

      /**
       * This function sorts points according to the x or y coordinate, bringing along with it
       * the aesthetics attached to the point
       */
      sortPoints (points) {
        if (this.sort === 'x') {
          return points.sort((a, b) => a.coord[0] - b.coord[0])
        }
        if (this.sort === 'y') {
          return points.sort((a, b) => a.coord[1] - b.coord[1])
        }
      },

      segmentWidth (points) {
        /**
         * Since each segment plots the interval between two data instances
         * the number of segments is one less than total data instances.
         */
        let numberSegments = points.length- 1
        if (numberSegments > 0) {
          let width = this.parentBranch.ranges.x[1] - this.parentBranch.ranges.x[0]

          let segmentWidth = width / numberSegments

          return segmentWidth
        }
      },

      /**
       * Smoothens transition between different stroke widths by interpolating the intervening segments
       */
      smoothSegment (aesthetics, startX, startY, endX, endY, startWidth, endWidth, fill, prevTop, prevBot) {
        let r1 = startWidth/2
        let r2 = endWidth/2
        let lineSeg = { coords: {} , aesthetics: {}}

        // computes reference line segment - between start and end points
        let vector = [endX - startX, endY - startY]
        let magnitude = Math.sqrt(vector[0]**2 + vector[1]**2)
        let uVector = [vector[0] / magnitude, vector[1] / magnitude]
        let uVectorP = [-uVector[1], uVector[0]]

        // to calculate corners of 'polygon' composing 'line segment' with interpolated 'width' in any orientation
        // use the line equation parallel to the line defining the start and end points
        // and project the widths on the unit vector of these lines

        // end points
        let coord2 = [endX + uVectorP[0] * r2, endY + uVectorP[1] * r2]
        let coord3 = [endX - uVectorP[0] * r2, endY - uVectorP[1] * r2]

        // sets up polygon corners
        if (prevTop && prevBot) {
          lineSeg.coords.top = [prevTop, coord2]
          lineSeg.coords.bottom = [prevBot, coord3]
        } else {
          // start points
          let coord1 = [startX + uVectorP[0] * r1, startY + uVectorP[1] * r1]
          let coord4 = [startX - uVectorP[0] * r1, startY - uVectorP[1] * r1]
          lineSeg.coords.top = [coord1, coord2]
          lineSeg.coords.bottom = [coord4, coord3]
        }
        // lineSeg.coords.top = [coord1, coord2]
        // lineSeg.coords.bottom = [coord4, coord3]
        // lineSeg.coords = [coord1, coord2, coord3, coord4, coord1]
        lineSeg.aesthetics.strokeLinecap = aesthetics.strokeLinecap
        lineSeg.aesthetics.opacity = aesthetics.strokeOpacity
        lineSeg.aesthetics.strokeWidth = 1
        lineSeg.width = [startWidth, endWidth]
        lineSeg.prevTop = coord2
        lineSeg.prevBot = coord3
        return lineSeg
      },

      /**
       * This function maps line aesthetics to the data and creates the segments.
       */
      enumAesthetics (points) {
        let segments = points
        if (segments.length > 1) {
          /**
           * Calculate the points that make up each line segment.
           */
          let segmentWidth = this.segmentWidth(points), prevTop, prevBot
          for (let ix = 0; ix < segments.length - 1; ix++) {
            let line = segments[ix]
            let x1 = line.coord[0]
            let y1 = line.coord[1]
            let x2 = segments[ix+1].coord[0]
            let y2 = segments[ix + 1].coord[1]
            let w1 = line.strokeWidth
            let w2 = segments[ix + 1].strokeWidth
            if (ix == 0) {
              line.interpolate = this.smoothSegment(this._props, x1, y1, x2, y2, w1, w2, line.fill)
            } else {
              line.interpolate = this.smoothSegment(this._props, x1, y1, x2, y2, w1, w2, line.fill, prevTop, prevBot)
            }
            prevTop = line.interpolate.prevTop
            prevBot = line.interpolate.prevBot
          }

          /**
           * Since each segment plots the interval between 2 data instances
           * the last segment corresponds to the last data instance and can not be
           * mapped to a line.
           */
          segments.pop()
          return segments
        }
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

            segments = this.enumAesthetics(points)

            let elements = [], path = "", topPath = [], bottomPoints = []

            for (let s = 0; s < segments.length; s++) {
              let coordinates = segments[s].interpolate.coords
              let aesthetics = segments[s].interpolate.aesthetics
              topPath.push(coordinates.top[0])
              topPath.push(coordinates.top[1])
              bottomPoints.push(coordinates.bottom[0])
              bottomPoints.push(coordinates.bottom[1])

              // let subpath = ""
              // let section = coordinates[i]
              // subpath = this.createPath([section, coordinates[i+1]])
              // path += subpath
            }

            for (let s = bottomPoints.length - 1; s >= 0; s--) {
              topPath.push(bottomPoints[s])
            }

            topPath = this.createPath(topPath)
            let botPath = this.createPath(bottomPoints)

            let element = createElement('path', {
              attrs: {
                'd': topPath
              },
              style: createSVGStyle(aesthetics)
            })
            elements.push(element)
            aesthetics.stroke = "red"
            element = createElement('path', {
              attrs: {
                'd': botPath
              },
              style: createSVGStyle(aesthetics)
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
