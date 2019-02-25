<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scale-x="[0, 1]"
    :scale-y="[0, 1]"
    class="x-axis"
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
      class="x-axis-title"
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
      :scale-x="scale"
      class="x-axis-ticks"
    >

      <vgg-data
        :data="tickData"
        class="x-axis-data"
      >

        <vgg-map v-slot="{ row }">

          <!-- Tick lines -->
          <vgg-line
            v-if="ticks"
            :x1="row.value"
            :y1="0.5"
            :x2="row.value"
            :y2="flip ? tickMax : tickMin"
            :stroke="tickColor"
            :stroke-opacity="tickOpacity"
            :stroke-width="tickWidth"
          />

          <!-- Tick labels -->
          <vgg-label
            v-if="(!labelRotate) && labels"
            :x="row.value"
            :y="flip ? (tickMax + 0.03) : (tickMin - 0.03)"
            :text="row.label"
            :font-family="labelFont"
            :font-size="labelFontSize"
            :font-weight="labelFontWeight"
            :anchor-point="flip ? 'b' : 't'"
            :fill="labelColor"
            :opacity="labelOpacity"
          />

          <vgg-label
            v-if="labelRotate && labels"
            :x="row.value"
            :y="flip ? (tickMax + 0.03) : (tickMin - 0.03)"
            :text="row.label"
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

    tickMin () {
      if (this.y1 && this.y2) {
        return 0.5 - (this.tickSize / (this.y2 - this.y1))
      } else {
        return 0.5 - (this.tickSize / 100)
      }
    },

    tickMax () {
      if (this.y1 && this.y2) {
        return 0.5 + (this.tickSize / (this.y2 - this.y1))
      } else {
        return 0.5 + (this.tickSize / 100)
      }
    },

    posY () {
      let yHeight = this.getLocalY(50)

      if (this.y) {
        let scaledY = this.getLocalY(this.y)
        return [scaledY - yHeight, scaledY + yHeight]
      }

      if (this.y1 && this.y2) {
        return [this.getLocalY(this.y1), this.getLocalY(this.y2)]
      } else if (this.y1 ^ this.y2) {
        throw new Error ('Please provide both y1 and y2 coordinates. Alternatively use the y prop')
      }

      let yDomain = this.yDomain

      let yDomainMin = Math.min(yDomain[0], yDomain[1])
      let yDomainMax = Math.max(yDomain[0], yDomain[1])
      
      if (this.vjust.constructor === Number) { 
        let scaledVal = (yDomainMax - yDomainMin) * this.vjust + yDomainMin
        return [scaledVal - yHeight, scaledVal + yHeight]
      } else if (this.vjust === 'center') {
        let centerVal = (yDomainMax - yDomainMin) / 2 + yDomainMin
        return [centerVal - yHeight, centerVal + yHeight]
      } else if (this.vjust === 't') {
        return [yDomainMax - yHeight, yDomainMax + yHeight]
      } else {
        return [yDomainMin - yHeight, yDomainMin + yHeight]
      }
    },

    ranges () {
      let newRange = {}

      newRange.y1 = this.posY[0]
      newRange.y2 = this.posY[1]

      if (this.x1 && this.x2) {
        newRange.x1 = this.getLocalX(this.x1)
        newRange.x2 = this.getLocalX(this.x2)
        return newRange
      } else if (this.x1 ^ this.x2) {
        throw new Error('Please provide both x1 and x2 coordinates')
      } else if (this.x) {
        throw new Error('Please provide x1, x2 start and end coordinates')
      }

      if (this._domainType === 'temporal') {
        newRange.x1 = this._domain[0]
        newRange.x2 = this._domain[1]
      } else {
        newRange.x1 = this.xDomain[0]
        newRange.x2 = this.xDomain[1]
      }

      return newRange
    },
  }
}
</script>
