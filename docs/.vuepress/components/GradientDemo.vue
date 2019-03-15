<template>
  <div>

    <vgg-graphic
      :width="500"
      :height="500"
      :data="data"
    >
      <vgg-data
        :transform="[
          { rename: { a: 'apple', b: 'banana', d: 'durian' } },
          { binning: { groupBy: 'apple', method: 'EqualInterval', numClasses: 5 } },
          { summarise: { binCount: { apple: 'count' } } }
        ]"
      >

        <vgg-section
          :x1="0"
          :x2="400"
          :y1="0"
          :y2="400"
          :scale-x="'bins'"
          :scale-y="{ domain: 'binCount', domainMin: 0 }"
        >

          <vgg-map v-slot="{ row }">

            <vgg-rectangle
              :x1="{ val: row.bins[0] }"
              :x2="{ val: row.bins[1] }"
              :y1="0"
              :y2="{ val: row.binCount }"
              :fill="{ val: row.bins[1], scale: { type: 'blues', domain: 'bins', domainMin: 0 } }"
            />

          </vgg-map>

        </vgg-section>

        <vgg-gradient-legend
          :scale="{ domain: 'bins', domainMin: 10 }"
          :fontSize="10"
          :titleFontSize="16"
          :tickCount="10"
          flipNumbers
          title="Legend title"
          position="tr"
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
