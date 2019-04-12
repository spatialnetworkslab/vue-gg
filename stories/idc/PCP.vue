<template>
  <vgg-parallel-coordinates
    :x1="50"
    :x2="1300"
    :y1="150"
    :y2="550"
    :width="1400"
    :height="600"
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
  <!-- <vgg-graphic
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

  </vgg-graphic> -->

</template>

<script>
import { csv } from 'd3-fetch'
import { scaleOrdinal, scaleLinear } from 'd3-scale'

import Rectangular from '../../src/mixins/Marks/Rectangular.js'
import DataReceiver from '../../src/mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../src/mixins/Scales/ScaleReceiver.js'

import parseScaleOptions from '../../src/scales/utils/parseScaleOptions.js'

export default {
  name: 'IdcHeatmap',

  // mixins: [DataReceiver, ScaleReceiver],

  data () {
    return {
      hoverI: null,
      hoverRow: null,
      data: this.segments(4, 5),
      names: [],
      categories: [],
      domains: {},
      yAxis: undefined,
      title: undefined,
      bikeCategories: ['Price', 'WetWeight', 'PWRatio', 'RearWheelHorsepower', 'RearWheelTQLbFt', 'ZeroTo60', 'TopSpeed', 'Stop60', 'QuartermileSec', 'MilesPG'],
      dataSets: ['Drinks', 'Motorbike Model', 'Camera Model', 'Car ID']
    }
  },
  computed: {
    dimensionSections () {
      let sections = []
      for (let d in this.dimensions) {
        let x1 = this.baseX; let x2
        if (d > 0) {
          for (let prevD in this.dimensions.slice(0, d)) {
            x1 += this.dimensions[prevD] * this.deltaX
          }
          x1 += this.padX * d
          x2 = x1 + this.dimensions[d] * this.deltaX
        } else {
          x2 = this.baseX + this.dimensions[d] * this.deltaX
        }
        sections.push([x1, x2])
      }

      return sections
    },

    optionSections () {
      let sections = []
      for (let o in this.options) {
        let y1 = this.baseY; let y2
        if (o > 0) {
          for (let prevO in this.options.slice(0, o)) {
            y1 += this.options[prevO] * this.deltaY
          }
          y1 += this.padY * o
          y2 = y1 + this.options[o] * this.deltaY
        } else {
          y2 = this.baseY + this.options[o] * this.deltaY
        }
        sections.push([y1, y2])
      }

      return sections
    }
  },

  mounted () {
    // this.drinks()
    this.bikes()
    // this.cameras()
    // this.cars()
  },
  methods: {
    createScale (name, domain) {

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
    },

    bikes () {
      this.categories = this.bikeCategories
      this.yAxis = 'Motorbike Model'
      this.title = 'Motorcycle Performance 2014'
      this.colorScale = 'reds'
      // change name of csv
      csv('../../static/mcn_performance_index14_40.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Name: d['Make and Model'],
            Price: parseInt(d['Base MSRP']),
            PWRatio: parseFloat(d.PWRatio),
            MilesPG: parseInt(d['Average MPG']),
            RearWheelHorsepower: parseInt(d['Rear-Wheel HP']),
            RearWheelTQLbFt: parseInt(d['Rear-Wheel TQ (lb.-ft.)']),
            ZeroTo100: parseFloat(d['0–100 mph, sec.']),
            WetWeight: parseInt(d['Wet Weight']),
            TopSpeed: parseInt(d['Top Speed']),
            ZeroTo60: parseFloat(d['0–60 mph, sec.']),
            QuartermileSec: parseFloat(d['Quartermile, sec']),
            QuartermileHr: parseInt(d['Quartermile, mph']),
            Stop60: parseInt(d['Braking 60–0 mph (feet)']),
            Color: d.Color
          }
        }))
      })
    }
  }
}
</script>
