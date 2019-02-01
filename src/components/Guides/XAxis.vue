<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scale-x="[0, 1]"
    :scale-y="[0, 1]"
    class="x-axis"
  >

    <!-- Main line -->
    <vgg-line
      :x1="0"
      :y1="0.5"
      :x2="1"
      :y2="0.5"
      :stroke-width="1"
      class="x-axis-line"
    />

    <!-- Ticks -->
    <vgg-section
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :scale-x="scale"
      class="x-axis-ticks"
    >

      <vgg-data
        :data="tickData"
        class="x-axis-data"
      >

        <vgg-map>

          <!-- Tick lines -->
          <vgg-line
            :x1="{ get: tick => tick.value }"
            :y1="0.5"
            :x2="{ get: tick => tick.value }"
            :y2="flip ? 0.35 : 0.65"
            :stroke-width="0.5"
          />

          <!-- Tick labels -->
          <vgg-label
            v-if="!rotateLabel"
            :x="{ get: tick => tick.value }"
            :y="flip ? 0.59 : 0.45"
            :text="{ get: tick => tick.label }"
            :font-size="10"
            :anchor-point="flip ? 'b' : 't'"
          />

          <vgg-label
            v-if="rotateLabel"
            :x="{ get: tick => tick.value }"
            :y="flip ? 0.59 : 0.45"
            :text="{ get: tick => tick.label }"
            :font-size="10"
            :rotation="flip ? 30 : -30"
            :anchor-point="flip ? 'rb' : 'rt'"
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
