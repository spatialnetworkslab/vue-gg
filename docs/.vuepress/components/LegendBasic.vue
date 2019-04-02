<template>
  <div>
    <vgg-graphic
      :width="250"
      :height="200"
      :data="data"
    >
      <vgg-data
        :transform="[
          { rename: { a: 'apple', b: 'banana', d: 'durian' } },
          { binning: { groupBy: 'apple', method: selected, numClasses: 5 } },
          { summarise: { binCount: { apple: 'count' } } }
        ]"
      >

        <vgg-discrete-legend
          :scale="'bins'"
          :h="100"
        />

        <vgg-gradient-legend
          :scale="'bins'"
          position="center"
          :h="100"
        />

        <vgg-symbol-legend
          :scale="'bins'"
          :fill="'bins'"
          stroke='none'
          position="right"
          :h="100"
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
