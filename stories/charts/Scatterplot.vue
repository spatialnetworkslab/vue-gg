<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      :data="xy"
      class="graphic">

      <!-- Identity scaling, and setting coordinate domains from data -->
      <vgg-section
        :x1="100"
        :x2="700"
        :y1="100"
        :y2="700"
        :domains="{
          x: ({ domains }) => domains.explanatory,
          y: ({ domains }) => domains.dependent
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

    </vgg-graphic>

    <div style="margin-top: 10px;">
      <button @click="generateNewData()">Generate new data</button>
    </div>

  </div>
</template>

<script>
// import * as d3 from 'd3'
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
