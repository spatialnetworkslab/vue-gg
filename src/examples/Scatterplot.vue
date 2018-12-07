<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      :data="xy"
      class="graphic">

      <!-- Identity mapping, and setting coordinate domains from data -->
      <!-- <vgg-coordinate-transformation
        :x="100"
        :x2="700"
        :y="100"
        :y2="700"
        :domains="{
          x: ({ domains }) => domains.explanatory,
          y: ({ domains }) => domains.dependent
        }"
      >

        <vgg-map
          :mapping="{
            x: 'explanatory',
            y: 'dependent',
            radius: () => Math.random() * 10
          }"
        >
          <vgg-point />
        </vgg-map>

      </vgg-coordinate-transformation> -->

      <!-- Shorthand mapping -->
      <vgg-coordinate-transformation
        :x="100"
        :x2="700"
        :y="100"
        :y2="700"
      >

        <vgg-map
          :mapping="{
            x: {
              type: 'scale',
              variable: 'explanatory',
              scale: 'linear',
            },
            y: {
              type: 'scale',
              variable: 'dependent',
              scale: 'linear'
            },
            radius: () => Math.random() * 10
          }"
        >
          <vgg-point />
        </vgg-map>

      </vgg-coordinate-transformation>

      <!-- Custom mapping -->
      <!-- <vgg-coordinate-transformation
        :x="100"
        :x2="700"
        :y="100"
        :y2="700">

        <vgg-map :mapping="mapping">
          <vgg-point />
        </vgg-map>

      </vgg-coordinate-transformation> -->

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

  // computed: {
  //   mapping () {
  //     return {
  //       x: {
  //         type: 'custom',
  //         variable: 'explanatory',
  //         construct: ({ domains, ranges }) => {
  //           return d3.scaleLinear().domain(domains['explanatory']).range(ranges.x)
  //         }
  //       },
  //       y: {
  //         type: 'custom',
  //         variable: 'dependent',
  //         construct: ({ domains, ranges }) => {
  //           return d3.scaleLinear().domain(domains['dependent']).range(ranges.y)
  //         }
  //       },
  //       radius: () => Math.random() * 10
  //     }
  //   }
  // },

  methods: {
    generateNewData () {
      let newData = xy('explanatory', 'dependent')
      this.xy = newData
    }
  }
}
</script>
