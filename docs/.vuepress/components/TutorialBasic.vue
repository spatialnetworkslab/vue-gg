<template>
  <vgg-graphic
    :width="700"
    :height="400"
    :data="fruits_data"
  >

    <vgg-plot-title v-if="step > 1" text="Fruit Sizes" :vjust="0.95" />

    <vgg-section
      :x1="50"
      :x2="650"
      :y1="50"
      :y2="350"
    >

      <vgg-map v-slot="{ row }">

        <vgg-point
          v-if="step < 5"
          :x="{ val: row.fruit, scale: 'fruit' }"
          :y="{ val: row.diameter, scale: 'diameter' }"
          fill="#63a5d8"
          :radius="4"
        />

        <vgg-point
          v-if="step == 5"
          :x="{ val: row.fruit, scale: 'fruit' }"
          :y="{ val: row.diameter, scale: 'diameter' }"
          :fill="{ val: row.fruit, scale: { type: 'category10', domain: 'fruit' } }"
          :radius="4"
        />

      </vgg-map>

      <vgg-x-axis
        v-if="step > 0"
        scale="fruit"
      />

      <vgg-y-axis
        v-if="step > 0 && step < 3"
        scale="diameter"
      />

      <vgg-y-axis
        v-if="step > 2"
        scale="diameter"
        title="diameter/cm"
        title-hjust="center"
        :title-vjust="1.07"
      />

    </vgg-section>

    <vgg-x-grid
      v-if="step === 4"
      :x1="50"
      :x2="650"
      :y1="50"
      :y2="350"
      scale="fruit"
    />

    <vgg-y-grid
      v-if="step === 4"
      :x1="50"
      :x2="650"
      :y1="50"
      :y2="350"
      scale="diameter"
    />

  </vgg-graphic>
</template>

<script>
export default {
  props: {
    step: {
      default: 0
    }
  },

  computed: {
    fruits_data () {
      let result = [{ fruit: 'lime', diameter: 4.7},
                    { fruit: 'lemon', diameter: 6.1},
                    { fruit: 'grapefruit', diameter: 7.9},
                    { fruit: 'lemon', diameter: 6.6},
                    { fruit: 'orange', diameter: 6.7},
                    { fruit: 'lemon', diameter: 5.3},
                    { fruit: 'pomelo', diameter: 11.6},
                    { fruit: 'grapefruit', diameter: 11.1},
                    { fruit: 'lime', diameter: 5.5},
                    { fruit: 'pomelo', diameter: 10.6},
                    { fruit: 'lemon', diameter: 6.4},
                    { fruit: 'lime', diameter: 4.9},
                    { fruit: 'grapefruit', diameter: 8.8},
                    { fruit: 'pomelo', diameter: 12.5},
                    { fruit: 'grapefruit', diameter: 12.7},
                    { fruit: 'grapefruit', diameter: 8.6},
                    { fruit: 'pomelo', diameter: 13.1},
                    { fruit: 'lime', diameter: 5.8},
                    { fruit: 'orange', diameter: 8.9},
                    { fruit: 'grapefruit', diameter: 9.1},
                    { fruit: 'pomelo', diameter: 10.3},
                    { fruit: 'grapefruit', diameter: 9.4},]
      return result
    }
  }
}
</script>
