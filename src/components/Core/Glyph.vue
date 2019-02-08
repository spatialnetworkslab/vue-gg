<template>
  <g
    v-if="ready"
    :transform="translate"
    class="glyph">

    <slot />

  </g>
</template>

<script>
import Mark from '../../mixins/Marks/Mark.js'
import CoordinateSystem from '../..//mixins/CoordinateSystem.js'

import { adjustToAnchorPoint } from '../../utils/anchorPoint.js'

export default {
  mixins: [Mark, CoordinateSystem],

  props: {
    x: {
      type: Number,
      required: true
    },

    y: {
      type: Number,
      required: true
    },

    width: {
      type: Number,
      required: true
    },

    height: {
      type: Number,
      required: true
    },

    anchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb'].includes(p)
    }
  },

  computed: {
    transformedXY () {
      if (this.__update) {
        return this.$$transform([this.x, this.y])
      }
    },

    anchorPointAdjustedXY () {
      let xy = this.transformedXY

      return adjustToAnchorPoint(xy, this.width, this.height, 'lt', this.anchorPoint)
    },

    translate () {
      let [x, y] = this.anchorPointAdjustedXY
      return `translate(${x}, ${y})`
    }
  }
}
</script>
