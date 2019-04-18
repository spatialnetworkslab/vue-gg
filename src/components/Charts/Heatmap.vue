<!--
SAMPLE COMPONENT DEFINITION

<vgg-heatmap
  :x1="200"
  :x2="800"
  :y1="100"
  :y2="900"
  :width="1000"
  :height="1000"
  :csvURL="'../../static/motorbikes_40_clean.csv'"
  :color="'Color'"
  :options="'Name'"
/>

-->

<template>

  <!-- If changing the size of the chart, change total chart size here first -->
  <vgg-graphic
    v-if="myData"
    :width="width"
    :height="height"
    :data="myData"
  >

    <!-- If changing the size of the chart, remember to change x1, x2, y1 and y2 values as well -->
    <!-- <vgg-section
      :x1="x1"
      :x2="x2"
      :y1="y1"
      :y2="y2"
      :scale-x="dimensions"
      :scale-y="options"
      :transform="[
        { rename: extractVariables }
      ]"
    > -->
    <vgg-section
      :x1="x1"
      :x2="x2"
      :y1="y1"
      :y2="y2"
      :scale-x="dimensions"
      :scale-y="options"
    >
      <!-- { transform: df => { log(df, colors); return df } } -->
      <g
        v-for="dim, d in dimensions"
        :key="d"
      >
        <vgg-map v-slot="{ row, i }">
          <vgg-rectangle
            :x="dim"
            :y="row.Name"
            :w="{ band: { domain: dimensions } }"
            :h="{ band: { domain: options } }"
            :fill="{val: row[dim], scale: { type: 'blues', domain: dim}}"
            @hover="handleHover($event, row, i)"
            @click="handleClick($event, row, i)"
          />
        </vgg-map>
      </g>

      <vgg-rectangle
        v-if="hoverRow"
        :x1="x1"
        :x2="x2"
        :y="hovered.r[options]"
        :h="(y2 - y1)/myData.length"
        :fill="'none'"
        :stroke="'red'"
        :stroke-width="5"
      />

      <vgg-rectangle
        v-if="clickRow"
        :x1="x1"
        :x2="x2"
        :y="clicked.r[options]"
        :h="(y2 - y1)/myData.length"
        :fill="'none'"
        :stroke="'red'"
        :stroke-width="5"
      />

      <vgg-x-axis
        :scale="dimensions"
        :label-font-size="10"
        :title-font-weight="700"
        :vjust="1.0"
        :tick-length="7"
        :title-hjust="1.08"
        :title-vjust="0.55"
        :title-font-size="14"
        title="Dimensions"
        label-rotate
        flip
      />

      <vgg-idc-y-axis
        :scale="options"
        :label-color="colors"
        :label-font-size="10"
        :title-font-weight="700"
        :hjust="0"
        :title-hjust="0.4"
        :title-vjust="-0.03"
        :title="options"
        :title-font-size="14"
      />
    </vgg-section>
  </vgg-graphic>

</template>

<script>
import { csv } from 'd3-fetch'

