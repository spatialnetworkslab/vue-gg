<template>
    <vgg-graphic
      v-if="data"
      :width="2500"
      :height="2500"
      :data="data">

        <vgg-section
          v-for="(pair, j) in pairs"
          :x1="100 + 300 * pair[0]"
          :x2="350 + 300 * pair[0]"
          :y1="50 + 300 * pair[1]"
          :y2="300 + 300 * pair[1]"
          :scale-x="categories[pair[0]]"
          :scale-y="categories[pair[1]]"
        >

          <vgg-map v-slot="{ row }">

            <vgg-point
              :x="row[categories[pair[0]]]"
              :y="row[categories[pair[1]]]"
              :radius="2"
            />

          </vgg-map>

          <vgg-x-axis
            :scale="categories[pair[0]]"
            :title="categories[pair[0]]"
            :titleHjust="1.15"
            :vjust="-.05"
          />

          <vgg-y-axis
            :scale="categories[pair[1]]"
            :title="categories[pair[1]]"
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
      categories: ['Calories', 'Price', 'Sugars', 'ServingSize', 'Protein'],
      pairs: [[0, 1], [0, 2], [0, 3], [0, 4],
              [1, 0], [1, 2], [1, 3], [1, 4],
              [2, 0], [2, 1], [2, 3], [2, 4],
              [3, 0], [3, 1], [3, 2], [3, 4],
              [4, 0], [4, 1], [4, 2], [4, 3]
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
        console.log('hello world')
      })
    }
  }
}
</script>
