<!--
SAMPLE COMPONENT DEFINITION

<vgg-radar
  :x1="100"
  :x2="1100"
  :y1="100"
  :y2="1900"
  :width="1200"
  :height="2000"
  :rows="8"
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
/>
-->
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
          :scale-x="[0, 100]"
          :scale-y="[0, 100]"
          :transform="[
            { rename: extractVariables }
          ]"
        >
          <vgg-grid
            :rows="rows"
            :cell-padding="{
              t: 2.5,
              l: 2,
              r: 2.5
            }"
          >
            <!-- <vgg-map
              v-slot="{ dataframe }"
              unit="dataframe"> -->
            <vgg-map v-slot="{ row, i }">
              <!-- <vgg-section
                v-for="s in dataframe[options].length"
                :key="s"
                :scale-x="[0, 10]"
                :scale-y="[0, 10]"
                type="polar"
              > -->

              <vgg-section
                :scale-x="[0, 10]"
                :scale-y="[0, 10]"
                :grid-lines="['x', 'y']"
                type="polar"
              >
                <vgg-rectangle
                  v-if="hoverRow"
                  :x1="0"
                  :x2="10"
                  :y1="0"
                  :y2="10"
                  :stroke="hoverRow.Name === row.Name ? 'black' : 'none'"
                  :stroke-width="5"
                  :fill="'none'"
                />

                <vgg-rectangle
                  v-if="clickRow"
                  :x1="0"
                  :x2="10"
                  :y1="0"
                  :y2="10"
                  :stroke="clickRow.Name === row.Name ? 'red' : 'none'"
                  :stroke-width="5"
                  :fill="'none'"
                />

                <vgg-map
                  v-slot="{ dataframe }"
                  unit="dataframe">

                  <vgg-label
                    v-for="dim, d in dimensions"
                    :key="d"
                    :text="dim"
                    :x="10/dimensions.length * d"
                    :y="11"
                    :opacity="0.5"
                    :font-size="6"
                    :font-weight="700"
                    :rotation="360/(dimensions.length-1) * (d % 5)"
                  />

                  <vgg-y-axis
                    v-for="dim, d in axes(dataframe, dimensions,options)"
                    :key="d + dimensions.length"
                    :scale="{domain: dim.domain, domainMin: 0}"
                    :hjust="1/ dimensions.length * d"
                    :tick-length="0.01"
                    :domain-opacity="0.2"
                    :label-font-size="6"
                    :label-opacity="0.4"
                    :title-font-weight="700"
                    :tick-count="2"
                  />

                  <vgg-rectangle
                    :key="100+i"
                    :x1="0"
                    :x2="10"
                    :y1="0"
                    :y2="10"
                    :fill-opacity="0.1"
                    fill="grey"
                    @hover="handleHover($event, row, i)"
                    @click="handleClick($event, row, i)"
                  />

                  <vgg-multi-line
                    :x="scaleCoords(dataframe, i).x"
                    :y="scaleCoords(dataframe, i).y"
                    :stroke="'black'"
                    :close="true"
                    :fill-opacity="0.4"
                    :fill="dataframe[color][i]"
                    stroke-linecap="round"
                  />
                </vgg-map>
                <!--
                <vgg-label
                  :text="dataframe[options][s-1]"
                  :x="5"
                  :y="0"
                  :opacity="0.2"
                  :font-size="20"
                  :font-weight="700"/> -->

              </vgg-section>
            </vgg-map>
          </vgg-grid>
        </vgg-section>
      </g>
    </vgg-graphic>

  </div>
</template>

<script>
import { csv } from 'd3-fetch'
import { scaleOrdinal, scaleLinear } from 'd3-scale'

export default {
  name: 'Radar',
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
    },

    rows: {
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
      clickRow: undefined,
      axesScales: undefined,
      dataframe: undefined
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
    },

    createDomain (domain) {
      let newDomain = [ 0, Math.max(...domain)]; let rounder = 1

      if (newDomain[0] > 1000 && newDomain[1] > 1000) {
        rounder = 1000
      } else if (newDomain[0] > 100 && newDomain[1] > 100) {
        rounder = 100
      } else if (newDomain[0] > 10 && newDomain[1] > 10) {
        rounder = 10
      } else if (newDomain[0] > 1 && newDomain[1] > 1) {
        rounder = 1
      }

      newDomain = [Math.floor(newDomain[0] / rounder) * rounder, Math.ceil(newDomain[1] / rounder) * rounder]

      return newDomain
    },

    // Manually creates scales per dimension axes
    axes (dataframe, dimensions, options, s) {
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
      this.dataframe = dataframe

      return newAxes
    },

    segments (dataframe, dimensions, options) {
      let segments = []

      for (let d = 0; d < dataframe[this.options].length; d++) {
        let y = []; let x = []; name
        let deltaX = 10 / dimensions.length

        for (let i = 0; i < dimensions.length; i++) {
          x.push(deltaX * i)
          // y.push(this.newScales[dimensions[i]](dataframe[dimensions[i]][d]))
          y.push(dataframe[dimensions[i]][d])
          name = dataframe[this.options][d]
        }
        segments.push({ name, x, y, color: this.myData[this.color][d] })
      }

      return segments
    },

    scaleCoords (dataframe, s) {
      let x = []; let y = []
      let deltaX = 10 / this.dimensions.length
      let name = dataframe[this.options][s]
      for (let d = 0; d < this.dimensions.length; d++) {
        y.push(this.newScales[this.dimensions[d]](dataframe[this.dimensions[d]][s]))
        x.push(deltaX * d)
      }

      return { x, y, name }
    }
  }
}
</script>
