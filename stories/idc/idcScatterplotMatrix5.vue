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

            <vgg-idc-point
              :x="row[categoryX[pair[0]]]"
              :y="row[categoryY[pair[1]]]"
              :radius="5"
              :index="{val: row.Index}"
              :selectionIndex="index"
              :clickHandler="clickHandler"
              :hoverHandler="hoverHandler"
              :leaveHandler="leaveHandler"
              :fill="row.Color"
              :fillOpacity="0.7"
            />

          </vgg-map>

          <vgg-x-axis
            :scale="categoryX[pair[0]]"
            :title="categoryX[pair[0]]"
            :titleHjust="1.05"
            :vjust="-.05"
            titleAnchorPoint="l"
            :tickCount="5"
          />

          <vgg-y-axis
            :scale="categoryY[pair[1]]"
            :title="categoryY[pair[1]]"
            :hjust="-.05"
            :tickCount="5"
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
      index: -1,
      selected: false,
      categoryX: ['Sodium', 'ServingSize', 'Calories', 'Sugars', 'Protein'],
      categoryY: ['Protein', 'Sugars', 'Calories', 'ServingSize', 'Sodium'],
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
    clickHandler (self) {
      return () => {
        if (!this.selected) {
          this.index = self.index
          this.selected = true
        } else if (this.selected && this.index != self.index) {
          this.index = self.index
          this.selected = true
        } else if (this.selected && this.index === self.index) {
          this.index = -1
          this.selected = false
        } else {
          throw new Error('Error in click handler')
        }
      }

    },

    hoverHandler (self) {
      return () => {
        if (this.selected) {
          return
        } else {
          this.index = self.index
        }
      }
    },

    leaveHandler (self) {
      return () => {
        if (this.selected) {
          return
        } else {
          this.index = -1
        }
      }
    },

    drinks () {
      csv('../../static/idcDrinksDemoSmall.csv').then((data) => {
        this.data = Object.freeze(data.map((d, i) => {
          return {
            Index: i,
            Calories: parseInt(d.Calories),
            Sodium: parseInt(d.Sodium),
            Protein: parseInt(d.Protein),
            ServingSize: parseInt(d['Serving Size']),
            Sugars: parseInt(d.Sugars),
            Color: d.Color2
          }
        }))
      })
    }
  }
}
</script>
