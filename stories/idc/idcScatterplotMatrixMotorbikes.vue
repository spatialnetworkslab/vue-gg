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
            <div v-if="test()"/>
            <!-- <vgg-idc-point
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
            /> -->

            <vgg-point
              :x="row[categoryX[pair[0]]]"
              :y="row[categoryY[pair[1]]]"
              :radius="5"
              :fill="row.Color"
              :fillOpacity="1"
            />

          </vgg-map>

          <vgg-x-axis
            :scale="categoryX[pair[0]]"
            :title="categoryX[pair[0]]"
            :title-hjust="1.05"
            :title-vjust="0.5"
            :vjust="-.05"
            titleAnchorPoint="l"
            :tickCount="5"
          />

          <vgg-y-axis
            :scale="categoryY[pair[1]]"
            :title="categoryY[pair[1]]"
            :hjust="-.05"
            :title-vjust="1.05"
            :title-hjust="0.5"
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
      // categoryX: ['Sodium', 'ServingSize', 'Calories', 'Sugars', 'Protein'],
      // categoryY: ['Protein', 'Sugars', 'Calories', 'ServingSize', 'Sodium'],
      categoryX: ['Price', 'WetWeight', 'RearWheelHorsepower', 'TopSpeed', 'MilesPG', 'ZeroTo60', 'Stop60', 'RearWheelTQLbFt', 'QuartermileSec', 'PWRatio'],
      categoryY: ['PWRatio', 'QuartermileSec' , 'RearWheelTQLbFt', 'Stop60', 'ZeroTo60', 'MilesPG', 'TopSpeed', 'RearWheelHorsepower', 'WetWeight', 'Price'],
      pairs: [[1, 4], [2, 4], [3, 4], [4, 4],
              [0, 3], [2, 3], [3, 3], [4, 3],
              [0, 2], [1, 2], [3, 2], [4, 2],
              [0, 1], [1, 1], [2, 1], [4, 1],
              [0, 0], [1, 0], [2, 0], [3, 0]
            ],
      // pairs: [[1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9],
      //         [0, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
      //         [0, 7], [1, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7], [9, 7],
      //         [0, 6], [1, 6], [2, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6], [9, 6],
      //         [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5], [8, 5],
      //         [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [6, 4], [7, 4], [8, 4], [9, 4],
      //         [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [7, 3], [8, 3], [9, 3],
      //         [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [8, 2], [9, 2],
      //         [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [9, 1],
      //         [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
      //       ]
    }
  },

  mounted () {
    //this.drinks()
    //this.bikes5()
    //this.bikes10()
    this.bikes25()
    //this.bikes40()
  },

  methods: {
    test () {
      console.log(this.data)
    },

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
      csv('../../static/idcDrinksDemoClean.csv').then((data) => {
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
    },

    bikes40 () {
      csv('../../static/mcn_performance_index14_40.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Name: d['Make and Model'],
            Price: parseInt(d['Base MSRP']),
            Rating: d['Rating Category'],
            PWRatio: parseInt(d.PWRatio),
            MilesPG: parseInt(d['Average MPG']),
            RearWheelHorsepower: parseInt(d['Rear-Wheel HP']),
            RearWheelTQLbFt: parseInt(d['Rear-Wheel TQ (lb.-ft.)']),
            ZeroTo100: parseInt(d['0–100 mph, sec.']),
            WetWeight: parseInt(d['Wet Weight']),
            TopSpeed: parseInt(d['Top Speed']),
            ZeroTo60: parseInt(d['0–60 mph, sec.']),
            QuartermileSec: parseInt(d['Quartermile, sec']),
            QuartermileHr: parseInt(d['Quartermile, mph']),
            Stop60: parseInt(d['Braking 60–0 mph (feet)']),
            Color: d.Color,
          }
        }))
      })
    },

    bikes5 () {
      csv('../../static/mcn_performance_index14_5.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Name: d['Make and Model'],
            Price: parseInt(d['Base MSRP']),
            Rating: d['Rating Category'],
            PWRatio: parseInt(d.PWRatio),
            MilesPG: parseInt(d['Average MPG']),
            RearWheelHorsepower: parseInt(d['Rear-Wheel HP']),
            RearWheelTQLbFt: parseInt(d['Rear-Wheel TQ (lb.-ft.)']),
            ZeroTo100: parseInt(d['0–100 mph, sec.']),
            WetWeight: parseInt(d['Wet Weight']),
            TopSpeed: parseInt(d['Top Speed']),
            ZeroTo60: parseInt(d['0–60 mph, sec.']),
            QuartermileSec: parseInt(d['Quartermile, sec']),
            QuartermileHr: parseInt(d['Quartermile, mph']),
            Stop60: parseInt(d['Braking 60–0 mph (feet)']),
            Color: d.Color,
          }
        }))
      })
    },

    bikes10 () {
      csv('../../static/mcn_performance_index14_10.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Name: d['Make and Model'],
            Price: parseInt(d['Base MSRP']),
            Rating: d['Rating Category'],
            PWRatio: parseInt(d.PWRatio),
            MilesPG: parseInt(d['Average MPG']),
            RearWheelHorsepower: parseInt(d['Rear-Wheel HP']),
            RearWheelTQLbFt: parseInt(d['Rear-Wheel TQ (lb.-ft.)']),
            ZeroTo100: parseInt(d['0–100 mph, sec.']),
            WetWeight: parseInt(d['Wet Weight']),
            TopSpeed: parseInt(d['Top Speed']),
            ZeroTo60: parseInt(d['0–60 mph, sec.']),
            QuartermileSec: parseInt(d['Quartermile, sec']),
            QuartermileHr: parseInt(d['Quartermile, mph']),
            Stop60: parseInt(d['Braking 60–0 mph (feet)']),
            Color: d.Color,
          }
        }))
      })
    },

    bikes25 () {
      csv('../../static/mcn_performance_index14_25.csv').then((data) => {
        this.data = Object.freeze(data.map(d => {
          return {
            Name: d['Make and Model'],
            Price: parseInt(d['Base MSRP']),
            Rating: d['Rating Category'],
            PWRatio: parseInt(d.PWRatio),
            MilesPG: parseInt(d['Average MPG']),
            RearWheelHorsepower: parseInt(d['Rear-Wheel HP']),
            RearWheelTQLbFt: parseInt(d['Rear-Wheel TQ (lb.-ft.)']),
            ZeroTo100: parseInt(d['0–100 mph, sec.']),
            WetWeight: parseInt(d['Wet Weight']),
            TopSpeed: parseInt(d['Top Speed']),
            ZeroTo60: parseInt(d['0–60 mph, sec.']),
            QuartermileSec: parseInt(d['Quartermile, sec']),
            QuartermileHr: parseInt(d['Quartermile, mph']),
            Stop60: parseInt(d['Braking 60–0 mph (feet)']),
            Color: d.Color,
          }
        }))
      })
    },
  }
}
</script>
