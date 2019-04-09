<template>
  <vgg-graphic
    :width="400"
    :height="500"
    :data="data">

    <vgg-section
      :x1="50"
      :x2="300"
      :y1="70"
      :y2="400"
      :scale-x="'a'"
      :scale-y="'b'"
    >

      <vgg-map v-slot="{ row }">

        <vgg-symbol
          :x="{ val: row.a, scale: 'a' }"
          :y="{ val: row.b, scale: 'b' }"
          :size="{ val: row.a, scale: { domain: 'a', range: [10, 15] } }"
          :fill="{ val: row.category, scale: { type: 'paired', domain: 'category' } }"
          :shape="{ val: row.category, scale: {type: 'stars', domain: 'category'}}"
        />

      </vgg-map>

    </vgg-section>

    <vgg-symbol-legend
      :scale="'category'"
      :size="16"
      :fill="{ type: 'paired'}"
      :shape="{ type: 'stars'}"
      stroke="none"
      :w="350"
      title="Fill, Shape"
      :title-font-size=12
      :title-padding="10"
      position="tl"
      orientation="horizontal"
    />

    <vgg-symbol-legend
      :scale="'a'"
      :size="{ range: [10, 15] }"
      title="Size"
      :title-font-size=12
      :title-padding="10"
      :w="350"
      :tick-count="5"
      position="bl"
      orientation="horizontal"
    />

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      data: this.generateData()
    }
  },
  methods: {
    generateData () {
      let data = []
      let beta0 = Math.random() * 100
      let beta1 = 0.25 + Math.random() * 2
      let range = Math.random() * 1000
      let fruits = [
        'apple',
        'banana',
        'kiwi',
        'pomelo',
        'jackfruit',
        'guava',
        'cherry',
        'dragonfruit',
        'grape',
        'durian'
      ]

      for (let i = 0; i < 100; i++) {
        let a = Math.random() * range
        let error = Math.random() * range
        let b = beta0 + a * beta1 + error
        let category = fruits[Math.floor(i / 12)]
        data.push({ a, b, category })
      }
      return data
    }
  }
}
</script>
