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
        :scale-x="[0, 10]"
        :scale-y="[0, 10]"
      >

        <vgg-trail
          :points="[[0, 1], [1, 2], [3, 4], [7, 9], [3, 6], [9, 9]]"
        />

      </vgg-section>

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
