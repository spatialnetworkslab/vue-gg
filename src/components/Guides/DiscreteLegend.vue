<template>
  <g :transform="`translate(${legendLeft}, ${legendTop})`">
    <!-- Vertical orientation -->
    <vgg-section
      :x1="0"
      :x2="sectionWidth"
      :y1="0"
      :y2="sectionHeight"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >
      <vgg-rectangle
        :x1="0"
        :x2="100"
        :y1="0"
        :y2="100"
        :fill="legendFill"
        :stroke="legendStroke"
        :stroke-width="legendStrokeWidth"
      />
      <vgg-label
        :text="title"
        :x="titleX"
        :y="titleY + titlePadding"
        :font-size="titleFontSize"
        :font-family="titleFont"
        :font-weight="titleFontWeight"
        :opacity="titleOpacity"
        :font-color="titleFontColor"
      />
      <vgg-section
        :x1="0"
        :x2="100"
        :y1="0"
        :y2="90"
        :scale-x="[0, 100]"
        :scale-y="[0, 100]"
      >
        <vgg-data :data="boxes">
          <g v-if="orientation==='vertical'">

            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="positionElements.rectangle.x1"
                :x2="positionElements.rectangle.x2"
                :y1="row.start"
                :y2="row.end"
                :fill="row.fill"
                :opacity="legendOpacity"
              />
              <vgg-label
                v-if="labelRotate"
                :x="positionElements.label"
                :y="row.location"
                :text="row.label"
                :font-size="labelFontSize"
                :anchor-point="positionElements.labelAnchorPoint"
                :opacity="labelOpacity"
                :font-family="labelFont"
                :font-weight="labelFontWeight"
                :rotation="flip ? 30 : -30"
                :fill="labelColor"
              />
              <vgg-label
                v-else
                :x="positionElements.label"
                :y="row.location"
                :text="row.label"
                :font-size="labelFontSize"
                :anchor-point="positionElements.labelAnchorPoint"
                :opacity="labelOpacity"
                :font-family="labelFont"
                :font-weight="labelFontWeight"
                :fill="labelColor"
              />
            </vgg-map>

          </g><g v-else>

            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="row.start"
                :x2="row.end"
                :y1="positionElements.rectangle.y1"
                :y2="positionElements.rectangle.y2"
                :fill="row.fill"
                :opacity="legendOpacity"
              />
              <vgg-label
                v-if="labelRotate"
                :x="row.location"
                :y="positionElements.label"
                :text="row.label"
                :font-size="labelFontSize"
                :anchor-point="positionElements.labelAnchorPoint"
                :opacity="labelOpacity"
                :font-family="labelFont"
                :font-weight="labelFontWeight"
                :rotation="flip ? 30 : -30"
                :fill="labelColor"
              />
              <vgg-label
                v-else
                :x="row.location"
                :y="positionElements.label"
                :text="row.label"
                :font-size="labelFontSize"
                :anchor-point="positionElements.labelAnchorPoint"
                :opacity="labelOpacity"
                :font-family="labelFont"
                :font-weight="labelFontWeight"
                :fill="labelColor"
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

export default {
  name: 'DiscreteLegend',

  mixins: [BaseLegend, Rectangular],

  props: {
    type: {
      type: String,
      default: 'discrete'
    },

    legendOpacity: {
      type: Number,
      default: 1
    }
  },

  computed: {
    boxes () {
      let boxes = []
      let ticks = this.tickCount
      let l = this.legendLabels
      let start = 0
      let end = 0
      let location
      let colorScale = this.generateColorScale('fill', this.fill)

      if (!this.flip) {
        for (let i = 0; i < ticks; i++) {
          if (i === 0) {
            end += this.segmentHeight
          } else {
            start = end
            end += this.segmentHeight
          }
          location = (start + end) / 2
          boxes.push({ fill: colorScale(l[i]), start: start, end: end, location: location, label: l[i] })
        }
      } else {
        for (let i = ticks - 1; i >= 0; i--) {
          start = end
          end += this.segmentHeight
          location = (start + end) / 2
          boxes.push({ fill: colorScale(l[i]), start: start, end: end, location: location, label: l[i] })
        }
      }

      return boxes
    }
  }
}
</script>
