<template>
  <div>
    <vgg-graphic
      :width="900"
      :height="900"
      :data="data">

      <vgg-grid :rows="3" :layout-padding="5" :cell-padding="30" start="t">

        <vgg-section
          v-for="regression in ['linear', 'logarithmic', 'quadratic', 'polynomial', 'exponential', 'power', 'loess', ]"
          :key="regression"
        >

          <vgg-plot-title :text="regression" :vjust="1.05" :font-size="14" />

          <vgg-data :data="getData(regression)">

            <vgg-map v-slot="{ dataframe }" unit="dataframe">

              <vgg-multi-line
                :x="{ val: dataframe.xValues, scale: 'xValues'}"
                :y="{ val: dataframe.yValues, scale: 'yValues'}"
                :stroke-width="1.5"
                fill="none"
                :regression="regression"
              />

            </vgg-map>

            <vgg-map v-slot="{ row }">

              <vgg-symbol
                :x="{ val: row.xValues, scale: 'xValues'}"
                :y="{ val: row.yValues, scale: 'yValues'}"
                :size="4"
              />

            </vgg-map>

            <vgg-x-axis scale="xValues" :tickCount="5" />

            <vgg-y-axis scale="yValues" :tickCount="5" />

          </vgg-data>

        </vgg-section>

      </vgg-grid>

    </vgg-graphic>

    <!-- <select v-model="selected">
      <option value="linear">linear</option>
      <option value="logarithmic">logarithmic</option>
      <option value="power">power</option>
      <option value="loess">loess</option>
    </select> -->

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

  computed : {
    linearData () {
      return { xValues: [8, 2, 11, 6, 5, 4, 12, 9, 6, 1],
               yValues: [3, 10, 3, 6, 8, 12, 1, 4, 9, 14] }
    },

    quadraticData () {
      return { xValues: [-3, -2, -1, 0, 1, 2, 3],
               yValues: [7.5, 3, 0.5, 1, 3, 6, 14] }
    },

    polynomialData () {
      return { xValues: [0, 1, 2, 3, 4, 5, 6, 7, 8],
               yValues: [140, 149, 159.6, 159, 155.9, 169, 162.9, 169, 180] }
    },

    exponentialData () {
      return { xValues: [0, 1, 2, 3, 4, 5],
               yValues: [3, 7, 10, 24, 50, 95] }
    },

    logarithmicData () {
      return { xValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                         11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
               yValues: [4.181, 4.665, 5.296, 5.365, 5.448, 5.744, 5.653, 5.844, 6.362, 6.38,
                         6.311, 6.457, 6.479, 6.59, 6.74, 6.58, 6.852, 6.531, 6.682, 7.013] }
    },

    powerData () {
      return [{"yValues":82.74,"xValues":1},{"yValues":30.26,"xValues":6},{"yValues":20.22,"xValues":20},{"yValues":9.49,"xValues":70},{"yValues":4.01,"xValues":300},{"yValues":2.09,"xValues":800},{"yValues":1.46,"xValues":1300},{"yValues":1.14,"xValues":1800},{"yValues":0.9,"xValues":2300},{"yValues":0.73,"xValues":2800},{"yValues":0.61,"xValues":3300},{"yValues":0.53,"xValues":3800},{"yValues":0.46,"xValues":4300},{"yValues":0.4,"xValues":4800}]
    },

    loessData () {
      return { xValues: [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010],
               yValues: [47.3, 50.0, 54.1, 59.7, 62.9, 68.2, 69.7, 70.8, 73.7, 75.4, 76.8, 78.7] }
    },
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
    },

    getData (name) {
      return this[name+'Data']
    }
  },
}
</script>