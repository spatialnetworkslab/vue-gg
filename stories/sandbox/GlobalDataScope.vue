<template>
  <vgg-graphic
    :width="500"
    :height="500"
  >

    <vgg-data
      id="original"
      :data="testData"
    >

      <vgg-data :transform="{ filter: row => row.a > 2 }">

        <vgg-map>
          <vgg-point
            :x="{ get: 'a', scale: 'original/a' }"
            :y="{ get: 'b', scale: 'original/b' }"
          />
        </vgg-map>

      </vgg-data>

    </vgg-data>

  </vgg-graphic>
</template>

<script>
export default {
  computed: {
    testData () {
      return {
        a: [1, 2, 3, 4, 5],
        b: [5, 6, 7, 8, 9]
      }
    }
  }
}
</script>
