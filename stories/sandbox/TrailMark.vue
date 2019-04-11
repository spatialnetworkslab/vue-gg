<template>
  <vgg-graphic
    :width="900"
    :height="600"
    :data="data">
    <vgg-scales :scales="{ rainfallScale: 'rainfall' }" />

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
        :fill-opacity="0.7"
        :sort="'x'"
        fill="orange"
        @click="log('test')"
      />

      <vgg-data :transform="{ groupBy: 'colors' }">
        <vgg-map v-slot="{ row }">
          <vgg-trail
            :x="row.grouped.xValues"
            :y="row.grouped.yValues"
            :stroke-width="{ val: row.grouped.rainfall, scale: '#rainfallScale'}"
            :fill="row.colors"
            :fill-opacity="0.7"
            :sort="'x'"
            @click="log(row)"
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
      shape="line"
      stroke="orange"
      direction="vertical"
      title="Stroke width"
      :x="600"
      :y="400"
    />

    <vgg-symbol-legend
      :scale="'colors'"
      :font-size="10"
      :stroke-width="8"
      :stroke="{ range: ['red', 'green', 'blue', 'purple'] }"
      shape="line"
      title="Stroke color"
      :x="600"
      :y="100"
    />
    <vgg-symbol-legend
      :scale="'rainfall'"
      :font-size="10"
      :size="15"
      :stroke-width="10"
      :stroke-opacity="{ range: [0, 0.7] }"
      shape="line"
      title="Opacity test"
      orientation="horizontal"
      :y="540"
      :h="80"
      :x="180"
      :w="300"
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
      let colors = ['red', 'blue', 'green', 'purple']
      let data = { colors: [], rainfall: [], xValues: [], yValues: [] }
      let rainfall = [7, 12, 5, 3, 5, 8, 9, 10, 2, 12, 5, 7]
      for (let i = 0; i < 30; i++) {
        let colorIndex = Math.floor(Math.random() * 4)
        let color = colors[colorIndex]
        let rain = rainfall[i % rainfall.length]
        data.colors.push(color)
        data.xValues.push(Math.random() * 10)
        data.yValues.push(Math.random() * 100)
        data.rainfall.push(rain)
      }

      return data
    }
  },

  methods: { log: console.log }
}
</script>
