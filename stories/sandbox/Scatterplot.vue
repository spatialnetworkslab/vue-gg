<template>
  <div>

    <vgg-graphic
      :width="700"
      :height="600"
      :data="xy">

      <vgg-plot-title text="Scatterplot" />

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
      >

        <vgg-map v-slot="{ row }">

          <vgg-symbol
            :x="{ val: row.explanatory, scale: 'explanatory' }"
            :y="{ val: row.dependent, scale: 'dependent' }"
            :size="{ val: row.dependent, scale: { domain: 'dependent' } }"
            :fill="{ val: row.explanatory, scale: { type: 'viridis', domain: 'explanatory' } }"
            @click="log($event)"
            @mouseover="log(row)"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'explanatory'"
          :title-hjust="1.1"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'dependent'"
          :hjust="-.05"
          flip
        />

        <!-- <vgg-y-axis
          :x1="500"
          :x2="550"
          :y1="100"
          :y2="500"
          :scale="'dependent'"
        />

        <vgg-x-axis
          :x1="100"
          :x2="500"
          :y="75"
          :h="30"
          :scale="'explanatory'"
        /> -->

      </vgg-section>

      <vgg-x-grid
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :scale="'explanatory'"
      />

      <vgg-y-grid
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :scale="'dependent'"
      />

      <vgg-gradient-legend
        :scale="'dependent'"
        :font-size="10"
        :title-font-size="16"
        title-font-weight="bold"
        title="Legend"
        position="tl"
        :fill="{ type: 'viridis'}"
        :w="50"
        flip
      />

      <!-- no title -->
      <vgg-symbol-legend
        title=""
        :scale="{ domain: 'explanatory'}"
        :size="{ domain: 'explanatory'}"
        position="br"
        title="Size"
        flip-numbers
      />

      <vgg-symbol-legend
        :scale="{ domain: 'dependent'}"
        :stroke="'none'"
        :fill="{ type: 'viridis'}"
        title="Color"
        position="right"
        flip
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
      xy: xy('explanatory', 'dependent')
    }
  },
  methods: {
    generateNewData () {
      let newData = xy('explanatory', 'dependent')
      this.xy = newData
    },

    log (x) {
      console.log(x)
    }
  }
}
</script>
