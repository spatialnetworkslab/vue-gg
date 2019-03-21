<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data">

    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
      :scale-x="'a'"
      :scale-y="'b'"
    >

      <vgg-map v-slot="{ row }">

        <vgg-symbol
          :x="{ val: row.a, scale: 'a' }"
          :y="{ val: row.b, scale: 'b' }"
          :size="{ val: row.a, scale: { domain: 'a', range: [1, 20] } }"
          :fill="{ val: row.categorical, scale: { type: 'paired', domain: 'categorical' } }"
          :shape="{ val: row.categorical, scale: { type: 'stars', domain: 'categorical' } }"
        />

      </vgg-map>

    </vgg-section>

    <vgg-symbol-legend
      :scale="{ domain: 'categorical' }"
      :size="{ range: [1, 20] }"
      :fill="{ type: 'paired'}"
      :shape="{ type: "stars"}"
      title="Shape, Size, Fill"
      title-font-weight="bold"
      :title-font-size=12
      :title-padding="10"
      position="tl"
      :rows="2"
      :symbol-padding="0.2"
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
        let categorical = fruits[Math.floor(i / 12)]
        data.push({ a, b, categorical })
      }

      return data
    }
  }
}
</script>
