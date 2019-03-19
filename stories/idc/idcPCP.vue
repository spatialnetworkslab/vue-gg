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

      <vgg-section
        :x1="sectionX[0]"
        :x2="sectionX[1]"
        :y1="sectionY[0]"
        :y2="sectionY[1]"
        :scale-x="[0, 100]"
        :scale-y="[0, 100]"
      >

        <!-- <vgg-rectangle
          :x1="0"
          :x2="100"
          :y1="0"
          :y2="100"
          :opacity="0.6"
          fill="blue"
        /> -->
        <g v-for="category, i in bikeCategories.slice(0, dimensions[0])">
          <vgg-y-axis
            :scale="category"
            :hjust="axisInterval(dimensions[0]) * i"
            :title-vjust="1.05"
            :title-hjust="0.5"
            :title="category"
            :tick-length="0.1"
            :tick-opacity="0.1"
            tick-extra
          />
        </g>

        <!-- <g v-for="segment in segments(dimensions[0], 5)">
          <vgg-multi-line
            :x="segment.x"
            :y="segment.y"
            :stroke-width="5"
            stroke="orange"
            stroke-linecap="round"
          />
          <vgg-symbol
            :x="segment.x[0]"
            :y="segment.y[0]"
            :stroke-width="5"
          />
          <vgg-symbol
            :x="segment.x[1]"
            :y="segment.y[1]"
            :stroke-width="5"
          />
          <vgg-symbol
            :x="segment.x[2]"
            :y="segment.y[2]"
            :stroke-width="5"
          />
          <vgg-symbol
            :x="segment.x[3]"
            :y="segment.y[3]"
            :stroke-width="5"
          /> -->
        <!-- line level -->
        <vgg-data
          v-for="item, index in segments(dimensions[0], 5)"
          :data="item"
          :key="index"
        >
          <text
            x="20"
            y="35"
            class="small">{{ item }}</text>

            <!-- <vgg-map v-slot="{ row }">
              <vgg-multi-line
                :x="row.x"
                :y="row.y"
              />
            </vgg-map>  -->
            <!-- <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="row.x1"
                :x2="row.x2"
                :y1="row.y1"
                :y2="row.y2"
                :fill="{val: row.value, scale: { type: row.colorScale, domain: 'value'}}"
              />
            </vgg-map>
          </vgg-data> -->

        </vgg-data>
      <!-- </g> -->
      </vgg-section>
    </vgg-graphic>

  </div>
</template>

<script>
import { csv } from 'd3-fetch'

export default {
  name: 'IdcHeatmap',

  data () {
    return {
      data: undefined,
      names: [],
      categories: [],
      yAxis: undefined,
      title: undefined,
      drinkCategories: ['Name', 'Sugars', 'Calories', 'Protein', 'Carbohydrates', 'SaturatedFat', 'TransFat', 'Cholesterol', 'Sodium', 'Fibre', 'Calcium', 'Iron', 'VitaminA', 'VitaminC'],
      bikeCategories: ['Name', 'Price', 'WetWeight', 'RearWheelHorsepower', 'TopSpeed', 'MilesPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio'],
      cameraCategories: ['MaxRes', 'LowRes', 'EffectivePix', 'ZoomWide', 'ZoomTele', 'NormFocusRange', 'MacroFocusRange', 'StorageGB', 'Weight', 'Dimensions'],
      carCategories: ['CityMPG', 'Height', 'HighwayMPG', 'Horsepower', 'Length', 'ForwardGears', 'Torque'],
      colorScales: ['blues', 'reds', 'purples', 'oranges'],
      dataSets: ['Drinks', 'Motorbike Model', 'Camera Model', 'Car ID'],
      dimensions: [6],
      options: [25, 10, 5],
      height: 5200,
      width: 5000,
      baseX: 300,
      baseY: 100,
      padX: 300,
      padY: 200,
      sectionX: [200, 2000],
      sectionY: [200, 1000]
    }
  },
  computed: {
    dimensionSections () {
      let sections = []
      let delta = 200
      for (let d in this.dimensions) {
        let x1 = this.baseX; let x2
        if (d > 0) {
          for (let prevD in this.dimensions.slice(0, d)) {
            x1 += this.dimensions[prevD] * delta
          }
          x1 += this.padX * d
          x2 = x1 + this.dimensions[d] * delta
        } else {
          x2 = this.baseX + this.dimensions[d] * delta
        }
        sections.push([x1, x2])
      }
      return sections
    },

    optionSections () {
      let sections = []
      let delta = 50
      for (let o in this.options) {
        let y1 = this.baseY; let y2
        if (o > 0) {
          for (let prevO in this.options.slice(0, o)) {
            y1 += this.options[prevO] * delta
          }
          y1 += this.padY * o
          y2 = y1 + this.options[o] * delta
        } else {
          y2 = this.baseY + this.options[o] * delta
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
    axisInterval (axesNumber) {
      return 1 / (axesNumber + 1)
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

    segments (dimensions, options) {
      let categories = this.categories

      if (this.data) {
        if (!isNaN(dimensions)) {
          categories = categories.slice(0, dimensions)
        }

        if (isNaN(options)) {
          let options = this.data.length
        }

        let segments = []
        let distanceDelta = this.axisInterval(this.dimensions[0])
        // let x = this.dimensionSections[this.dimensions.indexOf(dimensions)][0]; let y = this.optionSections[this.options.indexOf(options)][0]

        for (let i = 0; i < this.data.length; i++) {
          let macro = []
          for (let j = 0; j < categories.length; j++) {
            let category = { }
            if (j === 0) {
              category.y = 100 / this.data.length * (i + 0.5)
            } else {
              category.y = this.data[i][categories[j]]
            }
            category.x = 100 * j * distanceDelta
            macro.push(category)
          }
          segments.push(macro)
        }

        console.log(segments)
        return segments
      }
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
      csv('../../static/mcn_performance_index14_5.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Name: d['Make and Model'],
            Price: parseInt(d['Base MSRP']),
            Rating: d['Rating Category'],
            PWRatio: parseInt(d.PWRatio),
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
