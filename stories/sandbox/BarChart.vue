<template>

  <vgg-graphic
    :width="600"
    :height="600"
    :data="bars">

    <vgg-plot-title text="Bar Chart" />

    <vgg-section
      :x1="100"
      :x2="500"
      :y1="100"
      :y2="500"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >

      <vgg-plot-title
        :margin="0"
        :v-margin="-20"
        text="Subsection"
      />

      <vgg-map v-slot="{ row }">

        <vgg-rectangle
          :x="{ val: row.fruit, scale: 'fruit' }"
          :w="{ band: { domain: 'fruit', padding: 0.2 } }"
          :y1="0"
          :y2="{ val: row.quantity, scale: { domain: 'quantity', domainMin: 0 } }"
        />

        <vgg-line
          :x1="{ val: row.fruit, scale: 'fruit' }"
          :x2="{ val: row.fruit, scale: 'fruit' }"
          :y1="0"
          :y2="{ val: row.quantity, scale: { domain: 'quantity', domainMin: 0 } }"
          stroke="#ced02d"
        />

        <vgg-section
          :x="{ val: row.fruit, scale: 'fruit' }"
          :w="{ band: { domain: 'fruit', padding: 0.2 } }"
          :y1="0"
          :y2="{ val: row.quantity, scale: { domain: 'quantity', domainMin: 0 } }"
          :scale-x="[-1, 1]"
          :scale-y="[-1, 1]"
        >

          <vgg-plot-title
            :margin="0"
            :v-margin="20"
            text="bar"
            color="white"
          />

          <vgg-point
            :x="0"
            :y="0"
            :radius="10"
            fill="#8b0000"
          />

        </vgg-section>

      </vgg-map>

      <vgg-x-axis
        :scale="'fruit'"
        :title-hjust="1.1"
        :vjust="-.05"
        label-rotate
      />

      <vgg-y-axis
        :scale="{ domain: 'quantity', domainMin: 0 }"
        :hjust="-.05"
        flip
      />

    </vgg-section>

  </vgg-graphic>
</template>

<script>
import { bars } from './dummyData.js'

export default {
  name: 'Bars',

  data () {
    return {
      bars: bars('fruit', 'quantity')
    }
  }
}
</script>
