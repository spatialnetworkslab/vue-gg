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
import InteractionManager from '../../mixins/Interactions/InteractionManager.js'

export default {
  mixins: [CoordinateSystem, DataManager, ScaleManager, InteractionManager],

  provide () {
    return { $$grid: false }
  }
}
</script>
