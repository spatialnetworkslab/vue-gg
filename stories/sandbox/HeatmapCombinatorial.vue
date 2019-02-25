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
                  :fill="{val: row.value, scale: { type: 'purples', domain: 'value'}}"
                  />
                </vgg-map>
              </vgg-data>

              <vgg-x-axis
                :scale="actualOptions(options[j])"
                title="   Drinks"
                titleHjust="r"
                titleAnchorPoint="l"
                :titleVjust="0.5"
                :labelFontSize="8"
                labelRotate
              />

              <vgg-y-axis
                :scale="actualDimensions(dimensions[i])"
                title="Attributes"
                :vjust="0.5"
                :titleVjust="1 + 0.025 * (3 - i)"
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
      title: "Drinks Heatmap",
      dimensions: [3, 5, 10],
      options: [5, 10, 25, 50, 75],
      categories: ['Sugars', 'Calories', 'Protein', 'Carbohydrates', 'SaturatedFat', 'TransFat', 'Cholesterol', 'Sodium', 'Fibre', 'VitaminA', 'VitaminC', 'Calcium', 'Iron'],
      height: 1200,
      width: 8700,
      baseX: 100,
      baseY: 100,
    }
  },

  mounted () {
    this.drinks()
  },
  computed: {
    dimensionSections () {
      let sections = []
      for (let d in this.dimensions){
        let x1 = this.baseY, x2
        if (d > 0) {
          for (let prevD in this.dimensions.slice(0, d)){
            x1 += this.dimensions[prevD] * 40
          }
          x1 += 100 * d
          x2 = x1 + this.dimensions[d] * 40
        } else {
          x2 = this.baseY + this.dimensions[d] * 40
        }
        sections.push([x1, x2])
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
          x1 += 150 * o
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
      let names = []

      for (let i = 0; i < options; i++ ) {
        names.push(this.data[i].Name)
      }
      return names
    },

    actualDimensions (dimensions) {
      return this.categories.slice(0, dimensions)
    },

    segments(dimensions, options){
      if (this.data) {
        let categories = this.categories

        if (!isNaN(dimensions)){
            categories = this.categories.slice(0, dimensions)
        }

        if (isNaN(options)){
          let options = this.data.length
        }

        let segments = []
        // let widthDelta = (this.optionSections[this.options.indexOf(options)][1] - this.optionSections[this.options.indexOf(options)][0])/dimensions
        // let heightDelta = (this.dimensionSections[this.dimensions.indexOf(dimensions)][1] - this.dimensionSections[this.dimensions.indexOf(dimensions)][0])/dimensions//options
        let heightDelta = 40, widthDelta = 40
        let y = this.dimensionSections[this.dimensions.indexOf(dimensions)][0], x = this.optionSections[this.options.indexOf(options)][0]

        for (let i = 0; i < categories.length; i++) {
            segments[i] = []
            for (let j = 0; j < options; j++) {
              let macro = {}
              macro.x1 = x + widthDelta * j
              macro.x2 = x + widthDelta * (j+1)
              macro.y1 = y + heightDelta * i
              macro.y2 = y + heightDelta * (i+1)
              macro.value = this.data[j][categories[i]]
              macro.attribute = categories[i]
              macro.name = this.data[j].Name
              segments[i].push(macro)
            }
        }
        console.log(dimensions, options, segments)
        return segments
      }
    },

    drinks () {
      // change name of csv
      csv('../../static/idcDemoDrinksDailyInterpolated.csv').then((data) => {
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
          }
        }))
      })
    }
  }
}
</script>
