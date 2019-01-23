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

  provide () {
    return { $$map: true }
  }
}
</script>
