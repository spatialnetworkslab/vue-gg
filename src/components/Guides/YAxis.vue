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
          :y1="tick => tick.value"
          :x2="0.35"
          :y2="tick => tick.value"
          :width="0.5"
          color="#808080"
        />

        <!-- Tick labels -->
        <vgg-label
          v-if="!rotateLabel"
          :x="0.55"
          :y="tick => tick.value"
          :text="tick => tick.value"
          :font-size="10"
          anchor-point="l"
        />

        <vgg-label
          v-if="rotateLabel"
          :x="0.55"
          :y="tick => tick.value"
          :text="tick => tick.value"
          :font-size="10"
          :rotation="30"
          anchor-point="l"
        />

      </vgg-map>

    </vgg-section>

  </vgg-section>
</template>

<script>
import * as d3 from 'd3'
import Rectangular from '@/mixins/Marks/Rectangular.js'
import { inferVariableType } from '@/classes/DataContainer/parseMetadata.js'

export default {
  mixins: [Rectangular],

  props: {
    domain: {
      type: [Array, String, undefined],
      default: undefined
    },

    tickValues: {
      type: [Array, undefined],
      default: undefined
    },

    tickCount: {
      type: Number,
      default: 10
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

    _domain () {
      if (this.domain.constructor === Array) {
        return this.domain
      }
      if (this.domain.constructor === String) {
        return this.$$dataContainer.getDomain(this.domain)
      }
    },

    _domainType () {
      if (this.domain.constructor === Array) {
        return inferVariableType(this.domain[0])
      }
      if (this.domain.constructor === String) {
        return this.$$dataContainer.getVariableMetadata(this.domain).type
      }
    },

    tickData () {
      if (this.tickValues) {
        return this.tickValues.map(value => {
          return { value }
        })
      } else {
        let ticks
        if (this._domainType === 'ratio') {
          ticks = d3.ticks(...this._domain, this.tickCount).map(value => { return { value } })
        }
        if (this._domainType === 'count') {
          ticks = d3.ticks(0, this._domain[1], 10, this.tickCount).map(value => { return { value } })
        }
        if (this._domainType === 'categorical') {
          ticks = this._domain.map(value => { return { value } })
        }
        if (this._domainType === 'temporal') {
          // TODO
        }

        return ticks
      }
    }
  }
}
</script>
