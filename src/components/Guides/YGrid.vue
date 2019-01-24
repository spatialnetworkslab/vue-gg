<template>
  <vgg-section
    class="y-grid"
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scales="{
      x: [0, 1],
      y: scale
    }"
  >

    <vgg-line
      v-for="(cell, i) in cells"
      class="y-grid-line"
      :key="i"
      :x1="0"
      :y1="cell.value"
      :x2="1"
      :y2="cell.value"
      :stroke-width="0.5"
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
