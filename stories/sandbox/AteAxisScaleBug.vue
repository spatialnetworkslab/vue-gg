<template>
  <vgg-graphic
    :width="1200"
    :height="600"
    :data="resaleData"
  >

    <vgg-data
      :transform="[
        { groupBy: 'flat_type'},
        { summarise: { total_sales: { resale_price: 'count' } } }
      ]"
    >

      <vgg-scales :scales="{ myScale: 'total_sales' }" />

      <vgg-section
        :x1="100"
        :x2="500"
        :y1="100"
        :y2="500"
        :scale-x="'#myScale'"
        :scale-y="'flat_type'"
        :axes="['bottom', 'left']"
      >

        <vgg-map v-slot="{ row }">

          <vgg-rectangle
            :x1="0"
            :x2="row.total_sales"
            :y="row.flat_type"
            :h="20"
          />

        </vgg-map>

      </vgg-section>

    </vgg-data>

    <vgg-data
      :transform="[
        { filter: row => row.town === 'ANG MO KIO'},
        { groupBy: 'flat_type'},
        { summarise: { total_sales: { resale_price: 'count' } } }
      ]"
    >
      <vgg-section
        :x1="600"
        :x2="1000"
        :y1="100"
        :y2="500"
        :scale-x="'#myScale'"
        :scale-y="'flat_type'"
        :axes="['bottom']"
      >

        <vgg-map v-slot="{ row }">

          <vgg-rectangle
            :x1="0"
            :x2="row.total_sales"
            :y="row.flat_type"
            :h="20"
          />

        </vgg-map>

      </vgg-section>

    </vgg-data>

  </vgg-graphic>
</template>

<script>
import resaleData from './resale_sample.json'

export default {
  data () {
    return {
      resaleData
    }
  }
}
</script>
