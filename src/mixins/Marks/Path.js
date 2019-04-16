import Mark from './Mark.js'
import {
  interpolatePoints,
  transformPoints,
  transformFeature,
  createPath,
  createGeoPath
} from '../../components/Marks/utils/createPath.js'

import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

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

    interpolate: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    _interpolate () {
      if (this.interpolate !== undefined) { return this.interpolate }
      return false
    }
  },

  beforeDestroy () {
    let uid = this.uuid
    if (this.events) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    renderSVG (createElement) {
      return renderSVG(
        createElement, this.$$transform, this._props,
        this.pathType, this._interpolate,
        this.events, this.addToSpatialIndex
      )
    },

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, this.pathType, coordinates, this, events, this.sectionParentChain)
    }
  }
}

export function renderSVG (
  createElement, $$transform, props,
  pathType, interpolate,
  events, addToSpatialIndex
) {
  let area = pathType === 'area'
  checkPoints(props.points, props.geometry, props.x, props.y, props.x2, props.y2, area)

  if (props.geometry) {
    let tranformedFeature = transformFeature(props.geometry, $$transform)

    if (events > 0) {
      addToSpatialIndex(tranformedFeature, events)
    }

    let path = createGeoPath(tranformedFeature)
    return createElement('path', {
      attrs: {
        'd': path
      },
      style: createSVGStyle(props)
    })
  } else {
    let points = []
    if (props.points) {
      points = filterInvalid(props.points)
    } else {
      points = generatePoints(props.x, props.y)
    }
    if (points.length > 1) {
      if (props.sort) {
        points = sortPoints(points, props.sort)
      }

      if (area) {
        let points2

        if (props.x2 && !props.y2) {
          points2 = generatePoints(props.x2, props.y)
        }

        if (!props.x2 && props.y2) {
          points2 = generatePoints(props.x, props.y2)
        }

        if (props.x2 && props.y2) {
          points2 = generatePoints(props.x2, props.y2)
        }

        if (props.sort) { points2 = sortPoints(points2, props.sort) }
        points = points.concat(points2.reverse())
      }

      if (props.close) {
        points = closePoints(points)
      }

      let path = generatePath(points, $$transform, interpolate, events, addToSpatialIndex)

      let element = createElement('path', {
        attrs: {
          'd': path
        },
        style: createSVGStyle(props)
      })

      return element
    } else {
      console.warn('Not enough valid points to draw Mark')
    }
  }
}

function generatePoints (x, y) {
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

  return filterInvalid(points)
}

function filterInvalid (points) {
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
}

function sortPoints (points, sortDimension) {
  if (sortDimension === 'x') {
    return points.sort((a, b) => a[0] - b[0])
  }
  if (sortDimension === 'y') {
    return points.sort((a, b) => a[1] - b[1])
  }
}

function closePoints (points) {
  // Check if polygon is closed
  let lastID = points.length - 1

  if (points[0][0] !== points[lastID][0] ||
    points[0][1] !== points[lastID][1]) {
    // If not, close
    points.push(points[0])
  }

  return points
}

function generatePath (points, $$transform, interpolate, events, addToSpatialIndex) {
  let transformedPoints
  let path

  if (interpolate) {
    let interpolatedPoints = interpolatePoints(points)
    transformedPoints = transformPoints(interpolatedPoints, $$transform)
    path = createPath(transformedPoints)
  }

  if (!interpolate) {
    transformedPoints = transformPoints(points, $$transform)
    path = createPath(transformedPoints)
  }

  if (events) {
    addToSpatialIndex(transformedPoints, events)
  }

  return path
}
