<template>
  <div>
    <vgg-graphic
      v-if="data"
      :width="2000"
      :height="400"
      :data="data">

      <!-- ROW 1 -->
      <!-- ROW 1 -->
      <!-- ROW 1 -->
      <!-- ROW 1 -->
      <!-- ROW 1 -->

      <!-- (1, 4) -->

      <vgg-section
        :x1="100 + 400 * 1"
        :x2="350 + 400 * 1"
        :y1="50"
        :y2="300"
        :scale-x="'ServingSize'"
        :scale-y="'Price'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.ServingSize"
            :y="row.Price"
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
          :scale="'Price'"
          title="price ($)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (2, 4) -->

      <vgg-section
        :x1="100 + 400 * 2"
        :x2="350 + 400 * 2"
        :y1="50"
        :y2="300"
        :scale-x="'Calories'"
        :scale-y="'Price'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Calories"
            :y="row.Price"
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
          :scale="'Price'"
          title="price ($)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (3, 4) -->

      <vgg-section
        :x1="100 + 400 * 3"
        :x2="350 + 400 * 3"
        :y1="50"
        :y2="300"
        :scale-x="'Sugars'"
        :scale-y="'Price'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Sugars"
            :y="row.Price"
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
          :scale="'Price'"
          title="price ($)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (4, 4) -->

      <vgg-section
        :x1="100 + 400 * 4"
        :x2="350 + 400 * 4"
        :y1="50"
        :y2="300"
        :scale-x="'Protein'"
        :scale-y="'Price'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Protein"
            :y="row.Price"
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
          :scale="'Price'"
          title="price ($)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

    </vgg-graphic>

    <vgg-graphic
      v-if="data"
      :width="2000"
      :height="400"
      :data="data">

      <!-- ROW 2 -->
      <!-- ROW 2 -->
      <!-- ROW 2 -->
      <!-- ROW 2 -->
      <!-- ROW 2 -->

      <!-- (0, 3) -->

      <vgg-section
        :x1="100"
        :x2="350"
        :y1="50"
        :y2="300"
        :scale-x="'Price'"
        :scale-y="'ServingSize'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Price"
            :y="row.ServingSize"
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
          :scale="'ServingSize'"
          title="serving size (ml)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (2, 3) -->

      <vgg-section
        :x1="100 + 400 * 2"
        :x2="350 + 400 * 2"
        :y1="50"
        :y2="300"
        :scale-x="'Calories'"
        :scale-y="'ServingSize'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Calories"
            :y="row.ServingSize"
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
          :scale="'ServingSize'"
          title="serving size (ml)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (3, 3) -->

      <vgg-section
        :x1="100 + 400 * 3"
        :x2="350 + 400 * 3"
        :y1="50"
        :y2="300"
        :scale-x="'Sugars'"
        :scale-y="'ServingSize'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Sugars"
            :y="row.ServingSize"
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
          :scale="'ServingSize'"
          title="serving size (ml)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (4, 3) -->

      <vgg-section
        :x1="100 + 400 * 4"
        :x2="350 + 400 * 4"
        :y1="50"
        :y2="300"
        :scale-x="'Protein'"
        :scale-y="'ServingSize'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Protein"
            :y="row.ServingSize"
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
          :scale="'ServingSize'"
          title="serving size (ml)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

    </vgg-graphic>

    <vgg-graphic
      v-if="data"
      :width="2000"
      :height="400"
      :data="data">

      <!-- ROW 3 -->
      <!-- ROW 3 -->
      <!-- ROW 3 -->
      <!-- ROW 3 -->
      <!-- ROW 3 -->

      <!-- (0, 2) -->

      <vgg-section
        :x1="100"
        :x2="350"
        :y1="50"
        :y2="300"
        :scale-x="'Price'"
        :scale-y="'Calories'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Price"
            :y="row.Calories"
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
          :scale="'Calories'"
          title="calories (kcal)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (1, 2) -->

      <vgg-section
        :x1="100 + 400 * 1"
        :x2="350 + 400 * 1"
        :y1="50"
        :y2="300"
        :scale-x="'ServingSize'"
        :scale-y="'Calories'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.ServingSize"
            :y="row.Calories"
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
          :scale="'Calories'"
          title="calories (kcal)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (3, 2) -->

      <vgg-section
        :x1="100 + 400 * 3"
        :x2="350 + 400 * 3"
        :y1="50"
        :y2="300"
        :scale-x="'Sugars'"
        :scale-y="'Calories'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Sugars"
            :y="row.Calories"
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
          :scale="'Calories'"
          title="calories (kcal)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

      <!-- (4, 2) -->

      <vgg-section
        :x1="100 + 400 * 4"
        :x2="350 + 400 * 4"
        :y1="50"
        :y2="300"
        :scale-x="'Protein'"
        :scale-y="'Calories'"
      >

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="row.Protein"
            :y="row.Calories"
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
          :scale="'Calories'"
          title="calories (kcal)"
          :hjust="-.05"
          flip
        />

      </vgg-section>

    </vgg-graphic>

    <vgg-graphic
      v-if="data"
      :width="2000"
      :height="400"
      :data="data">

      <!-- ROW 4 -->
      <!-- ROW 4 -->
      <!-- ROW 4 -->
      <!-- ROW 4 -->
      <!-- ROW 4 -->

      <!-- (0, 1) -->

      <vgg-section
        :x1="100"
        :x2="350"
        :y1="50"
        :y2="300"
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
        :y1="50"
        :y2="300"
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
        :y1="50"
        :y2="300"
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
        :y1="50"
        :y2="300"
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

    <vgg-graphic
      v-if="data"
      :width="2000"
      :height="400"
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
        :y1="50"
        :y2="300"
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
        :y1="50"
        :y2="300"
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
        :y1="50"
        :y2="300"
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
        :y1="50"
        :y2="300"
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
  </div>
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
