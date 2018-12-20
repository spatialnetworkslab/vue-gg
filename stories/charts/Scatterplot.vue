<template>
  <div>

    <vgg-graphic
      :width="600"
      :height="600"
      :data="xy">

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :domains="{
          x: 'explanatory',
          y: 'dependent'
        }"
        :scale="{
          x: 'linear',
          y: 'linear'
        }"
      >

        <vgg-map>

          <vgg-point
            :x="row => row.explanatory"
            :y="row => row.dependent"
            :radius="3"
            :color="{ scale: { scale: 'viridis', variable: 'explanatory' } }"
          />

        </vgg-map>

      </vgg-section>

      <vgg-x-axis
        :x1="100"
        :x2="500"
        :y1="50"
        :y2="100"
        :domain="'explanatory'"
      />

      <vgg-y-axis
        :x1="500"
        :x2="550"
        :y1="100"
        :y2="500"
        :domain="'dependent'"
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
