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
        unit="dataframe"
        v-slot=""
      >

        <vgg-multi-line
          :x="{ get: 'time', scale: 'time' }"
          :y="{ get: 'measurement', scale: 'measurement', NA: 50 }"
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
      // let measurement = new Array(12).fill(1).map((v, i) => i % 2 === 0 ? Math.floor(i * Math.random() * 30) : NaN)

      return { time, measurement }
    }
  }
}
</script>
