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
        :fontSize="50"/>

      <g v-if="data">
        <g v-for="(d, i) in dimensionSections"
          :key="i"
          >
          <g v-for="(o, j) in optionSections"
          :key="j"
          >
            <vgg-section
              :x1="d[0]"
              :x2="d[1]"
              :y1="o[0]"
              :y2="o[1]"
              :scale-x="[d[0], d[1]]"
              :scale-y="[o[0], o[1]]"
            >

              <vgg-data v-for="(item, index) in segments(dimensions[i], options[j])"
                :data="item"
                :key="index"
                >
                <vgg-map v-slot="{ row }">
                  {{ index }}
                  <vgg-idc-rectangle
                  :x1="row.x1"
                  :x2="row.x2"
                  :y1="row.y1"
                  :y2="row.y2"
                  :fill="{val: row.value, scale: { type: row.colorScale, domain: 'value'}}"
                  :index="{val: row.indexNo}"
                  :selectionIndex="index"
                  :clickHandler="clickHandler"
                  :hoverHandler="hoverHandler"
                  :leaveHandler="leaveHandler"
                  />
                </vgg-map>
              </vgg-data>


              <vgg-x-axis
                :scale="actualDimensions(dimensions[i])"
                title="Attributes"
                label-rotate
                :tick-length="7"
                :title-hjust="1 + ((dimensions.length - i) * 0.2)"
                :title-vjust="0.5"
                :vjust="1"
                :title-font-weight="700"
                flip
              />

              <vgg-idc-y-axis
                v-if="actualOptions(options[j]).colors"
                :scale="actualOptions(options[j]).names"
                :label-color="actualOptions(options[j]).colors"
                :title="yAxis"
                :title-font-weight="700"
                :hjust="0"
                :tick-length="7"
                :title-vjust="-0.015 * (j+1)"
              />
            </vgg-section>
        </g>
      </g>
    </g>
    </vgg-graphic>

  </div>
</template>

<script>
import {csv} from 'd3-fetch'

export default {
  name: 'idc-heatmap',

  data () {
    return {
      data: undefined,
      names: [],
      categories: [],
      yAxis: undefined,
      title: undefined,
      index: -1,
      drinkCategories: ['Sugars', 'Calories', 'Protein', 'Carbohydrates', 'SaturatedFat', 'TransFat', 'Cholesterol', 'Sodium', 'Fibre', 'Calcium', 'Iron', 'VitaminA', 'VitaminC'],
      bikeCategories: ['Price', 'WetWeight', 'RearWheelHorsepower', 'TopSpeed', 'MilesPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio'],
      cameraCategories: ['MaxRes', 'LowRes', 'EffectivePix', 'ZoomWide', 'ZoomTele', 'NormFocusRange', 'MacroFocusRange', 'StorageGB', 'Weight', 'Dimensions'],
      carCategories: ['CityMPG', 'Height', 'HighwayMPG', 'Horsepower' ,'Length' ,'ForwardGears' ,'Torque'],
      colorScales: ['blues', 'greys', 'purples', 'oranges'],
      dataSets: ['Drinks', 'Motorbike Model', 'Camera Model', 'Car ID'],
      dimensions: [3, 5, 10],
      options: [40, 25],
      height: 4200,
      width: 2000,
      baseX: 300,
      baseY: 100,
      padX: 300,
      padY: 200
    }
  },

  mounted () {
    //this.drinks()
    this.bikes()
    //this.cameras()
    //this.cars()
  },
  computed: {
    dimensionSections () {
      let sections = []
      for (let d in this.dimensions){
        let x1 = this.baseX, x2
        if (d > 0) {
          for (let prevD in this.dimensions.slice(0, d)){
            x1 += this.dimensions[prevD] * 40
          }
          x1 += this.padX * d
          x2 = x1 + this.dimensions[d] * 40
        } else {
          x2 = this.baseX + this.dimensions[d] * 40
        }
        sections.push([x1, x2])
      }
      return sections
    },

    optionSections () {
      let sections = []
      for (let o in this.options){
        let y1 = this.baseY, y2
        if (o > 0) {
          for (let prevO in this.options.slice(0, o)){
            y1 += this.options[prevO] * 40
          }
          y1 += this.padY * o
          y2 = y1 + this.options[o] * 40
        } else {
          y2 = this.baseY + this.options[o] * 40
        }
        sections.push([y1, y2])
      }
      return sections
    }
  },
  methods: {
    clickHandler (self) {
      return () => {
        console.log('@@@', this.selected, this.index)
        if (!this.selected) {
          this.index = self.index
          this.selected = true
        } else if (this.selected && this.index != self.index) {
          this.index = self.index
          this.selected = true
        } else if (this.selected && this.index === self.index) {
          this.index = -1
          this.selected = false
        } else {
          throw new Error('Error in click handler')
        }
      }
    },

    hoverHandler (self) {
      return () => {
        if (this.selected) {
          return
        } else {
          this.index = self.index
        }
      }
    },

    leaveHandler (self) {
      return () => {
        if (this.selected) {
          return
        } else {
          this.index = -1
        }
      }
    },

    actualOptions (options) {
      let names = [], colors = []
      for (let i = 0; i < options; i++ ) {
        if (this.data[i]){
          names.push(this.data[i].Name)
          colors.push(this.data[i].Color)
        }
      }

      return { names, colors }
    },

    actualDimensions (dimensions) {
      return this.categories.slice(0, dimensions)
    },

    segments(dimensions, options){
      let categories = this.categories
      if (this.data) {
        if (!isNaN(dimensions)){
          categories = categories.slice(0, dimensions)
        }

        if (isNaN(options)){
          let options = this.data.length
        }

        let segments = []
        let heightDelta = 40, widthDelta = 40
        let x = this.dimensionSections[this.dimensions.indexOf(dimensions)][0], y = this.optionSections[this.options.indexOf(options)][0]

        for (let i = 0; i < categories.length; i++) {
          segments[i] = []
          for (let j = 0; j < options; j++) {
            if (this.data[j]) {
              let macro = {}
              macro.x1 = x + widthDelta * i
              macro.x2 = x + widthDelta * (i+1)
              macro.y1 = y + heightDelta * j
              macro.y2 = y + heightDelta * (j+1)
              macro.value = this.data[j][categories[i]]
              macro.attribute = categories[i]
              macro.name = this.data[j].Name
              macro.colorScale = this.colorScales[this.dataSets.indexOf(this.yAxis)]
              macro.indexNo =  this.data[i].Index
              segments[i].push(macro)
            } else {
              console.log("Skipping index ", i, " as it is undefined")
            }
          }
        }
        console.log('@@@', segments)
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
      this.colorScale = "reds"
      // change name of csv
      csv('../../static/mcn_performance_index14_alphabetical.csv').then((data) => {
        this.data = Object.freeze(data.map((d, i) => {
          return {
            Index: i,
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
            Color: d.Color,
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
