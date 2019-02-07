<script>
  import Path from '../../mixins/Marks/Path.js'
  import { createPath, interpolatePath, createGeoPath } from '../../components/Marks/utils/createPath.js'
  import checkPoints from '../../mixins/Marks/utils/checkPoints.js'
  import { invalidPoint } from '../../utils/equals.js'
  import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

  export default {
    mixins: [Path],

    props: {
      // Mappable
      points: {
        type: [Array, Function, undefined],
        default: undefined
      },

      geometry: {
        type: [Object, Function, undefined],
        default: undefined
      },

      x: {
        type: [Array, String, Function, undefined],
        default: undefined
      },

      y: {
        type: [Array, String, Function, undefined],
        default: undefined
      },

      stroke: {
        type: [String, Object, Function, undefined],
        default: '#000000'
      },

      fill: {
        type: [String, Object, Function, undefined],
        default: 'none'
      },

      strokeWidth: {
        type: [Number, Object, Function, undefined],
        default: 2
      },

      opacity: {
        type: [Number, Object, Function, undefined],
        default: undefined
      },

      strokeOpacity: {
        type: [Number, Object, Function, undefined],
        default: undefined
      },

      // Non-mappable
      sort: {
        type: [String, undefined],
        default: undefined,
        validator: s => ['x', 'y'].includes(s) || s === undefined
      },

      interpolate: {
        type: Boolean,
        default: false
      },

      strokeLinecap: {
        type: String,
        default: 'round'
      },
    },

    computed: {
      aesthetics () {
        checkPoints(this.points, this.geometry, this.x, this.y)

        return {
          points: this.parseGeometry(this.points, {}),
          geometry: this.parseGeometry(this.geometry, { geojson: true }),

          x: this.parseCoordinateSet(this.x, { dimension: 'x' }),
          y: this.parseCoordinateSet(this.y, { dimension: 'y' }),

          stroke: this.parseAesthetic(this.stroke),
          fill: this.parseAesthetic(this.fill),
          strokeWidth: this.parseAesthetic(this.strokeWidth),
          opacity: this.parseAesthetic(this.opacity),
          strokeOpacity: this.parseAesthetic(this.strokeOpacity),
          strokeLinecap: this.parseAesthetic(this.strokeLinecap)
        }
      },

      // tracks what the functions should look for as mappable
      mappable () {
        return ['stroke', 'strokeWidth', 'strokeOpacity']
      }
    },

    methods: {
      isArray (obj) {
        if (obj.constructor === Array) {
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
        if (this.isArray(aesthetics[aesKey])) {
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
       * the aesthetics corresponding to the point
       */
      sortPoints (points) {
        if (this.sort === 'x') {
          return points.sort((a, b) => a.coord[0] - b.coord[0])
        }
        if (this.sort === 'y') {
          return points.sort((a, b) => a.coord[1] - b.coord[1])
        }
      },

      createPath (points) {
        if (this._interpolate) {
          return interpolatePath(points, this.$$transform)
        }

        if (!this._interpolate) {
          return createPath(points, this.$$transform)
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
      smoothSegment (startX, startY, endX, endY, startWidth, endWidth, linecap, strokeOpacity, stroke) {
        let smoothness = 200
        let dX = (endX - startX) / smoothness
        let dY = (endY - startY) / smoothness
        let dWidth = (endWidth - startWidth) / smoothness
        let segments = []

        for (let i = 0; i < smoothness; i ++) {
          let line = { coords: [], aesthetics: {}}
          line.coords.push([startX + dX * i, startY + dY * i])
          line.coords.push([startX + dX * (i + 1), startY + dY * (i + 1)])
          line.aesthetics.strokeWidth = startWidth + dWidth * i
          line.aesthetics.strokeOpacity = strokeOpacity
          line.aesthetics.stroke = stroke
          line.aesthetics.strokeLinecap = linecap
          line.aesthetics.fill = this.aesthetics.fill
          line.aesthetics.opacity = this.aesthetics.opacity
          segments.push(line)
        }
        return segments
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
          let segmentWidth = this.segmentWidth(points)
          for (let ix = 0; ix < segments.length - 1; ix++) {
            let line = segments[ix]
            let x1 = line.coord[0]
            let y1 = line.coord[1]
            let x2 = segments[ix+1].coord[0]
            let y2 = segments[ix + 1].coord[1]
            let w1 = line.strokeWidth
            let w2 = segments[ix + 1].strokeWidth
            let o1 = line.strokeOpacity
            let o2 = segments[ix + 1].strokeOpacity
            line.interpolate = this.smoothSegment(x1, y1, x2, y2, w1, w2, this.strokeLinecap, line.strokeOpacity, line.stroke)
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

      renderSVG (createElement, aesthetics) {
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

            // Create all segments first
            let elements = []
            for (let segment = 0;  segment < segments.length; segment++) {
              let interpolate = segments[segment].interpolate
              for (let s = 0; s < interpolate.length; s++) {
                let element = createElement('path', {
                  attrs: {
                    'd': this.createPath(interpolate[s].coords)
                  },
                  style: createSVGStyle(interpolate[s].aesthetics)
                })
                elements.push(element)
              }
            }
            // Draw as a group
            return createElement('g', elements)
          } else {
            console.warn('Not enough valid points to draw Mark')
          }
        }
      }
    }
  }
</script>
