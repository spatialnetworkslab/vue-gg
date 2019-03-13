<!-- fix positioning x and y -->
<template>
  <g :transform="`translate(${legendLeft}, ${legendTop})`">

    <!-- Gradient definition -->
    <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" :x2="composeGradient.endX" :y2="composeGradient.endY">
      <stop
        v-for="(c, i) in colors"
        :key="i"
        :offset="`${i * offset + '%'}`"
        :style="`stop-color:${c}`" />
    </linearGradient>
    </defs>

    <!-- Vertical/horizontal direction -->
    <vgg-section
      :x1="0"
      :x2="width"
      :y1="0"
      :y2="height"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >
      <vgg-label
        :text="title"
        :x="positionElements.title"
        :y="titleY + titlePadding"
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
          <vgg-rectangle
            :x1="positionElements.rectangle.x1"
            :x2="positionElements.rectangle.x2"
            :y1="positionElements.rectangle.y1"
            :y2="positionElements.rectangle.y2"
            :fill="'url(#grad1)'"
          />
          <g v-if="direction === 'vertical' ">
            <vgg-map v-slot="{ row }">
              <vgg-label
                :x="positionElements.label"
                :y="row.location"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g><g v-else>
            <vgg-map v-slot="{ row }">
              <vgg-label
                :x="row.location"
                :y="positionElements.label"
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

export default {
  name: 'DiscreteLegend',

  mixins: [BaseLegend, Rectangular],

  props: {
    type: {
      type: String,
      default: 'gradient'
    },
  },

  mounted () {
    this.composeGradient
  },

  computed: {
    offset () {
      return 100 / (this.tickCount - 1)
    },

    segmentHeight () {
      return 100 / this.tickCount
    },

    colors () {
      let l = this.legendLabels
      let colors = []
      let colorScale = this.generateColorScale('fill', this.fill)
      if (!this.flip) {
        if (this.direction === "vertical"){
          for (let i = l.length - 1; i >=0; i--) {
            let color = colorScale(l[i])
            colors.push(color)
          }
        } else {
          for (let i = 0; i < l.length; i++) {
            let color = colorScale(l[i])
            colors.push(color)
          }
        }
      } else {
        if (this.direction === "vertical"){
          for (let i = 0; i < l.length; i++) {
            let color = colorScale(l[i])
            colors.push(color)
          }

        } else {
          for (let i = l.length - 1; i >=0; i--) {
            let color = colorScale(l[i])
            colors.push(color)
          }
        }
      }
      return colors
    },

    composeGradient() {
      let specs = {}
      if (this.direction === "vertical" ) {
        specs.endX = "0%"
        specs.endY = "100%"
      } else {
        specs.endX = "100%"
        specs.endY = "0%"
      }
      return specs
    },

    boxes () {
      let boxes = []
      let ticks = this.tickCount
      let l = this.legendLabels, start = 1, end = 0, location

      if (!this.flip) {
         for (let i = 0; i < ticks; i++) {
          if (i === 0) {
            end += this.segmentHeight
          } else {
            start = end
            end += this.segmentHeight
          }
          //location = (start + end)/2
          boxes.push({location: start, label: l[i]})
        }
      } else {
        for (let i = ticks - 1; i >=0; i--) {
          start = end
          end += this.segmentHeight
          //location = (start + end)/2
          boxes.push({location: start, label: l[i]})
       }
      }

      return boxes
    }
  },

  methods: {
  }

}
</script>
