<template>
  <vgg-graphic
    :width="800"
    :height="850"
    :data="resaleData"
  >
    <!-- bar chart per flat type -->

    <vgg-section
      :x1="0"
      :x2="500"
      :y1="0"
      :y2="500"
      :transform="[
        { mutate: { price_per_sqm: (row) => row.resale_price / row.floor_area_sqm } },
        { groupBy: ['month', 'flat_type'] },
        { arrange: { month: 'ascending' } },
        { summarise: { mean_price: { price_per_sqm: 'mean' } } },
        { mutate: { month_date: (row) => new Date(row.month) } }
      ]"
    >

      <vgg-scales :scales="{ date: { domain: 'month_date' } }"/>
      <vgg-scales :scales="{ price: { domain: 'mean_price' } }"/>
      <vgg-scales :scales="{ flatTypeColorScale: { domain: 'flat_type' } }"/>

      <vgg-data
        :transform="{ groupBy: 'flat_type' }"
      >

        <vgg-map v-slot="{ row }">

          <vgg-multi-line
            :x="{ val: row.grouped.month_date, scale: '#date' }"
            :y="{ val: row.grouped.mean_price, scale: '#price' }"
            :stroke="{ val: row.grouped.flat_type, scale: '#flatTypeColorScale' }"
          />

        </vgg-map>

      </vgg-data>

      <vgg-x-axis :scale="'#date'" :tick-count="4" :tick-extra="false"/>
      <vgg-y-axis :scale="'#price'" :hjust="0" :tick-count="8"/>

    </vgg-section>

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
