<template>

  <vgg-graphic
    :width="500"
    :height="250"
    :data="dummy"
  >

    <vgg-scales
      :scales="{
        scaleX: { domain: 'a', type: 'squareRoot' },
        scaleY: 'b',
        scaleColor: 'c'
      }"
    />

    <vgg-data :transform="{ groupBy: 'c' }">

      <vgg-map>

        <vgg-section
          :x="{ scale: 'c' }"
          :w="{ position: 'bulge' }"
          :y1="0"
          :y2="250"
          :scales="{
            x: 'scaleA',
            y: { domain: [0, 1] }
          }"
          :data="row => row.grouped"
        >

          <vgg-map>

              <vgg-point
                :x="{ get: row => row.a, scale: 'scaleX' }"
                :y="{ get: row => row.b,  }"
                :fill=""
              />

          </vgg-map>

        </vgg-section>

      </vgg-map>

    </vgg-data>

  </vgg-graphic>

</template>

<script>
export default {
  data () {
    return {
      dummy: {
        a: [1, 2, 3, 4, 5, 6],
        b: [1, 2, 3, 4, 5, 6],
        c: ['apple', 'banana', 'banana', 'apple', 'apple', 'banana']
      }
    }
  }
}
</script>
