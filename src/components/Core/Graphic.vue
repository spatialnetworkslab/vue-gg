<template>
  <svg
    v-if="ready"
    :width="width"
    :height="height"
  >

    <slot />

  </svg>
</template>

<script>
import CoordinateSystem from '../../mixins/CoordinateSystem.js'
import DataProvider from '../../mixins/Data/DataProvider.js'

export default {
  mixins: [CoordinateSystem, DataProvider]
}
</script>
