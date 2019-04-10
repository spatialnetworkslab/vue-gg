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

    <vgg-scales :scales="{ sqmScale: { domain: 'price_sqm', type: 'reds' } }"/>
    <vgg-scales :scales="{ monthScale: { domain: 'month_date' } }"/>
    <vgg-scales :scales="{ yearScale: { domain: 'year_date' } }"/>

    <vgg-discrete-legend
      :scale="'#sqmScale'"
      :title-font-size="30"
      :fill="{type: 'reds'}"
      :label-font-size="30"
      :w="120"
      title="Resale Price per SqM"
      position="tr"
    />

    <vgg-section
      :x1="50"
      :x2="totalX - 300"
      :y1="50"
      :y2="totalY - 200"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >
      <vgg-label
        :x="50"
        :y="106"
        :text="'Resale Price per SqM vs. Month (y) vs. Year (x)'"
        :font-size="90"
        :font-weight="700"
        :opacity="0.2"
      />

      <vgg-label
        :x="50"
        :y="101"
        :text="'Grouped by (1) Town, (2) Flat Type'"
        :font-size="44"
        :opacity="0.2"
      />

      <vgg-grid
        :rows="4"
        :cell-padding="{
          t: 1,
          l: 0.3,
          r: 0.3
        }"
      >
        <vgg-section
          v-for="town, i in towns"
          :key="i"
          :scale-x="[0, 100]"
          :scale-y="[0, 100]"
          :transform="[
            { filter: row => row.town === town }
          ]"
        >

          <vgg-grid
            :cols="3"
            :cell-padding="{
              t: 1.7,
              b: 1.7,
              l: 1.5,
              r: 1.5
            }"
          >
            <vgg-section
              v-for="flat_type, j in flat_types"
              :key="j"
              :scale-x="'#yearScale'"
              :scale-y="'#monthScale'"
              :transform="[
                { filter: row => row.flat_type === flat_type },
                { mutate: { price_sq_m: row => row.resale_price / row.floor_area_sqm } },
                { groupBy: ['month_date', 'year_date'] },
                { summarise: { mean_price_sq_m: { price_sq_m: 'mean' } } },
                { transform: df => { log(flat_type, town, df); return df } }
              ]"
            >
              <vgg-map
                v-slot="{ dataframe }"
                unit="dataframe">
                <template v-if="dataframe.month_date.length > 0">
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
                    :vjust="0"
                    :label-font-size="6"
                  />

                  <vgg-y-axis
                    :scale="'#monthScale'"
                    :label-font-size="6"
                    :hjust="0"
                  />
                </template>
              </vgg-map>

              <vgg-plot-title
                :text="flat_type"
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
            :text="town"
            :font-size="30"
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
  name: 'TownFlat',
  data () {
    return {
      resaleData: resaleData,
      flat_types: ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'MULTI-GENERATION', 'EXECUTIVE'],
      flat_models: ['New Generation', 'Simplified', 'Terrace', 'Standard', 'Model A2', 'Type S1', 'Model A', 'Improved', 'DBSS', 'Premium Apartment', 'Type S2', 'Improved-Maisonette', 'Model A-Maisonette', 'Apartment', 'Maisonette', 'Multi Generation'],
      towns: ['ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH', 'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG', 'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST', 'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL', 'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES', 'TOA PAYOH', 'WOODLANDS', 'YISHUN'],
      totalX: 3000,
      totalY: 2000
    }
  },

  methods: {
    log: console.log
  }
}
</script>
