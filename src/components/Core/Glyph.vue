<template>
  <g
    v-if="ready"
    :transform="translate">

    <slot />

  </g>
</template>

<script>
import Mark from '@/mixins/Marks/Mark.js'
import RootContext from '@/mixins/Context/RootContext.js'

export default {
  mixins: [Mark, RootContext],

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
    }
  },

  computed: {
    transformedXY () {
      return this.transformer([this.x, this.y])
    },

    anchorPointAdjustedXY () {
      let xy = this.transformedXY
      let x = xy[0] - (this.width / 2)
      let y = xy[1] - (this.height / 2)

      return [x, y]
    },

    translate () {
      let [x, y] = this.anchorPointAdjustedXY
      return `translate(${x}, ${y})`
    }
  }
}
</script>
