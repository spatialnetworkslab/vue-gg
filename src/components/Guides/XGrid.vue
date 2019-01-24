<template>
  <vgg-section
    class="x-grid"
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scales="{
      x: scale,
      y: [0, 1]
    }"
  >

    <vgg-line
      v-for="(cell, i) in cells"
      class="x-grid-line"
      :key="i"
      :x1="cell.value"
      :y1="0"
      :x2="cell.value"
      :y2="1"
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
