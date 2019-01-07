<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
  >

    <!-- <vgg-point
      :x="300"
      :y="300"
    /> -->

    <vgg-transform :trans="{ dropNA: null }">

      <vgg-map>

        <vgg-point
          :x="{ scale: 'a' }"
          :y="{ scale: 'b' }"
        />

      </vgg-map>

    </vgg-transform>

  </vgg-graphic>
</template>

<script>
export default {
  data () {
    return {
      data: {
        a: [
          'banana',
          'banana',
          NaN,
          'pear'
        ],
        b: [
          5,
          6,
          10,
          NaN
        ] }
    }
  }
}
</script>
