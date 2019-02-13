<template>

  <vgg-graphic
    :width="500"
    :height="500"
    :data="someTimeData"
  >

    <vgg-section
      :x1="50"
      :x2="450"
      :y1="50"
      :y2="450"
    >
      <vgg-scales :scales="{ myScale: 'width' }" />

      <vgg-map
        v-slot="{ dataframe }"
        unit="dataframe"
      >


        <!-- <vgg-multi-line
          :x="{ val: dataframe.time, scale: 'time' }"
          :y="{ val: dataframe.measurement, scale: 'measurement', NA: 50 }"
          stroke-linecap="round"
          :stroke-width="10"
        /> -->

        <vgg-trail
          :x="{ val: dataframe.time, scale: 'time' }"
          :y="{ val: dataframe.measurement, scale: 'measurement', NA: 50 }"
          stroke-linecap="round"
          :stroke-width="{ val: dataframe.width, scale: '#myScale' }"
          :sort="'x'"
          :stroke-opacity="0.5"
          />

      </vgg-map>

    </vgg-section>

  </vgg-graphic>

</template>

<script>
export default {
  computed: {
    someTimeData () {
      let time = new Array(12).fill(1).map((v, i) => new Date(2018, i, 1))
      let measurement = new Array(12).fill(1).map((v, i) => Math.floor(i * Math.random() * 30))
      let width = new Array(12).fill(1).map((v, i) => Math.floor(i * Math.random() * 30))
      // let measurement = new Array(12).fill(1).map((v, i) => i % 2 === 0 ? Math.floor(i * Math.random() * 30) : NaN)
      console.log(width)
      return { time, measurement, width}
    }
  }
}
</script>
