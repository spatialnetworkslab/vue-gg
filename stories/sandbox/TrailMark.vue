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
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-trail
        :points="[[0.50, 11], [1, 20], [3, 14], [7, 30], [3, 16], [9, 19]]"
        :stroke-width="[1, 5, 5, 3, 4, 2]"
        fill="orange"
        :fillOpacity="0.7"
        :sort="'x'"
      />

      <vgg-scales :scales="{ rainfallScale: 'rainfall' }" />

      <vgg-data :transform="{ groupBy: 'colors' }">

        <vgg-map v-slot="{ row }">

          <vgg-trail
            :x="row.grouped.xValues"
            :y="row.grouped.yValues"
            :stroke-width="{ val: row.grouped.rainfall, scale: '#rainfallScale'}"
            :fill="row.colors"
            :fillOpacity="0.7"
            :sort="'x'"
          />

        </vgg-map>


      </vgg-data>
    </vgg-section>
    <vgg-symbol-legend
      :scale="{ domain: 'rainfall'}"
      :fontSize="10"
      :titleFontSize="16"
      shape="line"
      :tickCount=10
      :size="15"
      :stroke-width="{ domain: 'rainfall', range: [0, 10]}"
      :x=550
      :y=200
      stroke="orange"
      :columns=2
      direction="vertical"
      title="Stroke width"
    />

    <vgg-symbol-legend
      :scale="{ domain: 'rainfall'}"
      :fontSize="10"
      :titleFontSize="16"
      shape="line"
      :tickCount=11
      :size="15"
      :x=0
      :y=520
      :stroke-width=10
      :stroke-opacity="{ domain: 'rainfall', range: [0, 0.7] }"
      title="Opacity test"
      orientation="horizontal"
    />
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
      let data = { colors: [], rainfall: [], xValues: [], yValues: [] }
      let rainfall = [7, 12, 5, 3, 5, 8, 9, 10, 2, 12, 5, 7]
      for (let i = 0; i < 30; i++) {
        let colorIndex = Math.floor(Math.random() * 3)
        let color = colors[colorIndex]
        let rain = rainfall[i%rainfall.length]
        data.colors.push(color)
        data.xValues.push(Math.random() * 10)
        data.yValues.push(Math.random() * 100)
        data.rainfall.push(rain)
      }
      return data
    }
  }
}
</script>
