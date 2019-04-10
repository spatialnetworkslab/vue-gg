<template>
  <div>
    <br>
    <vgg-graphic
      :width="1400"
      :height="600"
      :data="data"
    >
      <g v-if="data">
        <vgg-section
          :x1="50"
          :x2="1300"
          :y1="150"
          :y2="550"
          :scale-x="[0, 1]"
          :scale-y="[0, 10]"
        >
          <vgg-y-axis
            v-for="category, c in axes(10, 40)"
            :key="c"
            :scale="category[1]"
            :hjust="1/ categories.length * c"
            :title-vjust="1.02"
            :title-hjust="0.5"
            :tick-opacity="3"
            :title="category[0]"
            :title-font-size="10"
            :tick-length="0.01"
            :label-font-size="8"
            :title-font-weight="700"
          />

          <g v-for="segment, i in segments(10, 40)">
            <vgg-multi-line
              :x="segment.x"
              :y="segment.y"
              :stroke="segment.color"
            />
          </g>
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
    },

    axes (dimensions, options) {
      let categories = this.categories

      if (!isNaN(dimensions)) {
        categories = categories.slice(0, dimensions)
      }

      if (!isNaN(options)) {
        let options = this.data.length
      }

      let axes = {}; let newAxes = []
      // let distanceDelta = this.axisInterval(this.dimensions[0])
      // let x = this.dimensionSections[this.dimensions.indexOf(dimensions)][0]; let y = this.optionSections[this.options.indexOf(options)][0]

      for (let i = 0; i < categories.length; i++) {
        let macro = []
        for (let j = 0; j < options; j++) {
          macro.push(this.data[j][categories[i]])
        }
        axes[categories[i]] = macro
      }

      for (let name in categories) {
        let domain = axes[categories[name]]

        if (domain[0].constructor === String) {
          newAxes.push([categories[name], domain])
        } else {
          // if Number
          // find domain Min, Max
          // feed to scale
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
          newAxes.push([categories[name], newDomain])
        }
      }

      return newAxes
    },

    segments (dimensions, options) {
      let categories = this.categories

      if (this.data) {
        if (!isNaN(dimensions)) {
          categories = categories.slice(0, dimensions)
        }

        if (!isNaN(options)) {
          let options = this.data.length
        }

        let segments = {}; let scaledSegments = []
        let distanceDelta = 1 / this.categories.length
        // let x = this.dimensionSections[this.dimensions.indexOf(dimensions)][0]; let y = this.optionSections[this.options.indexOf(options)][0]

        for (let i = 0; i < categories.length; i++) {
          let macro = []
          for (let j = 0; j < options; j++) {
            macro.push(this.data[j][categories[i]])
          }
          segments[categories[i]] = macro
        }
        // for (let i = 0; i < this.data.length; i++) {
        //   let macro = { x: [], y: [] }
        //   for (let j = 0; j < categories.length; j++) {
        //     macro.y.push(this.data[i][categories[j]])
        //     macro.x.push(1 * j * distanceDelta)
        //   }
        //   segments.push(macro)
        // }
        // console.log(segments)
        for (let index in segments) {
          let scale = this.scales(segments[index], [0, 10], index)
          let attribute = segments[index]
          let att = []
          for (let item in attribute) {
            att.push(scale(attribute[item]))
          }
          scaledSegments.push(att)
        }

        let plotSegments = []
        for (let category in scaledSegments) {
          for (let segment in scaledSegments[category]) {
            if (!plotSegments[segment]) {
              let y = [scaledSegments[category][segment]]
              plotSegments[segment] = { y }
            } else {
              plotSegments[segment].y.push(scaledSegments[category][segment])
            }
          }
        }

        for (let item in plotSegments) {
          plotSegments[item].x = []
          for (let index in plotSegments[item].y) {
            plotSegments[item].x.push(1 / categories.length * index)
          }
          plotSegments[item].color = this.data[item].Color
        }
        // console.log(plotSegments)
        return plotSegments
      }
    },

    scales (domain, range, name) {
      let scale

      if (domain[0].constructor === String) {
        let range = []
        let delta = 10 / domain.length
        for (let i = 0.5; i <= domain.length; i++) {
          range.push(delta * (i))
        }
        scale = scaleOrdinal().domain(domain).range(range)
        this.domains[name] = domain
      } else {
        // if Number
        // find domain Min, Max
        // feed to scale
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

        scale = scaleLinear().domain(newDomain).range(range)
        this.domains[name] = newDomain
      }
      console.log(scale)
      return scale
    }
  }
}
</script>
