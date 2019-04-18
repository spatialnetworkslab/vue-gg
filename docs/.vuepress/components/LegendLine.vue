<template>
  <vgg-graphic
    :width="400"
    :height="600"
    :data="data">
    <vgg-scales :scales="{ rainfallScale: 'rainfall' }" />

    <vgg-section
      :x1="0"
      :x2="350"
      :y1="150"
      :y2="500"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >
      <vgg-data :transform="{ groupBy: 'colors' }">
        <vgg-map v-slot="{ row }">
          <vgg-trail
            :x="row.grouped.xValues"
            :y="row.grouped.yValues"
            :stroke-width="{ val: row.grouped.rainfall, scale: '#rainfallScale'}"
            :fill="row.colors"
            :fill-opacity="0.7"
            :sort="'x'"
          />

        </vgg-map>
      </vgg-data>
      </vgg-data>

    </vgg-section>

    <vgg-symbol-legend
      :scale="'#rainfallScale'"
      :font-size="10"
      :size="15"
      :stroke-width="{ range: [2, 12] }"
      :stroke-opacity="{ range: [0, 0.7] }"
      shape="line"
      :x="150"
      :y="520"
      :w="250"
      title="Stroke width, opacity"
      title-font-weight="bold"
      :title-font-size="12"
      orientation="horizontal"
    />

    <vgg-symbol-legend
      :scale="'colors'"
      :font-size="10"
      :stroke-width="10"
      :stroke="{range: ['#F8766D', '#7CAE00', '#00BFC4', '#C77CFF', 'orange']}"
      :x="150"
      :y="50"
      :w="250"
      shape="line"
      title="Stroke color"
      title-font-weight="bold"
      :title-font-size="12"
      orientation="horizontal"
    />
    
  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    data () {
      let colors = ['#F8766D', '#7CAE00', '#00BFC4', '#C77CFF', 'orange']
      let data = { colors: [], rainfall: [], xValues: [], yValues: [] }
      let rainfall = [7, 12, 5, 3, 5, 8, 9, 10, 2, 12, 5, 7]
      for (let i = 0; i < 30; i++) {
        let colorIndex = Math.floor(Math.random() * colors.length)
        let color = colors[colorIndex]
        let rain = rainfall[i % rainfall.length]
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
