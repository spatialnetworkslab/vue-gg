<template>
  <div>
    <select v-model="selected">
      <option value="">Equal Interval</option>
      <option value="ArithmeticProgression">Arithmetic Progression</option>
      <option value="GeometricProgression">Geometric Progression</option>
      <option value="Quantile">Quantile</option>
      <option value="Jenks">Jenks</option>
    </select>

    <br>

    <vgg-graphic
      :width="650"
      :height="650"
      :data="data"
    >
      <vgg-plot-title :text="title" />

      <vgg-section
        :x1="50"
        :x2="600"
        :y1="50"
        :y2="600"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="{ val: row.a, scale: 'a' }"
            :y="{ val: row.b, scale: 'b' }"
            :fill="{ val: row.b, classification: { column: 'b', binning: { method: selected, numClasses: 5 } } }"
          />
        </vgg-map>
        <vgg-discrete-legend
          :classification="{ column: 'b', binning: { method: selected, numClasses: 5 } }"
          :fill="{type:'blues'}"
          :y="50"
          orientation="horizontal"
        />

        <vgg-gradient-legend
          :classification="{ column: 'b', binning: { method: selected, numClasses: 5 } }"
          :fill-opacity="{ range: [0.001, 1]}"
          :fill="'blue'"
          :y="50"
          :x="500"
          orientation="horizontal"
        />
      </vgg-section>


    </vgg-graphic>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        a: this.generate(100),
        b: this.generate(100)
      },
      selected: ''
    }
  },
  computed: {
    title () {
      if (this.selected === 'EqualInterval') {
        return 'Equal Interval Classification'
      } else if (this.selected === 'ArithmeticProgression') {
        return 'Arithmetic Progression Classification'
      } else if (this.selected === 'GeometricProgression') {
        return 'Geometric Progression Classification'
      } else {
        return this.selected + ' Classification'
      }
    }
  },
  methods: {
    generate (spread, str) {
      const N = 100
      let col = new Array(N)
      for (let i = 0; i < N; i++) {
        let randInt = Math.floor(Math.random() * spread)
        if (randInt === 0) { randInt = 1 }
        if (!str) { col[i] = randInt }
        if (str) {
          let alphabet = 'abcdefghijklmnopqrstuvwxyz'
          col[i] = alphabet[randInt]
        }
      }
      return col
    }
  }
}
</script>
