<template>
  <g v-if="$$dataContainer || dataContainer">
    <slot />
  </g>
</template>

<script>
import DataValve from '@/mixins/Data/DataValve.js'

export default {
  mixins: [DataValve],

  provide () {
    return { $$map: true }
  }
}
</script>
