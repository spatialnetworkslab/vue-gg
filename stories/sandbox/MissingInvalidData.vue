<template>
  <vgg-graphic
    :width="600"
    :height="600"
    :data="data"
  >

    <vgg-map v-slot="{ row }">

      <vgg-point
        :x="{ val: row.a, scale: 'a' }"
        :y="{ val: row.b, scale: 'b', NA: 300 }"
      />

    </vgg-map>

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
        ]
        // c: [
        //   4,
        //   4,
        //   4,
        //   4
        // ]
      }
    }
  }
}
</script>
