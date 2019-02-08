<template>
  <vgg-graphic
    :width="500"
    :height="500"
    :data="data"
  >

    <vgg-scales
      :scales="{
        xScale: { domain: 'xValues' },
        yScale: { domain: 'yValues' },
        catColor: { domain: 'cats', range: ['red', 'green', 'blue'] }
      }"
    />

    <vgg-data :transform="{ groupBy: ['cats', 'dogs', 'mice'] }">

      <vgg-layout
        :type="'facet'"
        :options="{
          /* x: ['cats', 'dogs'],
          y: 'mice' */
          cols: 3
        }"
      >

        <vgg-section slot-scope="{ x }">

          <vgg-map>

            <vgg-point
              :x="{ get: 'xValues', scale: '#xScale' }"
              :y="{ get: 'yValues', scale: '#yScale' }"
              :fill="{ get: () => x, scale: '#catColor' }"
            />

          </vgg-map>

        </vgg-section>

      </vgg-layout>

    </vgg-data>

  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    data () {
      let cats = ['a', 'b', 'c']
      let data = { cats: [], xValues: [], yValues: [] }
      for (let i = 0; i < 30; i++) {
        let colorIndex = Math.floor(Math.random() * 3)
        let cat = cats[colorIndex]

        data.cats.push(cat)
        data.xValues.push(Math.random() * 10)
        data.yValues.push(Math.random() * 100)
      }

      return data
    }
  }
}
</script>
