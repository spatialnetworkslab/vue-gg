<template>
  <vgg-section
    :x1="ranges.x1"
    :x2="ranges.x2"
    :y1="ranges.y1"
    :y2="ranges.y2"
    :scale-x="[0, 1]"
    :scale-y="[0, 1]"
    class="y-axis"
  >

    <!-- Main line -->
    <vgg-line
      :x1="0.5"
      :y1="0"
      :x2="0.5"
      :y2="1"
      :stroke-width="1"
      class="y-axis-line"
    />

    <!-- Ticks -->
    <vgg-section
      v-if="scale !== undefined"
      :x1="0"
      :x2="1"
      :y1="0"
      :y2="1"
      :scale-y="scale"
      class="y-axis-ticks"
    >

      <vgg-data
        :data="tickData"
        class="y-axis-data"
      >

        <vgg-map v-slot="{ row }">

          <!-- Tick lines -->
          <vgg-line
            :x1="0.5"
            :y1="row.value"
            :x2="flip ? 0.65 : 0.35"
            :y2="row.value"
            :stroke-width="0.5"
          />

          <!-- Tick labels -->
          <vgg-label
            v-if="!rotateLabel"
            :x="flip ? 0.45 : 0.59"
            :y="row.value"
            :text="row.label"
            :font-size="10"
            :anchor-point="flip ? 'r' : 'l'"
          />

          <vgg-label
            v-if="rotateLabel"
            :x="flip ? 0.41 : 0.59"
            :y="row.value"
            :text="row.label"
            :font-size="10"
            :rotation="flip ? -30 : 30"
            :anchor-point="flip ? 'r' : 'l'"
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
