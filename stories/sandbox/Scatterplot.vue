<template>
  <div>

    <vgg-graphic
      :width="600"
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

          <vgg-point
            :x="{ val: row.explanatory, scale: 'explanatory' }"
            :y="{ val: row.dependent, scale: 'dependent' }"
            :radius="{ val: row.dependent, scale: { domain: 'dependent' } }"
            :fill="{ val: row.explanatory, scale: { type: 'viridis', domain: 'explanatory' } }"
            @click="log(row)"
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
