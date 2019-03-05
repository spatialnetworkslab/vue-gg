<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="dummyData">

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-data :transform="{ groupBy: 'colors' }">

        <vgg-map v-slot="{ row, prevRow }">

          <vgg-area
            :x="row.grouped.xValues"
            :y="row.grouped.yValues"
            :y2="prevRow ? prevRow.grouped.yValues : [0]"
            :opacity="0.5"
            :fill="row.colors"
            @click="log(row)"
          />

        </vgg-map>

      </vgg-data>

      <!-- Axes -->
      <vgg-x-axis
        :scale="'xValues'"
        :title-hjust="1.1"
        :vjust="-.05"
      />

      <vgg-y-axis
        :scale="'yValues'"
        :hjust="-.05"
        flip
      />

    </vgg-section>

  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    dummyData () {
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
      return { colors: colors, xValues: xValues, yValues: yValues }
    }
  },

  methods: {
    log: console.log
  }
}
</script>
