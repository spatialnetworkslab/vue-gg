<template>
  <div>
    <br>
    <vgg-graphic
      :width="width"
      :height="height"
      :data="data"
    >

      <vgg-plot-title
        :text="title"/>

      <vgg-section
        :x1="baseX"
        :x2="sectionWidth + baseX"
        :y1="baseY"
        :y2="sectionHeight + baseY"
        :scale-x="[baseX, sectionWidth + baseX]"
        :scale-y="[baseY, sectionHeight + baseY]"
      >

      <!-- <vgg-scales :scales="{ priceScale: 'Price' }" />
      <vgg-scales :scales="{ calorieScale: 'Calories' }" />
      <vgg-scales :scales="{ servingScale: 'Serving Size' }" />
      <vgg-scales :scales="{ sugarScale: 'Sugars' }" />
      <vgg-scales :scales="{ proteinScale: 'Protein' }" /> -->

      <vgg-data v-if="segments" :data="segments[0]">

        <vgg-map v-slot="{ row }">
          <vgg-rectangle
          :x1="row.x1"
          :x2="row.x2"
          :y1="row.y1"
          :y2="row.y2"
          :fill="{val: row.value, scale: { type: 'reds', domain: 'value'}}"
          />
        </vgg-map>
      </vgg-data>

      <vgg-data v-if="segments" :data="segments[1]">

        <vgg-map v-slot="{ row }">
          <vgg-rectangle
          :x1="row.x1"
          :x2="row.x2"
          :y1="row.y1"
          :y2="row.y2"
          :fill="{val: row.value, scale: { type: 'oranges', domain: 'value'}}"
          />
        </vgg-map>
      </vgg-data>

      <vgg-data v-if="segments" :data="segments[2]">

        <vgg-map v-slot="{ row }">
          <vgg-rectangle
          :x1="row.x1"
          :x2="row.x2"
          :y1="row.y1"
          :y2="row.y2"
          :fill="{val: row.value, scale: { type: 'viridis', domain: 'value'}}"
          />
        </vgg-map>
      </vgg-data>

      <vgg-data v-if="segments" :data="segments[3]">

        <vgg-map v-slot="{ row }">
          <vgg-rectangle
          :x1="row.x1"
          :x2="row.x2"
          :y1="row.y1"
          :y2="row.y2"
          :fill="{val: row.value, scale: { type: 'greens', domain: 'value'}}"
          />
        </vgg-map>
      </vgg-data>

      <vgg-data v-if="segments" :data="segments[4]">

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

        <vgg-x-axis
          :scale="'Name'"
          title="Drink Item"
          :titleHjust="1.03"
          :vjust="-.05"
          :labelFontSize="8"
          labelRotate
        />

        <vgg-y-axis
          :scale="categories"
          title="Attributes"
          :hjust="-0.01"
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
      categories: ['Price','Calories', 'Protein' , 'ServingSize' , 'Sugars'],
      title: "Heatmap",
      width: 1500,
      height: 1000,
      sectionWidth: 1100,
      sectionHeight: 300,
      baseX: 100,
      baseY: 600
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
              // segments.push(macro)
              segments[i].push(macro)
            }
        }
        // for (let i = 0; i < this.data.length; i++) {
        //     segments[i]= {}
        //     let foodItem = segments[i]
        //     let macronutrientRect = {'x1': undefined, 'x2': undefined, 'y1': undefined, 'y2': undefined, 'value': undefined}
        //     for (let j = 0; j < this.categories.length; j ++) {
        //       foodItem[this.categories[j]] = {}
        //       let macro = foodItem[this.categories[j]]
        //       macro.x1 = x + widthDelta * i
        //       macro.x2 = x + widthDelta * (i+1)
        //       macro.y1 = y + heightDelta * j
        //       macro.y2 = y + heightDelta * (j+1)
        //       macro.name = this.data[i].Name
        //       macro.value = this.data[i][this.categories[j]]
        //     }
        // }
        return segments
      }
    }
  },

  methods: {
    drinks () {
      csv('../../static/idcDrinksDemo.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Calories: parseInt(d.Calories),
            Price: parseInt(d.Price),
            Protein: parseInt(d.Protein),
            ServingSize: parseInt(d['Serving Size']),
            Sugars: parseInt(d.Sugars),
            Name: d['Renamed Item']
          }
        }))
        console.log(this.data)
        console.log(this.segments)
      })
    }
  }
}
</script>
