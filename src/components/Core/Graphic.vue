<template>
  <svg
    v-if="ready"
    class="graphic"
    :width="width"
    :height="height"
  >

    <slot />

  </svg>
</template>

<script>
import CoordinateSystem from '../../mixins/CoordinateSystem.js'
import DataManager from '../../mixins/Data/DataManager.js'

export default {
  mixins: [CoordinateSystem, DataManager]
}
</script>
