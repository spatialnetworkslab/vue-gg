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
        :hjust="'center'"/>

      <vgg-section
        :x1="baseX"
        :x2="sectionWidth + baseX"
        :y1="baseY"
        :y2="sectionHeight + baseY"
        :scale-x="[baseX, sectionWidth + baseX]"
        :scale-y="[baseY, sectionHeight + baseY]"
      >
        <g v-for="(item, i) in segments">
          <vgg-data v-if="segments" :data="item">

            <vgg-map v-slot="{ row }">
              <vgg-rectangle
              :x1="row.x1"
              :x2="row.x2"
              :y1="row.y1"
              :y2="row.y2"
              :fill="{val: row.value, scale: { type: 'blues', domain: 'value'}}"
              />
            </vgg-map>
          </vgg-data>
        </g>

      <vgg-x-axis
        :scale="'Name'"
        title="Drinks"
        :titleHjust="1.03"
        :vjust="-.05"
        :labelFontSize="8"
        labelRotate
      />

      <vgg-y-axis
        :scale="categories"
        title="Attributes"
        :hjust="-0.02"
        flip
      />

      </vgg-section>

    </vgg-graphic>

  </div>
</template>

<script>
import {csv} from 'd3-fetch'

export default {
  name: 'idc',

  data () {
    return {
      data: undefined,
      title: "Drinks Heatmap",
      categories: ['Calories', 'Protein', 'Sugars', 'Carbohydrates', 'SaturatedFat', 'TransFat', 'Cholesterol', 'Sodium', 'Fibre', 'VitaminA', 'VitaminC', 'Calcium', 'Iron'],
      width: 1000,
      height: 900,
      sectionWidth: 850,
      sectionHeight: 300,
      baseX: 100,
      baseY: 500
    }
  },

  mounted () {
    this.drinks()
  },

  computed: {
    segments(){
      console.log(this.data)
      if (this.data) {
        let segments = []
        let widthDelta = this.sectionWidth/this.data.length
        console.log(this.data)
        let heightDelta = this.sectionHeight/this.categories.length
        let x = this.baseX, y = this.baseY

        for (let i = 0; i < this.categories.length; i++) {
            segments[i] = []
            for (let j = 0; j < this.data.length; j++) {
              let macro = {}
              macro.x1 = x + widthDelta * j
              macro.x2 = x + widthDelta * (j+1)
              macro.y1 = y + heightDelta * i
              macro.y2 = y + heightDelta * (i+1)
              macro.value = this.data[j][this.categories[i]]
              macro.attribute = this.categories[i]
              macro.name = this.data[j].Name
              segments[i].push(macro)
            }
        }
        return segments
      }
    }
  },

  methods: {
    drinks () {
      // change name of csv
      csv('../../static/idcDemoDrinksDaily.csv').then((data) => {
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
