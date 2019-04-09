<template>
  <div>
    <br>
    <vgg-graphic
      :width="700"
      :height="1000"
      :data="data"
    >

      <vgg-section
        :x1="200"
        :x2="700"
        :y1="200"
        :y2="900"
        :scale-x="categories"
        :scale-y="'Name'"
      >
        <g v-if="data">
          <g v-for="cat, k in categories">
            <vgg-map v-slot="{ row, i }">
              <vgg-rectangle
                :x="cat"
                :y="row.Name"
                :w="{ band: { domain: categories } }"
                :h="{ band: { domain: 'Name' } }"
                :fill="{val: row[cat], scale: { type: 'blues', domain: cat}}"
              />
              <vgg-rectangle
                v-if="hoverRow"
                :x="cat"
                :y="row.Name"
                :w="{ band: { domain: categories } }"
                :h="{ band: { domain: 'Name' } }"
                :fill="{val: row[cat], scale: { type: 'blues', domain: cat}}"
                stroke="black"
              />
            </vgg-map>
          </g>

          <vgg-x-axis
            :scale="categories"
            :title-hjust="1.1"
            :title-vjust="0.5"
            :title-font-weight="700"
            :vjust="1.0"
            title="Attributes"
            label-rotate
            flip
          />

          <vgg-idc-y-axis
            :scale="'Name'"
            :label-color="colors"
            :label-font-size="8"
            :title-font-weight="700"
            :hjust="0"
            :title-hjust="0.4"
            :title-vjust="-0.03"
          />
        </g>
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
      bikeCategories: ['Price', 'WetWeight', 'RearWheelHorsepower', 'TopSpeed', 'MilesPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio'],
      drinkCategories: ['Sugars', 'Calories', 'Protein', 'Carbohydrates', 'SaturatedFat', 'TransFat', 'Cholesterol', 'Sodium', 'Fibre', 'Calcium', 'Iron', 'VitaminA', 'VitaminC'],
      cameraCategories: ['MaxRes', 'LowRes', 'EffectivePix', 'ZoomWide', 'ZoomTele', 'NormFocusRange', 'MacroFocusRange', 'StorageGB', 'Weight', 'Dimensions'],
      carCategories: ['CityMPG', 'Height', 'HighwayMPG', 'Horsepower', 'Length', 'ForwardGears', 'Torque'],
      hovered: undefined,
      hoverRow: undefined
    }
  },
  computed: {
    colors () {
      let colors = []
      for (let i = 0; i < this.data.length; i++) {
        colors.push(this.data[i].Color)
      }

      return colors
    },

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
    this.bikes()
    // this.drinks()
  },

  methods: {
    log: console.log,

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
