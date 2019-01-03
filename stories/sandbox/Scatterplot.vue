<template>
  <div>

    <vgg-graphic
      :width="600"
      :height="600"
      :data="xy">

      <vgg-transform
        :trans="[
          { filter: ({ explanatory, dependent }) => explanatory > 50 && dependent > 50 }
        ]"
      >

        <vgg-section
          :x1="100"
          :x2="500"
          :y1="100"
          :y2="500"
        >

          <vgg-map>

            <vgg-point
              :x="{ scale: 'explanatory' }"
              :y="{ scale: 'dependent' }"
              :radius="{ scale: { variable: 'dependent' } }"
              :color="{ scale: { scale: 'viridis', variable: 'explanatory' } }"
            />
          </vgg-map>

        </vgg-section>

        <vgg-x-grid
          :x1="100"
          :x2="500"
          :y1="100"
          :y2="500"
          :scale="'explanatory'"
        />

        <vgg-y-grid
          :x1="100"
          :x2="500"
          :y1="100"
          :y2="500"
          :scale="'dependent'"
        />

        <vgg-x-axis
          :x1="100"
          :x2="500"
          :y1="50"
          :y2="100"
          :scale="'explanatory'"
        />

        <vgg-y-axis
          :x1="500"
          :x2="550"
          :y1="100"
          :y2="500"
          :scale="'dependent'"
        />

      </vgg-transform>

    </vgg-graphic>

    <div style="margin-top: 10px;">
      <button @click="generateNewData()">Generate new data</button>
    </div>

  </div>
</template>

<script>
import { xy } from './dummyData.js'

export default {
  name: 'Scatterplot',

  data () {
    return {
      xy: xy('explanatory', 'dependent')
    }
  },

  methods: {
    generateNewData () {
      let newData = xy('explanatory', 'dependent')
      this.xy = newData
    }
  }
}
</script>
