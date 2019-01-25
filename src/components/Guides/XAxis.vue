<template>
  <vgg-section
    class="x-axis"
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scales="{
      x: [0, 1],
      y: [0, 1]
    }"
  >

    <!-- Main line -->
    <vgg-line
      class="x-axis-line"
      v-if="domain"
      :x1="0"
      :y1="0.5"
      :x2="1"
      :y2="0.5"
      :stroke="domainColor"
      :stroke-opacity="domainOpacity"
      :stroke-width="domainWidth"
    />

    <!-- Axis title -->
    <vgg-label
      :x="titlePosX"
      :y="titlePosY"
      text="x axis"
      :anchor-point="titleAnchorPoint"
      :fill="titleColor"
      :font-family="titleFont"
      :font-size="titleFontSize"
      :font-weight="titleFontWeight"
      :opacity="titleOpacity"
    />

    <!-- Ticks -->
    <vgg-section
      class="x-axis-ticks"
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :scales="{
        x: scale
      }"
    >

      <vgg-data :data="tickData">

        <vgg-map>

          <!-- Tick lines -->
          <vgg-line
            v-if="ticks"
            :x1="tick => tick.value"
            :y1="0.5"
            :x2="tick => tick.value"
            :y2="flip ? 0.35 : 0.65"
            :stroke="tickColor"
            :stroke-opacity="tickOpacity"
            :stroke-width="tickWidth"
          />

          <!-- Tick labels -->
          <vgg-label
            v-if="(!labelRotate) && labels"
            :x="tick => tick.value"
            :y="flip ? 0.59 : 0.45"
            :text="tick => tick.label"
            :font-family="labelFont"
            :font-size="labelFontSize"
            :font-weight="labelFontWeight"
            :anchor-point="flip ? 'b' : 't'"
            :fill="labelColor"
            :opacity="labelOpacity"
          />

          <vgg-label
            v-if="labelRotate && labels"
            :x="tick => tick.value"
            :y="flip ? 0.59 : 0.45"
            :text="tick => tick.label"
            :font-family="labelFont"
            :font-size="labelFontSize"
            :font-weight="labelFontWeight"
            :rotation="flip ? 30 : -30"
            :anchor-point="flip ? 'rb' : 'rt'"
            :fill="labelColor"
            :opacity="labelOpacity"
          />

        </vgg-map>

      </vgg-data>

    </vgg-section>

  </vgg-section>
</template>

<script>
import BaseAxis from '../../mixins/Guides/BaseAxis.js'

export default {
  mixins: [BaseAxis],

  props: {
    titleHjust: {
      type: [Number, String],
      default: -0.08,
      validator: function (p) {
        return (p.constructor === Number) || (['center', 'l', 'r'].includes(p))
      }
    },

    titleVjust: {
      type: [Number, String],
      default: 'center',
      validator: function (p) {
        return (p.constructor === Number) || (['center', 't', 'b'].includes(p))
      }
    }
  },

  computed: {
    titlePosX () {
      if (this.titleHjust === 'center') {
        return 0.5
      } else if (this.titleHjust === 'l') {
        return 0
      } else if (this.titleHjust === 'r') {
        return 1
      } else {
        return this.titleHjust
      }
    },

    titlePosY () {
      if (this.titleVjust === 'center') {
        return 0.5
      } else if (this.titleVjust === 't') {
        return 1
      } else if (this.titleVjust === 'b') {
        return 0
      } else {
        return this.titleVjust
      }
    },
  }
}
</script>
