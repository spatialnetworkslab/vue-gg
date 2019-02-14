<template>
    <vgg-graphic
      v-if="data"
      :width="2000"
      :height="2000"
      :data="data">

      <!-- ROW 5 -->
      <!-- ROW 5 -->
      <!-- ROW 5 -->
      <!-- ROW 5 -->
      <!-- ROW 5 -->

      <!-- (0, 0) -->

      <vgg-section
        :x1="100 + 400 * 0"
        :x2="350 + 400 * 0"
        :y1="50 + 350 * 0"
        :y2="300 + 350 * 0"
        :scale-x="'Price'"
        :scale-y="'Protein'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Price"
            :y="row.Protein"
            :radius="2"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Price'"
          title="price ($)"
          :titleHjust="1.05"
          :vjust="-.05"
          titleAnchorPoint="l"
        />

        <vgg-y-axis
          :scale="'Protein'"
          title="protein (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (1, 0) -->

      <vgg-section
        :x1="100 + 400 * 1"
        :x2="350 + 400 * 1"
        :y1="50 + 350 * 0"
        :y2="300 + 350 * 0"
        :scale-x="'ServingSize'"
        :scale-y="'Protein'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.ServingSize"
            :y="row.Protein"
            :radius="2"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'ServingSize'"
          title="serving size (ml)"
          :titleHjust="1.05"
          :vjust="-.05"
          titleAnchorPoint="l"
        />

        <vgg-y-axis
          :scale="'Protein'"
          title="protein (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (2, 0) -->

      <vgg-section
        :x1="100 + 400 * 2"
        :x2="350 + 400 * 2"
        :y1="50 + 350 * 0"
        :y2="300 + 350 * 0"
        :scale-x="'Calories'"
        :scale-y="'Protein'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Calories"
            :y="row.Protein"
            :radius="2"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Calories'"
          title="calories (kcal)"
          :titleHjust="1.05"
          :vjust="-.05"
          titleAnchorPoint="l"
        />

        <vgg-y-axis
          :scale="'Protein'"
          title="protein (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (3, 0) -->

      <vgg-section
        :x1="100 + 400 * 3"
        :x2="350 + 400 * 3"
        :y1="50 + 350 * 0"
        :y2="300 + 350 * 0"
        :scale-x="'Sugars'"
        :scale-y="'Protein'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Sugars"
            :y="row.Protein"
            :radius="2"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Sugars'"
          title="sugars (g)"
          :titleHjust="1.05"
          :vjust="-.05"
          titleAnchorPoint="l"
        />

        <vgg-y-axis
          :scale="'Protein'"
          title="protein (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

    </vgg-graphic>

    <vgg-graphic
      v-if="data"
      :width="2000"
      :height="2000"
      :data="data">

      <!-- ROW 4 -->
      <!-- ROW 4 -->
      <!-- ROW 4 -->
      <!-- ROW 4 -->
      <!-- ROW 4 -->

      <!-- (0, 1) -->

      <vgg-section
        :x1="100 + 400 * 0"
        :x2="350 + 400 * 0"
        :y1="50 + 350 * 1"
        :y2="300 + 350 * 1"
        :scale-x="'Price'"
        :scale-y="'Sugars'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Price"
            :y="row.Sugars"
            :radius="2"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Price'"
          title="price ($)"
          :titleHjust="1.05"
          :vjust="-.05"
          titleAnchorPoint="l"
        />

        <vgg-y-axis
          :scale="'Sugars'"
          title="sugars (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (1, 1) -->

      <vgg-section
        :x1="100 + 400 * 1"
        :x2="350 + 400 * 1"
        :y1="50 + 350 * 1"
        :y2="300 + 350 * 1"
        :scale-x="'ServingSize'"
        :scale-y="'Sugars'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.ServingSize"
            :y="row.Sugars"
            :radius="2"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'ServingSize'"
          title="serving size (ml)"
          :titleHjust="1.05"
          :vjust="-.05"
          titleAnchorPoint="l"
        />

        <vgg-y-axis
          :scale="'Sugars'"
          title="sugars (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (2, 1) -->

      <vgg-section
        :x1="100 + 400 * 2"
        :x2="350 + 400 * 2"
        :y1="50 + 350 * 1"
        :y2="300 + 350 * 1"
        :scale-x="'Calories'"
        :scale-y="'Sugars'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Calories"
            :y="row.Sugars"
            :radius="2"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Calories'"
          title="calories (kcal)"
          :titleHjust="1.05"
          :vjust="-.05"
          titleAnchorPoint="l"
        />

        <vgg-y-axis
          :scale="'Sugars'"
          title="sugars (g)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (4, 1) -->

      <vgg-section
        :x1="100 + 400 * 4"
        :x2="350 + 400 * 4"
        :y1="50 + 350 * 1"
        :y2="300 + 350 * 1"
        :scale-x="'Protein'"
        :scale-y="'Sugars'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Protein"
            :y="row.Sugars"
            :radius="2"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'Protein'"
          title="protein (g)"
          :titleHjust="1.05"
          :vjust="-.05"
          titleAnchorPoint="l"
        />

        <vgg-y-axis
          :scale="'Sugars'"
          title="sugars (g)"
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
      data: undefined,
      categoryX: ['Price', 'ServingSize', 'Calories', 'Sugars', 'Protein'],
      categoryY: ['Protein', 'Sugars', 'Calories', 'ServingSize', 'Price']
    }
  },

  mounted () {
    this.drinks()
  },

  methods: {
    drinks () {
      csv('/idcDrinksDemo.csv').then((data) => {
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
