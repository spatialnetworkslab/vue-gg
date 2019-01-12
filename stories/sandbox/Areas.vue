<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data">

    <!-- Axes -->
    <vgg-x-axis
      :x1="100"
      :x2="500"
      :y1="50"
      :y2="100"
      :scale="'xValues'"
    />

    <vgg-y-axis
      :x1="75"
      :x2="100"
      :y1="100"
      :y2="500"
      :scale="'yValues'"
      flip
    />

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

          <!-- <vgg-multi-line
            :x="row => row.grouped.xValues"
            :y="(row, i) => Array(row.grouped.xValues.length).fill((i + 1) * 15)"
            :color="row => row.colors"
          /> -->

          <vgg-area
            :x="row => row.grouped.xValues"
            :y="row => row.grouped.yValues"
            :color="row => row.colors"
            :y2="(row, i) => [(i + 1) * 2]"
            :fill="'none'"
          />

          <!-- <vgg-multi-line
            :x="row => row.grouped.xValues"
            :y="(row, i) => 15"
            :color="row => row.colors"
          /> -->

        </vgg-map>

      </vgg-transform>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    data () {
      let colors = [
        'red', 'red', 'red',
        'green', 'green', 'green',
        'blue', 'blue', 'blue']
      let xValues = [
        5, 10, 15,
        5, 10, 15,
        5, 10, 15
      ]
      let yValues = [
        1, 10, 20,
        20, 15, 40,
        35, 40, 65
      ]
      let data = { colors: colors, xValues: xValues, yValues: yValues }
      return data
    }
  }
}
</script>
