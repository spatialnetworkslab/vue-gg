<template>
  <g v-if="ready">

    <slot />

  </g>
</template>

<script>
import Transformation from '@/mixins/Transformation.js'

export default {
  mixins: [Transformation]
}
</script>
