<template>
  <vgg-graphic
    :width="350"
    :height="250"
    :data="data">

    <vgg-symbol-legend
      :scale="'a'"
      stroke="none"
      :size="{ range: [1, 20] }"
      :fill="{ type: 'plasma'}"
      title="Size & Color"
      :title-font-size=12
      :title-padding="1"
      position="tl"
      :rows="3"
      :symbol-padding="0.1"
      :h="200"
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
