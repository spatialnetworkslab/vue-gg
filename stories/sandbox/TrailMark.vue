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

    <vgg-scales :scales="{ rainfallScale: 'rainfall' }" />

    <vgg-data :transform="{ groupBy: 'colors' }">

      <vgg-map v-slot="{ row }">

        <!-- <vgg-trail
          :x="row.grouped.xValues"
          :y="row.grouped.yValues"
          :stroke="row.colors"
          :sort="'x'"
          /> -->

        <vgg-trail
          :x="row.grouped.xValues"
          :y="row.grouped.yValues"
          :stroke="row.colors"
          :stroke-width="{ val: "row.grouped.rainfall", scale: '#rainfall' }"
          :sort="'x'"
        />
          <!-- <vgg-map v-slot="{ row }">

            <vgg-point
              :x="{ val: row.explanatory, scale: 'explanatory' }"
              :y="{ val: row.dependent, scale: 'dependent' }"
              :radius="{ val: row.dependent, scale: { domain: 'dependent' } }"
              :fill="{ val: row.explanatory, scale: { type: 'viridis', domain: 'explanatory' } }"
            />

          </vgg-map> -->

        <!-- <vgg-trail
          :x="row.grouped.xValues"
          :y="row.grouped.yValues"
          :stroke="row.colors }"
          :stroke-width="{ row.grouped.rainfall, scale: '#rainfallScale' }"
          :sort="'x'"
          :stroke-opacity="row.grouped.opacity"
        /> -->

      </vgg-map>

    </vgg-data>

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
      let opacity =[0.5, 0.1, 0.3]
      let data = { colors: [], opacity: [], rainfall: [], xValues: [], yValues: [] }
      let rainfall = [7, 12, 5, 3, 1, 2, 2, 10, 2, 12, 5, 7]
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
