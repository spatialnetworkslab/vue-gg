<script>
import Rectangular, { getCoordinateSpecification, invalidCombination } from '../../mixins/Marks/Rectangular.js'
import {
  interpolatePoints,
  transformPoints,
  createPath
} from './utils/createPath.js'
import createSVGStyle from '../../mixins/Marks/utils/createSVGStyle.js'

export default {
  mixins: [Rectangular],

  props: {
    stroke: {
      type: String,
      default: 'none'
    },

    strokeWidth: {
      type: Number,
      default: 2
    },

    fill: {
      type: String,
      default: '#000000'
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
    renderSVG (createElement) {
      return renderSVG(
        createElement, this.$$transform, this._props, this.parentBranch, this._interpolate,
        this.events, this.addToSpatialIndex
      )
    },

    addToSpatialIndex (coordinates, events) {
      this.$$interactionManager.addItem(this.uuid, 'rectangle', coordinates, this, events, this.sectionParentChain)
    }
  }
}

export function renderSVG (
  createElement, $$transform, props, parentBranch, interpolate, events, addToSpatialIndex
) {
  let invalidX = invalidCombination(props.x1, props.x2, props.x, props.w)
  let invalidY = invalidCombination(props.y1, props.y2, props.y, props.h)

  if (invalidX || invalidY) {
    throw new Error('Invalid combination of props')
  }

  let coords = getCoordinateSpecification(props, parentBranch)

  let points = [
    [coords.x1, coords.y1],
    [coords.x1, coords.y2],
    [coords.x2, coords.y2],
    [coords.x2, coords.y1],
    [coords.x1, coords.y1]
  ]

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

  return createElement('path', {
    attrs: {
      'd': path
    },
    style: createSVGStyle(props)
  })
}
</script>
