<template>
  <vgg-section
    :x1="gridCoords.x1"
    :x2="gridCoords.x2"
    :y1="gridCoords.y1"
    :y2="gridCoords.y2"
    :scale-x="[0, 1]"
    :scale-y="scale"
    class="y-grid"
  >

    <vgg-line
      v-for="(cell, i) in cells"
      :key="i"
      :x1="0"
      :y1="cell.value"
      :x2="1"
      :y2="cell.value"
      :stroke-width="0.5"
      class="y-grid-line"
      stroke="#808080"
    />

  </vgg-section>
</template>

<script>
import BaseGrid from '../../mixins/Guides/BaseGrid.js'

export default {
  mixins: [BaseGrid]
}
</script>
