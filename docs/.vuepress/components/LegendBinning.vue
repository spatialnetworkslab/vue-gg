<template>
  <div>
    <vgg-graphic
      :width="220"
      :height="220"
      :data="data"
    >

        <vgg-gradient-legend
          :scale="[[0, 10], [10, 20], [20, 40], [40, 45], [45, 60], [60, 100]]"
          :tick-values="[[0, 10], [10, 20], [20, 40], [40, 45],]"
          orientation="horizontal"
          position="tc"
          :w="180"
          :h="100"
        />
        <vgg-discrete-legend
          :scale="[[0, 10], [10, 20], [20, 40], [40, 60], [60, 70], [70, 85], [85, 100]]"
          :tick-values="[[40, 60], [60, 70], [70, 85]]"
          orientation="horizontal"
          position="bc"
          :w="180"
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
