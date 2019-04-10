<template>
  <div>

    <vgg-graphic
      :width="700"
      :height="600"
      :data="xy">

      <vgg-plot-title text="Scatterplot" />

      <vgg-section
        :x1="150"
        :x2="550"
        :y1="100"
        :y2="500"
      >

        <vgg-map v-slot="{ row }">

          <vgg-symbol
            :x="{ val: row.explanatory, scale: 'explanatory' }"
            :y="{ val: row.dependent, scale: 'dependent' }"
            :size="{ val: row.dependent, scale: { domain: 'dependent' } }"
            :fill="{ val: row.explanatory, scale: { type: 'viridis', domain: 'explanatory' } }"
            @click="log($event)"
            @mouseover="log(row)"
          />

        </vgg-map>

        <vgg-x-axis
          :scale="'explanatory'"
          :title-hjust="1.1"
          :vjust="-.05"
          :tick-values="[0, 20, 60, 100]"
          flip
        />

        <vgg-y-axis
          :scale="'dependent'"
          :hjust="-.05"
        />
        <!-- <vgg-plot-title
          :x="100"
          :y="100"
          :text="text"/> -->

      </vgg-section>

      <vgg-x-grid
        :x1="150"
        :x2="550"
        :y1="100"
        :y2="500"
        :scale="'explanatory'"
      />

      <vgg-y-grid
        :x1="150"
        :x2="550"
        :y1="100"
        :y2="500"
        :scale="'dependent'"
      />

      <vgg-discrete-legend
        :scale="'dependent'"
        :font-size="10"
        :title-font-size="12"
        :w="50"
        :fill="{ type: 'viridis'}"
        title-font-weight="bold"
        title="Legend"
        position="tl"
      />

      <vgg-gradient-legend
        :scale="'dependent'"
        :font-size="10"
        :fill="{ type: 'viridis'}"
        :title-font-size="12"
        title-font-weight="bold"
        position="bl"
        orientation="horizontal"
      />

      <vgg-symbol-legend
        :scale="{ domain: 'explanatory'}"
        :size="{ domain: 'explanatory'}"
        :tick-count="8"
        position="br"
        title="Size"
        flip-numbers
        orientation = "horizontal"
      />

      <vgg-symbol-legend
        :scale="{ domain: 'dependent'}"
        :stroke="'none'"
        :fill="{ type: 'viridis'}"
        :columns="2"
        :w="100"
        :col-padding="10"
        title="Color"
        position="right"
        flip
      />

    </vgg-graphic>

    <div style="margin-top: 10px;">
      <button @click="generateNewData()">Generate new data</button>
    </div>

  </div>
</template>

<script>
import { xy } from './dummyData.js'
export default {
  name: 'Scatterplot',
  data () {
    return {
      xy: xy('explanatory', 'dependent'),
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  },
  methods: {
    generateNewData () {
      let newData = xy('explanatory', 'dependent')
      this.xy = newData
    },

    log (x) {
      console.log(x)
    }
  }
}
</script>
