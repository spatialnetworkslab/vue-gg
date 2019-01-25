<template>
  <vgg-section
    class="y-axis"
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
      class="y-axis-line"
      v-if="domain"
      :x1="0.5"
      :y1="0"
      :x2="0.5"
      :y2="1"
      :stroke="domainColor"
      :strokeOpacity="domainOpacity"
      :stroke-width="domainWidth"
    />

    <!-- Axis title -->
    <vgg-label
      :x="titlePosX"
      :y="titlePosY"
      text="y axis"
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
      v-if="scale !== undefined"
      class="y-axis-ticks"
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :scales="{
        y: scale
      }"
    >

      <vgg-data :data="tickData">

        <vgg-map>

          <!-- Tick lines -->
          <vgg-line
            v-if="ticks"
            :x1="0.5"
            :y1="tick => tick.value"
            :x2="flip ? tickMax : tickMin"
            :y2="tick => tick.value"
            :stroke="tickColor"
            :stroke-opacity="tickOpacity"
            :stroke-width="tickWidth"
          />

          <!-- Tick labels -->
          <vgg-label
            v-if="(!labelRotate) && labels"
            :x="flip ? 0.45 : 0.59"
            :y="tick => tick.value"
            :text="tick => tick.label"
            :font-family="labelFont"
            :font-size="labelFontSize"
            :font-weight="labelFontWeight"
            :anchor-point="flip ? 'r' : 'l'"
            :fill="labelColor"
            :opacity="labelOpacity"
          />

          <vgg-label
            v-if="labelRotate && labels"
            :x="flip ? 0.41 : 0.59"
            :y="tick => tick.value"
            :text="tick => tick.label"
            :font-family="labelFont"
            :font-size="labelFontSize"
            :font-weight="labelFontWeight"
            :rotation="flip ? -30 : 30"
            :anchor-point="flip ? 'r' : 'l'"
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
      default: 'center'
    },

    titleVjust: {
      default: 1.05
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

    posX () {
      let xRange = this.xRange

      let xMin = Math.min(xRange[0], xRange[1])
      let xMax = Math.max(xRange[0], xRange[1])

      if (this.hjust.constructor === Number) { 
        let scaledVal = (xMax - xMin) * this.vjust
        return scaledVal
      } else if (this.hjust === 'center') {
        return (xMax - xMin) / 2 + xRange[0]
      } else if (this.hjust === 'l') {
        return xMin
      } else {
        return xMax
      }
    },

    ranges () {
      let newRange = {}

      let aesRange = this.convertCoordinateSpecification(this.aesthetics)

      if (aesRange.x1 && aesRange.x2) {
        newRange.x1 = aesRange.x1
        newRange.x2 = aesRange.x2
      } else {
        newRange.x1 = this.posX - 50
        newRange.x2 = this.posX
      }

      if (aesRange.y1 && aesRange.y2) {
        newRange.y1 = aesRange.y1
        newRange.y2 = aesRange.y2
      } else {
        newRange.y1 = this.yRange[0]
        newRange.y2 = this.yRange[1]
      }

      return newRange
    },
  }
}
</script>
