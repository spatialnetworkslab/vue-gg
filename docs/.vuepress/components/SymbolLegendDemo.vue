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
          :fill="{ val: row.b, scale: { type: 'plasma', domain: 'b' } }"
        />

      </vgg-map>

    </vgg-section>

    <vgg-symbol-legend
      :scale="{ domain: 'a'}"
      :tickCount=10
      :stroke="'none'"
      :size="{ domain: 'a', range: [1, 20]}"
      :fill="{ type: 'plasma'}"
      title="Size + Color"
      title-font-weight="bold"
      :title-font-size=12
      :title-padding="10"
      :height="120"
      :width="200"
      :columns=5
      position="tl"
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
