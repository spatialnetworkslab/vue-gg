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
import RootContext from '@/mixins/Context/RootContext.js'

export default {
  name: 'Graphic',

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
