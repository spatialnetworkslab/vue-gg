<template>
  <g v-if="ready">

    <slot />

  </g>
</template>

<script>
import CoordinateSystem from '@/mixins/Context/CoordinateSystem/CoordinateSystem.js'
import Rectangular from '@/mixins/Marks/Rectangular.js'

export default {
  name: 'CoordinateSystem',

  mixins: [CoordinateSystem, Rectangular]
}
</script>
