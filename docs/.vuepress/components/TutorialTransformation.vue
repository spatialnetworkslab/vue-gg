<template>
  <vgg-graphic
    :width="700"
    :height="400"
    :data="fruits_data"
  >

    <vgg-plot-title text="Distribution of Fruit Sizes" :vjust="0.95" />

    <vgg-scales :scales="{ diameterScale: 'diameter' }" />
    <vgg-scales :scales="{ colorScale: { ranges: ['#ffc300', '#ff9d26', '#c70039', '#900c3f', '#581845'], domain: 'fruit' } }" />

    <vgg-data
      :transform="[
        { groupBy: 'fruit' },
        { summarise: { meanDiameter: { diameter: 'mean' },
                       q1Diameter: { diameter: getQ1 },
                       q3Diameter: { diameter: getQ3 },
                       minDiameter: {diameter: 'min' },
                       maxDiameter: {diameter: 'max' } } }
      ]"
    >

      <vgg-section
        :x1="50"
        :x2="650"
        :y1="50"
        :y2="350"
      >

        <vgg-map v-slot="{ row }">

          <vgg-line
            :x1="{ val: row.fruit, scale: 'fruit' }"
            :x2="{ val: row.fruit, scale: 'fruit' }"
            :y1="{ val: row.minDiameter, scale: '#diameterScale' }"
            :y2="{ val: row.maxDiameter, scale: '#diameterScale' }"
            :stroke-width="1"
          />

          <vgg-rectangle
            :x="{ val: row.fruit, scale: 'fruit' }"
            :w="50"
            :y1="{ val: row.meanDiameter, scale: '#diameterScale' }"
            :y2="{ val: row.q3Diameter, scale: '#diameterScale' }"
            :fill="{ val: row.fruit, scale: '#colorScale' }"
            stroke="black"
            :stroke-width="1"
          />

          <vgg-rectangle
            :x="{ val: row.fruit, scale: 'fruit' }"
            :w="50"
            :y1="{ val: row.q1Diameter, scale: '#diameterScale' }"
            :y2="{ val: row.meanDiameter, scale: '#diameterScale' }"
            :fill="{ val: row.fruit, scale: '#colorScale' }"
            stroke="black"
            :stroke-width="1"
            :opacity="{ val: row.meanDiameter, scale: 'meanDiameter' }"
          />

        </vgg-map>

        <vgg-x-axis
          scale="fruit"
        />

        <vgg-y-axis
          scale="#diameterScale"
          title="diameter/cm"
          :tickCount="4"
          title-hjust="center"
          :title-vjust="1.07"
        />

      </vgg-section>
    </vgg-data>

  </vgg-graphic>
</template>

<script>
import * as d3 from 'd3-array'

export default {

  computed: {
    fruits_data () {
      let result = [{ fruit: 'lime', diameter: 4.7},
                    { fruit: 'lemon', diameter: 6.1},
                    { fruit: 'grapefruit', diameter: 7.9},
                    { fruit: 'lemon', diameter: 6.6},
                    { fruit: 'orange', diameter: 6.7},
                    { fruit: 'lemon', diameter: 5.3},
                    { fruit: 'pomelo', diameter: 11.6},
                    { fruit: 'grapefruit', diameter: 11.1},
                    { fruit: 'lime', diameter: 5.5},
                    { fruit: 'pomelo', diameter: 10.6},
                    { fruit: 'lemon', diameter: 6.4},
                    { fruit: 'lime', diameter: 4.9},
                    { fruit: 'grapefruit', diameter: 8.8},
                    { fruit: 'pomelo', diameter: 12.5},
                    { fruit: 'grapefruit', diameter: 12.7},
                    { fruit: 'grapefruit', diameter: 8.6},
                    { fruit: 'pomelo', diameter: 13.1},
                    { fruit: 'lime', diameter: 5.8},
                    { fruit: 'orange', diameter: 8.9},
                    { fruit: 'grapefruit', diameter: 9.1},
                    { fruit: 'pomelo', diameter: 10.3},
                    { fruit: 'grapefruit', diameter: 9.4},]
      return result
    }
  },

  methods: {
    getQ1 (values) {
      let sorted = values.sort((a, b) => a - b)
      return d3.quantile(sorted, 0.25)
    },

    getQ3 (values) {
      let sorted = values.sort((a, b) => a - b)
      return d3.quantile(sorted, 0.75)
    },
  }
}
</script>
