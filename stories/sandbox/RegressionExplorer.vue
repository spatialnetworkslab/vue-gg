<template>
  <div>
    <vgg-graphic
      :width="600"
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

        <vgg-map v-slot="{ dataframe }" unit="dataframe">

          <vgg-multi-line
            :x="dataframe.xValues"
            :y="dataframe.yValues"
            :stroke-width="1"
            :opacity="0.6"
            :regression="selected"
          />

        </vgg-map>

        <vgg-map v-slot="{ row }">

          <vgg-symbol
            :x="row.xValues"
            :y="row.yValues"
            stroke="grey"
            :strokeWidth="1"
            :strokeOpacity="0.6"
            fill="none"
            :size="5"
          />

        </vgg-map>

      </vgg-section>

    </vgg-graphic>

    <select v-model="selected">
      <option value="linear">linear</option>
      <option value="exponential">exponential</option>
      <option value="logarithmic">logarithmic</option>
      <option value="power">power</option>
      <option value="polynomial">polynomial</option>
    </select>

    <!-- <div style="margin-top: 10px;">
      <button @click="generateNewData()">Generate new data</button>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 'linear',
      data: undefined
    }
  },

  mounted () {
    this.generateNewData()
  },

  methods: {
    generateNewData () {
      let xValues = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010]
      let yValues = [47.3, 50.0, 54.1, 59.7, 62.9, 68.2, 69.7, 70.8, 73.7, 75.4, 76.8, 78.7]
      let newData =[]
      for (let ix = 0; ix < 12; ix ++) {
        newData.push({xValues: xValues[ix], yValues: yValues[ix]})
      }
      this.data = newData
    }
  },
}
</script>
