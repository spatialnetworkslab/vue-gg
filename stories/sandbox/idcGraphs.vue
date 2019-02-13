<template>
    <vgg-graphic
      v-if="data"
      :width="1200"
      :height="1100"
      :data="data">

      <!-- Section Price : Calories -->

      <vgg-section
        :x1="750"
        :x2="1000"
        :y1="400"
        :y2="650"
        :scale-x="'Price'"
        :scale-y="'Calories'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Price"
            :y="row.Calories"
            :radius="3"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Price'"
          title="Price ($)"
          :titleHjust="1.15"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'Calories'"
          title="calories (kcal)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- Section Price : Sugars -->

      <vgg-section
        :x1="750"
        :x2="1000"
        :y1="750"
        :y2="1000"
        :scale-x="'Price'"
        :scale-y="'Sugars'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Price"
            :y="row.Sugars"
            :radius="3"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Price'"
          title="Price ($)"
          :titleHjust="1.15"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'Sugars'"
          title="sugars (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- Section Calories : Price -->

      <vgg-section
        :x1="400"
        :x2="650"
        :y1="50"
        :y2="300"
        :scale-x="'Calories'"
        :scale-y="'Price'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Calories"
            :y="row.Price"
            :radius="3"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Calories'"
          title="calories (kcal)"
          :titleHjust="1.15"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'Price'"
          title="price ($)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- Section Calories : Sugars -->

      <vgg-section
        :x1="400"
        :x2="650"
        :y1="750"
        :y2="1000"
        :scale-x="'Calories'"
        :scale-y="'Sugars'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Calories"
            :y="row.Sugars"
            :radius="3"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Calories'"
          title="calories (kcal)"
          :titleHjust="1.15"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'Sugars'"
          title="sugars (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- Section Sugars : Calories -->

      <vgg-section
        :x1="50"
        :x2="300"
        :y1="400"
        :y2="650"
        :scale-x="'Sugars'"
        :scale-y="'Calories'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Sugars"
            :y="row.Calories"
            :radius="3"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Sugars'"
          title="sugars (g)"
          :titleHjust="1.15"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'Calories'"
          title="calories (kcal)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- Section Sugars : Price -->

      <vgg-section
        :x1="50"
        :x2="300"
        :y1="50"
        :y2="300"
        :scale-x="'Sugars'"
        :scale-y="'Price'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Sugars"
            :y="row.Price"
            :radius="3"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Sugars'"
          title="sugars (g)"
          :titleHjust="1.15"
          :vjust="-.05"
        />

        <vgg-y-axis
          :scale="'Price'"
          title="price ($)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

    </vgg-graphic>
</template>

<script>
import {csv} from 'd3-fetch'

export default {
  name: 'idc',

  data () {
    return {
      data: undefined
    }
  },

  mounted () {
    this.drinks()
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
            Sugars: parseInt(d.Sugars)
          }
        }))
        console.log(data)
      })
    }
  }
}
</script>
