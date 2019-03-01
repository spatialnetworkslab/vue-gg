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
        <g v-for="(d, i) in dimensionSections">
          <g v-for="(o, j) in optionSections">
            <vgg-section
              :x1="o[0]"
              :x2="o[1]"
              :y1="d[0]"
              :y2="d[1]"
              :scale-x="[o[0], o[1]]"
              :scale-y="[d[0], d[1]]"
            >
              <vgg-data v-for="(item, i) in segments(dimensions[i], options[j])" :data="item">
                <vgg-map v-slot="{ row }">
                  <vgg-rectangle
                  :x1="row.x1"
                  :x2="row.x2"
                  :y1="row.y1"
                  :y2="row.y2"
                  :fill="{val: row.value, scale: { type: row.colorScale, domain: 'value'}}"
                  />
                </vgg-map>
              </vgg-data>

              <vgg-idc-x-axis
                :scale="actualOptions(options[j]).names"
                :title="xAxis"
                :labelFontSize="12"
                :titleHjust="1.05"
                :labelColor="actualOptions(options[j]).colors"
                titleAnchorPoint="l"
                labelRotate
              />

              <vgg-y-axis
                :scale="actualDimensions(dimensions[i])"
                title="Attributes"
                :labelFontSize="12"
                flip
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
      xAxis: undefined,
      title: undefined,
      drinkCategories: ['Sugars', 'Calories', 'Protein', 'Carbohydrates', 'SaturatedFat', 'TransFat', 'Cholesterol', 'Sodium', 'Fibre', 'Calcium', 'Iron', 'VitaminA', 'VitaminC'],
      bikeCategories: ['Price', 'RearWheelHorsepower', 'RearWheelTQLbFt', 'WetWeight', 'MilesPG', 'TopSpeed', 'ZeroTo60', 'ZeroTo100', 'QuartermileSec', 'QuartermileHr','Stop60', 'PWRatio'],
      cameraCategories: ['MaxRes', 'LowRes', 'EffectivePix', 'ZoomWide', 'ZoomTele', 'NormFocusRange', 'MacroFocusRange', 'StorageGB', 'Weight', 'Dimensions'],
      carCategories: ['CityMPG', 'Height', 'HighwayMPG', 'Horsepower' ,'Length' ,'ForwardGears' ,'Torque'],
      colorScales: ['blues', 'reds', 'purples', 'oranges'],
      dataSets: ['Drinks', 'Motorbike Model', 'Camera Model', 'Car ID'],
      dimensions: [3, 5, 10],
      options: [5, 10, 20, 40],
      height: 2000,
      width: 8900,
      baseX: 150,
      baseY: 100,
      padX: 250,
      padY: 150
    }
  },

  mounted () {
    this.drinks()
    //this.bikes()
    //this.cameras()
    //this.cars()
  },
  computed: {
    dimensionSections () {
      let sections = []
      for (let d in this.dimensions){
        let y1 = this.baseY, y2
        if (d > 0) {
          for (let prevD in this.dimensions.slice(0, d)){
            y1 += this.dimensions[prevD] * 40
          }
          y1 += this.padY * d
          y2 = y1 + this.dimensions[d] * 40
        } else {
          y2 = this.baseY + this.dimensions[d] * 40
        }
        sections.push([y1, y2])
      }
      return sections
    },

    optionSections () {
      let sections = []
      for (let o in this.options){
        let x1 = this.baseX, x2
        if (o > 0) {
          for (let prevO in this.options.slice(0, o)){
            x1 += this.options[prevO] * 40
          }
          x1 += this.padX * o
          x2 = x1 + this.options[o] * 40
        } else {
          x2 = this.baseX + this.options[o] * 40
        }
        sections.push([x1, x2])
      }
      return sections
    }
  },
  methods: {
    actualOptions (options) {
      let names = [], colors = []
      for (let i = 0; i < options; i++ ) {
        names.push(this.data[i].Name)
        colors.push(this.data[i].Color)
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
        let y = this.dimensionSections[this.dimensions.indexOf(dimensions)][0], x = this.optionSections[this.options.indexOf(options)][0]

        for (let i = 0; i < categories.length; i++) {
            segments[i] = []
            for (let j = 0; j < options; j++) {
              if (this.data[j]) {
                let macro = {}
                macro.x1 = x + widthDelta * j
                macro.x2 = x + widthDelta * (j+1)
                macro.y1 = y + heightDelta * i
                macro.y2 = y + heightDelta * (i+1)
                macro.value = this.data[j][categories[i]]
                macro.attribute = categories[i]
                macro.name = this.data[j].Name
                macro.colorScale = this.colorScales[this.dataSets.indexOf(this.xAxis)]
                segments[i].push(macro)
              } else {
                console.log("Skipping index ", i, " as it is undefined")
              }
            }
        }
        return segments
      }
    },

    drinks () {
      this.categories = this.drinkCategories
      this.xAxis = 'Drinks'
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
      this.xAxis = 'Motorbike Model'
      this.title = 'Motorcycle Performance 2014'
      this.colorScale = "reds"
      // change name of csv
      csv('../../static/mcn_performance_index14_alphabetical.csv').then((data) => {
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
            Stop60: parseInt(d['Braking 60–0 mph (feet)'])
          }
        }))
      })
    },

    cameras () {
      this.categories = this.cameraCategories
      this.xAxis = 'Camera Model'
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
      this.xAxis = 'Car ID'
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
