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
        :y1="baseY + sectionHeight * 2"
        :y2="sectionHeight * 2.2 + baseY"
        :scale-x="[baseX, sectionWidth + baseX]"
        :scale-y="[baseY, sectionHeight + baseY]"
      >

        <g v-for="(item, i) in segments(2, 40)">
          <vgg-data v-if="segments" :data="item">
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
        :scale="categories2"
        title="Attributes"
        :hjust="-0.02"
        :vjust="0.3"
        :titleVjust="1.2"
        flip
      />

      </vgg-section>

      <vgg-section
        :x1="baseX"
        :x2="sectionWidth + baseX"
        :y1="baseY + sectionHeight * 1.3"
        :y2="sectionHeight * 1.7 + baseY"
        :scale-x="[baseX, sectionWidth + baseX]"
        :scale-y="[baseY, sectionHeight + baseY]"
      >

        <g v-for="(item, i) in segments(5, 40)">
          <vgg-data v-if="segments" :data="item">
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
        :scale="categories5"
        title="Attributes"
        :hjust="-0.02"
        :vjust="0.3"
        :titleVjust="1.1"
        flip
      />

      </vgg-section>

      <vgg-section
        :x1="baseX"
        :x2="sectionWidth + baseX"
        :y1="baseY"
        :y2="sectionHeight + baseY"
        :scale-x="[baseX, sectionWidth + baseX]"
        :scale-y="[baseY, sectionHeight + baseY]"
      >

        <g v-for="(item, i) in segments(10, 40)">
          <vgg-data v-if="segments" :data="item">
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
        :scale="categories10"
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
  name: 'idc-heatmap',

  data () {
    return {
      data: undefined,
      title: "Drinks Heatmap",
      categories2: ['Sugars', 'Calories'],
      categories5: ['Calories', 'Protein', 'Sugars', 'Carbohydrates', 'Cholesterol'],
      categories10: ['Calories', 'Protein', 'Sugars', 'Carbohydrates', 'SaturatedFat', 'TransFat', 'Cholesterol', 'Sodium', 'Fibre', 'VitaminA', 'VitaminC', 'Calcium', 'Iron'],
      width: 1000,
      height: 1000,
      sectionWidth: 800,
      sectionHeight: 300,
      baseX: 100,
      baseY: 200,

    }
  },

  mounted () {
    this.drinks()
  },

  methods: {
    segments(dimensions, options){
      if (this.data) {
        let categories = this.categories10


        if (!isNaN(dimensions)){
          if (dimensions === 2) {
            categories = this.categories2
          } else if (dimensions === 5) {
            categories = this.categories5
          } else if (dimensions === 10) {
            categories = this.categories10
          }
        }

        if (isNaN(options)){
          let options = this.data.length
        }

        let segments = []
        let widthDelta = this.sectionWidth/this.data.length
        let heightDelta = this.sectionHeight/categories.length
        let x = this.baseX, y = this.baseY

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
        return segments
      }
    },

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
