<template>
  <g
    v-if="!hide"
    class="y-axis"
  >

    <!-- Main line -->
    <vgg-line
      v-if="domain"
      :x1="midX"
      :x2="midX"
      :y1="axisCoords.y1"
      :y2="axisCoords.y2"
      :stroke="domainColor"
      :stroke-opacity="domainOpacity"
      :stroke-width="domainWidth"
      class="y-axis-line"
    />

    <!-- Axis title -->
    <vgg-label
      :x="titleCoords.x"
      :y="titleCoords.y"
      :text="title"
      :anchor-point="titleAnchorPoint"
      :fill="titleColor"
      :font-family="titleFont"
      :font-size="titleFontSize"
      :font-weight="titleFontWeight"
      :opacity="titleOpacity"
      :rotation="titleAngle"
      class="y-axis-title"
    />

    <!-- Ticks -->
    <g
      v-if="ticks"
      class="y-axis-ticks"
    >

      <g
        v-for="(tick, i) in coloredTicks"
        :key="i"
        class="y-axis-tick"
      >

        <vgg-line
          :x1="midX"
          :x2="flip ? midX - _tickLength : midX + _tickLength"
          :y1="tick.value"
          :y2="tick.value"
          :stroke="tickColor"
          :stroke-opacity="tickOpacity"
          :stroke-width="tickWidth"
        />

        <vgg-symbol
          :x="flip ? midX + _tickLength * 1.5 : midX - _tickLength * 1.5"
          :y="tick.value"
          :fill="tick.color"
          :size="12"
          :fillOpacity="0.7"
        />

        <!-- Tick labels -->
        <vgg-label
          v-if="(!labelRotate) && labels"
          :x="flip ? midX + (_tickLength * 2.7) : midX - (_tickLength * 2.7)"
          :y="tick.value"
          :text="tick.label"
          :font-family="labelFont"
          :font-size="labelFontSize"
          :font-weight="labelFontWeight"
          :anchor-point="flip ? 'l' : 'r'"
          :opacity="labelOpacity"
        />

        <vgg-label
          v-if="labelRotate && labels"
          :x="flip ? midX + (_tickLength * 2.7) : midX - (_tickLength * 2.7)"
          :y="tick.value"
          :text="tick.label"
          :font-family="labelFont"
          :font-size="labelFontSize"
          :font-weight="labelFontWeight"
          :rotation="flip ? -30 : 30"
          :anchor-point="flip ? 'l' : 'r'"
          :opacity="labelOpacity"
        />

      </g>

    </g>

  </g>
</template>

<script>
import BaseAxis from '../../mixins/Guides/BaseAxis.js'
import { isnt } from '../../utils/equals.js'
import createScale from '../../scales/createScale.js'

export default {
  mixins: [BaseAxis],

  props: {
    hjust: {
      type: [Number, String, undefined],
      default: 'r',
      validator: v => v.constructor === String
        ? ['l', 'r', 'center'].includes(v)
        : true
    },

    titleHjust: {
      type: [Number, String],
      default: 1.4,
      validator: p => (p.constructor === Number) || (['center', 'l', 'r'].includes(p))
    },

    titleVjust: {
      type: [Number, String],
      default: 0.5,
      validator: p => (p.constructor === Number) || (['center', 't', 'b'].includes(p))
    },

    labelColor:{
      type: [String, Array],
      default: 'blue'
    }
  },

  mounted() {
    this.coloredTicks
  },

  computed: {
    coloredTicks () {
      let coloredTicks = []
      for (let i = 0; i < this.generatedTicks.length ; i++) {
        coloredTicks.push(this.generatedTicks[i])
        coloredTicks[i].color = this.labelColor[i]
      }
      console.log('###', coloredTicks)
      return coloredTicks
    },

    // like the coordinateSpecification in Rectangular.js, but more complicated
    axisCoords () {
      // If coordinates were specified in the oldschool way, we can just return
      // the regular coordinate specification (defined in Rectangular.js)
      if (!this.invalidX && !this.invalidY) {
        return this.coordinateSpecification
      }

      let coords = {}

      // Y coords

      // If there is a valid y-coordinate specification, we will use it
      if (!this.invalidY) {
        let [y1, y2] = this.convertSpecification(
          this.y1, this.y2, this.y, this.h, this.parentBranch, 'y'
        )
        coords.y1 = y1
        coords.y2 = y2
      }

      // If there is no valid y-coordinate specification, we have to make sure
      // that there are NO y-coordinates specified. In that case, we will take
      // the parent section domain. Otherwise we throw an error.
      if (this.invalidY) {
        if (this.noY) {
          coords.y1 = this.parentDomains.y[0]
          coords.y2 = this.parentDomains.y[1]
        } else {
          throw new Error('Invalid combination of y-positioning props')
        }
      }

      // X coords

      // If there is a valid x-coordinate specification, we will use it
      if (!this.invalidX) {
        let [x1, x2] = this.convertSpecification(
          this.x1, this.x2, this.x, this.w, this.parentBranch, 'x'
        )
        coords.x1 = x1
        coords.x2 = x2
      }

      // If there is no valid x-coordinate specification, we will use vjust
      if (this.invalidX) {
        if (this.x || this.x1 || this.x2) {
          throw new Error('Invalid combination of x-positioning props')
        }

        let w

        if (this.w) { w = this.w }
        if (!this.w) { w = this.parentDomainWidths.x / 8 }

        let just

        if (this.hjust.constructor === Number) { just = this.hjust }
        if (this.hjust.constructor === String) {
          just = this.justLookup[this.hjust]
        }

        let center = this.getJust(
          this.parentDomains.x[0], this.parentDomainWidths.x, just
        )
        coords.x1 = center - (w / 2)
        coords.x2 = center + (w / 2)
      }

      return coords
    },

    noY () {
      return isnt(this.y1) && isnt(this.y2) && isnt(this.y) && isnt(this.h)
    },

    midX () {
      return this.axisCoords.x1 + (this.widthX / 2)
    },

    titleCoords () {
      let coords = {}

      if (this.titleHjust.constructor === Number) {
        coords.x = this.getJust(this.axisCoords.x1, this.widthX, this.titleHjust)
      }
      if (this.titleHjust.constructor === String) {
        let just = this.justLookup[this.titleHjust]
        coords.x = this.getJust(this.axisCoords.x1, this.widthX, just)
      }

      if (this.titleVjust.constructor === Number) {
        coords.y = this.getJust(this.axisCoords.y1, this.widthY, this.titleVjust)
      }
      if (this.titleVjust.constructor === String) {
        let just = this.justLookup[this.titleVjust]
        coords.y = this.getJust(this.axisCoords.y1, this.widthY, just)
      }

      return coords
    },

    _tickLength () {
      if (this.tickLength) { return this.tickLength }
      return this.widthX / 5
    },

    parsedScale () {
      return createScale('y', this.context, this.scalingOptions)
    }
  }
}
</script>
