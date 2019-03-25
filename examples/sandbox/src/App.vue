<template>
  <div id="app">

    <vgg-graphic
      :width="1000"
      :height="1000"
      :data="resaleData"
    >

      <vgg-scales :scales="{ totalSalesScale: { domain: 'total_sales', domainMin: 0 } }" />

      <vgg-data :transform="{ groupBy: 'town' }">

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
                  :x2="{ val: row.total_sales, scale: '#totalSalesScale' }"
                  :h="20"
                />

              </vgg-map>

              <!-- <vgg-x-axis :tick-count="4" :scale="'#totalSalesScale'" :vjust="0" label-rotate /> -->

            </vgg-section>

          </vgg-map>

        </vgg-grid>

      </vgg-data>

    </vgg-graphic>

  </div>
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


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
