<template>
  <div>

    <vgg-graphic
      :width="700"
      :height="600"
      :data="xy">

      <vgg-plot-title text="Scatterplot" />

      <vgg-section
        :x1="x1"
        :x2="x2"
        :y1="y1"
        :y2="y2"
      >

        <vgg-map v-slot="{ row }">

          <vgg-symbol
            :x="{ val: row.explanatory, scale: 'explanatory' }"
            :y="{ val: row.dependent, scale: 'dependent' }"
            :size="{ val: row.dependent, scale: 'dependent' }"
            :stroke="{ val: row.explanatory, scale: { type: 'viridis', domain: 'explanatory' } }"
            :stroke-width="2"
            shape="triangle-left"
            fill="none"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="[0, 150]"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'dependent'"
          :hjust="-.05"
          :tickExtraLabel="false"
          flip
        />

      </vgg-section>

      <vgg-x-grid
        :x1="x1"
        :x2="x2"
        :y1="y1"
        :y2="y2"
        :scale="[0, 150]"
      />

      <vgg-y-grid
        :x1="x1"
        :x2="x2"
        :y1="y1"
        :y2="y2"
        :scale="'dependent'"
      />
      <!-- work on padding between symbols -->
      <vgg-symbol-legend
        :scale="{ domain: 'dependent'}"
        :fontSize="10"
        :tickCount="15"
        shape="triangle-down"
        stroke="green"
        :size="{ domain: 'dependent'}"
        position="tl"
      />

      <vgg-symbol-legend
        :scale="{ domain: 'explanatory', domainMax: 100}"
        :fontSize="10"
        :tickCount="6"
        shape="triangle-down"
        :stroke="{ type: 'viridis'}"
        :size=10
        position="bl"
        title=""
        direction="horizontal"
      />
    </vgg-graphic>

    <div style="margin-top: 10px;">
      <button @click="generateNewData()">Generate new data</button>
    </div>

  </div>
</template>

<script>
import { xy } from './dummyData.js'
export default {
  name: 'Scatterplot',
  data () {
    return {
      x1: 200,
      x2: 600,
      y1: 100,
      y2: 500,
      xy: xy('explanatory', 'dependent')
    }
  },
  methods: {
    generateNewData () {
      let newData = xy('explanatory', 'dependent')
      this.xy = newData
    }
  }
}
</script>
