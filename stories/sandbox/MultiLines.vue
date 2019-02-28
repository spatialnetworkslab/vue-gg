<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data">

    <vgg-section
      :x1="0"
      :x2="600"
      :y1="300"
      :y2="600"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-data :transform="{ groupBy: 'colors' }">

        <vgg-map v-slot="{ row }">

          <vgg-multi-line
            :x="row.grouped.xValues"
            :y="row.grouped.yValues"
            :stroke="row.colors"
          />

        </vgg-map>

      </vgg-data>

    </vgg-section>

    <vgg-section
      :x1="0"
      :x2="600"
      :y1="5"
      :y2="250"
      :scale-x="'colors'"
      :scale-y="[0, 1]"
    >

      <vgg-scales
        :scales="{ x: 'xValues', y: 'yValues' }"
      />

      <vgg-data :transform="{ groupBy: 'colors' }">

        <vgg-map v-slot="{ row }">

          <vgg-section
            :x="row.colors"
            :w="{ band: { domain: 'colors', padding: 10 } }"
            :y1="0"
            :y2="1"
            :scale-x="[0, 1]"
            :scale-y="[0, 1]"
            :data="{ val: row.grouped }"
          >

            <vgg-rectangle
              :x1="0"
              :x2="1"
              :y1="0"
              :y2="1"
              fill="#f1f1f1"
            />

            <vgg-map v-slot="{ row: row2 }">

              <vgg-point
                :x="{ val: row2.xValues, scale: '#x' }"
                :y="{ val: row2.yValues, scale: '#y' }"
                :fill="row2.colors"
              />

            </vgg-map>

            <!-- <vgg-x-axis
              :scale="'#x'"
              :tick-extra="false"
              :x1="0"
              :x2="1"
              :vjust="'b'"
            />

            <vgg-y-axis
              :scale="'#y'"
              :tick-extra="false"
              flip
            /> -->

          </vgg-section>

        </vgg-map>

      </vgg-data>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    data () {
      let colors = ['red', 'blue', 'green']
      let data = { colors: [], xValues: [], yValues: [] }
      for (let i = 0; i < 30; i++) {
        let colorIndex = Math.floor(Math.random() * 3)
        let color = colors[colorIndex]

        data.colors.push(color)
        data.xValues.push(Math.random() * 10)
        data.yValues.push(Math.random() * 100)
      }

      return data
    }
  }
}
</script>
