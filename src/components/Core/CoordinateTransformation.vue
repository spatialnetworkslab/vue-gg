<template>
  <g v-if="ready">

    <slot />

  </g>
</template>

<script>
import CoordinateTransformation from '@/mixins/CoordinateTransformation.js'

export default {
  mixins: [CoordinateTransformation]
}
</script>
