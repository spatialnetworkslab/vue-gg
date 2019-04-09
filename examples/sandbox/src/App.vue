<template>
  <vgg-graphic
    :width="800"
    :height="850"
    :data="resaleData"
  >
    <!-- bar chart per flat type -->

    <vgg-section
      :x1="0"
      :x2="500"
      :y1="0"
      :y2="500"
      :transform="[
        { mutate: { price_per_sqm: (row) => row.resale_price / row.floor_area_sqm } },
        { groupBy: ['month', 'flat_type'] },
        { arrange: { month: 'ascending' } },
        { summarise: { mean_price: { price_per_sqm: 'mean' } } },
        { mutate: { month_date: (row) => new Date(row.month) } }
      ]"
    >

      <vgg-scales :scales="{ date: { domain: 'month_date' } }"/>
      <vgg-scales :scales="{ price: { domain: 'mean_price' } }"/>
      <vgg-scales :scales="{ flatTypeColorScale: { domain: 'flat_type' } }"/>

      <vgg-data
        :transform="{ groupBy: 'flat_type' }"
      >

        <vgg-map v-slot="{ row }">

          <vgg-multi-line
            :x="{ val: row.grouped.month_date, scale: '#date' }"
            :y="{ val: row.grouped.mean_price, scale: '#price' }"
            :stroke="{ val: row.grouped.flat_type, scale: '#flatTypeColorScale' }"
          />

        </vgg-map>

      </vgg-data>

      <vgg-x-axis :scale="'#date'" :tick-count="4" :tick-extra="false"/>
      <vgg-y-axis :scale="'#price'" :hjust="0" :tick-count="8"/>

    </vgg-section>

  </vgg-graphic>
</template>

<script>
import resaleData from './resale_sample.json'

export default {
  name: 'app',
  data () {
    return {
      resaleData: resaleData
    }
  }
}
</script>
