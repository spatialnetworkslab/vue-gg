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
      <vgg-scales :scales="{ widthScale: 'width' }" />

      <vgg-map
        v-slot="{ dataframe }"
        unit="dataframe"
      >

        <vgg-trail
          :x="{ val: dataframe.time, scale: 'time' }"
          :y="{ val: dataframe.measurement, scale: 'measurement', NA: 50 }"
          :stroke-width="{ val: dataframe.width, scale: '#widthScale'}"
          :opacity="0.8"
          fill="green"
        />

        <!-- <vgg-trail
          :x="{ val: dataframe.time, scale: 'time' }"
          :y="{ val: dataframe.measurement, scale: 'measurement', NA: 50 }"
          :stroke-width="10"
          :opacity="0.8"
          fill="green"
        /> -->

      </vgg-map>

    </vgg-section>

  </vgg-graphic>

</template>

<script>
export default {
  computed: {
    someTimeData () {
      let time = new Array(15).fill(1).map((v, i) => new Date(2018, i, 1))
      let measurement = new Array(15).fill(1).map((v, i) => Math.floor(i * Math.random() * 50))
      let width = [7, 12, 5, 3, 5, 8, 9, 10, 11, 12, 14, 16, 18, 20, 40]
      //let width = [70, 12, 5, 3, 5, 8, 9, 10, 11, 12, 14, 16, 18, 20, 40]
      //let width = [7, 7, 7, 7, 7, 7, 7, 8, 9, 9, 9, 9, 10, 10, 10]
      // let measurement = new Array(12).fill(1).map((v, i) => i % 2 === 0 ? Math.floor(i * Math.random() * 30) : NaN)

      return { time, measurement, width }
    }
  }
}
</script>
