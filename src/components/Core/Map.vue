<template>
  <g
    v-if="$$dataInterface.ready()"
    class="map"
  >
    <slot />
  </g>
</template>

<script>
import DataReceiver from '../../mixins/Data/DataReceiver.js'

export default {
  mixins: [DataReceiver],

  props: {
    unit: {
      type: String,
      default: 'row',
      validator: u => ['row', 'dataframe'].includes(u)
    }
  },

  provide () {
    return { $$map: this.$props }
  }
}
</script>
