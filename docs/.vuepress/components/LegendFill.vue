<template>
  <div>
    <vgg-graphic
      :width="350"
      :height="260"
      :data="data"
    >
      <vgg-data
        :transform="[
          { rename: { a: 'apple', b: 'banana', d: 'durian' } },
          { binning: { groupBy: 'apple', method: selected, numClasses: 5 } },
          { summarise: { binCount: { apple: 'count' } } }
        ]"
      >

        <vgg-section
        :x1="100"
        :x2="300"
        :y1="0"
        :y2="200"
          :scale-x="'bins'"
          :scale-y="{ domain: 'binCount', domainMin: 0 }"
        >

          <vgg-map v-slot="{ row }">

            <vgg-rectangle
              :x1="{ val: row.bins[0] }"
              :x2="{ val: row.bins[1] }"
              :y1="0"
              :y2="{ val: row.binCount }"
              :fill="{ val: row.bins, scale: { type: 'viridis', domain: 'bins' } }"
            />

          </vgg-map>

        </vgg-section>

        <vgg-gradient-legend
          :scale="'bins'"
          :fill="{ type: 'viridis' }"
          :h="100"
          position="tl"
        />

        <vgg-discrete-legend
          :scale="'bins'"
          :fill="{ type: 'viridis' }"
          position="bl"
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
