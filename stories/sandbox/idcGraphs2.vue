<template>
    <vgg-graphic
      v-if="data"
      :width="2000"
      :height="2000"
      :data="data">

        <vgg-section
          v-for="(pair, j) in pairs"
          :x1="100 + 400 * pair[0]"
          :x2="350 + 400 * pair[0]"
          :y1="50 + 350 * pair[1]"
          :y2="300 + 350 * pair[1]"
          :scale-x="categoryX[pair[0]]"
          :scale-y="categoryY[pair[1]]"
        >

          <vgg-map v-slot="{ row }">

            <vgg-point
              :x="row[categoryX[pair[0]]]"
              :y="row[categoryY[pair[1]]]"
              :radius="2"
            />

          </vgg-map>

          <vgg-x-axis
            :scale="categoryX[pair[0]]"
            :title="categoryX[pair[0]]"
            :titleHjust="1.05"
            :vjust="-.05"
            titleAnchorPoint="l"
          />

          <vgg-y-axis
            :scale="categoryY[pair[1]]"
            :title="categoryY[pair[1]]"
            :hjust="-.05"
            flip
          />

        </vgg-section>

      </g>

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
      categoryY: ['Protein', 'Sugars', 'Calories', 'ServingSize', 'Price'],
      pairs: [[1, 4], [2, 4], [3, 4], [4, 4],
              [0, 3], [2, 3], [3, 3], [4, 3],
              [0, 2], [1, 2], [3, 2], [4, 2],
              [0, 1], [1, 1], [2, 1], [4, 1],
              [0, 0], [1, 0], [2, 0], [3, 0]
            ]
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
      })
    }
  }
}
</script>
