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
        :start="'t'"
      >

        <vgg-map v-slot="{ row: facet }">

          <vgg-section
            :data="facet.grouped"
            :transform="[
              { groupBy: 'flat_type'},
              { summarise: { total_sales: { resale_price: 'count' } } }
            ]"
            :scale-x="'#totalScale'"
            :scale-y="'#typeScale'"
          >

            <vgg-plot-title
              :text="facet.town"
              :vjust="1"
            />

            <vgg-map v-slot="{ row }">

              <vgg-rectangle
                :y="row.flat_type"
                :x1="0"
                :x2="row.total_sales"
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
