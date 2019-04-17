<template>
  <g
    v-if="dataContainer !== false"
    class="transform"
  >
    <slot />
  </g>
</template>

<script>
import DataProvider from '../../mixins/Data/DataProvider.js'

export default {
  mixins: [DataProvider]
}
</script>
