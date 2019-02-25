<template>
  <svg
    v-if="ready"
    :width="width"
    :height="height"
    class="graphic"
  >

    <slot />

  </svg>
</template>

<script>
import CoordinateSystem from '../../mixins/CoordinateSystem.js'
import DataManager from '../../mixins/Data/DataManager.js'
import ScaleManager from '../../mixins/Scales/ScaleManager.js'

export default {
  mixins: [CoordinateSystem, DataManager, ScaleManager]
}
</script>
