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
      <vgg-map
        v-slot="{ dataframe }"
        unit="dataframe"
      >

        <vgg-trail
          :x="{ val: dataframe.time, scale: 'time' }"
          :y="{ val: dataframe.measurement, scale: 'measurement', NA: 50 }"
          :stroke-width="{ val: dataframe.width}"
        />

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
      let length = 15, max = 10
      let width = [7, 6, 8, 3, 2, 5, 6, 1, 20, 3, 12, 15, 10, 14, 15]
      return { time, measurement, width }
    }
  }
}
</script>
