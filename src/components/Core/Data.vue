<template>
  <g class="transform" v-if="dataContainer">
    <slot />
  </g>
</template>

<script>
import DataTransformer from '../../mixins/Data/DataTransformer.js'

export default {
  mixins: [DataTransformer]
}
</script>
