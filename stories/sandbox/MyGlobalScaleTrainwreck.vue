<template>
  <vgg-graphic
    :width="1000"
    :height="1000"
    :data="resaleData"
    :transform="{ groupBy: 'town' }"
  >

    <vgg-grid
      :rows="4"
      :layout-padding="10"
      :cell-padding="5"
    >

      <vgg-map v-slot="{ row: facet }">

        <vgg-section
          :data="{ val: facet.grouped }"
          :transform="[
            { groupBy: 'flat_type'},
            { summarise: { total_sales: { resale_price: 'count' } } }
          ]"
        >
          <vgg-map v-slot="{ row }">

            <vgg-rectangle
              :y="{ val: row.flat_type, scale: 'flat_type' }"
              :x1="0"
              :x2="{ val: row.total_sales, scale: 'total_sales' }"
              :h="20"
            />

          </vgg-map>

          <!-- <vgg-x-axis
            :scale="'total_sales'"
            :tick-count="4"
            :vjust="0"
            label-rotate
          /> -->

        </vgg-section>

      </vgg-map>

    </vgg-grid>

  </vgg-graphic>
</template>

<script>
import resaleData from './resale_sample.json'

export default {
  data () {
    return {
      resaleData: resaleData
    }
  }
  // mounted () {
  //   let unique = {}
  //   for (let row of resaleData) {
  //     unique[row.town] = true
  //   }
  //   console.log(Object.keys(unique))
  // }
}
</script>

<style>
</style>
