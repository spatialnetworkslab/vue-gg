<template>
  <div>
    <br>
    <vgg-graphic
      :width="width"
      :height="height"
      :data="myData"
    >
      <g v-if="myData">
        <vgg-section
          :x1="x1"
          :x2="x2"
          :y1="y1"
          :y2="y2"
          :scale-x="[0, 10]"
          :scale-y="[0, 10]"
          :transform="[
            { rename: extractVariables }
          ]"
        >

          <vgg-map
            v-slot="{ dataframe }"
            unit="dataframe">
            <vgg-y-axis
              v-for="dim, d in axes(dataframe, dimensions, options)"
              :key="d"
              :scale="{domain: dim.domain}"
              :hjust="1/ dimensions.length * d"
              :title="dim.dimension"
              :title-vjust="1.05"
              :title-hjust="0.5"
              :tick-opacity="3"
              :title-font-size="12"
              :tick-length="0.01"
              :label-font-size="10"
              :title-font-weight="700"
            />

            <vgg-multi-line
              v-for="segment, i in segments(dataframe, dimensions, options)"
              :key="i + dimensions.length"
              :x="segment.x"
              :y="segment.y"
              :stroke="segment.color"
              stroke-linecap="round"
              @hover="handleHover($event, segment, dataframe[options][i], i)"
            />
          </vgg-map>
          <vgg-multi-line
            v-if="hoverRow"
            :x="hoverRow.x"
            :y="hoverRow.y"
            :stroke-width="5"
            stroke="black"
          />

        </vgg-section>
      </g>

    </vgg-graphic>

  </div>
</template>

<script>
import { csv } from 'd3-fetch'
import { scaleOrdinal, scaleLinear } from 'd3-scale'

export default {
  name: 'ParallelCoordinates',
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
      axesScales: undefined
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

    newScales () {
      let scales = {}
      if (this.axesScales) {
        for (let a in this.axesScales) {
          let aScale = this.axesScales[a]; let scale
          if (isNaN(parseFloat(aScale.domain[0]))) {
            let range = []
            let delta = 10 / aScale.domain.length
            for (let i = 0.5; i <= aScale.domain.length; i++) {
              range.push(delta * (i))
            }
            scale = scaleOrdinal().domain(aScale.domain).range(range)
          } else {
            scale = scaleLinear().domain(aScale.domain).range([0, 10])
          }
          scales[aScale.dimension] = scale
        }
      }
      return scales
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
    handleHover (e, s, r, i) {
      this.hovered = e ? { r, i } : undefined
      if (this.hovered) {
        this.hoverRow = s
      } else {
        this.hovered = undefined
        this.hoverRow = undefined
      }
    },

    createDomain (domain) {
      let newDomain = [ Math.min(...domain), Math.max(...domain)]; let rounder = 1

      if (newDomain[0] > 1000 && newDomain[1] > 1000) {
        rounder = 1000
      } else if (newDomain[0] > 100 && newDomain[1] > 100) {
        rounder = 100
      } else if (newDomain[0] > 10 && newDomain[1] > 10) {
        rounder = 10
      } else if (newDomain[0] > 1 && newDomain[1] > 1) {
        rounder = 1
      }

      newDomain = [ Math.floor(newDomain[0] / rounder) * rounder, Math.ceil(newDomain[1] / rounder) * rounder]

      return newDomain
    },

    // Manually creates scales per dimension axes
    axes (dataframe, dimensions, options) {
      let newAxes = []
      for (let dim = 0; dim < dimensions.length; dim++) {
        let domain = dataframe[dimensions[dim]]

        if (isNaN(parseFloat(domain[0]))) {
          newAxes.push({ dimension: dimensions[dim], domain })
        } else {
          newAxes.push({ dimension: dimensions[dim], domain: this.createDomain(domain) })
        }
      }
      this.axesScales = newAxes
      return newAxes
    },

    segments (dataframe, dimensions, options) {
      let segments = []
      for (let d = 0; d < dataframe[this.options].length; d++) {
        let y = []; let x = []
        let deltaX = 10 / dimensions.length

        for (let i = 0; i < dimensions.length; i++) {
          x.push(deltaX * i)
          y.push(this.newScales[dimensions[i]](dataframe[dimensions[i]][d]))
        }
        segments.push({ x, y, color: this.myData[this.color][d] })
      }

      return segments
    }
  }
}
</script>
