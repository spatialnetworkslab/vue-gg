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
      :x1="0.5"
      :y1="0"
      :x2="0.5"
      :y2="1"
      :width="1"
      color="#808080"
    />

    <!-- Ticks -->
    <vgg-section
      v-if="domain !== undefined"
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :domains="{
        y: domain
      }"
    >

      <vgg-map :data="tickData">

        <!-- Tick lines -->
        <vgg-line
          :x1="0.5"
          :y1="tick => tick.value"
          :x2="0.35"
          :y2="tick => tick.value"
          :width="0.5"
          color="#808080"
        />

        <!-- Tick labels -->
        <vgg-label
          v-if="!rotateLabel"
          :x="0.55"
          :y="tick => tick.value"
          :text="tick => tick.label"
          :font-size="10"
          anchor-point="l"
        />

        <vgg-label
          v-if="rotateLabel"
          :x="0.55"
          :y="tick => tick.value"
          :text="tick => tick.label"
          :font-size="10"
          :rotation="30"
          anchor-point="l"
        />

      </vgg-map>

    </vgg-section>

  </vgg-section>
</template>

<script>
import BaseAxis from '@/mixins/BaseAxis.js'

export default {
  mixins: [BaseAxis]
}
</script>
