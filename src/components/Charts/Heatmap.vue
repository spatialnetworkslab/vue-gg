<!--
SAMPLE COMPONENT DEFINITION

When changing number of dimensions:

1. Change dimensions prop (see commented out props)

When changing number of options:

1. Comment out parts of JSON in getData() as needed (this file has 40 objects by default)

-->

<template>

  <!-- If changing the size of the chart, change total chart size here first -->
  <vgg-graphic
    v-if="myData"
    :width="1200"
    :height="1000"
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
      :x1="150"
      :x2="900"
      :y1="100"
      :y2="900"
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
            :fill="{val: row[dim], scale: { type: 'blues', domain: dim }}"
            @hover="handleHover($event, row, i)"
            @click="handleClick($event, row, i)"
          />

          <!-- <vgg-symbol
            :x="110"
            :y="row.Name"
            :fill="row.Color"
            :size="10"
          /> -->
        </vgg-map>
      </g>

      <!-- <vgg-rectangle
        v-if="hoverRow"
        :x1="100"
        :x2="parentWidth - 25"
        :y="hovered.r[options]"
        :h="(y2 - y1)/myData.length"
        :fill="'none'"
        :stroke="'red'"
        :stroke-width="5"
      />

      <vgg-rectangle
        v-if="clickRow"
        :x1="25"
        :x2="parentWidth - 25"
        :y="clicked.r[options]"
        :h="(y2 - y1)/myData.length"
        :fill="'none'"
        :stroke="'red'"
        :stroke-width="5"
      /> -->

      <vgg-x-axis
        :scale="dimensions"
        :label-font-size="12"
        :title-font-weight="700"
        :vjust="1.0"
        :tick-length="7"
        :title-hjust="1.1"
        :title-vjust="0.5"
        :title-font-size="16"
        title="Dimensions"
        label-rotate
        flip
      />

      <vgg-idc-y-axis
        :scale="options"
        :title="options"
        :label-color="colors"
        :label-font-size="12"
        :title-font-weight="700"
        :hjust="0"
        :title-hjust="0.4"
        :title-vjust="-0.03"
        :tick-length="16"
        :tick-opacity="0.001"
        :title-font-size="16"
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
      default: () => // ['Price', 'Weight', 'Horsepower', 'Top Speed', 'Miles per Gallon', 'Zero to 60', 'Braking 60 mph', 'Torque', 'Quartermile Second', 'Power to Weight']
        ['Price', 'Weight', 'Horsepower', 'Top Speed', 'Miles per Gallon']
      //  ['Price', 'Weight', 'Horsepower']
    },

    options: {
      type: String,
      default: 'Name'
    },

    x1: {
      type: Number,
      default: 200
    },

    x2: {
      type: Number,
      default: 800
    },

    y1: {
      type: Number,
      default: 100
    },

    y2: {
      type: Number,
      default: 1000
    },

    width: {
      type: Number,
      default: 1000
    },

    height: {
      type: Number,
      default: 1100
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
    parentWidth () {
      return this.$parent.width
    },

    axisLabelFontSize () {
      if (this.parentWidth < 1000) {
        return 7
      }
      return 10
    },

    titleFontSize () {
      if (this.parentWidth < 1000) {
        return 11
      }
      return 16
    },

    pointRadius () {
      if (this.parentWidth < 1000) {
        return 2.5
      }
      return 3
    },

    hoverRadius () {
      if (this.parentWidth < 1000) {
        return 4
      }
      return 5
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
          'Name': 'Motorbike 1',
          'Price': 10995,
          'Weight': 515,
          'Horsepower': 101.9,
          'Top Speed': 147,
          'Miles per Gallon': 31.6,
          'Zero to 60': 3.03,
          'Braking 60 mph': 116.8,
          'Torque': 61.2,
          'Quartermile Second': 10.97,
          'Power to Weight': 0.2,
          'Color': '#B3DE69'
        },
        {
          'Name': 'Motorbike 2',
          'Price': 19995,
          'Weight': 434,
          'Horsepower': 138,
          'Top Speed': 173,
          'Miles per Gallon': 35.9,
          'Zero to 60': 3.01,
          'Braking 60 mph': 114.9,
          'Torque': 77.9,
          'Quartermile Second': 10.16,
          'Power to Weight': 0.32,
          'Color': '#CBD5E8'
        },
        {
          'Name': 'Motorbike 3',
          'Price': 11995,
          'Weight': 466,
          'Horsepower': 127.1,
          'Top Speed': 158,
          'Miles per Gallon': 32.6,
          'Zero to 60': 3.15,
          'Braking 60 mph': 133.53,
          'Torque': 71.1,
          'Quartermile Second': 10.51,
          'Power to Weight': 0.27,
          'Color': '#E78AC3'
        },
        {
          'Name': 'Motorbike 4',
          'Price': 22995,
          'Weight': 425,
          'Horsepower': 171.8,
          'Top Speed': 177.6,
          'Miles per Gallon': 34.2,
          'Zero to 60': 2.98,
          'Braking 60 mph': 119.1,
          'Torque': 86.04,
          'Quartermile Second': 9.91,
          'Power to Weight': 0.4,
          'Color': '#1F78B4'
        },
        {
          'Name': 'Motorbike 5',
          'Price': 8999,
          'Weight': 353.5,
          'Horsepower': 61.97,
          'Top Speed': 119.5,
          'Miles per Gallon': 57.7,
          'Zero to 60': 3.73,
          'Braking 60 mph': 117.5,
          'Torque': 46.58,
          'Quartermile Second': 12.05,
          'Power to Weight': 0.26,
          'Color': '#8DD3C7'
        }
        // {
        //   'Name': 'Motorbike 6',
        //   'Price': 10298,
        //   'Weight': 336.5,
        //   'Horsepower': 46.21,
        //   'Top Speed': 107.5,
        //   'Miles per Gallon': 45.6,
        //   'Zero to 60': 4.56,
        //   'Braking 60 mph': 144.2,
        //   'Torque': 35.65,
        //   'Quartermile Second': 13.12,
        //   'Power to Weight': 0.14,
        //   'Color': '#FED9A6'
        // },
        // {
        //   'Name': 'Motorbike 7',
        //   'Price': 13399,
        //   'Weight': 668,
        //   'Horsepower': 104.5,
        //   'Top Speed': 130,
        //   'Miles per Gallon': 29.4,
        //   'Zero to 60': 3.88,
        //   'Braking 60 mph': 120.4,
        //   'Torque': 110.2,
        //   'Quartermile Second': 11.91,
        //   'Power to Weight': 0.16,
        //   'Color': '#FFFF99'
        // },
        // {
        //   'Name': 'Motorbike 8',
        //   'Price': 12995,
        //   'Weight': 444.5,
        //   'Horsepower': 118.08,
        //   'Top Speed': 152.3,
        //   'Miles per Gallon': 41.1,
        //   'Zero to 60': 3.24,
        //   'Braking 60 mph': 112.9,
        //   'Torque': 62.68,
        //   'Quartermile Second': 10.88,
        //   'Power to Weight': 0.27,
        //   'Color': '#8DA0CB'
        // },
        // {
        //   'Name': 'Motorbike 9',
        //   'Price': 10995,
        //   'Weight': 451,
        //   'Horsepower': 74.7,
        //   'Top Speed': 139,
        //   'Miles per Gallon': 45,
        //   'Zero to 60': 3.64,
        //   'Braking 60 mph': 114.4,
        //   'Torque': 55.3,
        //   'Quartermile Second': 11.74,
        //   'Power to Weight': 0.17,
        //   'Color': '#B3CDE3'
        // },
        // {
        //   'Name': 'Motorbike 10',
        //   'Price': 11998,
        //   'Weight': 498,
        //   'Horsepower': 85.2,
        //   'Top Speed': 139,
        //   'Miles per Gallon': 37.3,
        //   'Zero to 60': 3.22,
        //   'Braking 60 mph': 128.5,
        //   'Torque': 60.4,
        //   'Quartermile Second': 11.18,
        //   'Power to Weight': 0.17,
        //   'Color': '#FDDAEC'
        // },
        // {
        //   'Name': 'Motorbike 11',
        //   'Price': 12998,
        //   'Weight': 455,
        //   'Horsepower': 92.2,
        //   'Top Speed': 137,
        //   'Miles per Gallon': 37.1,
        //   'Zero to 60': 3.6,
        //   'Braking 60 mph': 118.5,
        //   'Torque': 62.6,
        //   'Quartermile Second': 11.45,
        //   'Power to Weight': 0.2,
        //   'Color': '#CCEBC5'
        // },
        // {
        //   'Name': 'Motorbike 12',
        //   'Price': 14398,
        //   'Weight': 520,
        //   'Horsepower': 85.4,
        //   'Top Speed': 156,
        //   'Miles per Gallon': 45.4,
        //   'Zero to 60': 3.45,
        //   'Braking 60 mph': 125,
        //   'Torque': 61.1,
        //   'Quartermile Second': 11.6,
        //   'Power to Weight': 0.16,
        //   'Color': '#33A02C'
        // },
        // {
        //   'Name': 'Motorbike 13',
        //   'Price': 14999,
        //   'Weight': 502,
        //   'Horsepower': 101.08,
        //   'Top Speed': 138.1,
        //   'Miles per Gallon': 37.5,
        //   'Zero to 60': 3.53,
        //   'Braking 60 mph': 127.7,
        //   'Torque': 64.52,
        //   'Quartermile Second': 11.7,
        //   'Power to Weight': 0.2,
        //   'Color': '#FCCDE5'
        // },
        // {
        //   'Name': 'Motorbike 14',
        //   'Price': 13998,
        //   'Weight': 476.5,
        //   'Horsepower': 106.8,
        //   'Top Speed': 139,
        //   'Miles per Gallon': 37.7,
        //   'Zero to 60': 3.32,
        //   'Braking 60 mph': 115.1,
        //   'Torque': 66.3,
        //   'Quartermile Second': 11.15,
        //   'Power to Weight': 0.23,
        //   'Color': '#7FC97F'
        // },
        // {
        //   'Name': 'Motorbike 15',
        //   'Price': 14398,
        //   'Weight': 443,
        //   'Horsepower': 106.51,
        //   'Top Speed': 140,
        //   'Miles per Gallon': 38.1,
        //   'Zero to 60': 3.35,
        //   'Braking 60 mph': 126,
        //   'Torque': 67.73,
        //   'Quartermile Second': 11.17,
        //   'Power to Weight': 0.24,
        //   'Color': '#CCEBC5'
        // },
        // {
        //   'Name': 'Motorbike 16',
        //   'Price': 12889,
        //   'Weight': 578,
        //   'Horsepower': 163.9,
        //   'Top Speed': 158,
        //   'Miles per Gallon': 33.8,
        //   'Zero to 60': 2.86,
        //   'Braking 60 mph': 119.6,
        //   'Torque': 97.2,
        //   'Quartermile Second': 9.99,
        //   'Power to Weight': 0.28,
        //   'Color': '#D95F02'
        // },
        // {
        //   'Name': 'Motorbike 17',
        //   'Price': 7399,
        //   'Weight': 542,
        //   'Horsepower': 101.7,
        //   'Top Speed': 151,
        //   'Miles per Gallon': 37,
        //   'Zero to 60': 3.07,
        //   'Braking 60 mph': 114.2,
        //   'Torque': 73.8,
        //   'Quartermile Second': 10.75,
        //   'Power to Weight': 0.19,
        //   'Color': '#FB9A99'
        // },
        // {
        //   'Name': 'Motorbike 18',
        //   'Price': 8299,
        //   'Weight': 560,
        //   'Horsepower': 99.2,
        //   'Top Speed': 152,
        //   'Miles per Gallon': 39.3,
        //   'Zero to 60': 3.36,
        //   'Braking 60 mph': 116.5,
        //   'Torque': 77.1,
        //   'Quartermile Second': 11.34,
        //   'Power to Weight': 0.18,
        //   'Color': '#A6D854'
        // },
        // {
        //   'Name': 'Motorbike 19',
        //   'Price': 5799,
        //   'Weight': 505,
        //   'Horsepower': 68.6,
        //   'Top Speed': 127,
        //   'Miles per Gallon': 32.3,
        //   'Zero to 60': 3.97,
        //   'Braking 60 mph': 114.1,
        //   'Torque': 36.5,
        //   'Quartermile Second': 12.16,
        //   'Power to Weight': 0.14,
        //   'Color': '#FFFFCC'
        // },
        // {
        //   'Name': 'Motorbike 20',
        //   'Price': 14799,
        //   'Weight': 534,
        //   'Horsepower': 99.9,
        //   'Top Speed': 144,
        //   'Miles per Gallon': 30.6,
        //   'Zero to 60': 3.12,
        //   'Braking 60 mph': 118.5,
        //   'Torque': 70.8,
        //   'Quartermile Second': 10.95,
        //   'Power to Weight': 0.19,
        //   'Color': '#BEBADA'
        // }
        // {
        //   'Name': 'Motorbike 21',
        //   'Price': 6999,
        //   'Weight': 500,
        //   'Horsepower': 53.9,
        //   'Top Speed': 114,
        //   'Miles per Gallon': 41.1,
        //   'Zero to 60': 5.2,
        //   'Braking 60 mph': 115,
        //   'Torque': 40.8,
        //   'Quartermile Second': 13.52,
        //   'Power to Weight': 0.11,
        //   'Color': '#CCCCCC'
        // },
        // {
        //   'Name': 'Motorbike 22',
        //   'Price': 7699,
        //   'Weight': 492,
        //   'Horsepower': 56.31,
        //   'Top Speed': 120.1,
        //   'Miles per Gallon': 48.4,
        //   'Zero to 60': 5.21,
        //   'Braking 60 mph': 117.1,
        //   'Torque': 43.48,
        //   'Quartermile Second': 13.52,
        //   'Power to Weight': 0.11,
        //   'Color': '#FF7F00'
        // },
        // {
        //   'Name': 'Motorbike 23',
        //   'Price': 12399,
        //   'Weight': 761,
        //   'Horsepower': 104.8,
        //   'Top Speed': 128,
        //   'Miles per Gallon': 40.7,
        //   'Zero to 60': 3.65,
        //   'Braking 60 mph': 135.4,
        //   'Torque': 97.2,
        //   'Quartermile Second': 11.62,
        //   'Power to Weight': 0.14,
        //   'Color': '#BC80BD'
        // },
        // {
        //   'Name': 'Motorbike 24',
        //   'Price': 12490,
        //   'Weight': 562,
        //   'Horsepower': 69.7,
        //   'Top Speed': 129,
        //   'Miles per Gallon': 45.4,
        //   'Zero to 60': 5.14,
        //   'Braking 60 mph': 127.7,
        //   'Torque': 54.1,
        //   'Quartermile Second': 13.1,
        //   'Power to Weight': 0.12,
        //   'Color': '#FC8D62'
        // },
        // {
        //   'Name': 'Motorbike 25',
        //   'Price': 13590,
        //   'Weight': 555,
        //   'Horsepower': 72.2,
        //   'Top Speed': 131,
        //   'Miles per Gallon': 43.3,
        //   'Zero to 60': 3.87,
        //   'Braking 60 mph': 119.4,
        //   'Torque': 61.9,
        //   'Quartermile Second': 12.11,
        //   'Power to Weight': 0.13,
        //   'Color': '#FB8072'
        // },
        // {
        //   'Name': 'Motorbike 26',
        //   'Price': 18000,
        //   'Weight': 470.5,
        //   'Horsepower': 121.08,
        //   'Top Speed': 153.5,
        //   'Miles per Gallon': 30.3,
        //   'Zero to 60': 2.99,
        //   'Braking 60 mph': 115.1,
        //   'Torque': 71.85,
        //   'Quartermile Second': 10.5,
        //   'Power to Weight': 0.26,
        //   'Color': '#FFFF33'
        // },
        // {
        //   'Name': 'Motorbike 27',
        //   'Price': 12498,
        //   'Weight': 410,
        //   'Horsepower': 115.35,
        //   'Top Speed': 141.75,
        //   'Miles per Gallon': 34.4,
        //   'Zero to 60': 3.75,
        //   'Braking 60 mph': 125.5,
        //   'Torque': 55.11,
        //   'Quartermile Second': 11.1,
        //   'Power to Weight': 0.28,
        //   'Color': '#984EA3'
        // },
        // {
        //   'Name': 'Motorbike 28',
        //   'Price': 14995,
        //   'Weight': 463.5,
        //   'Horsepower': 115.5,
        //   'Top Speed': 156,
        //   'Miles per Gallon': 32,
        //   'Zero to 60': 3.24,
        //   'Braking 60 mph': 123.6,
        //   'Torque': 62.2,
        //   'Quartermile Second': 10.67,
        //   'Power to Weight': 0.25,
        //   'Color': '#E31A1C'
        // },
        // {
        //   'Name': 'Motorbike 29',
        //   'Price': 14990,
        //   'Weight': 667,
        //   'Horsepower': 83.6,
        //   'Top Speed': 123.1,
        //   'Miles per Gallon': 30,
        //   'Zero to 60': 5.05,
        //   'Braking 60 mph': 119.8,
        //   'Torque': 73,
        //   'Quartermile Second': 13.3,
        //   'Power to Weight': 0.13,
        //   'Color': '#377EB8'
        // },
        // {
        //   'Name': 'Motorbike 30',
        //   'Price': 10999,
        //   'Weight': 480,
        //   'Horsepower': 109.44,
        //   'Top Speed': 141.7,
        //   'Miles per Gallon': 44.3,
        //   'Zero to 60': 3.15,
        //   'Braking 60 mph': 114.5,
        //   'Torque': 64.45,
        //   'Quartermile Second': 10.99,
        //   'Power to Weight': 0.23,
        //   'Color': '#BEAED4'
        // },
        // {
        //   'Name': 'Motorbike 31',
        //   'Price': 11599,
        //   'Weight': 440,
        //   'Horsepower': 150.9,
        //   'Top Speed': 178,
        //   'Miles per Gallon': 38.5,
        //   'Zero to 60': 2.95,
        //   'Braking 60 mph': 122.8,
        //   'Torque': 75.7,
        //   'Quartermile Second': 9.94,
        //   'Power to Weight': 0.34,
        //   'Color': '#E7298A'
        // },
        // {
        //   'Name': 'Motorbike 32',
        //   'Price': 10999,
        //   'Weight': 463,
        //   'Horsepower': 136.1,
        //   'Top Speed': 177,
        //   'Miles per Gallon': 41,
        //   'Zero to 60': 3.19,
        //   'Braking 60 mph': 114.4,
        //   'Torque': 71.4,
        //   'Quartermile Second': 10.26,
        //   'Power to Weight': 0.29,
        //   'Color': '#FFFF99'
        // },
        // {
        //   'Name': 'Motorbike 33',
        //   'Price': 11299,
        //   'Weight': 449,
        //   'Horsepower': 142.6,
        //   'Top Speed': 177,
        //   'Miles per Gallon': 37.7,
        //   'Zero to 60': 3,
        //   'Braking 60 mph': 117.5,
        //   'Torque': 73.3,
        //   'Quartermile Second': 9.99,
        //   'Power to Weight': 0.32,
        //   'Color': '#E6AB02'
        // },
        // {
        //   'Name': 'Motorbike 34',
        //   'Price': 11499,
        //   'Weight': 555,
        //   'Horsepower': 132.9,
        //   'Top Speed': 170,
        //   'Miles per Gallon': 41.7,
        //   'Zero to 60': 2.91,
        //   'Braking 60 mph': 112.4,
        //   'Torque': 76.4,
        //   'Quartermile Second': 10.24,
        //   'Power to Weight': 0.24,
        //   'Color': '#80B1D3'
        // },
        // {
        //   'Name': 'Motorbike 35',
        //   'Price': 10999,
        //   'Weight': 563,
        //   'Horsepower': 134.4,
        //   'Top Speed': 174,
        //   'Miles per Gallon': 40.5,
        //   'Zero to 60': 2.91,
        //   'Braking 60 mph': 115.3,
        //   'Torque': 80,
        //   'Quartermile Second': 10.24,
        //   'Power to Weight': 0.24,
        //   'Color': '#BF5B17'
        // },
        // {
        //   'Name': 'Motorbike 36',
        //   'Price': 7799,
        //   'Weight': 460,
        //   'Horsepower': 90.2,
        //   'Top Speed': 153,
        //   'Miles per Gallon': 39.3,
        //   'Zero to 60': 3.36,
        //   'Braking 60 mph': 114.5,
        //   'Torque': 43,
        //   'Quartermile Second': 11.03,
        //   'Power to Weight': 0.2,
        //   'Color': '#66C2A5'
        // },
        // {
        //   'Name': 'Motorbike 37',
        //   'Price': 7899,
        //   'Weight': 435,
        //   'Horsepower': 94.1,
        //   'Top Speed': 156,
        //   'Miles per Gallon': 39.7,
        //   'Zero to 60': 3.46,
        //   'Braking 60 mph': 115.5,
        //   'Torque': 42.9,
        //   'Quartermile Second': 11.19,
        //   'Power to Weight': 0.22,
        //   'Color': '#B15928'
        // },
        // {
        //   'Name': 'Motorbike 38',
        //   'Price': 8199,
        //   'Weight': 436,
        //   'Horsepower': 96.6,
        //   'Top Speed': 155,
        //   'Miles per Gallon': 40.7,
        //   'Zero to 60': 2.89,
        //   'Braking 60 mph': 111.3,
        //   'Torque': 43.6,
        //   'Quartermile Second': 10.59,
        //   'Power to Weight': 0.22,
        //   'Color': '#F2F2F2'
        // },
        // {
        //   'Name': 'Motorbike 39',
        //   'Price': 8499,
        //   'Weight': 440,
        //   'Horsepower': 90.1,
        //   'Top Speed': 156,
        //   'Miles per Gallon': 36.7,
        //   'Zero to 60': 3.52,
        //   'Braking 60 mph': 123.5,
        //   'Torque': 40.3,
        //   'Quartermile Second': 11.26,
        //   'Power to Weight': 0.2,
        //   'Color': '#F1E2CC'
        // },
        // {
        //   'Name': 'Motorbike 40',
        //   'Price': 10799,
        //   'Weight': 435,
        //   'Horsepower': 99.61,
        //   'Top Speed': 158.3,
        //   'Miles per Gallon': 43.1,
        //   'Zero to 60': 3.18,
        //   'Braking 60 mph': 126,
        //   'Torque': 43.01,
        //   'Quartermile Second': 10.89,
        //   'Power to Weight': 0.23,
        //   'Color': '#1B9E77'
        // }
      ]

      if (!this.dimensions) {
        this.dimensions = Object.keys(this.myData[0])
      }
      console.log(this.myData)
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
