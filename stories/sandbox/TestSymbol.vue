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

          <vgg-symbol
            :x="{ val: row.explanatory, scale: 'explanatory' }"
            :y="{ val: row.dependent, scale: 'dependent' }"
            :size="{ val: row.dependent, scale: {domain: 'dependent', range: [5, 20]} }"
            :stroke="{ val: row.explanatory, scale: { type: 'viridis', domain: 'explanatory' } }"
            :stroke-width="2"
            :shape="shape(row.categorical)"
            fill="none"
            @click="log(row)"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'explanatory'"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'dependent'"
          :hjust="-.05"
          :tick-extra-label="false"
          flip
        />

        <vgg-x-grid
          :scale="'explanatory'"
        />

        <vgg-y-grid
          :scale="'dependent'"
        />

      </vgg-section>

    </vgg-graphic>

    <p>Shape Scheme:
      <select v-model="shapeScheme">
        <option value="shape8">default scheme (shape8)</option>
        <option value="triangles">triangles</option>
        <option value="stars">stars</option>
        <option value="polygons">polygons</option>
        <option value="custom">custom circles and squares</option>
      </select>
    </p>

  </div>
</template>

<script>
import { xy } from './dummyData.js'
export default {
  name: 'Scatterplot',
  data () {
    return {
      xy: this.generateNewData(),
      shapeScheme: 'shape8'
    }
  },

  methods: {
    log: console.log,

    generateNewData () {
      let newData = xy('explanatory', 'dependent')
      let fruits = [
        'apple',
        'banana',
        'kiwi',
        'pomelo',
        'jackfruit',
        'guava',
        'cherry',
        'dragonfruit',
        'grape',
        'durian'
      ]
      for (let i = 0; i < newData.length; i++) {
        newData[i].categorical = fruits[Math.floor(i / 10)]
        newData[i].dependent = newData[i].dependent + Math.random() * 100
      }
      return newData
    },

    shape (value) {
      if (this.shapeScheme === 'custom') {
        return { val: value, scale: { ranges: ['circle', 'square'], domain: 'categorical' } }
      }
      return { val: value, scale: { type: this.shapeScheme, domain: 'categorical' } }
    }
  }
}
</script>
