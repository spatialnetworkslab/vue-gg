<template>
  <g v-if="ready">

    <!-- <g :clip-path="`url(#${clipPathID})`">

      <slot />

    </g>

    <defs>
      <clipPath :id="clipPathID">
        <path :d="clipPath" />
      </clipPath>
    </defs> -->

    <slot />

  </g>
</template>

<script>
import NestedCoordinateSystem from '@/mixins/Context/NestedCoordinateSystem.js'
import Rectangular from '@/mixins/Marks/Rectangular.js'
import id from '@/utils/id.js'

export default {
  name: 'CoordinateSystem',

  mixins: [NestedCoordinateSystem, Rectangular],

  computed: {
    clipPath () {
      let x = this.x
      let x2 = this.x2
      let y = this.y
      let y2 = this.y2
      let path = `M ${x} ${y} L ${x} ${y2} L ${x2} ${y2} L ${x2} ${y} Z`

      return path
    },

    clipPathID () {
      return id()
    }
  }
}
</script>
