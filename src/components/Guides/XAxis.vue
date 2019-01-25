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
      :rotation="titleAngle"
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
            :y2="flip ? tickMin : tickMax"
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
      default: -0.08
    },

    titleVjust: {
      default: 'center'
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

    posY () {
      let yRange = this.yRange

      let yMin = Math.min(yRange[0], yRange[1])
      let yMax = Math.max(yRange[0], yRange[1])
      
      if (this.vjust.constructor === Number) { 
        let scaledVal = (yMax - yMin) * this.hjust
        return scaledVal
      } else if (this.vjust === 'center') {
        return (yMax - yMin) / 2 + yMin
      } else if (this.vjust === 't') {
        return yMax
      } else {
        return yMin
      }
    },

    ranges () {
      let newRange = {}

      let aesRange = this.convertCoordinateSpecification(this.aesthetics)

      if (aesRange.x1 && aesRange.x2) {
        newRange.x1 = aesRange.x1
        newRange.x2 = aesRange.x2
      } else {
        newRange.x1 = this.xRange[0]
        newRange.x2 = this.xRange[1]
      }

      if (aesRange.y1 && aesRange.y2) {
        newRange.y1 = aesRange.y1
        newRange.y2 = aesRange.y2
      } else {
        newRange.y1 = this.posY - 50
        newRange.y2 = this.posY
      }

      return newRange
    },
  }
}
</script>
