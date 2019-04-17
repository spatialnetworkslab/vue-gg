<template>
  <div>

    <vgg-graphic
      :width="sectionWidth"
      :height="sectionHeight"
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
            :size="{ val: row.dependent, scale: {domain: 'dependent', range:[0,10]} }"
            :stroke="color(row.categorical)"
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
        />

        <vgg-x-grid
          :scale="'explanatory'"
        />

        <vgg-x-grid
          :x1="100"
          :x2="500"
          :y1="100"
          :y2="500"
          :scale="[0, 150]"
        />

        <vgg-y-grid
          :scale="'dependent'"
        />

      </vgg-section>
      <vgg-symbol-legend
        :scale="{ domain: 'categorical'}"
        :title-font-size="20"
        :x="sectionWidth * 0.6"
        :y="sectionHeight * 0.5"
        :label-padding="-0.2"
        :stroke="colorLegend(colorScheme)"
        :shape="shapeLegend(shapeScheme)"
        fill="none"
        title="Fruits"
      />
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

    <p>Color Scheme:
      <select v-model="colorScheme">
        <option value="category10">default scheme (category10)</option>
        <option value="accent">accent</option>
        <option value="dark2">dark 2</option>
        <option value="paired">paired</option>
        <option value="pastel1">pastel 1</option>
        <option value="pastel2">pastel 2</option>
        <option value="set1">set 1</option>
        <option value="set2">set 2</option>
        <option value="set3">set 3</option>
        <option value="custom">custom (ggplot2 default)</option>
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
      shapeScheme: 'shape8',
      colorScheme: 'category10',
      sectionWidth: 900,
      sectionHeight: 600
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
        newData[i].categorical = fruits[Math.floor(i / 12)]
        newData[i].dependent = newData[i].dependent + Math.abs(Math.random() * 100)
      }
      return newData
    },
    color (value) {
      if (this.colorScheme === 'custom') {
        return { val: value, scale: { ranges: ['#F8766D', '#7CAE00', '#00BFC4', '#C77CFF', 'orange'], domain: 'categorical' } }
      }
      return { val: value, scale: { type: this.colorScheme, domain: 'categorical' } }
    },
    shape (value) {
      if (this.shapeScheme === 'custom') {
        return { val: value, scale: { ranges: ['circle', 'square'], domain: 'categorical' } }
      }
      return { val: value, scale: { type: this.shapeScheme, domain: 'categorical' } }
    },

    colorLegend (colorScheme) {
      if (this.colorScheme === 'custom') {
        return { ranges: ['#F8766D', '#7CAE00', '#00BFC4', '#C77CFF', 'orange'] }
      }
      return { type: colorScheme }
    },

    shapeLegend () {
      if (this.shapeScheme === 'custom') {
        return { ranges: ['circle', 'square'] }
      }
      return { type: this.shapeScheme }
    }
  }
}
</script>
