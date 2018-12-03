<template>
  <g
    v-if="ready"
    :width="width"
    :height="height"
  >

    <slot />

  </g>
</template>

<script>
import RootContext from '@/mixins/Context/RootContext.js'

export default {
  name: 'Glyph',

  mixins: [RootContext],

  props: {
    width: {
      type: Number,
      required: true
    },

    height: {
      type: Number,
      required: true
    }
  }
}
</script>
