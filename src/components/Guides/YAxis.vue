<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :domains="{
      x: [0, 1],
      y: [0, 1]
    }"
  >

    <!-- Main line -->
    <vgg-line
      :x1="0.5"
      :y1="0"
      :x2="0.5"
      :y2="1"
      :width="1"
      color="#808080"
    />

    <!-- Ticks -->
    <vgg-section
      v-if="domain !== undefined"
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :domains="{
        y: domain
      }"
    >

      <vgg-map :data="tickData">

        <!-- Tick lines -->
        <vgg-line
          :x1="0.5"
          :y1="tick => tick.y"
          :x2="0.35"
          :y2="tick => tick.y"
          :width="0.5"
          color="#808080"
        />

        <!-- Tick labels -->
        <vgg-label
          v-if="!rotateLabel"
          :x="0.55"
          :y="tick => tick.y"
          :text="tick => tick.y"
          :font-size="10"
          anchor-point="l"
        />

        <vgg-label
          v-if="rotateLabel"
          :x="0.55"
          :y="tick => tick.y"
          :text="tick => tick.y"
          :font-size="10"
          :rotation="30"
          anchor-point="l"
        />

      </vgg-map>

    </vgg-section>

  </vgg-section>
</template>

<script>
import Rectangular from '@/mixins/Marks/Rectangular.js'
// import calculateNiceInterval from '@/utils/calculateNiceInterval.js'

export default {
  mixins: [Rectangular],

  props: {
    domain: {
      type: [Array, Function, String, undefined],
      default: undefined
    },

    tickValues: {
      type: [Array, undefined],
      default: undefined
    },

    rotateLabel: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ranges () {
      return this.convertCoordinateSpecification(this.aesthetics)
    },

    tickData () {
      if (this.tickValues) {
        return this.tickValues.map(value => {
          return { y: value }
        })
      } else {
        // let range = this.yDomain[1] - this.yDomain[0]
        // let interval = calculateNiceInterval(range)
      }
    }
  }
}
</script>
