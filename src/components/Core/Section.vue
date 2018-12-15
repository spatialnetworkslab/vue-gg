<template>
  <g v-if="ready">

    <slot />

  </g>
</template>

<script>
import Section from '@/mixins/Section.js'

export default {
  mixins: [Section]
}
</script>
