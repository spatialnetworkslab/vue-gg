<template>
  <vgg-graphic
    v-if="myData"
    :width="1000"
    :height="1000"
    :data="myData"
  >

    <vgg-section
      :x1="200"
      :x2="900"
      :y1="150"
      :y2="900"
      :scale-x="dimensions"
      :scale-y="options"
      :transform="[
        { rename: extractVariables },

      ]"
    >
      <!-- { transform: df => { log(df, colors); return df } } -->
      <g v-for="dim, d in dimensions">
        <vgg-map v-slot="{ row, i }">
          <vgg-rectangle
            :x="dim"
            :y="row.Name"
            :w="{ band: { domain: dimensions } }"
            :h="{ band: { domain: options } }"
            :fill="{val: row[dim], scale: { type: 'blues', domain: dim}}"
            @hover="handleHover($event, row, i)"
          />
          <!-- <vgg-rectangle
            v-if="hoverRow"
            :x="hoverRow[dim]"
            :y="hoverRow.Name"
            :w="{ band: { domain: dimensions } }"
            :h="{ band: { domain: options } }"
            stroke="black"
          /> -->
          <!-- <vgg-rectangle
            v-if="hoverRow"
            :x="dim"
            :y="row.Name"
            :w="{ band: { domain: dimensions } }"
            :h="{ band: { domain: options } }"
            :fill="{val: row[dim], scale: { type: 'blues', domain: dim}}"
            stroke="black"
          /> -->
        </vgg-map>
      </g>

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
      hoverRow: undefined
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
      // console.log(this.hoverRow)
    }

  }
}
</script>
