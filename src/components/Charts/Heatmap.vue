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
  :extract-variables="{
    'Base MSRP': 'Price',
    'Wet Weight': 'WetWeight',
    '0–60 mph sec': 'ZeroTo60',
    'Rear-Wheel HP':'RearWheelHorsepower',
    'Top Speed': 'TopSpeed',
    'Average MPG': 'MilesPG',
    '0–60 mph sec': 'ZeroTo60',
    'Braking 60 to 0 mph (feet)': 'Stop60',
    'Rear-Wheel TQ Lb-Ft': 'RearWheelTQLbFt',
    'Quartermile Sec':'QuartermileSec'}"
  :color="'Color'"
  :dimensions="['Price', 'WetWeight', 'RearWheelHorsepower', 'TopSpeed', 'MilesPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio']"
  :options="'Name'"

/> -->

<template>

  <!-- If changing the size of the chart, change total chart size here first -->
  <vgg-graphic
    v-if="myData"
    :width="width"
    :height="height"
    :data="myData"
  >

    <!-- If changing the size of the chart, remember to change x1, x2, y1 and y2 values as well -->
    <vgg-section
      :x1="x1"
      :x2="x2"
      :y1="y1"
      :y2="y2"
      :scale-x="dimensions"
      :scale-y="options"
      :transform="[
        { rename: extractVariables },

      ]"
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
        :h="(y2 - y1)/myData[options].length"
        :fill="'none'"
        :stroke="'red'"
        :stroke-width="5"
      />

      <vgg-rectangle
        v-if="clickRow"
        :x1="x1"
        :x2="x2"
        :y="clicked.r[options]"
        :h="(y2 - y1)/myData[options].length"
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
        :label-color="myData[color]"
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
      type: Array,
      default: undefined
    },

    options: {
      type: String,
      default: undefined
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
        colors.push(this.myData[this.color][i])
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
      if (this.data) {
        this.myData = this.data
      } if (!this.csvURL) {
        throw new Error('Please provide either data or csvURL')
      } else {
        this.processCSV(this.csvURL)
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
