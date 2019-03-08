<template>
  <g :transform="`translate(${legendLeft}, ${legendTop})`">
    <!-- Vertical orientation -->
    <vgg-section
      v-if="orient==='vertical'"
      :x1="0"
      :x2="width"
      :y1="0"
      :y2="height"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >
      <vgg-label
        :text="title"
        :x="50"
        :y="100"
        :font-size="titleFontSize"
        font-weight="bold"
      />
      <vgg-section
        :x1="0"
        :x2="100"
        :y1="0"
        :y2="95"
        :scale-x="[0, 100]"
        :scale-y="[0, 100]"
      >
        <vgg-data :data="boxes">
          <g v-if="!flipNumbers">
            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="0"
                :x2="75"
                :y1="row.start"
                :y2="row.end"
                :fill="row.color"
              />
              <vgg-label
                :x="80 + labelPadding"
                :y="row.labelPost"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g>
          <g v-else>
            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="25"
                :x2="100"
                :y1="row.start"
                :y2="row.end"
                :fill="row.color"
              />
              <vgg-label
                :x="labelPadding"
                :y="row.labelPost"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g>
        </vgg-data>
      </vgg-section>
    </vgg-section>

    <!-- Horizontal gradient -->
    <vgg-section
      v-if="orient==='horizontal'"
      :x1="0"
      :x2="height"
      :y1="0"
      :y2="width"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >
      <vgg-label
        :text="title"
        :x="50"
        :y="105"
        :font-size="titleFontSize"
        font-weight="bold"
      />
      <vgg-section
        :x1="0"
        :x2="100"
        :y1="0"
        :y2="95"
        :scale-x="[0, 100]"
        :scale-y="[0, 100]"
      >
        <vgg-data :data="boxes">
          <g v-if="!flipNumbers">
            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="row.start"
                :x2="row.end"
                :y1="25"
                :y2="95"
                :fill="row.color"
              />
              <vgg-label
                :x="row.labelPost"
                :y="labelPadding"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g><g v-else>
            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="row.start"
                :x2="row.end"
                :y1="0"
                :y2="75"
                :fill="row.color"
              />
              <vgg-label
                :x="row.labelPost"
                :y="75 + labelPadding"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g>
        </vgg-data>

      </vgg-section>

    </vgg-section>

  </g>
</template>

<script>
import BaseLegend from '@/mixins/Guides/BaseLegend.js'
import Rectangular from '../../mixins/Marks/Rectangular.js'
import createScale from '@/scales/createScale.js'

export default {
  name: 'DiscreteLegend',

  mixins: [BaseLegend, Rectangular],

  computed: {

    boxes () {
      let boxes = []
      let ticks = this.tickCount
      let l = this.legendLabels, start = 0, end = 0, labelPost

      if (!this.flip) {
         for (let i = 0; i < ticks; i++) {
          if (i === 0) {
            end += this.segmentHeight
          } else {
            start = end
            end += this.segmentHeight
          }
          labelPost = (start + end)/2
          boxes.push({color: this.colorScale(l[i]), start: start, end: end, labelPost: labelPost, label: l[i]})
        }
      } else {
        for (let i = ticks - 1; i >=0; i--) {
          start = end
          end += this.segmentHeight
          labelPost = (start + end)/2
          boxes.push({color: this.colorScale(l[i]), start: start, end: end, labelPost: labelPost, label: l[i]})
       }
      }

      return boxes
    }
  },

  methods: {
  }

}
</script>
