<template>
  <div>{{ metadata }}</div>
  <!-- <vgg-graphic
    :width="900"
    :height="600"
    :data="data"> -->

    <!-- <vgg-section
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
    /> -->
  <!-- </vgg-graphic> -->
</template>

<script>
export default {
  /**
   * Every mutliline plot takes the following props:
   * @param {Array} data - an array of objects representing data instances.
   * @param {Number} width - width of chart (including margins).
   * @param {Number} height - height of chart (including margins).
   * @param {Number} margin - width of margin around actual plot.
   * @param {String} title - title of the chart.
   * @param {String} xVariable - name of x variable.
   * @param {String} yVariable - name of y variable.
   * @param {String} timeVariable - name of time variable.
   * @param {Function, String} scale - scaling of data and axes.
   * @param {String} spacingType - spacing of axis ticks and grid lines.
   */
  props: {
    data: {
      type: Array,
      default: []
    },
    width: {
      type: Number,
      default: 550
    },
    height: {
      type: Number,
      default: 550
    },
    margin: {
      type: Number,
      default: 50
    },
    title: {
      type: String,
      default: 'Figurative Map of the successive losses in men of the French Army in the Russian Campaign'
    },
    xVariable: {
      type: String,
      required: true
    },
    yVariable: {
      type: String,
      required: true
    },
    strokeVariable: {
      type: String,
      default: undefined
    },
    color: {
      type: String,
      default: '#d68164'
    },
    displayLabels: {
      type: Boolean,
      default: false
    },
    showAdvance: {
      type: Boolean,
      default: true
    },
    showRetreat: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    /**
     * @return {Object} - type of data and variables
     */
    metadata () {
      let metadata = {
        type: 'dataFrame',
        variables: {}
      }

      metadata.variables['long'] = { type: 'ratio' }
      metadata.variables['lat'] = { type: 'ratio' }
      metadata.variables['survivors'] = { type: 'ratio' }

      return metadata
    },

    group1Advance () {
      let data = [{'index': '1', 'direction': 'A', 'group': 1.0, 'long': 24.0, 'survivors': 340000.0, 'lat': 54.9}, {'index': '2', 'direction': 'A', 'group': 1.0, 'long': 24.5, 'survivors': 340000.0, 'lat': 55.0}, {'index': '3', 'direction': 'A', 'group': 1.0, 'long': 25.5, 'survivors': 340000.0, 'lat': 54.5}, {'index': '4', 'direction': 'A', 'group': 1.0, 'long': 26.0, 'survivors': 320000.0, 'lat': 54.7}, {'index': '5', 'direction': 'A', 'group': 1.0, 'long': 27.0, 'survivors': 300000.0, 'lat': 54.8}, {'index': '6', 'direction': 'A', 'group': 1.0, 'long': 28.0, 'survivors': 280000.0, 'lat': 54.9}, {'index': '7', 'direction': 'A', 'group': 1.0, 'long': 28.5, 'survivors': 240000.0, 'lat': 55.0}, {'index': '8', 'direction': 'A', 'group': 1.0, 'long': 29.0, 'survivors': 210000.0, 'lat': 55.1}, {'index': '9', 'direction': 'A', 'group': 1.0, 'long': 30.0, 'survivors': 180000.0, 'lat': 55.2}, {'index': '10', 'direction': 'A', 'group': 1.0, 'long': 30.3, 'survivors': 175000.0, 'lat': 55.3}, {'index': '11', 'direction': 'A', 'group': 1.0, 'long': 32.0, 'survivors': 145000.0, 'lat': 54.8}, {'index': '12', 'direction': 'A', 'group': 1.0, 'long': 33.2, 'survivors': 140000.0, 'lat': 54.9}, {'index': '13', 'direction': 'A', 'group': 1.0, 'long': 34.4, 'survivors': 127100.0, 'lat': 55.5}, {'index': '14', 'direction': 'A', 'group': 1.0, 'long': 35.5, 'survivors': 100000.0, 'lat': 55.4}, {'index': '15', 'direction': 'A', 'group': 1.0, 'long': 36.0, 'survivors': 100000.0, 'lat': 55.5}, {'index': '16', 'direction': 'A', 'group': 1.0, 'long': 37.6, 'survivors': 100000.0, 'lat': 55.8}]
        return data
    },

    group1Retreat () {
      let data = [{'index': '17', 'direction': 'R', 'group': 1.0, 'long': 37.7, 'survivors': 100000.0, 'lat': 55.7}, {'index': '18', 'direction': 'R', 'group': 1.0, 'long': 37.5, 'survivors': 98000.0, 'lat': 55.7}, {'index': '19', 'direction': 'R', 'group': 1.0, 'long': 37.0, 'survivors': 97000.0, 'lat': 55.0}, {'index': '20', 'direction': 'R', 'group': 1.0, 'long': 36.8, 'survivors': 96000.0, 'lat': 55.0}, {'index': '21', 'direction': 'R', 'group': 1.0, 'long': 35.4, 'survivors': 87000.0, 'lat': 55.3}, {'index': '22', 'direction': 'R', 'group': 1.0, 'long': 34.3, 'survivors': 55000.0, 'lat': 55.2}, {'index': '23', 'direction': 'R', 'group': 1.0, 'long': 33.3, 'survivors': 37000.0, 'lat': 54.8}, {'index': '24', 'direction': 'R', 'group': 1.0, 'long': 32.0, 'survivors': 24000.0, 'lat': 54.6}, {'index': '25', 'direction': 'R', 'group': 1.0, 'long': 30.4, 'survivors': 20000.0, 'lat': 54.4}, {'index': '26', 'direction': 'R', 'group': 1.0, 'long': 29.2, 'survivors': 20000.0, 'lat': 54.3}, {'index': '27', 'direction': 'R', 'group': 1.0, 'long': 28.5, 'survivors': 20000.0, 'lat': 54.2}, {'index': '28', 'direction': 'R', 'group': 1.0, 'long': 28.3, 'survivors': 20000.0, 'lat': 54.3}, {'index': '29', 'direction': 'R', 'group': 1.0, 'long': 27.5, 'survivors': 20000.0, 'lat': 54.5}, {'index': '30', 'direction': 'R', 'group': 1.0, 'long': 26.8, 'survivors': 12000.0, 'lat': 54.3}, {'index': '31', 'direction': 'R', 'group': 1.0, 'long': 26.4, 'survivors': 14000.0, 'lat': 54.4}, {'index': '32', 'direction': 'R', 'group': 1.0, 'long': 25.0, 'survivors': 8000.0, 'lat': 54.4}, {'index': '33', 'direction': 'R', 'group': 1.0, 'long': 24.4, 'survivors': 4000.0, 'lat': 54.4}, {'index': '34', 'direction': 'R', 'group': 1.0, 'long': 24.2, 'survivors': 4000.0, 'lat': 54.4}, {'index': '35', 'direction': 'R', 'group': 1.0, 'long': 24.1, 'survivors': 4000.0, 'lat': 54.4}]
      return data
    },

    group2Advance () {
      let data = [{'index': '36', 'direction': 'A', 'group': 2.0, 'long': 24.0, 'survivors': 60000.0, 'lat': 55.1}, {'index': '37', 'direction': 'A', 'group': 2.0, 'long': 24.5, 'survivors': 60000.0, 'lat': 55.2}, {'index': '38', 'direction': 'A', 'group': 2.0, 'long': 25.5, 'survivors': 60000.0, 'lat': 54.7}, {'index': '39', 'direction': 'A', 'group': 2.0, 'long': 26.6, 'survivors': 40000.0, 'lat': 55.7}, {'index': '40', 'direction': 'A', 'group': 2.0, 'long': 27.4, 'survivors': 33000.0, 'lat': 55.6}, {'index': '41', 'direction': 'A', 'group': 2.0, 'long': 28.7, 'survivors': 33000.0, 'lat': 55.5}]
      return data
    },

    group2Retreat () {
      let data = [{'index': '42', 'direction': 'R', 'group': 2.0, 'long': 28.7, 'survivors': 33000.0, 'lat': 55.5}, {'index': '43', 'direction': 'R', 'group': 2.0, 'long': 29.2, 'survivors': 30000.0, 'lat': 54.2}, {'index': '44', 'direction': 'R', 'group': 2.0, 'long': 28.5, 'survivors': 30000.0, 'lat': 54.1}, {'index': '45', 'direction': 'R', 'group': 2.0, 'long': 28.3, 'survivors': 28000.0, 'lat': 54.2}]
      return data
    },

    group3Advance () {
      let data = [{'index': '46', 'direction': 'A', 'group': 3.0, 'long': 24.0, 'survivors': 22000.0, 'lat': 55.2}, {'index': '47', 'direction': 'A', 'group': 3.0, 'long': 24.5, 'survivors': 22000.0, 'lat': 55.3}, {'index': '48', 'direction': 'A', 'group': 3.0, 'long': 24.6, 'survivors': 6000.0, 'lat': 55.8}]
      return data
    },

    group3Retreat () {
      let data = [{'index': '49', 'direction': 'R', 'group': 3.0, 'long': 24.6, 'survivors': 6000.0, 'lat': 55.8}, {'index': '50', 'direction': 'R', 'group': 3.0, 'long': 24.2, 'survivors': 6000.0, 'lat': 54.4}, {'index': '51', 'direction': 'R', 'group': 3.0, 'long': 24.1, 'survivors': 6000.0, 'lat': 54.4}]
      return data
    },

    textVariable1 () {
      return ['Kowno', '', 'Wilna', '', '', '', '', '', '', 'Witebsk', 'Smolensk', 'Dorogobouge', 'Chjet', '', 'Mojeisk', 'Moscow']
    },

    textVariable2 () {
      return ['', 'Tarantino', 'Malo-jarosewli', '', 'Mojaisk', 'Wixma', '', '', 'Orscha', 'Botr', '', 'Studienska', '', 'Moloderno', 'Smorgoni']
    }
  },
}
</script>
