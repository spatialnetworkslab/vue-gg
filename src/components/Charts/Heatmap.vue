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
    :width="parentWidth"
    :height="parentWidth"
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
      :x1="100"
      :x2="parentWidth - 25"
      :y1="25"
      :y2="parentWidth - 50"
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

          <vgg-symbol
            :x="90"
            :y="row.Name"
            :fill="row.Color"
            :size="8"
          />
        </vgg-map>
      </g>

      <vgg-rectangle
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
      />

      <vgg-x-axis
        :scale="dimensions"
        :label-font-size="10"
        :title-font-weight="700"
        :vjust="1.0"
        :tick-length="7"
        :title-hjust="0.5"
        :title-vjust="1.3"
        :title-font-size="14"
        title="Dimensions"
        label-rotate
        flip
      />

      <vgg-y-axis
        :scale="options"
        :title="options"
        :label-font-size="10"
        :title-font-weight="700"
        :hjust="0"
        :title-hjust="0.4"
        :title-vjust="-0.03"
        :tick-length="20"
        :tick-opacity="0.001"
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
      default: () => ['Price', 'Weight', 'Horsepower', 'Top Speed', 'Miles per Gallon']
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
          'Color': '#B3DE69'
        },
        {
          'Name': 'Motorbike 2',
          'Price': 19995,
          'Weight': 434,
          'Horsepower': 138,
          'Top Speed': 173,
          'Miles per Gallon': 35.9,
          'Color': '#CBD5E8'
        },
        {
          'Name': 'Motorbike 3',
          'Price': 11995,
          'Weight': 466,
          'Horsepower': 127.1,
          'Top Speed': 158,
          'Miles per Gallon': 32.6,
          'Color': '#E78AC3'
        },
        {
          'Name': 'Motorbike 4',
          'Price': 22995,
          'Weight': 425,
          'Horsepower': 171.8,
          'Top Speed': 177.6,
          'Miles per Gallon': 34.2,
          'Color': '#1F78B4'
        },
        {
          'Name': 'Motorbike 5',
          'Price': 8999,
          'Weight': 353.5,
          'Horsepower': 61.97,
          'Top Speed': 119.5,
          'Miles per Gallon': 57.7,
          'Color': '#8DD3C7'
        },
        {
          'Name': 'Motorbike 6',
          'Price': 10298,
          'Weight': 336.5,
          'Horsepower': 46.21,
          'Top Speed': 107.5,
          'Miles per Gallon': 45.6,
          'Color': '#FED9A6'
        },
        {
          'Name': 'Motorbike 7',
          'Price': 13399,
          'Weight': 668,
          'Horsepower': 104.5,
          'Top Speed': 130,
          'Miles per Gallon': 29.4,
          'Color': '#FFFF99'
        },
        {
          'Name': 'Motorbike 8',
          'Price': 12995,
          'Weight': 444.5,
          'Horsepower': 118.08,
          'Top Speed': 152.3,
          'Miles per Gallon': 41.1,
          'Color': '#8DA0CB'
        },
        {
          'Name': 'Motorbike 9',
          'Price': 10995,
          'Weight': 451,
          'Horsepower': 74.7,
          'Top Speed': 139,
          'Miles per Gallon': 45,
          'Color': '#B3CDE3'
        },
        {
          'Name': 'Motorbike 10',
          'Price': 11998,
          'Weight': 498,
          'Horsepower': 85.2,
          'Top Speed': 139,
          'Miles per Gallon': 37.3,
          'Color': '#FDDAEC'
        },
        {
          'Name': 'Motorbike 11',
          'Price': 12998,
          'Weight': 455,
          'Horsepower': 92.2,
          'Top Speed': 137,
          'Miles per Gallon': 37.1,
          'Color': '#CCEBC5'
        },
        {
          'Name': 'Motorbike 12',
          'Price': 14398,
          'Weight': 520,
          'Horsepower': 85.4,
          'Top Speed': 156,
          'Miles per Gallon': 45.4,
          'Color': '#33A02C'
        },
        {
          'Name': 'Motorbike 13',
          'Price': 14999,
          'Weight': 502,
          'Horsepower': 101.08,
          'Top Speed': 138.1,
          'Miles per Gallon': 37.5,
          'Color': '#FCCDE5'
        },
        {
          'Name': 'Motorbike 14',
          'Price': 13998,
          'Weight': 476.5,
          'Horsepower': 106.8,
          'Top Speed': 139,
          'Miles per Gallon': 37.7,
          'Color': '#7FC97F'
        },
        {
          'Name': 'Motorbike 15',
          'Price': 14398,
          'Weight': 443,
          'Horsepower': 106.51,
          'Top Speed': 140,
          'Miles per Gallon': 38.1,
          'Color': '#CCEBC5'
        },
        {
          'Name': 'Motorbike 16',
          'Price': 12889,
          'Weight': 578,
          'Horsepower': 163.9,
          'Top Speed': 158,
          'Miles per Gallon': 33.8,
          'Color': '#D95F02'
        },
        {
          'Name': 'Motorbike 17',
          'Price': 7399,
          'Weight': 542,
          'Horsepower': 101.7,
          'Top Speed': 151,
          'Miles per Gallon': 37,
          'Color': '#FB9A99'
        },
        {
          'Name': 'Motorbike 18',
          'Price': 8299,
          'Weight': 560,
          'Horsepower': 99.2,
          'Top Speed': 152,
          'Miles per Gallon': 39.3,
          'Color': '#A6D854'
        },
        {
          'Name': 'Motorbike 19',
          'Price': 5799,
          'Weight': 505,
          'Horsepower': 68.6,
          'Top Speed': 127,
          'Miles per Gallon': 32.3,
          'Color': '#FFFFCC'
        },
        {
          'Name': 'Motorbike 20',
          'Price': 14799,
          'Weight': 534,
          'Horsepower': 99.9,
          'Top Speed': 144,
          'Miles per Gallon': 30.6,
          'Color': '#BEBADA'
        },
        {
          'Name': 'Motorbike 21',
          'Price': 6999,
          'Weight': 500,
          'Horsepower': 53.9,
          'Top Speed': 114,
          'Miles per Gallon': 41.1,
          'Color': '#CCCCCC'
        },
        {
          'Name': 'Motorbike 22',
          'Price': 7699,
          'Weight': 492,
          'Horsepower': 56.31,
          'Top Speed': 120.1,
          'Miles per Gallon': 48.4,
          'Color': '#FF7F00'
        },
        {
          'Name': 'Motorbike 23',
          'Price': 12399,
          'Weight': 761,
          'Horsepower': 104.8,
          'Top Speed': 128,
          'Miles per Gallon': 40.7,
          'Color': '#BC80BD'
        },
        {
          'Name': 'Motorbike 24',
          'Price': 12490,
          'Weight': 562,
          'Horsepower': 69.7,
          'Top Speed': 129,
          'Miles per Gallon': 45.4,
          'Color': '#FC8D62'
        },
        {
          'Name': 'Motorbike 25',
          'Price': 13590,
          'Weight': 555,
          'Horsepower': 72.2,
          'Top Speed': 131,
          'Miles per Gallon': 43.3,
          'Color': '#FB8072'
        },
        {
          'Name': 'Motorbike 26',
          'Price': 18000,
          'Weight': 470.5,
          'Horsepower': 121.08,
          'Top Speed': 153.5,
          'Miles per Gallon': 30.3,
          'Color': '#FFFF33'
        },
        {
          'Name': 'Motorbike 27',
          'Price': 12498,
          'Weight': 410,
          'Horsepower': 115.35,
          'Top Speed': 141.75,
          'Miles per Gallon': 34.4,
          'Color': '#984EA3'
        },
        {
          'Name': 'Motorbike 28',
          'Price': 14995,
          'Weight': 463.5,
          'Horsepower': 115.5,
          'Top Speed': 156,
          'Miles per Gallon': 32,
          'Color': '#E31A1C'
        },
        {
          'Name': 'Motorbike 29',
          'Price': 14990,
          'Weight': 667,
          'Horsepower': 83.6,
          'Top Speed': 123.1,
          'Miles per Gallon': 30,
          'Color': '#377EB8'
        },
        {
          'Name': 'Motorbike 30',
          'Price': 10999,
          'Weight': 480,
          'Horsepower': 109.44,
          'Top Speed': 141.7,
          'Miles per Gallon': 44.3,
          'Color': '#BEAED4'
        },
        {
          'Name': 'Motorbike 31',
          'Price': 11599,
          'Weight': 440,
          'Horsepower': 150.9,
          'Top Speed': 178,
          'Miles per Gallon': 38.5,
          'Color': '#E7298A'
        },
        {
          'Name': 'Motorbike 32',
          'Price': 10999,
          'Weight': 463,
          'Horsepower': 136.1,
          'Top Speed': 177,
          'Miles per Gallon': 41,
          'Color': '#FFFF99'
        },
        {
          'Name': 'Motorbike 33',
          'Price': 11299,
          'Weight': 449,
          'Horsepower': 142.6,
          'Top Speed': 177,
          'Miles per Gallon': 37.7,
          'Color': '#E6AB02'
        },
        {
          'Name': 'Motorbike 34',
          'Price': 11499,
          'Weight': 555,
          'Horsepower': 132.9,
          'Top Speed': 170,
          'Miles per Gallon': 41.7,
          'Color': '#80B1D3'
        },
        {
          'Name': 'Motorbike 35',
          'Price': 10999,
          'Weight': 563,
          'Horsepower': 134.4,
          'Top Speed': 174,
          'Miles per Gallon': 40.5,
          'Color': '#BF5B17'
        },
        {
          'Name': 'Motorbike 36',
          'Price': 7799,
          'Weight': 460,
          'Horsepower': 90.2,
          'Top Speed': 153,
          'Miles per Gallon': 39.3,
          'Color': '#66C2A5'
        },
        {
          'Name': 'Motorbike 37',
          'Price': 7899,
          'Weight': 435,
          'Horsepower': 94.1,
          'Top Speed': 156,
          'Miles per Gallon': 39.7,
          'Color': '#B15928'
        },
        {
          'Name': 'Motorbike 38',
          'Price': 8199,
          'Weight': 436,
          'Horsepower': 96.6,
          'Top Speed': 155,
          'Miles per Gallon': 40.7,
          'Color': '#F2F2F2'
        },
        {
          'Name': 'Motorbike 39',
          'Price': 8499,
          'Weight': 440,
          'Horsepower': 90.1,
          'Top Speed': 156,
          'Miles per Gallon': 36.7,
          'Color': '#F1E2CC'
        },
        {
          'Name': 'Motorbike 40',
          'Price': 10799,
          'Weight': 435,
          'Horsepower': 99.61,
          'Top Speed': 158.3,
          'Miles per Gallon': 43.1,
          'Color': '#1B9E77'
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
