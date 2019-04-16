<script>
import Mark from '../../mixins/Marks/Mark.js'
import {
  interpolatePoints,
  interpolatePointsFromFunc,
  transformPoints,
  createPath
} from './utils/createPath.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

export default {
  mixins: [Mark],

  props: {
    // Mappable
    x1: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    x2: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y1: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    y2: {
      type: [Number, String, Date, undefined],
      default: undefined
    },

    func: {
      type: [Function, undefined],
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

    transition: {
      type: Number,
      default: 0
    }
  },

  beforeDestroy () {
    let uid = this.uuid
    if (this.events) {
      this.$$interactionManager.removeItem(uid)
    }
  },

  methods: {
    createPath (func, coords) {
      let transformedPoints
      let path

      if (func) {
        let parentId = this.$$coordinateTreeParent
        let domains = this.$$coordinateTree.getBranch(parentId).domains

        let points = interpolatePointsFromFunc(this.func, domains)
        transformedPoints = transformPoints(points, this.$$transform)
        path = createPath(transformedPoints)
      }

      if (!func) {
        if (this._interpolate) {
          let points = interpolatePoints(coords)
          transformedPoints = transformPoints(points, this.$$transform)
          path = createPath(transformedPoints)
        }

        if (!this._interpolate) {
          transformedPoints = transformPoints(coords, this.$$transform)
          path = createPath(transformedPoints)
        }
      }

      let events = this.events
      if (events.length > 0) {
        this.addToSpatialIndex(transformedPoints, events)
      }

      return path
    },

    renderSVG (createElement) {
      return renderSVG(
        createElement, this.$$transform, this._props,
        this.$$coordinateTreeParent, this.$$coordinateTree, this._interpolate,
        this.events, this.addToSpatialIndex
      )
    },

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, 'line', coordinates, this, events, this.sectionParentChain)
    }
  }
}

export function renderSVG (
  createElement, $$transform, props,
  $$coordinateTreeParent, $$coordinateTree, interpolate,
  events, addToSpatialIndex
) {
  let coords = [
    [props.x1, props.y1],
    [props.x2, props.y2]
  ]

  let path = createLinePath(
    props.func, coords, $$transform, $$coordinateTreeParent, $$coordinateTree,
    interpolate, events, addToSpatialIndex
  )

  return createElement('path', {
    attrs: {
      'd': path
    },
    style: createSVGStyle(props)
  })
}

function createLinePath (
  func, coords, $$transform, $$coordinateTreeParent, $$coordinateTree,
  interpolate, events, addToSpatialIndex
) {
  let transformedPoints
  let path

  if (func) {
    let parentId = $$coordinateTreeParent
    let domains = $$coordinateTree.getBranch(parentId).domains

    let points = interpolatePointsFromFunc(func, domains)
    transformedPoints = transformPoints(points, $$transform)
    path = createPath(transformedPoints)
  }

  if (!func) {
    if (interpolate) {
      let points = interpolatePoints(coords)
      transformedPoints = transformPoints(points, $$transform)
      path = createPath(transformedPoints)
    }

    if (!interpolate) {
      transformedPoints = transformPoints(coords, $$transform)
      path = createPath(transformedPoints)
    }
  }

  if (events) {
    addToSpatialIndex(transformedPoints, events)
  }

  return path
}
</script>
