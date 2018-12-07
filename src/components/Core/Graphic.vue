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
import CoordinateSystem from '@/mixins/CoordinateSystem.js'
import DataProvider from '@/mixins/DataProvider.js'

export default {
  mixins: [CoordinateSystem, DataProvider]
}
</script>
