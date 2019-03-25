<template>
  <div>
    <vgg-graphic
      :width="600"
      :height="500"
      :data="xy">

      <vgg-section
        :x1="100"
        :x2="505"
        :y1="50"
        :y2="450"
        :scale-x="'xValues'"
        :scale-y="'yValues'"
      >

        <vgg-map v-slot="{ dataframe }" unit="dataframe">

          <vgg-path
            :x="dataframe.xValues"
            :y="dataframe.yValues"
            :close="close"
            :fill="fill"
          />

        </vgg-map>

        <vgg-x-axis
          scale="xValues"
          :tickCount="5"
        />

        <vgg-y-axis
          scale="yValues"
          :hjust="0"
          :tickCount="5"
        />

      </vgg-section>
      
    </vgg-graphic>

    <p>Options:
      <input type="radio" id="stroke" value="close" v-model="options"><label for="close">Close</label>
      <input type="radio" id="fill" value="fill" v-model="options"><label for="fill">Fill</label>
      <input type="radio" id="both" value="both" v-model="options"><label for="both">Both</label>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      xy: this.generateNewData(),
      options: 'both',
    }
  },
  
  computed: {
    close () {
      if (this.options === 'both' || this.options === 'close') {
        return true
      }
      return false
    },

    fill () {
      if (this.options === 'both' || this.options === 'fill') {
        return '#c66366'
      }
      return 'none'
    },
  },

  methods: {
    generateNewData () {
      let yValues = [0, 0, 0, 0, 0, 0, 0, 2, 374, 526, 255, 557, 889, 835, 563, 327, 521, 800, 656, 565, 935,]
      let newData =[]
      for (let ix = 0; ix < yValues.length; ix ++) {
        newData.push({ xValues: ix, yValues: yValues[ix] })
      }
      return newData

    },
  }
}
</script>
