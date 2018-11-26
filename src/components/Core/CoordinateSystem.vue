<template>
  <g v-if="ready">

    <slot />

  </g>
</template>

<script>
import NestedCoordinateSystem from '@/mixins/Context/NestedCoordinateSystem.js'
import Rectangular from '@/mixins/Marks/Rectangular.js'

export default {
  name: 'CoordinateSystem',

  mixins: [NestedCoordinateSystem, Rectangular]
}
</script>
