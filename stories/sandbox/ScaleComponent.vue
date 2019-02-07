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

      <vgg-map v-slot="{ row }">

        <vgg-section
          :x="{ val: row.c, scale: 'c' }"
          :w="{ band: { domain: 'c', padding: 25 } }"
          :y1="25"
          :y2="225"
          :scale-y="'#scaleY'"
          :data="{ val: row.grouped }"
        >

          <vgg-map v-slot="{ row: innerRow }">

            <vgg-point
              :x="{ val: innerRow.a, scale: '#scaleX' }"
              :y="{ val: innerRow.b }"
              :fill="{ val: row.c, scale: '#scaleC' }"
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
