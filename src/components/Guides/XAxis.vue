<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :domains="{
      x: [0, 1],
      y: [0, 1]
    }"
  >

    <!-- Main line -->
    <vgg-line
      :x1="0"
      :y1="0.5"
      :x2="1"
      :y2="0.5"
      :width="1"
    />

    <!-- Ticks -->
    <vgg-section
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :domains="{
        x: domain
      }"
    >

      <vgg-map :data="tickData">

        <!-- Tick lines -->
        <vgg-line
          :x1="tick => tick.value"
          :y1="0.5"
          :x2="tick => tick.value"
          :y2="0.65"
          :width="0.5"
        />

        <!-- Tick labels -->
        <vgg-label
          v-if="!rotateLabel"
          :x="tick => tick.value"
          :y="0.5"
          :text="tick => tick.label"
          :font-size="10"
          anchor-point="t"
        />

        <vgg-label
          v-if="rotateLabel"
          :x="tick => tick.value"
          :y="0.5"
          :text="tick => tick.label"
          :font-size="10"
          :rotation="-30"
          anchor-point="rt"
        />

      </vgg-map>

    </vgg-section>

  </vgg-section>
</template>

<script>
import BaseAxis from '@/mixins/Guides/BaseAxis.js'

export default {
  mixins: [BaseAxis]
}
</script>
