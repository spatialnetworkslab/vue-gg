<template>
  <vgg-graphic
    :width="300"
    :height="250"
    :data="xy">

    <vgg-section
      :x1="30"
      :x2="275"
      :y1="25"
      :y2="225"
      :scale-x="'xValues'"
      :scale-y="'yValues'"
    >

      <vgg-map v-slot="{ dataframe }" unit="dataframe">

        <vgg-trail
          :x="dataframe.xValues"
          :y="dataframe.yValues"
          :stroke-width="{ val: dataframe.xValues, scale: 'xValues' }"
          fill="#c66366"
        />

      </vgg-map>

      <vgg-x-axis
        scale="xValues"
        :tickCount="5"
      />

      <vgg-y-axis
        scale="yValues"
        :hjust="0"
        :tickCount="2"
      />

    </vgg-section>
    
  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      xy: this.generateNewData(),
    }
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
