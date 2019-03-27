<template>
  <vgg-graphic :width="800" :height="850" :data="resaleData">
    <!-- bar chart per flat type -->
    <vgg-section
      :x1="100"
      :x2="400"
      :y1="100"
      :y2="400"
      :transform="[
        { groupBy: 'flat_type'},
        { summarise: { total_sales: { resale_price: 'count' } } }
      ]"
    >
      <vgg-scales
        :scales="{ typeScale: {domain: 'flat_type', order: ['2 ROOM', '3 ROOM', '4 ROOM', '5 ROOM', 'MULTI-GENERATION', 'EXECUTIVE'] }}"
      />
      <vgg-scales :scales="{ countScale: { domain: 'total_sales', domainMin: 0 } }"/>

      <vgg-map v-slot="{ row }">
        <vgg-rectangle
          :y="{ val: row.flat_type, scale: '#typeScale' }"
          :x1="{ val: 0, scale: '#countScale' }"
          :x2="{ val: row.total_sales, scale: '#countScale' }"
          :h="20"
        />
      </vgg-map>

      <vgg-x-axis :scale="'#countScale'" :tick-count="4" rotate-label/>
      <vgg-y-axis :scale="'#typeScale'" :hjust="0"/>
    </vgg-section>

    <!-- red -->
    <vgg-section
      :x1="500"
      :x2="800"
      :y1="100"
      :y2="400"
      :scale-x="'floor_area_sqm'"
      :scale-y="'resale_price'"
    >
      <vgg-map v-slot="{ row }">
        <vgg-point :x="row.floor_area_sqm" :y="row.resale_price"/>
      </vgg-map>
      <vgg-x-axis :scale="'floor_area_sqm'" :tick-count="4" rotate-label/>
      <vgg-y-axis :scale="'resale_price'" :hjust="0"/>
    </vgg-section>

    <!-- green -->
    <vgg-section
      :x1="100"
      :x2="400"
      :y1="500"
      :y2="800"
      :transform="[
      { binning: { groupBy: 'resale_price', method: 'EqualInterval', numClasses: 10 } },
      { summarise: { count: { resale_price: 'count' } } }
      ]"
    >
      <vgg-scales :scales="{ myBins: { domain: 'bins' } }"/>
      <vgg-scales :scales="{ binCount: { domain: 'count', domainMin: 0 } }"/>

      <vgg-map v-slot="{ row }">
        <vgg-rectangle
          :y1="{ val: row.bins[0], scale: '#myBins' }"
          :y2="{ val: row.bins[1], scale: '#myBins' }"
          :x1="{ val: 0, scale: '#binCount' }"
          :x2="{ val: row.count, scale: '#binCount' }"
        />
      </vgg-map>

      <vgg-x-axis :scale="'#binCount'" />
      <vgg-y-axis :scale="'#myBins'" :hjust="0"/>
    </vgg-section>

    <!-- blue -->
    <vgg-section :x1="500" :x2="800" :y1="500" :y2="800" :scale-x="[0, 1]" :scale-y="[0, 1]">
      <vgg-rectangle :y1="0" :y2="1" :x1="0" :x2="1" fill="blue"/>
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
