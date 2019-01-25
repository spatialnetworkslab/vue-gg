<template>
  <vgg-section
    class="y-axis"
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
      class="y-axis-line"
      v-if="domain"
      :x1="0.5"
      :y1="0"
      :x2="0.5"
      :y2="1"
      :stroke="domainColor"
      :strokeOpacity="domainOpacity"
      :stroke-width="domainWidth"
    />

    <!-- Ticks -->
    <vgg-section
      v-if="scale !== undefined"
      class="y-axis-ticks"
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :scales="{
        y: scale
      }"
    >

      <vgg-data :data="tickData">

        <vgg-map>

          <!-- Tick lines -->
          <vgg-line
            v-if="ticks"
            :x1="0.5"
            :y1="tick => tick.value"
            :x2="flip ? 0.65 : 0.35"
            :y2="tick => tick.value"
            :stroke="tickColor"
            :stroke-opacity="tickOpacity"
            :stroke-width="tickWidth"
          />

          <!-- Tick labels -->
          <vgg-label
            v-if="(!labelRotate) && labels"
            :x="flip ? 0.45 : 0.59"
            :y="tick => tick.value"
            :text="tick => tick.label"
            :font-family="labelFont"
            :font-size="labelFontSize"
            :font-weight="labelFontWeight"
            :anchor-point="flip ? 'r' : 'l'"
            :fill="labelColor"
            :opacity="labelOpacity"
          />

          <vgg-label
            v-if="labelRotate && labels"
            :x="flip ? 0.41 : 0.59"
            :y="tick => tick.value"
            :text="tick => tick.label"
            :font-family="labelFont"
            :font-size="labelFontSize"
            :font-weight="labelFontWeight"
            :rotation="flip ? -30 : 30"
            :anchor-point="flip ? 'r' : 'l'"
            :fill="labelColor"
            :opacity="labelOpacity"
          />

        </vgg-map>

      </vgg-data>

    </vgg-section>

  </vgg-section>
</template>

<script>
import BaseAxis from '../../mixins/Guides/BaseAxis.js'

export default {
  mixins: [BaseAxis]
}
</script>
