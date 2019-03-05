<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scale-x="[0, 1]"
    :scale-y="[0, 1]"
    class="y-axis"
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
      class="y-axis-title"
      :x="titlePosX"
      :y="titlePosY"
      :text="title"
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
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :scale-y="scale"
      class="y-axis-ticks"
    >

      <vgg-data
        :data="tickData"
        class="y-axis-data"
      >

        <vgg-map v-slot="{ row }">

          <!-- Tick lines -->
          <vgg-line
            v-if="ticks"
            :x1="0.5"
            :y1="row.value"
            :x2="flip ? tickMax : tickMin"
            :y2="row.value"
            :stroke="tickColor"
            :stroke-opacity="tickOpacity"
            :stroke-width="tickWidth"
          />

          <!-- Tick labels -->
          <vgg-label
            v-if="(!labelRotate) && labels"
            :x="flip ? (tickMin - 0.03) : (tickMax + 0.03)"
            :y="row.value"
            :text="row.label"
            :font-family="labelFont"
            :font-size="labelFontSize"
            :font-weight="labelFontWeight"
            :anchor-point="flip ? 'r' : 'l'"
            :fill="labelColor"
            :opacity="labelOpacity"
          />

          <vgg-label
            v-if="labelRotate && labels"
            :x="flip ? (tickMin - 0.03) : (tickMax + 0.03)"
            :y="row.value"
            :text="row.label"
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
      default: 1.08
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

    tickMin () {
      let localTickSize = this.getLocalX(this.tickSize) - this.getLocalX(0)
      let scaledSize = localTickSize / (this.ranges.x2 - this.ranges.x1)
      return 0.5 - scaledSize
    },

    tickMax () {
      let localTickSize = this.getLocalX(this.tickSize) - this.getLocalX(0)
      let scaledSize = localTickSize / (this.ranges.x2 - this.ranges.x1)
      return 0.5 + scaledSize
    },

    posX () {
      if (this.validX) {
        return [this.coords.x1, this.coords.x2]
      }

      let xDomain = this.xDomain

      let xDomainMin = Math.min(xDomain[0], xDomain[1])
      let xDomainMax = Math.max(xDomain[0], xDomain[1])

      let xWidth = this.getLocalX(50) - this.getLocalX(0)

      if (this.hjust.constructor === Number) { 
        let scaledVal = (xDomainMax - xDomainMin) * this.hjust + xDomainMin
        return [scaledVal - xWidth, scaledVal + xWidth]
      } else if (this.hjust === 'center') {
        let centerVal = (xDomainMax - xDomainMin) / 2 + xDomainMin
        return [centerVal - xWidth, centerVal + xWidth]
      } else if (this.hjust === 'l') {
        return [xDomainMin - xWidth, xDomainMin + xWidth]
      } else {
        return [xDomainMax - xWidth, xDomainMax + xWidth]
      }
    },

    ranges () {
      let newRange = {}

      newRange.x1 = this.posX[0]
      newRange.x2 = this.posX[1]

      if (this.validY) {
        newRange.y1 = this.coords.y1
        newRange.y2 = this.coords.y2

        return newRange
      }

      if (this._domainType === 'temporal') {
        newRange.y1 = this._domain[0]
        newRange.y2 = this._domain[1]
      } else {
        newRange.y1 = this.yDomain[0]
        newRange.y2 = this.yDomain[1]
      }

      return newRange
    },
  }
}
</script>
