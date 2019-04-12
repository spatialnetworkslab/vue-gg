<template>
  <svg
    v-if="ready"
    :width="width"
    :height="height"
    class="graphic"
  >

    <rect v-if="background" x="0" y="0"
          :width="width" :height="height" :style="bgStyle" />

    <slot />

  </svg>
</template>

<script>
import CoordinateSystem from '../../mixins/CoordinateSystem.js'
import DataManager from '../../mixins/Data/DataManager.js'
import ScaleManager from '../../mixins/Scales/ScaleManager.js'
import InteractionManager from '../../mixins/Interactions/InteractionManager.js'

export default {
  mixins: [CoordinateSystem, DataManager, ScaleManager, InteractionManager],

  props: {
    background: {
      type: [Object, undefined],
      default: undefined
    },
  },

  computed: {
    bgStyle () {
      if (!this.background) { return }

      let bg = this.background

      let bgColor
      if (bg.color) {
        bgColor = bg.color
      } else {
        console.warn('Please provide a graphic background color, defaulting to grey.')
        bgColor = 'grey'
      }

      let bgOpacity = bg.opacity ? bg.opacity : 1
      let bgStroke = bg.stroke ? bg.stroke : 'none'
      let bgStrokeWidth = bg.strokeWidth ? bg.strokeWidth : 1
      let bgStyle = { 'fill': bgColor,
                      'fill-opacity': bgOpacity,
                      'stroke': bgStroke,
                      'stroke-width': bgStrokeWidth }

      return bgStyle
    }
  },

  provide () {
    return { $$grid: false, $$sectionParentChain: [] }
  }
}
</script>
