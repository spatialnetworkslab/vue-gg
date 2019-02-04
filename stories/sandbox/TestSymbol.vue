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

        <vgg-map>

          <vgg-symbol
            :x="{ get: 'explanatory', scale: 'explanatory' }"
            :y="{ get: 'dependent', scale: 'dependent' }"
            :size="{ get: 'dependent', scale: 'dependent' }"
            :stroke="{ get: 'explanatory', scale: { type: 'viridis', domain: 'explanatory' } }"
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
          flip
        />

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
    }
  }
}
</script>
