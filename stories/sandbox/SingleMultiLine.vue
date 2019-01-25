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
      :scale-x="'time'"
      :scale-y="'measurement'"
    >

      <vgg-map unit="dataframe">

        <vgg-multi-line
          :x="{ get: frame => frame.time }"
          :y="{ get: frame => frame.measurement }"
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

      return { time, measurement }
    }
  }
}
</script>
