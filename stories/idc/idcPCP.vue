<template>
  <div>
    <br>
    <vgg-graphic
      :width="width"
      :height="height"
      :data="data"
    >
      <vgg-plot-title
        :text="title"
        :hjust="'center'"
        :font-size="50"/>

      <g v-if="data">
        <g
          v-for="(d, i) in dimensionSections"
          :key="i"
        >
          <g
            v-for="(o, j) in optionSections"
            :key="j"
          >
            <vgg-section
              :x1="d[0]"
              :x2="d[1]"
              :y1="o[0]"
              :y2="o[1]"
              :scale-x="[0, 1]"
              :scale-y="[0, 10]"
            >

              <!-- <vgg-rectangle
                :x1="0"
                :x2="1"
                :y1="0"
                :y2="10"
                :opacity="0.2"
                fill="blue"
              /> -->

              <g v-for="category, a in axes(dimensions[i], options[j])">
                <vgg-y-axis
                  :scale="category[1]"
                  :hjust="axisInterval(dimensions[i]) * a"
                  :title-vjust="1.05"
                  :title-hjust="0.5"
                  :tick-opacity="3"
                  :title="category[0]"
                  :tick-length="0.01"
                  :tick-count="options[j]"
                />
              </g>

              <g v-for="segment, i in segments(dimensions[i], options[j])">
                <vgg-multi-line
                  :x="segment.x"
                  :y="segment.y"
                  :stroke="hoverI === i ? 'black' : segment.color"
                  stroke-linecap="round"
                  @hover="handleHover($event, i)"
                />
              </g>
            </vgg-section>
          </g>
        </g>
      </g>

      <!-- <vgg-section
        :x1="sectionX[0]"
        :x2="sectionX[1]"
        :y1="sectionY[0]"
        :y2="sectionY[1]/2"
        :scale-x="[0, 1]"
        :scale-y="[0, 10]"
        type="polar"
      > -->

      <!-- <vgg-section
        :x1="sectionX[0]"
        :x2="sectionX[1]"
        :y1="sectionY[0]"
        :y2="sectionY[1]/2"
        :scale-x="[0, 1]"
        :scale-y="[0, 10]"
      >

        <g v-for="category, i in bikeCategories.slice(0, dimensions[0])">
          <vgg-y-axis
            :scale="category"
            :hjust="axisInterval(dimensions[0]) * i"
            :title-vjust="1.05"
            :title-hjust="0.5"
            :title="category"
            :tick-opacity="3"
            :tick-length="0.01"
          />

          <g v-for="segment, i in segments(dimensions[0], options[0])"> -->
      <!-- <vgg-multi-line
              :x="segment.x"
              :y="segment.y"
              :opacity="0.1"
              :stroke="hoverI === i ? 'red' : 'steelblue'"
              :close="true"
              stroke-linecap="round"
              :fill="hoverI === i ? 'red' : 'steelblue'"
              :fill-opacity="0.1"
              @hover="handleHover($event, row, i)"
            /> -->
      <!-- <vgg-multi-line
              :x="segment.x"
              :y="segment.y"
              :opacity="0.1"
              :stroke="hoverI === i ? 'red' : 'steelblue'"
              stroke-linecap="round"
              @hover="handleHover($event, row, i)"
            /> -->
      <!-- <vgg-multi-line
              :x="segment.x"
              :y="segment.y"
              :stroke="segment.color"
              stroke-linecap="round"
            />
          </g>
        </g>
      </vgg-section>
      </vgg-section> -->
    </vgg-graphic>

  </div>
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
      drinkCategories: ['Name', 'Sugars', 'Calories', 'Protein', 'Carbohydrates', 'SaturatedFat', 'TransFat', 'Cholesterol', 'Sodium', 'Fibre', 'Calcium', 'Iron', 'VitaminA', 'VitaminC'],
      bikeCategories: ['Name', 'Price', 'WetWeight', 'RearWheelHorsepower', 'TopSpeed', 'MilesPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio'],
      cameraCategories: ['MaxRes', 'LowRes', 'EffectivePix', 'ZoomWide', 'ZoomTele', 'NormFocusRange', 'MacroFocusRange', 'StorageGB', 'Weight', 'Dimensions'],
      carCategories: ['CityMPG', 'Height', 'HighwayMPG', 'Horsepower', 'Length', 'ForwardGears', 'Torque'],
      colorScales: ['blues', 'reds', 'purples', 'oranges'],
      dataSets: ['Drinks', 'Motorbike Model', 'Camera Model', 'Car ID'],
      dimensions: [4, 6, 11],
      options: [40, 20, 10, 5],
      height: 2000,
      width: 6000,
      baseX: 300,
      baseY: 100,
      padX: 200,
      padY: 200,
      deltaX: 200,
      deltaY: 20
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
    handleHover (e, i) {
      if (e) {
        this.hoverI = i
        // this.hoverRow = row
      } else {
        this.hoverI = null
        // this.hoverRow = null
      }
    },

    axisInterval (axesNumber) {
      return 1 / axesNumber
    },

    actualOptions (options) {
      let names = []
      for (let i = 0; i < options; i++) {
        if (this.data[i]) {
          names.push(this.data[i].Name)
        }
      }
      return names
    },

    actualDimensions (dimensions) {
      return this.categories.slice(0, dimensions)
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

      // for (let a in newAxes) {
      //   console.log(a, newAxes[a])
      // }
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
        let distanceDelta = this.axisInterval(this.dimensions[0])
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
            plotSegments[item].x.push(this.axisInterval(categories.length) * index)
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
      return scale
    },

    drinks () {
      this.categories = this.drinkCategories
      this.yAxis = 'Drinks'
      this.title = 'Drinks Data'
      this.dataset = 'drinks'
      // change name of csv
      csv('../../static/idcDrinksDemoClean.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Calories: parseInt(d.Calories),
            Protein: parseInt(d.Protein),
            ServingSize: parseInt(d['Serving Size']),
            Sugars: parseInt(d.Sugars),
            Name: d['Renamed Item'],
            Carbohydrates: parseInt(d.Carbohydrates),
            SaturatedFat: parseInt(d['Saturated Fat']),
            TransFat: parseInt(d['Trans Fat']),
            Cholesterol: parseInt(d.Cholesterol),
            Sodium: parseInt(d.Sodium),
            Fibre: parseInt(d['Dietary Fiber']),
            VitaminA: parseInt(d['Vitamin A']),
            VitaminC: parseInt(d['Vitamin C']),
            Calcium: parseInt(d.Calcium),
            Iron: parseInt(d.Iron),
            Color: d.Color2
          }
        }))
      })
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
            ZeroTo100: parseInt(d['0–100 mph, sec.']),
            WetWeight: parseInt(d['Wet Weight']),
            TopSpeed: parseInt(d['Top Speed']),
            ZeroTo60: parseInt(d['0–60 mph, sec.']),
            QuartermileSec: parseInt(d['Quartermile, sec']),
            QuartermileHr: parseInt(d['Quartermile, mph']),
            Stop60: parseInt(d['Braking 60–0 mph (feet)']),
            Color: d.Color
          }
        }))
      })
    },

    cameras () {
      this.categories = this.cameraCategories
      this.yAxis = 'Camera Model'
      this.title = 'Camera Specifications 2007'
      // change name of csv
      csv('../../static/cameras_1038.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Name: d.Model,
            MaxRes: parseInt(d['Max resolution']),
            LowRes: parseInt(d['Low resolution']),
            EffectivePix: parseInt(d['Effective pixels']),
            ZoomWide: parseInt(d['Zoom wide (W)']),
            ZoomTele: parseInt(d['Zoom tele (T)']),
            NormFocusRange: parseInt(d['Normal focus range']),
            MacroFocusRange: parseInt(d['Macro focus range']),
            StorageGB: parseInt(d['Storage included']),
            Weight: parseInt(d['Weight (inc. batteries)']),
            Dimensions: parseInt(d.Dimensions),
            Price: parseInt(d.Price)
          }
        }))
      })
    },

    cars () {
      this.categories = this.carCategories
      this.yAxis = 'Car ID'
      this.title = 'Car Specifications 2012'
      // change name of csv
      csv('../../static/cars7xu2012.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Name: d.ID,
            Length: parseInt(d.Length),
            CityMPG: parseInt(d['City mpg']),
            Height: parseInt(d.Height),
            HighwayMPG: parseInt(d['Highway mpg']),
            Horsepower: parseInt(d['Horsepower']),
            ForwardGears: parseInt(d['Number of Forward Gears']),
            Torque: parseInt(d.Torque)
          }
        }))
      })
    }
  }
}
</script>
