<template>
  <vgg-graphic
    :width="1000"
    :height="800"
    :data="resaleData"
  >

    <vgg-scales
      :scales="{
        typeScale: { domain: 'flat_type', order: [
          '2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE'
        ].reverse() }
      }"
    />

    <vgg-data
      :transform="[
        { groupBy: ['town', 'flat_type'] },
        { summarise: { total_sales: { resale_price: 'count' } } }
      ]"
    >

      <vgg-scales :scales="{ totalScale: { domain: 'total_sales', domainMin: 0 } }" />

    </vgg-data>

    <vgg-data :transform="{ groupBy: 'town' }">

      <vgg-grid
        :rows="4"
        :layout-padding="15"
        :cell-padding="10"
      >

        <vgg-map v-slot="{ row: facet }">

          <vgg-section
            :data="facet.grouped"
            :transform="[
              { groupBy: 'flat_type'},
              { summarise: { total_sales: { resale_price: 'count' } } }
            ]"
          >

            <vgg-map v-slot="{ row }">

              <vgg-rectangle
                :y="{ val: row.flat_type, scale: '#typeScale' }"
                :x1="{ val: 0, scale: '#totalScale' }"
                :x2="{ val: row.total_sales, scale: '#totalScale' }"
                :h="20"
              />

            </vgg-map>

            <vgg-y-axis :scale="'#typeScale'" />
            <vgg-x-axis
              :scale="'#totalScale'"
              :tick-count="4"
              rotate-label
            />

          </vgg-section>

        </vgg-map>

      </vgg-grid>

    </vgg-data>

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
