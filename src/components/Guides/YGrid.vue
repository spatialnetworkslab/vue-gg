<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :domains="{
      x: [0, 1],
      y: domain
    }"
  >

    <vgg-line
      v-for="(cell, i) in cells"
      :key="i"
      :x1="0"
      :y1="cell.value"
      :x2="1"
      :y2="cell.value"
      :width="0.5"
      color="#808080"
    />

  </vgg-section>
</template>

<script>
import BaseGrid from '@/mixins/Guides/BaseGrid.js'

export default {
  mixins: [BaseGrid]
}
</script>
