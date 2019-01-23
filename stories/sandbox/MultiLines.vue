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

        <vgg-map>

          <vgg-multi-line
            :x="{ get: row => row.grouped.xValues }"
            :y="{ get: row => row.grouped.yValues }"
            :stroke="row => row.colors"
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

      <vgg-data :transform="{ groupBy: 'colors' }">

        <vgg-map>

          <vgg-section
            :x="{ get: 'colors' }"
            :w="{ position: { positioner: 'bulge', padding: 10 } }"
            :y1="0"
            :y2="1"
            :scale-x="[0, 1]"
            :scale-y="[0, 1]"
            :data="row => row.grouped">

            <vgg-rectangle
              :x1="0"
              :x2="1"
              :y1="0"
              :y2="1"
              fill="#f1f1f1"
            />

            <vgg-map>

              <vgg-point
                :x="{ get: 'xValues', scale: 'xValues' }"
                :y="{ get: 'yValues', scale: 'yValues' }"
                :fill="row => row.colors"
              />

            </vgg-map>

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
