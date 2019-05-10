<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
    :transform="{
      scale: {
        scaledA: { prop: 'y', column: 'a', scale: { domain: 'a', range: [0, 10] } },
        scaledB: { prop: 'y', column: 'b', scale: { domain: 'b', range: [0, 10] } },
        scaledC: { prop: 'y', column: 'c', scale: { domain: 'c', range: [0, 10] } },
        scaledD: { prop: 'y', column: 'd', scale: { domain: 'd', range: [0, 10] } },
      }
    }"
  >

    <vgg-section
      :x1="50"
      :x2="550"
      :y1="50"
      :y2="550"
      :scale-x="['a', 'b', 'c', 'd']"
      :scale-y="[0, 10]"
    >

      <vgg-map v-slot="{ row }">

        <vgg-multi-line
          :x="['a', 'b', 'c', 'd']"
          :y="[row.scaledA, row.scaledB, row.scaledC, row.scaledD]"
          :stroke="randomColor()"
        />

      </vgg-map>

      <vgg-y-axis
        v-for="(v, i) in ['a', 'b', 'c', 'd']"
        :key="i"
        :x="v"
        :w="20"
        :y1="0"
        :y2="10"
        :scale="v"
      />

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      data: {
        a: this.generate(100),
        b: this.generate(50),
        c: this.generate(20),
        d: this.generate(70)
      }
    }
  },

  methods: {
    generate (spread, str) {
      const N = 8
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
    },

    randomColor () {
      let r = Math.floor(Math.random() * 255)
      let g = Math.floor(Math.random() * 255)
      let b = Math.floor(Math.random() * 255)
      let a = Math.floor(Math.random() * 50 + 50) / 100

      return `rgba(${r}, ${g}, ${b}, ${a})`
    }
  }
}
</script>