export default {
  name: 'Heatmap',

  props: {
    // Use either data or csvURL
    // For data, format as [ { variable1: , variable2: }, { variable1: , variable2: } ]
    // Where each Object in the Array represents a row
    data: {
      type: Array,
      default: undefined
    },
    // Pass the string to the .csv file
    // e.g. '../../../static/idcDrinksDemoClean.csv'
    // More likely than not, the .csv dataset should be in the static folder
    csvURL: {
      type: String,
      default: undefined
    },
    // Pass in an object of variables to extract from the dataset
    // The variables should be defined as such:
    // { 'original variable name 1':'NEW NAME 1', 'original variable name 2':'NEW NAME 2' }
    // The new names will be used to vary the x and y columns of the matrix
    extractVariables: {
      type: Object,
      default: undefined
    },
    // The name of the column in the dataset that encodes the color of the points
    // Since we have been using the col 'Color2', this is the current default
    // This can be changed if we ever define a new color column in the datasets
    color: {
      type: String,
      default: 'Color'
    },

    colorScale: {
      type: String,
      default: 'blues'
    },

    dimensions: {
      type: [Object, Array],
      default: () => ['Price', 'WetWeight', 'RearWheelHP', 'TopSpeed', 'MeanMPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio']
    },

    options: {
      type: String,
      default: 'Name'
    },

    x1: {
      type: Number,
      default: undefined
    },

    x2: {
      type: Number,
      default: undefined
    },

    y1: {
      type: Number,
      default: undefined
    },

    y2: {
      type: Number,
      default: undefined
    },

    width: {
      type: Number,
      default: undefined
    },

    height: {
      type: Number,
      default: undefined
    }

  },

  // hovered keeps track of whether a point is being hovered over (i.e. true or false)
  // hoverRow keeps track of the details of the point being hovered over (e.g. x, y values)
  // Currently, corresponding points are highlighted across scatterplots on hover
  // hoverRow data can be used to render other info (e.g. adding <text> stating the x, y values etc.)
  // It is also possible to track other relevant values such as index, although this is not currently defined
  // but provisions have been made to do so in hoverHandler
  data () {
    return {
      myData: undefined,
      hovered: undefined,
      hoverRow: undefined,
      clicked: undefined,
      clickRow: undefined
    }
  },

  computed: {
    newVariables () {
      let renamedVars = []
      for (let i of Object.keys(this.extractVariables)) {
        renamedVars.push(this.extractVariables[i])
      }
      return renamedVars
    },

    colors () {
      let colors = []
      for (let i = 0; i < this.myData.length; i++) {
        colors.push(this.myData[i][this.color])
      }

      return colors
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    log: console.log,

    getData () {
      // if (this.data) {
      //   this.myData = this.data
      // } if (!this.csvURL) {
      //   throw new Error('Please provide either data or csvURL')
      // } else {
      //   this.processCSV(this.csvURL)
      // }

      // JSON samples are in `static` folder (motorbikes, drinks, cameras, cars)
      // to change data inside myData, load the relevant JSON here

      this.myData =
      [
        {
          'MeanMPG': 31.6,
          'RearWheelHP': 101.9,
          'RearWheelTQLbFt': 61.2,
          'PWRatio': 0.2,
          'ZeroTo60': 3.03,
          'TopSpeed': 147,
          'QuartermileSec': 10.97,
          'Name': 'Motorbike 1',
          'WetWeight': 515,
          'Stop60': 116.8,
          'Color': '#B3DE69',
          'Price': 10995
        },
        {
          'MeanMPG': 35.9,
          'RearWheelHP': 138,
          'RearWheelTQLbFt': 77.9,
          'PWRatio': 0.32,
          'ZeroTo60': 3.01,
          'TopSpeed': 173,
          'QuartermileSec': 10.16,
          'Name': 'Motorbike 2',
          'WetWeight': 434,
          'Stop60': 114.9,
          'Color': '#CBD5E8',
          'Price': 19995
        },
        {
          'MeanMPG': 32.6,
          'RearWheelHP': 127.1,
          'RearWheelTQLbFt': 71.1,
          'PWRatio': 0.27,
          'ZeroTo60': 3.15,
          'TopSpeed': 158,
          'QuartermileSec': 10.51,
          'Name': 'Motorbike 3',
          'WetWeight': 466,
          'Stop60': 133.53,
          'Color': '#E78AC3',
          'Price': 11995
        },
        {
          'MeanMPG': 34.2,
          'RearWheelHP': 171.8,
          'RearWheelTQLbFt': 86.04,
          'PWRatio': 0.4,
          'ZeroTo60': 2.98,
          'TopSpeed': 177.6,
          'QuartermileSec': 9.91,
          'Name': 'Motorbike 4',
          'WetWeight': 425,
          'Stop60': 119.1,
          'Color': '#1F78B4',
          'Price': 22995
        },
        {
          'MeanMPG': 57.7,
          'RearWheelHP': 61.97,
          'RearWheelTQLbFt': 46.58,
          'PWRatio': 0.26,
          'ZeroTo60': 3.73,
          'TopSpeed': 119.5,
          'QuartermileSec': 12.05,
          'Name': 'Motorbike 5',
          'WetWeight': 353.5,
          'Stop60': 117.5,
          'Color': '#8DD3C7',
          'Price': 8999
        },
        {
          'MeanMPG': 45.6,
          'RearWheelHP': 46.21,
          'RearWheelTQLbFt': 35.65,
          'PWRatio': 0.14,
          'ZeroTo60': 4.56,
          'TopSpeed': 107.5,
          'QuartermileSec': 13.12,
          'Name': 'Motorbike 6',
          'WetWeight': 336.5,
          'Stop60': 144.2,
          'Color': '#FED9A6',
          'Price': 10298
        },
        {
          'MeanMPG': 29.4,
          'RearWheelHP': 104.5,
          'RearWheelTQLbFt': 110.2,
          'PWRatio': 0.16,
          'ZeroTo60': 3.88,
          'TopSpeed': 130,
          'QuartermileSec': 11.91,
          'Name': 'Motorbike 7',
          'WetWeight': 668,
          'Stop60': 120.4,
          'Color': '#FFFF99',
          'Price': 13399
        },
        {
          'MeanMPG': 41.1,
          'RearWheelHP': 118.08,
          'RearWheelTQLbFt': 62.68,
          'PWRatio': 0.27,
          'ZeroTo60': 3.24,
          'TopSpeed': 152.3,
          'QuartermileSec': 10.88,
          'Name': 'Motorbike 8',
          'WetWeight': 444.5,
          'Stop60': 112.9,
          'Color': '#8DA0CB',
          'Price': 12995
        },
        {
          'MeanMPG': 45,
          'RearWheelHP': 74.7,
          'RearWheelTQLbFt': 55.3,
          'PWRatio': 0.17,
          'ZeroTo60': 3.64,
          'TopSpeed': 139,
          'QuartermileSec': 11.74,
          'Name': 'Motorbike 9',
          'WetWeight': 451,
          'Stop60': 114.4,
          'Color': '#B3CDE3',
          'Price': 10995
        },
        {
          'MeanMPG': 37.3,
          'RearWheelHP': 85.2,
          'RearWheelTQLbFt': 60.4,
          'PWRatio': 0.17,
          'ZeroTo60': 3.22,
          'TopSpeed': 139,
          'QuartermileSec': 11.18,
          'Name': 'Motorbike 10',
          'WetWeight': 498,
          'Stop60': 128.5,
          'Color': '#FDDAEC',
          'Price': 11998
        },
        {
          'MeanMPG': 37.1,
          'RearWheelHP': 92.2,
          'RearWheelTQLbFt': 62.6,
          'PWRatio': 0.2,
          'ZeroTo60': 3.6,
          'TopSpeed': 137,
          'QuartermileSec': 11.45,
          'Name': 'Motorbike 11',
          'WetWeight': 455,
          'Stop60': 118.5,
          'Color': '#CCEBC5',
          'Price': 12998
        },
        {
          'MeanMPG': 45.4,
          'RearWheelHP': 85.4,
          'RearWheelTQLbFt': 61.1,
          'PWRatio': 0.16,
          'ZeroTo60': 3.45,
          'TopSpeed': 156,
          'QuartermileSec': 11.6,
          'Name': 'Motorbike 12',
          'WetWeight': 520,
          'Stop60': 125,
          'Color': '#33A02C',
          'Price': 14398
        },
        {
          'MeanMPG': 37.5,
          'RearWheelHP': 101.08,
          'RearWheelTQLbFt': 64.52,
          'PWRatio': 0.2,
          'ZeroTo60': 3.53,
          'TopSpeed': 138.1,
          'QuartermileSec': 11.7,
          'Name': 'Motorbike 13',
          'WetWeight': 502,
          'Stop60': 127.7,
          'Color': '#FCCDE5',
          'Price': 14999
        },
        {
          'MeanMPG': 37.7,
          'RearWheelHP': 106.8,
          'RearWheelTQLbFt': 66.3,
          'PWRatio': 0.23,
          'ZeroTo60': 3.32,
          'TopSpeed': 139,
          'QuartermileSec': 11.15,
          'Name': 'Motorbike 14',
          'WetWeight': 476.5,
          'Stop60': 115.1,
          'Color': '#7FC97F',
          'Price': 13998
        },
        {
          'MeanMPG': 38.1,
          'RearWheelHP': 106.51,
          'RearWheelTQLbFt': 67.73,
          'PWRatio': 0.24,
          'ZeroTo60': 3.35,
          'TopSpeed': 140,
          'QuartermileSec': 11.17,
          'Name': 'Motorbike 15',
          'WetWeight': 443,
          'Stop60': 126,
          'Color': '#CCEBC5',
          'Price': 14398
        },
        {
          'MeanMPG': 33.8,
          'RearWheelHP': 163.9,
          'RearWheelTQLbFt': 97.2,
          'PWRatio': 0.28,
          'ZeroTo60': 2.86,
          'TopSpeed': 158,
          'QuartermileSec': 9.99,
          'Name': 'Motorbike 16',
          'WetWeight': 578,
          'Stop60': 119.6,
          'Color': '#D95F02',
          'Price': 12889
        },
        {
          'MeanMPG': 37,
          'RearWheelHP': 101.7,
          'RearWheelTQLbFt': 73.8,
          'PWRatio': 0.19,
          'ZeroTo60': 3.07,
          'TopSpeed': 151,
          'QuartermileSec': 10.75,
          'Name': 'Motorbike 17',
          'WetWeight': 542,
          'Stop60': 114.2,
          'Color': '#FB9A99',
          'Price': 7399
        },
        {
          'MeanMPG': 39.3,
          'RearWheelHP': 99.2,
          'RearWheelTQLbFt': 77.1,
          'PWRatio': 0.18,
          'ZeroTo60': 3.36,
          'TopSpeed': 152,
          'QuartermileSec': 11.34,
          'Name': 'Motorbike 18',
          'WetWeight': 560,
          'Stop60': 116.5,
          'Color': '#A6D854',
          'Price': 8299
        },
        {
          'MeanMPG': 32.3,
          'RearWheelHP': 68.6,
          'RearWheelTQLbFt': 36.5,
          'PWRatio': 0.14,
          'ZeroTo60': 3.97,
          'TopSpeed': 127,
          'QuartermileSec': 12.16,
          'Name': 'Motorbike 19',
          'WetWeight': 505,
          'Stop60': 114.1,
          'Color': '#FFFFCC',
          'Price': 5799
        },
        {
          'MeanMPG': 30.6,
          'RearWheelHP': 99.9,
          'RearWheelTQLbFt': 70.8,
          'PWRatio': 0.19,
          'ZeroTo60': 3.12,
          'TopSpeed': 144,
          'QuartermileSec': 10.95,
          'Name': 'Motorbike 20',
          'WetWeight': 534,
          'Stop60': 118.5,
          'Color': '#BEBADA',
          'Price': 14799
        },
        {
          'MeanMPG': 41.1,
          'RearWheelHP': 53.9,
          'RearWheelTQLbFt': 40.8,
          'PWRatio': 0.11,
          'ZeroTo60': 5.2,
          'TopSpeed': 114,
          'QuartermileSec': 13.52,
          'Name': 'Motorbike 21',
          'WetWeight': 500,
          'Stop60': 115,
          'Color': '#CCCCCC',
          'Price': 6999
        },
        {
          'MeanMPG': 48.4,
          'RearWheelHP': 56.31,
          'RearWheelTQLbFt': 43.48,
          'PWRatio': 0.11,
          'ZeroTo60': 5.21,
          'TopSpeed': 120.1,
          'QuartermileSec': 13.52,
          'Name': 'Motorbike 22',
          'WetWeight': 492,
          'Stop60': 117.1,
          'Color': '#FF7F00',
          'Price': 7699
        },
        {
          'MeanMPG': 40.7,
          'RearWheelHP': 104.8,
          'RearWheelTQLbFt': 97.2,
          'PWRatio': 0.14,
          'ZeroTo60': 3.65,
          'TopSpeed': 128,
          'QuartermileSec': 11.62,
          'Name': 'Motorbike 23',
          'WetWeight': 761,
          'Stop60': 135.4,
          'Color': '#BC80BD',
          'Price': 12399
        },
        {
          'MeanMPG': 45.4,
          'RearWheelHP': 69.7,
          'RearWheelTQLbFt': 54.1,
          'PWRatio': 0.12,
          'ZeroTo60': 5.14,
          'TopSpeed': 129,
          'QuartermileSec': 13.1,
          'Name': 'Motorbike 24',
          'WetWeight': 562,
          'Stop60': 127.7,
          'Color': '#FC8D62',
          'Price': 12490
        },
        {
          'MeanMPG': 43.3,
          'RearWheelHP': 72.2,
          'RearWheelTQLbFt': 61.9,
          'PWRatio': 0.13,
          'ZeroTo60': 3.87,
          'TopSpeed': 131,
          'QuartermileSec': 12.11,
          'Name': 'Motorbike 25',
          'WetWeight': 555,
          'Stop60': 119.4,
          'Color': '#FB8072',
          'Price': 13590
        },
        {
          'MeanMPG': 30.3,
          'RearWheelHP': 121.08,
          'RearWheelTQLbFt': 71.85,
          'PWRatio': 0.26,
          'ZeroTo60': 2.99,
          'TopSpeed': 153.5,
          'QuartermileSec': 10.5,
          'Name': 'Motorbike 26',
          'WetWeight': 470.5,
          'Stop60': 115.1,
          'Color': '#FFFF33',
          'Price': 18000
        },
        {
          'MeanMPG': 34.4,
          'RearWheelHP': 115.35,
          'RearWheelTQLbFt': 55.11,
          'PWRatio': 0.28,
          'ZeroTo60': 3.75,
          'TopSpeed': 141.75,
          'QuartermileSec': 11.1,
          'Name': 'Motorbike 27',
          'WetWeight': 410,
          'Stop60': 125.5,
          'Color': '#984EA3',
          'Price': 12498
        },
        {
          'MeanMPG': 32,
          'RearWheelHP': 115.5,
          'RearWheelTQLbFt': 62.2,
          'PWRatio': 0.25,
          'ZeroTo60': 3.24,
          'TopSpeed': 156,
          'QuartermileSec': 10.67,
          'Name': 'Motorbike 28',
          'WetWeight': 463.5,
          'Stop60': 123.6,
          'Color': '#E31A1C',
          'Price': 14995
        },
        {
          'MeanMPG': 30,
          'RearWheelHP': 83.6,
          'RearWheelTQLbFt': 73,
          'PWRatio': 0.13,
          'ZeroTo60': 5.05,
          'TopSpeed': 123.1,
          'QuartermileSec': 13.3,
          'Name': 'Motorbike 29',
          'WetWeight': 667,
          'Stop60': 119.8,
          'Color': '#377EB8',
          'Price': 14990
        },
        {
          'MeanMPG': 44.3,
          'RearWheelHP': 109.44,
          'RearWheelTQLbFt': 64.45,
          'PWRatio': 0.23,
          'ZeroTo60': 3.15,
          'TopSpeed': 141.7,
          'QuartermileSec': 10.99,
          'Name': 'Motorbike 30',
          'WetWeight': 480,
          'Stop60': 114.5,
          'Color': '#BEAED4',
          'Price': 10999
        },
        {
          'MeanMPG': 38.5,
          'RearWheelHP': 150.9,
          'RearWheelTQLbFt': 75.7,
          'PWRatio': 0.34,
          'ZeroTo60': 2.95,
          'TopSpeed': 178,
          'QuartermileSec': 9.94,
          'Name': 'Motorbike 31',
          'WetWeight': 440,
          'Stop60': 122.8,
          'Color': '#E7298A',
          'Price': 11599
        },
        {
          'MeanMPG': 41,
          'RearWheelHP': 136.1,
          'RearWheelTQLbFt': 71.4,
          'PWRatio': 0.29,
          'ZeroTo60': 3.19,
          'TopSpeed': 177,
          'QuartermileSec': 10.26,
          'Name': 'Motorbike 32',
          'WetWeight': 463,
          'Stop60': 114.4,
          'Color': '#FFFF99',
          'Price': 10999
        },
        {
          'MeanMPG': 37.7,
          'RearWheelHP': 142.6,
          'RearWheelTQLbFt': 73.3,
          'PWRatio': 0.32,
          'ZeroTo60': 3,
          'TopSpeed': 177,
          'QuartermileSec': 9.99,
          'Name': 'Motorbike 33',
          'WetWeight': 449,
          'Stop60': 117.5,
          'Color': '#E6AB02',
          'Price': 11299
        },
        {
          'MeanMPG': 41.7,
          'RearWheelHP': 132.9,
          'RearWheelTQLbFt': 76.4,
          'PWRatio': 0.24,
          'ZeroTo60': 2.91,
          'TopSpeed': 170,
          'QuartermileSec': 10.24,
          'Name': 'Motorbike 34',
          'WetWeight': 555,
          'Stop60': 112.4,
          'Color': '#80B1D3',
          'Price': 11499
        },
        {
          'MeanMPG': 40.5,
          'RearWheelHP': 134.4,
          'RearWheelTQLbFt': 80,
          'PWRatio': 0.24,
          'ZeroTo60': 2.91,
          'TopSpeed': 174,
          'QuartermileSec': 10.24,
          'Name': 'Motorbike 35',
          'WetWeight': 563,
          'Stop60': 115.3,
          'Color': '#BF5B17',
          'Price': 10999
        },
        {
          'MeanMPG': 39.3,
          'RearWheelHP': 90.2,
          'RearWheelTQLbFt': 43,
          'PWRatio': 0.2,
          'ZeroTo60': 3.36,
          'TopSpeed': 153,
          'QuartermileSec': 11.03,
          'Name': 'Motorbike 36',
          'WetWeight': 460,
          'Stop60': 114.5,
          'Color': '#66C2A5',
          'Price': 7799
        },
        {
          'MeanMPG': 39.7,
          'RearWheelHP': 94.1,
          'RearWheelTQLbFt': 42.9,
          'PWRatio': 0.22,
          'ZeroTo60': 3.46,
          'TopSpeed': 156,
          'QuartermileSec': 11.19,
          'Name': 'Motorbike 37',
          'WetWeight': 435,
          'Stop60': 115.5,
          'Color': '#B15928',
          'Price': 7899
        },
        {
          'MeanMPG': 40.7,
          'RearWheelHP': 96.6,
          'RearWheelTQLbFt': 43.6,
          'PWRatio': 0.22,
          'ZeroTo60': 2.89,
          'TopSpeed': 155,
          'QuartermileSec': 10.59,
          'Name': 'Motorbike 38',
          'WetWeight': 436,
          'Stop60': 111.3,
          'Color': '#F2F2F2',
          'Price': 8199
        },
        {
          'MeanMPG': 36.7,
          'RearWheelHP': 90.1,
          'RearWheelTQLbFt': 40.3,
          'PWRatio': 0.2,
          'ZeroTo60': 3.52,
          'TopSpeed': 156,
          'QuartermileSec': 11.26,
          'Name': 'Motorbike 39',
          'WetWeight': 440,
          'Stop60': 123.5,
          'Color': '#F1E2CC',
          'Price': 8499
        },
        {
          'MeanMPG': 43.1,
          'RearWheelHP': 99.61,
          'RearWheelTQLbFt': 43.01,
          'PWRatio': 0.23,
          'ZeroTo60': 3.18,
          'TopSpeed': 158.3,
          'QuartermileSec': 10.89,
          'Name': 'Motorbike 40',
          'WetWeight': 435,
          'Stop60': 126,
          'Color': '#1B9E77',
          'Price': 10799
        }
      ]

      if (!this.dimensions) {
        this.dimensions = Object.keys(this.myData[0])
      }
    },

    processCSV (url) {
      csv(url).then((data) => {
        let allVariables = Object.keys(data[0])
        let dimensions = {}
        for (let i of allVariables) {
          dimensions[i] = []
        }
        for (let i in data) {
          let row = data[i]
          if (row.constructor === Array) {
            continue
          }
          for (let j of allVariables) {
            let value = parseFloat(row[j])
            if (isNaN(value)) {
              dimensions[j].push(row[j])
            } else {
              dimensions[j].push(value)
            }
          }
        }
        this.myData = dimensions
      })
    },

    // Customize as needed
    handleHover (e, r, i) {
      this.hovered = e ? { r, i } : undefined
      if (this.hovered) {
        this.hoverRow = r
      } else {
        this.hovered = undefined
        this.hoverRow = undefined
      }
    },

    // Customize as needed
    handleClick (e, r, i) {
      this.clicked = e ? { r, i } : undefined
      if (this.clicked) {
        this.clickRow = r
      } else {
        this.clicked = undefined
        this.clickRow = undefined
      }
    }
  }
}
</script>
