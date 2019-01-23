<template>
  <div>
    <select v-model="selected">
      <option value="EqualInterval">Equal Interval</option>
      <option value="ArithmeticProgression">Arithmetic Progression</option>
      <option value="GeometricProgression">Geometric Progression</option>
      <option value="Quantile">Quantile</option>
      <option value="Jenks">Jenks</option>
    </select>

    <br>

    <vgg-graphic
      :width="600"
      :height="600"
      :data="data"
    >

      <vgg-plot-title :text="title" />

      <vgg-data
        :transform="[
          { rename: { a: 'apple', b: 'banana', d: 'durian' } },
          { binning: { groupBy: 'apple', method: selected, numClasses: 5 } },
          { summarise: { binCount: { apple: 'count' } } }
        ]"
      >

        <vgg-section
          :x1="100"
          :x2="500"
          :y1="100"
          :y2="500"
          :scale-x="[0, 100]"
          :scale-y="[0, 50]"
        >

          <vgg-map>

            <vgg-rectangle
              :x1="{ get: 'lowerBound' }"
              :x2="{ get: 'upperBound' }"
              :y1="0"
              :y2="{ get: 'binCount', scale: { domain: 'binCount', domainMin: 0 } }"
              :fill="{ get: 'upperBound', scale: { type: 'blues', domain: 'upperBound', domainMin: 0 } }"
            />

          </vgg-map>

        </vgg-section>

        <vgg-x-axis
          :x1="100"
          :x2="500"
          :y1="50"
          :y2="100"
          scale="lowerBound"
          rotate-label
        />

        <vgg-y-axis
          :x1="500"
          :x2="550"
          :y1="100"
          :y2="500"
          :scale="{ variable: 'binCount', domainMin: 0 }"
        />

      </vgg-data>

    </vgg-graphic>

  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        a: this.generate(100),
        b: this.generate(10, true),
        c: this.generate(100),
        d: this.generate(100)
      },
      selected: 'EqualInterval'
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
