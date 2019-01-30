<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scale-x="scale"
    :scale-y="[0, 1]"
    class="x-grid"
  >

    <vgg-line
      v-for="(cell, i) in cells"
      :key="i"
      :x1="cell.value"
      :y1="0"
      :x2="cell.value"
      :y2="1"
      :stroke-width="0.5"
      class="x-grid-line"
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
