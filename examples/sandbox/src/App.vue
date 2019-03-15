<template>
  <div id="app">

    <vgg-graphic
    :width="600"
    :height="600"
    :data="data">

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :scale-x="'a'"
        :scale-y="'b'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.a"
            :y="row.b"
            :radius="3"
            :fill="{ val: row.a, scale: { type: 'viridis', domain: 'a' } }"
          />

        </vgg-map>

        <vgg-x-axis
          :vjust="0"
          :scale="'a'"
          title="henk"
        />

        <vgg-y-axis
          :hjust="'r'"
          :scale="'b'"
          title="piet"
        />

        <vgg-x-grid :scale="'a'" />
        <vgg-y-grid :scale="'b'" />

      </vgg-section>

      <!-- <vgg-x-grid
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :scale="'a'"
      />

      <vgg-y-grid
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :scale="'b'"
      /> -->

      <!-- <vgg-x-axis
        :x1="100"
        :x2="500"
        :y1="50"
        :y2="100"
        :scale="'a'"
      /> -->

      <!-- <vgg-y-axis
        :x1="50"
        :x2="100"
        :y1="100"
        :y2="500"
        :scale="'b'"
        flip
      /> -->

    </vgg-graphic>

  </div>
</template>

<script>
export default {
  name: 'app',

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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
