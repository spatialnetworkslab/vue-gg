import Mark from './Mark.js'
import {
  interpolatePoints,
  transformPoints,
  transformFeature,
  createPath,
  createGeoPath,
  createArc,
  createRegress,
} from '../../components/Marks/utils/createPath.js'

import checkPoints from './utils/checkPoints.js'
import { invalidPoint } from '../../utils/equals.js'

export default {
  mixins: [Mark],

  props: {
    points: {
      type: [Array, undefined],
      default: undefined
    },

    geometry: {
      type: [Object, undefined],
      default: undefined
    },

    x: {
      type: [Array, undefined],
      default: undefined
    },

    y: {
      type: [Array, undefined],
      default: undefined
    },

    x2: {
      type: [Array, undefined],
      default: undefined
    },

    y2: {
      type: [Array, undefined],
      default: undefined
    },

    stroke: {
      type: String,
      default: '#000000'
    },

    fill: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 2
    },

    opacity: {
      type: [Number, undefined],
      default: undefined
    },

    strokeOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    fillOpacity: {
      type: [Number, undefined],
      default: undefined
    },

    strokeLinecap: {
      type: [String, undefined],
      default: undefined,
      validator: s => ['round', 'square', 'butt'].includes(s) || s === undefined
    },

    // Non-aesthetics
    sort: {
      type: [String, undefined],
      default: undefined,
      validator: s => ['x', 'y'].includes(s) || s === undefined
    },

    close: {
      type: Boolean,
      default: false
    },

    curve: {
      type: [Boolean, String, Object, undefined],
      default: false
    },

    regression: {
      type: [Boolean, String, Object, undefined],
      default: false
    },

    curve1: {
      type: [Boolean, String, Object, undefined],
      default: false
    },

    curve2: {
      type: [Boolean, String, Object, undefined],
      default: false
    },

    interpolate: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    _interpolate () {
      if (this.interpolate !== undefined) { return this.interpolate }
      return false
    },
  },

  beforeDestroy () {
    let uid = this.uuid
    if (this.events.length > 0) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    getCurve (c) {
      let spec
      if (c.constructor === Object) {
        let beta = c.curveBeta ? c.curveBeta : 0
        let tension = c.curveTension ? c.curveTension : 0
        let alpha = c.curveAlpha ? c.curveAlpha : 0

        spec = { beta: beta, tension: tension, alpha: alpha }
      } else {
        spec = { beta: 0, tension: 0, alpha: 0 }
      }

      let t
      if (c.constructor === String) {
        t = c
      } else if (c.constructor === Object) {
        t = c['type']
      } else if (c === true) {
        t = true
      } else {
        t = undefined
      }

      return { type: t, curveSpec: spec}
    },

    getRegress (r) {
      let spec
      if (r.constructor === Object) {
        let order = r.regressionOrder ? r.regressionOrder : 2
        let precision = r.regressionPrecision ? r.regressionPrecision : 2

        spec = { order: order, precision: precision }
      } else {
        spec = { order: 2, precision: 2 }
      }

      let t
      if (r.constructor === String) {
        t = r
      } else if (r.constructor === Object) {
        t = r['type']
      } else if (r === true) {
        t = true
      } else {
        t = undefined
      }

      return { type: t, regressSpec: spec}
    },

    generatePoints (x, y) {
      let points = []
      if (x.length !== y.length) {
        // x and y arrays should have equal length
        // if not we throw an error EXCEPT when one of the two arrays
        // has length 1, in which case we reuse that value for all points
        if (x.length === 1 || y.length === 1) {
          if (x.length === 1) {
            for (let i = 0; i < y.length; ++i) {
              points.push([x[0], y[i]])
            }
          } else if (y.length === 1) {
            for (let i = 0; i < x.length; ++i) {
              points.push([x[i], y[0]])
            }
          }
        } else {
          throw new Error(`'x' and 'y' coordinate sets have different lengths`)
        }
      } else {
        for (let i = 0; i < x.length; ++i) {
          points.push([x[i], y[i]])
        }
      }

      return this.filterInvalid(points)
    },

    filterInvalid (points) {
      let filtered = []
      for (let i = 0; i < points.length; i++) {
        let point = points[i]
        if (invalidPoint(point)) {
          console.warn(`Skipped invalid point ${JSON.stringify(point)} at index ${i}`)
        } else {
          filtered.push(point)
        }
      }

      return filtered
    },

    sortPoints (points) {
      if (this.sort === 'x') {
        return points.sort((a, b) => a[0] - b[0])
      }
      if (this.sort === 'y') {
        return points.sort((a, b) => a[1] - b[1])
      }
    },

    closePoints (points) {
      // Check if polygon is closed
      let lastID = points.length - 1

      if (points[0][0] !== points[lastID][0] ||
        points[0][1] !== points[lastID][1]) {
        // If not, close
        points.push(points[0])
      }

      return points
    },

    createPath (points, curveDef, regressDef) {
      let transformedPoints
      let path

      if (curveDef) {
        transformedPoints = transformPoints(points, this.$$transform)
        path = createArc(transformedPoints, curveDef['type'], curveDef.curveSpec)

        return path
      }

      if (regressDef) {
        transformedPoints = transformPoints(points, this.$$transform)
        path = createRegress(transformedPoints, regressDef['type'], regressDef.regressSpec)

        return path
      }

      if (this._interpolate) {
        let interpolatedPoints = interpolatePoints(points)
        transformedPoints = transformPoints(interpolatedPoints, this.$$transform)
        path = createPath(transformedPoints)
      }

      if (!this._interpolate) {
        transformedPoints = transformPoints(points, this.$$transform)
        path = createPath(transformedPoints)
      }

      let events = this.events
      if (events.length > 0) {
        this.addToSpatialIndex(transformedPoints, events)
      }

      return path
    },

    renderSVG (createElement) {
      let area = this.pathType === 'area'
      checkPoints(this.points, this.geometry, this.x, this.y, this.x2, this.y2, area)
      let aesthetics = this._props

      if (this.geometry) {
        let tranformedFeature = transformFeature(aesthetics.geometry, this.$$transform)

        let events = this.events
        if (events.length > 0) {
          this.addToSpatialIndex(tranformedFeature, events)
        }

        let path = createGeoPath(tranformedFeature)
        return createElement('path', {
          attrs: {
            'd': path
          },
          style: this.createSVGStyle(aesthetics)
        })
      } else {
        let points = []
        if (aesthetics.points) {
          points = this.filterInvalid(aesthetics.points)
        } else {
          points = this.generatePoints(aesthetics.x, aesthetics.y)
        }
        if (points.length > 1) {
          if (this.sort) {
            points = this.sortPoints(points)
          }

          let path

          if (area) {
            let points2 = this.getOtherPoints()

            let start1 = transformPoints([points[0]], this.$$transform)[0]
            let start2 = transformPoints([points2[0]], this.$$transform)[0]

            let path1 = this.createPath(points)
            let path2 = this.createPath(points2)

            if (this.curve || this.curve1 || this.curve2) {
              let curveDefs = this.getAreaCurves()

              path1 = this.createPath(points, this.getCurve(curveDefs.areaCurve1))
              path2 = this.createPath(points2, this.getCurve(curveDefs.areaCurve2))
            }

            path = path1 + `L ${start2[0]} ${start2[1]}` + path2 + `L ${start1[0]} ${start1[1]} Z`
          } else {
            if (this.close) {
              points = this.closePoints(points)
            }

            if (this.curve) {
              path = this.createPath(points, this.getCurve(this.curve))
            } else if (this.regression) {
              path = this.createPath(points, undefined, (this.getRegress(this.regression)))
            } else {
              path = this.createPath(points)
            }
          }

          let element = createElement('path', {
            attrs: {
              'd': path
            },
            style: this.createSVGStyle(aesthetics)
          })

          return element
        } else {
          console.warn('Not enough valid points to draw Mark')
        }
      }
    },

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, this.pathType, coordinates, this, events, this.sectionParentChain)
    }
  }
}
