<template>
  <vgg-graphic
    :width="500"
    :height="500"
  >

    <vgg-data
      :data="testData"
      :dataID="'original'"
    >

      <vgg-data :transform="{ filter: row => row.a > 2 }">

        <vgg-map v-slot="{ row }">

          <vgg-point
            :x="{ val: row.a, scale: 'original/a' }"
            :y="{ val: row.b, scale: 'original/b' }"
          />

        </vgg-map>

      </vgg-data>

    </vgg-data>

    <!-- <vgg-data :data="testData">

      <vgg-data
        dataID="transformed"
        :transform="{ filter: row => row.a > 2 }"
      />

      <vgg-map v-slot="{ row }">

        <vgg-point
          :x="{ val: row.a, scale: 'transformed/a' }"
          :y="{ val: row.b, scale: 'transformed/b' }"
        />

      </vgg-map>

    </vgg-data> -->

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
