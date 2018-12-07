<template>
  <div>

    <vgg-graphic
      :width="800"
      :height="800"
      :data="xy"
      class="graphic">

      <vgg-map :mapping="mapping">
        <vgg-point />
      </vgg-map>

    </vgg-graphic>

    <!-- <div>

    </div> -->

  </div>
</template>

<script>
import * as d3 from 'd3'
import { xy } from './dummyData.js'

export default {
  name: 'Scatterplot',

  data () {
    return {
      xy: xy('explanatory', 'dependent')
    }
  },

  computed: {
    mapping () {
      return {
        x: {
          type: 'custom',
          variable: 'explanatory',
          construct: ({ domains, ranges }) => {
            return d3.scaleLinear().domain(domains['explanatory']).range(ranges.x)
          }
        },
        y: {
          type: 'custom',
          variable: 'dependent',
          construct: ({ domains, ranges }) => {
            return d3.scaleLinear().domain(domains['dependent']).range(ranges.y)
          }
        },
        r: () => 3
      }
    }
  }
}
</script>
