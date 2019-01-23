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
          :scale-x="'#scaleX'"
          :scale-y="'#scaleY'"
          :data="row => row.grouped"
        >

          <vgg-map>

            <vgg-point
              :x="{ get: row => row.a }"
              :y="{ get: row => row.b }"
              :fill="{ get: row => row.c, scale: '#scaleColor' }"
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
