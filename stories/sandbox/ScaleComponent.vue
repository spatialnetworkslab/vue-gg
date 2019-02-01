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
        scaleC: { domain: 'c', range: ['red', 'blue'] }
      }"
    />

    <vgg-data :transform="{ groupBy: 'c' }">

      <vgg-map>

        <vgg-section
          :x="{ get: 'c', scale: 'c' }"
          :w="{ position: { positioner: 'bulge', padding: 25 } }"
          :y1="25"
          :y2="225"
          :scale-y="'#scaleY'"
          :data="{ get: 'grouped' }"
        >

          <vgg-map>

            <vgg-point
              :x="{ get: row => row.a, scale: '#scaleX' }"
              :y="{ get: row => row.b }"
              :fill="{ get: 'c', scale: '#scaleC' }"
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
