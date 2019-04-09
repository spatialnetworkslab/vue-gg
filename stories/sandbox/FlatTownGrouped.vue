<template>
  <vgg-graphic
    :width="totalX"
    :height="totalY"
    :data="resaleData"
    :transform="[
      { mutate: { price_sqm: (row, i, prevRow, nextRow) => row.resale_price/row.floor_area_sqm } },
      { mutate: { year_date: row => row.month.split('-')[0] } },
      { mutate: { month_date: row => row.month.split('-')[1] } },
      { arrange: { year_date: 'descending' } },
      { arrange: { month_date: 'descending' } },
  ]">

    <vgg-scales :scales="{ sqmScale: {domain: 'price_sqm', type: 'reds'} }"/>
    <vgg-scales :scales="{ monthScale: { domain: 'month_date' } }"/>
    <vgg-scales :scales="{ yearScale: { domain: 'year_date' } }"/>

    <vgg-section
      :x1="120"
      :x2="totalX - 80"
      :y1="120"
      :y2="totalY - 80"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >
      <vgg-label
        :x="50"
        :y="105"
        :text="'Resale Price per SqM vs. Month (y) vs. Year (x)'"
        :font-size="100"
        :font-weight="700"
        :opacity="0.2"
      />

      <vgg-label
        :x="50"
        :y="101"
        :text="'Grouped by (1) Flat Type, (2) Town'"
        :font-size="50"
        :opacity="0.2"
      />

      <!-- <vgg-label
        v-for="ft, i in flat_types"
        :key="i"
        :y="100"
        :x="100/flat_types.length * (i + 0.5)"
        :text="ft"
        :font-size="20"
        :opacity="0.7"
      />

      <vgg-label
        v-for="town, j in towns"
        :key="j"
        :y="100/towns.length * (j + 0.25)"
        :x="102"
        :text="town"
        :font-size="14"
        :opacity="0.7"
        anchor-point="l"
      /> -->

      <vgg-grid
        :cols="3"
        :cell-padding="{
          t: 1,
          l: 0.5,
          r: 0.5
        }"
      >
        <vgg-section
          v-for="ft, i in flat_types"
          :key="i"
          :scale-x="[0, 100]"
          :scale-y="[0, 100]"
          :transform="[
            { filter: row => row.flat_type === ft },
            { arrange: { town: 'descending' } },
          ]"
        >

          <vgg-grid
            :rows="4"
            :cell-padding="{
              t: 0.7,
              b: 0.7,
              l: 0.8,
              r: 0.8
            }"
          >

            <vgg-section
              v-for="town, j in towns"
              :key="j"
              :scale-x="'year_date'"
              :scale-y="'month_date'"
              :transform="[
                { filter: row => row.town === town },
                { mutate: { price_sq_m: row => row.resale_price / row.floor_area_sqm } },
                { groupBy: ['month_date', 'year_date'] },
                { summarise: { mean_price_sq_m: { price_sq_m: 'mean' } } },
                { transform: df => { log(i, totalX, totalY, df); return df } }
              ]"
            >

              <vgg-map v-slot="{ row }">
                <vgg-rectangle
                  :x="{ val: row.year_date, scale: '#yearScale' }"
                  :y="{ val: row.month_date, scale: '#monthScale' }"
                  :w="{ band: '#yearScale' }"
                  :h="{ band: '#monthScale' }"
                  :fill="{ val: row.mean_price_sq_m, scale: '#sqmScale' }"
                />

                <!-- <vgg-rectangle
                  :x="{ val: row.year_date, scale: { domain: 'year_date'} }"
                  :y="{ val: row.month_date, scale: { domain: 'month_date'} }"
                  :w="{ band: { domain: 'year_date' } }"
                  :h="{ band: { domain: 'month_date' } }"
                  :fill="{ val: row.mean_price_sq_m, scale: {type: 'reds', domain: 'mean_price_sq_m' } }"
                /> -->
              </vgg-map>

              <vgg-x-axis
                :scale="'#yearScale'"
                :vjust="1"
                :label-font-size="6"
                flip
              />

              <vgg-y-axis
                :scale="'#monthScale'"
                :label-font-size="6"
                :hjust="0"
              />

              <vgg-plot-title
                :text="town"
                :font-size="12"
                :opacity="0.2"
                vjust="center"
                hjust="center"
              />

            </vgg-section>
          </vgg-grid>

          <vgg-label
            :x="50"
            :y="50"
            :text="ft"
            :font-size="50"
            :opacity="0.5"
            :font-weight="'bold'"
          />

          <vgg-rectangle
            :x1="0"
            :x2="100"
            :y1="0"
            :y2="100"
            :opacity="0.05"
            fill="'rgb(255, 245, 240)'"/>
        </vgg-section>
      </vgg-grid>
    </vgg-section>
  </vgg-graphic>
</template>

<script>
import resaleData from './resale_sample.json'

export default {
  name: 'FlatTown',
  data () {
    return {
      resaleData: resaleData,
      flat_types: ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'MULTI-GENERATION', 'EXECUTIVE'],
      // flat_types: ['3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE'],
      flat_models: ['New Generation', 'Simplified', 'Terrace', 'Standard', 'Model A2', 'Type S1', 'Model A', 'Improved', 'DBSS', 'Premium Apartment', 'Type S2', 'Improved-Maisonette', 'Model A-Maisonette', 'Apartment', 'Maisonette', 'Multi Generation'],
      towns: ['ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH', 'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG', 'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST', 'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL', 'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES', 'TOA PAYOH', 'WOODLANDS', 'YISHUN'],
      totalX: 2500,
      totalY: 2500
    }
  },

  methods: {
    log: console.log
  }
}
</script>

<style>
</style>
