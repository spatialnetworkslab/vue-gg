<template>
  <div>
    <vgg-graphic
      :width="600"
      :height="500"
      :data="xy">

      <vgg-section
        :x1="50"
        :x2="550"
        :y1="50"
        :y2="450"
        :scale-x="'xValues'"
        :scale-y="'yValues'"
      >

        <vgg-map v-slot="{ dataframe }" unit="dataframe">

          <vgg-trail
            :x="dataframe.xValues"
            :y="dataframe.yValues"
            :stroke-width="{ val: dataframe.xValues, scale: {domain: 'xValues', range: [0, trailWidth] } }"
            fill="#55a2c6"
            :sort="'x'"
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

    <p>Max width:
      <span class="wrapper">
        <button v-on:click="decrease">-</button>
        {{ trailWidth + 'px' }}
        <button v-on:click="increase">+</button>
      </span>
    </p>

  </div>
</template>

<script>
export default {
  data () {
    return {
      xy: this.generateNewData(),
      trailWidth: 20
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

    increase () {
      if (this.trailWidth < 50) {
        this.trailWidth = this.trailWidth + 5
      }
    },

    decrease () {
      if (this.trailWidth > 5) {
        this.trailWidth = this.trailWidth - 5
      }
    }
  }
}
</script>

<style scoped>

button {
  border-radius: 3px;
  border: solid;
  border-width: 1px;
  border-color: #e6e6e6;
  margin-left: 5px;
  margin-right: 5px;
}

</style>
