<template>
  <div>
    <vgg-graphic
      :width="250"
      :height="200"
      :data="data"
    >
      <vgg-discrete-legend
        :classification="{ column: 'b', binning: { method: 'Jenks', numClasses: 5 } }"
        :fill="{type:'reds'}"
        :position="'center'"
        :h="50"
        :w='200'
        orientation="horizontal"
      />

      <vgg-gradient-legend
        :classification="{ column: 'b', binning: { method: 'Jenks', numClasses: 5 } }"
        :fill="{type:'reds'}"
        :position="'tc'"
        :h="50"
        :w='200'
        orientation="horizontal"
      />

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
