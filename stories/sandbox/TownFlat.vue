<template>
  <vgg-graphic
    :width="totalX"
    :height="totalY"
    :data="resaleData"
    :transform="[
      { mutate: { price_sqm: (row, i, prevRow, nextRow) => row.resale_price/row.floor_area_sqm } },
    ]">

    <vgg-scales :scales="{ priceSQMscale: {domain: 'price_sqm', type: 'reds'} }"/>

    <vgg-grid
      :cols="towns.length"
      :cell-padding="{
        t: 10,
        l: 5,
        r: 5
      }"
    >
      <vgg-section
        v-for="town, i in towns"
        :key="i"
        :scale-x="[0, 100]"
        :scale-y="[0, 100]"
        :transform="[
          { filter: row => row.town === town },
          { arrange: { flat_type: 'descending' } },
          { arrange: { remaining_lease: 'ascending' } },
          { mutate: { year_date: row => row.month.split('-')[0] } },
          { mutate: { month_date: row => row.month.split('-')[1] } },
          { arrange: { year_date: 'descending' } },
          { arrange: { month_date: 'ascending' } },
        ]"
      >

        <vgg-grid
          :rows="flat_types.length"
          :cell-padding="{
            t: 0.1,
            b: 0.1,
            l: 0.5,
            r: 0.5
          }"
        >

          <vgg-section
            v-for="ft, j in flat_types"
            :key="j"
            :scale-x="'year_date'"
            :scale-y="'month_date'"
            :transform="[
              { filter: row => row.flat_type === ft },
              { mutate: { price_sq_m: row => row.resale_price / row.floor_area_sqm } },
              { groupBy: ['month_date', 'year_date'] },
              { summarise: { mean_price_sq_m: { price_sq_m: 'mean' } } },
              { transform: df => { log(i, totalX, totalY, df); return df } },
            ]"
          >
            <!-- { mutarise: { remaining_lease_count: { remaining_lease: 'count' } } },
          { mutarise: { month_count: { month: 'count' } } }, -->

            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x="{ val: row.year_date, scale: { domain: 'year_date'} }"
                :y="{ val: row.month_date, scale: { domain: 'month_date'} }"
                :w="{ band: { domain: 'year_date' } }"
                :h="{ band: { domain: 'month_date' } }"
                :fill="{ val: row.mean_price_sq_m, scale: { type: 'reds', domain: 'mean_price_sq_m'} }"
              />
            </vgg-map>

            <vgg-plot-title
              :text="flat_types[j]"
              :font-size="20"
              :opacity="0.3"
              :vjust="'b'"
            />

            <vgg-x-axis
              v-if="draw"
              :scale="'year_date'"
              :vjust="0"
              :label-font-size="4"
            />

            <vgg-y-axis
              v-if="draw"
              :scale="'month_date'"
              :vjust="0"
              :label-font-size="4"
              flip
            />
            <!--
            <vgg-rectangle
              :x1="0"
              :x2="100"
              :y1="0"
              :y2="100"
              :opacity="0.05"
              :fill="'black'"/> -->

          </vgg-section>
        </vgg-grid>

        <vgg-plot-title
          :text="towns[i]"
          :font-size="40"
          :opacity="0.3"
          :vjust="'center'"
          :hjust="'center'"
        />

        <vgg-rectangle
          :x1="0"
          :x2="100"
          :y1="0"
          :y2="100"
          :opacity="0.05"
          fill="grey"/>
      </vgg-section>
    </vgg-grid>

    <!-- old version -->
    <!-- <vgg-section
      v-for="section, i in sections(flat_models, 4)"
      :key="i"
      :x1="section.x1"
      :x2="section.x2"
      :y1="section.y1"
      :y2="section.y2"
      :scale-x="'month'"
      :scale-y="'town'"
    >
      <vgg-data
        :transform="[
          { filter: row => row.flat_model === flat_models[i] },
          { arrange: { month: 'ascending' } },
          { arrange: { town: 'ascending' } },
          { groupBy: ['town', 'month']},
          { summarise: { total_sales: { resale_price: 'count' } } }
        ]"
      >
        <vgg-map v-slot="{ row }">
          <vgg-rectangle
            :x="{ val: row.month, scale: { domain: 'month'} }"
            :y="{ val: row.town, scale: { domain: 'town'} }"
            :w="10"
            :h="10"
            :fill="{ val: row.total_sales, scale: { type: 'reds', domain: 'total_sales'} }"
          />

        </vgg-map>

        <vgg-y-axis
          :scale="'town'"
          :vjust="0"
          :label-font-size="10"
          label-rotate
          flip
        />
        <vgg-plot-title
          :text="flat_models[i]"
          :font-size="50"
          :opacity="0.3"
        />
      </vgg-data>
    </vgg-section> -->

    <!-- <vgg-data
      :transform="[
        { arrange: { month: 'ascending' } },
        { groupBy: ['flat_type', 'town', 'month']},
        { summarise: { total_sales: { resale_price: 'count' } } },
      ]"
    >

      <vgg-section
        :x1="100"
        :x2="900"
        :y1="100"
        :y2="900"
        :scale-x="'town'"
        :scale-y="'month'"
        :axes="['left']"
      >
        <vgg-map v-slot="{ row }">
          <vgg-rectangle
          :x="row.town"
          :y="row.month"
          :w="700 / 26"
          :h="20"
          :fill="{val: row.total_sales, scale: { type: 'blues', domain: 'total_sales'}}"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'town'"
          :tick-length="7"
          title="Town"
          label-rotate
        />
      </vgg-section>

    </vgg-data> -->
  </vgg-graphic>
