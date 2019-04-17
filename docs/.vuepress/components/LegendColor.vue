<template>
  <vgg-graphic
    :width="450"
    :height="450"
    :data="data">

    <vgg-section
      :x1="20"
      :x2="400"
      :y1="50"
      :y2="400"
      :scale-x="'a'"
      :scale-y="'b'"
    >

      <vgg-map v-slot="{ row }">

        <vgg-symbol
          :x="{ val: row.a, scale: 'a' }"
          :y="{ val: row.b, scale: 'b' }"
          :size="{ val: row.a, scale: { domain: 'a', range: [5, 12] } }"
          :fill="{ val: row.b, scale: { type: 'plasma', domain: 'b' } }"
        />

      </vgg-map>

    </vgg-section>

    <vgg-symbol-legend
      :scale="'a'"
      stroke="none"
      :size="{ range: [5, 12] }"
      :fill="{ type: 'plasma'}"
      title="Size, Color"
      :title-font-size="12"
      position="br"
      orientation="horizontal"
      :symbol-padding="0.3"
      :col-padding="0.1"
      :title-padding="20"
      :rows="2"
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
      for (let i = 0; i < 100; i++) {
        let a = Math.random() * range
        let error = Math.random() * range
        let b = beta0 + a * beta1 + error
        data.push({ a, b })
      }
      return data
    }
  }
}
</script>
