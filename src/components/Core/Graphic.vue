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

export default {
  mixins: [CoordinateSystem]
}
</script>