</template>

<script>
import resaleData from './resale_sample.json'

export default {
  name: 'HdbData',
  data () {
    return {
      resaleData: resaleData,
      flat_types: ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'MULTI-GENERATION', 'EXECUTIVE'],
      // flat_types: ['3 ROOM', '4 ROOM', '5 ROOM', 'EXECUTIVE'],
      flat_models: ['New Generation', 'Simplified', 'Terrace', 'Standard', 'Model A2', 'Type S1', 'Model A', 'Improved', 'DBSS', 'Premium Apartment', 'Type S2', 'Improved-Maisonette', 'Model A-Maisonette', 'Apartment', 'Maisonette', 'Multi Generation'],
      towns: ['ANG MO KIO', 'BEDOK', 'BISHAN', 'BUKIT BATOK', 'BUKIT MERAH', 'BUKIT PANJANG', 'BUKIT TIMAH', 'CENTRAL AREA', 'CHOA CHU KANG', 'CLEMENTI', 'GEYLANG', 'HOUGANG', 'JURONG EAST', 'JURONG WEST', 'KALLANG/WHAMPOA', 'MARINE PARADE', 'PASIR RIS', 'PUNGGOL', 'QUEENSTOWN', 'SEMBAWANG', 'SENGKANG', 'SERANGOON', 'TAMPINES', 'TOA PAYOH', 'WOODLANDS', 'YISHUN'],
      totalY: 2000,
      totalX: 4000,
      draw: false
    }
  },

  methods: {
    log: console.log,

    sections (basis, rows) {
      let sections = []
      let startX = 400; let startY = 100
      let delta = 50
      let sectionX = 300
      let sectionY = 400

      if (!rows) {
        for (let i = 0; i < basis.length; i++) {
          let section = {}
          section.x1 = startX
          section.x2 = startX + sectionX

          section.y1 = startY
          section.y2 = startY + sectionY

          startX = section.x2 + delta
          sections.push(section)
        }
      } else {
        let cols = Math.ceil(basis.length / rows); let index = 0
        for (let i = 0; i < rows; i++) {
          let startX = 100; let endX = startX + sectionX
          for (let j = 0; j < cols; j++) {
            sections[index] = {}
            sections[index].x1 = startX
            sections[index].x2 = startX + sectionX

            sections[index].y1 = startY
            sections[index].y2 = startY + sectionY

            startX = sections[index].x2 + delta

            console.log(sections)
            index++
          }
          startY = sections[index - 1].y2 + delta
        }
      }

      console.log(sections)
      console.log(towns.length)
      // this.totalX = sections[sections.length - 1].x2

      return sections
    }
  }
}
</script>

<style>
</style>
