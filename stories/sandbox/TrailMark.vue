<template>
  <vgg-graphic
    :width="900"
    :height="600"
    :data="data">

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scales="{
        x: 'xValues',
        y: 'yValues'
      }"
    >

      <vgg-transform :trans="{ groupBy: 'colors' }">

        <vgg-map>

          <vgg-trail
            :x="row => row.grouped.xValues"
            :y="row => row.grouped.yValues"
            :stroke="row => row.grouped.colors"
            :stroke-width="row => row.grouped.rainfall"
            :stroke-opacity="row => row.grouped.opacity"
            :sort="'x'"
          />

        </vgg-map>

      </vgg-transform>

    </vgg-section>
    <vgg-x-grid
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale="'xValues'"
    />

    <vgg-y-grid
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale="'yValues'"
    />

    <vgg-x-axis
      :x1="100"
      :x2="500"
      :y1="50"
      :y2="100"
      :scale="'xValues'"
    />

    <vgg-y-axis
      :x1="50"
      :x2="100"
      :y1="100"
      :y2="500"
      :scale="'yValues'"
      flip
    />
  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    data () {
      let colors = ['red', 'blue', 'green']
      let opacity =[0.1, 0.2, 1]
      let data = { colors: [], opacity: [], rainfall: [], xValues: [], yValues: [] }
      let rainfall = [7, 15, 5, 3, 1, 2, 2, 10, 2, 20, 5, 7]
      for (let i = 0; i < 30; i++) {
        let colorIndex = Math.floor(Math.random() * 3)
        let color = colors[colorIndex]
        let alpha = opacity[colorIndex]
        let rain = rainfall[i%rainfall.length]
        data.colors.push(color)
        data.xValues.push(Math.random() * 10)
        data.yValues.push(Math.random() * 100)
        data.opacity.push(alpha)
        data.rainfall.push(rain)
      }
      return data
    }
  }
}
</script>
