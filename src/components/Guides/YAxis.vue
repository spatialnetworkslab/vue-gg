<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scales="{
      x: [0, 1],
      y: [0, 1]
    }"
  >

    <!-- Main line -->
    <vgg-line
      :x1="0.5"
      :y1="0"
      :x2="0.5"
      :y2="1"
      :stroke-width="1"
    />

    <!-- Ticks -->
    <vgg-section
      v-if="scale !== undefined"
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :scales="{
        y: scale
      }"
    >

      <vgg-map :data="tickData">

        <!-- Tick lines -->
        <vgg-line
          :x1="0.5"
          :y1="tick => tick.value"
          :x2="flip ? 0.65 : 0.35"
          :y2="tick => tick.value"
          :stroke-width="0.5"
        />

        <!-- Tick labels -->
        <vgg-label
          v-if="!rotateLabel"
          :x="flip ? 0.45 : 0.59"
          :y="tick => tick.value"
          :text="tick => tick.label"
          :font-size="10"
          :anchor-point="flip ? 'r' : 'l'"
        />

        <vgg-label
          v-if="rotateLabel"
          :x="flip ? 0.41 : 0.59"
          :y="tick => tick.value"
          :text="tick => tick.label"
          :font-size="10"
          :rotation="flip ? -30 : 30"
          :anchor-point="flip ? 'r' : 'l'"
        />

      </vgg-map>

    </vgg-section>

  </vgg-section>
</template>

<script>
import BaseAxis from '../../mixins/Guides/BaseAxis.js'

export default {
  mixins: [BaseAxis]
}
</script>
