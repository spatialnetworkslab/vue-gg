<template>
  <g class="x-axis">

    <!-- Main line -->
    <vgg-line
      v-if="domain"
      :x1="axisCoords.x1"
      :x2="axisCoords.x2"
      :y1="midY"
      :y2="midY"
      :stroke="domainColor"
      :stroke-opacity="domainOpacity"
      :stroke-width="domainWidth"
      class="x-axis-line"
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
      class="x-axis-title"
    />

    <!-- Ticks -->
    <g
      v-if="ticks"
      class="x-axis-ticks"
    >

      <g
        v-for="(tick, i) in generatedTicks"
        :key="i"
        class="x-axis-tick"
      >

        <vgg-line
          :x1="tick.value"
          :x2="tick.value"
          :y1="midY"
          :y2="flip ? midY + _tickLength : midY - _tickLength"
          :stroke="tickColor"
          :stroke-opacity="tickOpacity"
          :stroke-width="tickWidth"
        />

        <!-- Tick labels -->
        <vgg-label
          v-if="(!labelRotate) && labels"
          :x="tick.value"
          :y="flip ? midY + (_tickLength * 1.03) : midY - (_tickLength * 1.03)"
          :text="tick.label"
          :font-family="labelFont"
          :font-size="labelFontSize"
          :font-weight="labelFontWeight"
          :anchor-point="flip ? 'b' : 't'"
          :fill="labelColor"
          :opacity="labelOpacity"
        />

        <vgg-label
          v-if="labelRotate && labels"
          :x="tick.value"
          :y="flip ? midY + (_tickLength * 1.03) : midY - (_tickLength * 1.03)"
          :text="tick.label"
          :font-family="labelFont"
          :font-size="labelFontSize"
          :font-weight="labelFontWeight"
          :rotation="flip ? 30 : -30"
          :anchor-point="flip ? 'rb' : 'rt'"
          :fill="labelColor"
          :opacity="labelOpacity"
        />

      </g>

    </g>

  </g>
</template>

<script>
import BaseAxis from '../../mixins/Guides/BaseAxis.js'
import { isnt } from '../../utils/equals.js'

export default {
  mixins: [BaseAxis],

  props: {
    vjust: {
      type: [Number, String, undefined],
      default: 'b',
      validator: v => v.constructor === String
        ? ['b', 't', 'center'].includes(v)
        : true
    },

    titleHjust: {
      type: [Number, String],
      default: 0.5,
      validator: p => (p.constructor === Number) || (['center', 'l', 'r'].includes(p))
    },

    titleVjust: {
      type: [Number, String],
      default: 0,
      validator: p => (p.constructor === Number) || (['center', 't', 'b'].includes(p))
    }
  },

  computed: {
    // like the coordinateSpecification in Rectangular.js, but more complicated
    axisCoords () {
      // If coordinates were specified in the oldschool way, we can just return
      // the regular coordinate specification (defined in Rectangular.js)
      if (!this.invalidX && !this.invalidY) {
        return this.coordinateSpecification
      }

      let coords = {}

      // X coords

      // If there is a valid x-coordinate specification, we will use it
      if (!this.invalidX) {
        let [x1, x2] = this.convertSpecification(
          this.x1, this.x2, this.x, this.w, this.parentBranch, 'x'
        )
        coords.x1 = x1
        coords.x2 = x2
      }

      // If there is no valid x-coordinate specification, we have to make sure
      // that there are NO x-coordinates specified. In that case, we will take
      // the parent section domain. Otherwise we throw an error.
      if (this.invalidX) {
        if (this.noX) {
          coords.x1 = this.parentDomains.x[0]
          coords.x2 = this.parentDomains.x[1]
        } else {
          throw new Error('Invalid combination of props')
        }
      }

      // Y coords

      // If there is a valid y-coordinate specification, we will use it
      if (!this.invalidY) {
        let [y1, y2] = this.convertSpecification(
          this.y1, this.y2, this.y, this.h, this.parentBranch, 'y'
        )
        coords.y1 = y1
        coords.y2 = y2
      }

      // If there is no valid y-coordinate specification, we will use vjust
      if (this.invalidY) {
        if (this.y || this.y1 || this.y2) {
          throw new Error(`Cannot combine 'vjust' with 'x', 'x1' or 'x2'`)
        }

        let h

        if (this.h) { h = this.h }
        if (!this.h) { h = this.parentDomainWidths.y / 8 }

        if (this.vjust.constructor === String) {
          if (this.vjust === 'b') {
            coords.y1 = this.parentDomains.y[0]
            coords.y2 = coords.y1 + h
          }
          if (this.vjust === 't') {
            coords.y2 = this.parentDomains.y[1]
            coords.y1 = coords.y2 - h
          }
          if (this.vjust === 'center') {
            coords.y1 = this.midY - (h / 2)
            coords.y2 = this.midY + (h / 2)
          }
        }

        if (this.vjust.constructor === Number) {
          let center = this.parentDomains.y[0] + this.parentDomainWidths.y * this.vjust
          coords.y1 = center - (h / 2)
          coords.y2 = center + (h / 2)
        }
      }

      return coords
    },

    noX () {
      return isnt(this.x1) && isnt(this.x2) && isnt(this.x) && isnt(this.w)
    },

    midY () {
      return this.axisCoords.y1 + (this.widthY / 2)
    },

    titleCoords () {
      let coords = {}
      let justLookup = { l: 0, b: 0, r: 1, t: 1, center: 0.5 }

      if (this.titleHjust.constructor === Number) {
        coords.x = this.getJust(this.axisCoords.x1, this.widthX, this.titleHjust)
      }
      if (this.titleHjust.constructor === String) {
        let just = justLookup[this.titleHjust]
        coords.x = this.getJust(this.axisCoords.x1, this.widthX, just)
      }

      if (this.titleVjust.constructor === Number) {
        coords.y = this.getJust(this.axisCoords.y1, this.widthY, this.titleVjust)
      }
      if (this.titleVjust.constructor === String) {
        let just = justLookup[this.titleVjust]
        coords.y = this.getJust(this.axisCoords.y1, this.widthY, just)
      }

      return coords
    },

    _tickLength () {
      if (this.tickLength) { return this.tickLength }
      return this.widthX / 3
    }
  }
}
</script>
