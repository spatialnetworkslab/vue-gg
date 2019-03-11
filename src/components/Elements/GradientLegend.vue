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

    <!-- Vertical direction -->
    <vgg-section
      v-if="direction==='vertical'"
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
            <vgg-rectangle
              :x1="0"
              :x2="75"
              :y1="0"
              :y2="100"
              :fill="'url(#grad1)'"
            />
            <vgg-map v-slot="{ row }">
              <vgg-label
                :x="80 + labelPadding"
                :y="row.location"
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
                :y1="0"
                :y2="100"
                :fill="'url(#grad1)'"
              />
              <vgg-label
                :x="labelPadding"
                :y="row.location"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g>
        </vgg-data>
      </vgg-section>
    </vgg-section>

    <!-- Horizontal direction -->
    <vgg-section
      v-if="direction==='horizontal'"
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
            <vgg-rectangle
              :x1="0"
              :x2="100"
              :y1="25"
              :y2="95"
              :fill="'url(#grad1)'"
            />
            <vgg-map v-slot="{ row }">

              <vgg-label
                :x="row.location"
                :y="labelPadding"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g><g v-else>
            <vgg-rectangle
              :x1="0"
              :x2="100"
              :y1="0"
              :y2="70"
              :fill="'url(#grad1)'"
            />
            <vgg-map v-slot="{ row }">
              <vgg-label
                :x="row.location"
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

export default {
  name: 'DiscreteLegend',

  mixins: [BaseLegend, Rectangular],

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
      if (!this.flip) {
        if (this.direction === "vertical"){
          for (let i = l.length - 1; i >=0; i--) {
            let color = this.colorScale(l[i])
            colors.push(color)
          }
        } else {
          for (let i = 0; i < l.length; i++) {
            let color = this.colorScale(l[i])
            colors.push(color)
          }
        }
      } else {
        if (this.direction === "vertical"){
          for (let i = 0; i < l.length; i++) {
            let color = this.colorScale(l[i])
            colors.push(color)
          }

        } else {
          for (let i = l.length - 1; i >=0; i--) {
            let color = this.colorScale(l[i])
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
      let l = this.legendLabels, start = 0, end = 0, location

      if (!this.flip) {
         for (let i = 0; i < ticks; i++) {
          if (i === 0) {
            end += this.segmentHeight
          } else {
            start = end
            end += this.segmentHeight
          }
          location = (start + end)/2
          boxes.push({location: location, label: l[i]})
        }
      } else {
        for (let i = ticks - 1; i >=0; i--) {
          start = end
          end += this.segmentHeight
          location = (start + end)/2
          boxes.push({location: location, label: l[i]})
       }
      }

      return boxes
    }
  },

  methods: {
  }

}
</script>
