<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
  >

    <!-- <vgg-transform
      :trans="[
        { rename: { a: 'apple', b: 'banana', d: 'durian' } },
        { select: ['apple', 'banana', 'durian'] },
        { filter: ({ durian }) => durian > 25 },
        { arrange: [{ banana: 'ascending' }, { apple: 'descending' }] },
        { mutate: { ratioAppleDurian: ({ apple, durian }) => apple / durian } },
        { groupBy: 'banana' },
        { mutarize: { appleSum: { apple: 'sum' }, maxRatio: { ratioAppleDurian: 'max' } } }
      ]"
    > -->

    <vgg-transform
      :trans="[
        { rename: { a: 'apple', b: 'banana', d: 'durian' } },
        { binning: { apple: { binCount: 5 } } },
      ]"
    >

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :scales="{
          x: [0, 100],
          y: [0, 100]
        }"
      >

        <vgg-map>

          <vgg-rectangle
            :x1="{ scale: { variable: 'min', domain: [0, 100] } }"
            :x2="{ scale: { variable: 'max', domain: [0, 100] } }"
            :y1="0"
            :y2="{ scale: { variable: 'n', domain: [0, null]} }"
          />

        </vgg-map>

      </vgg-section>

    </vgg-transform>

  </vgg-graphic>
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
      }
    }
  },

  methods: {
    generate (spread, str) {
      const N = 100
      let col = new Array(N)
      for (let i = 0; i < N; i++) {
        let randInt = Math.floor(Math.random() * spread)
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
