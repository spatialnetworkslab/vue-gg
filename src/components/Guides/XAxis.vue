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
      :x1="0"
      :y1="0.5"
      :x2="1"
      :y2="0.5"
      :width="1"
      color="#808080"
    />

    <!-- Ticks -->
    <vgg-section
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :domains="{
        x: domain
      }"
    >

      <vgg-map :data="tickData">

        <!-- Tick lines -->
        <vgg-line
          :x1="tick => tick.x"
          :y1="0.5"
          :x2="tick => tick.x"
          :y2="0.75"
          :width="1"
          color="#808080"
        />

        <!-- Tick labels -->
        <!-- TODO -->

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
    }
  },

  computed: {
    ranges () {
      return this.convertCoordinateSpecification(this.aesthetics)
    },

    tickData () {
      if (this.tickValues) {
        return this.tickValues.map(value => {
          return { x: value }
        })
      } else {
        // let range = this.yDomain[1] - this.yDomain[0]
        // let interval = calculateNiceInterval(range)
      }
    }
  }
}
</script>
