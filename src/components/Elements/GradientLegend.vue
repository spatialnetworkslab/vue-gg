<template>
  <g :transform="`translate(${legendLeft}, ${legendTop})`">
    {{ colors }}
    <vgg-rectangle
      :x1="0"
      :x2="width"
      :y1="0"
      :y2="height"
      fill="orange"
      :fillOpacity="0.6"
    />

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
      class="legend-title"
      :text="name"
      :x="0"
      :y="0"
      :font-size="12"
    />
    <vgg-rectangle
      :x1="0"
      :x2="60"
      :y1="0"
      :y2="100"
      fill="blue"
      :fillOpacity="0.6"
    />

    </vgg-section>
    <!-- Calculate gradient -->
    <!-- <defs>
      <linearGradient v-if="orient === 'vertical'"
      id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop
          v-for="(c, i) in colors"
          :key="i"
          :offset="`${i * offset + '%'}`"
          :style="`stop-color:${c}`" />
      </linearGradient>
      <linearGradient v-if="orient === 'horizontal'"
      id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop
          v-for="(c, i) in colors"
          :key="i"
          :offset="`${i * offset + '%'}`"
          :style="`stop-color:${c}`" />
      </linearGradient>
    </defs> -->

    <!-- <vgg-section
      class="gradient-legend"
      :x1="ranges.x1"
      :x2="ranges.x2"
      :y1="ranges.y1"
      :y2="ranges.y2"
      :scales="{
        x: [0, ranges.x2],
        y: [0, ranges.y2]
      }"
    > -->

      <!-- <vgg-section
        v-if="orient==='vertical'"
        :x1="0"
        :x2="width"
        :y1="0"
        :y2="height"
        :scales="{
          x: [0, width],
          y: [0, height]
        }"
      >
      <vgg-label
        class="legend-title"
        :text="name"
        :x="width/2"
        :y="height"
        :font-size="12"
      /> -->
      <!-- Render labels -->
      <!-- <vgg-data :data="texts">
        <vgg-map>
          <vgg-label
            :x="gradientWidth + 15"
            :y="tick => tick.h"
            :text="tick => tick.label"
            :font-size="10"
            :anchor-point="'center'"
          />
        </vgg-map>
      </vgg-data> -->
        <!-- <vgg-rectangle
          :x1="0"
          :x2="width"
          :y1="0"
          :y2="height"
          fill="blue"
          :fillOpacity="0.1"
        />
        <vgg-map>
        <vgg-rectangle
          :x1="0"
          :x2="gradientWidth"
          :y1="0"
          :y2="gradientHeight"
          :fill="fill"
          :fillOpacity="0.7"
        />
      </vgg-map>
      </vgg-section> -->

      <!-- <vgg-section
        v-if="orient==='horizontal'"
        :x1="0"
        :x2="height"
        :y1="0"
        :y2="width"
        :scales="{
          x: [0, height],
          y: [0, width]
        }"
      >
      <vgg-label
        class="legend-title"
        :text="name"
        :x="height/2"
        :y="width"
      />
        <!-- Render labels -->
        <!-- <vgg-data :data="texts">
          <vgg-map>
            <vgg-label
              :x="tick => tick.h"
              :y="gradientWidth"
              :text="tick => tick.label"
              :font-size="10"
              :anchor-point="'center'"
            />
          </vgg-map>
        </vgg-data>
        <vgg-rectangle
          :x1="0"
          :x2="height"
          :y1="0"
          :y2="width"
          fill="blue"
          :fillOpacity="0.3"
        />
        <vgg-rectangle
          :x1="0"
          :x2="height"
          :y1="0"
          :y2="gradientWidth - 10"
          :fill="color"
          :fillOpacity="0.7"
        />
      </vgg-section> -->

      <!-- <g v-if="orient === 'vertical'" >
        <g v-for="(c,i) in colors">
          <g v-if="i < colors.length">
            <vgg-rectangle
              :x1="0"
              :x2="ranges.x2/2"
              :y1="segmentHeight * i"
              :y2="segmentHeight * (i+1)"
              :fill="c"
            />
          </g>
        </g>

        <vgg-data :data="texts">
          <vgg-map>
            <vgg-label
              :x="ranges.x2/1.5"
              :y="tick => tick.h"
              :text="tick => tick.label"
              :font-size="10"
              :anchor-point="'center'"
            />
          </vgg-map>
        </vgg-data>
      </g>-->
    <!-- </vgg-section> -->
  </g>
</template>

<script>
import BaseLegend from '@/mixins/Guides/BaseLegend.js'
//import Rectangle from '@/components/Marks/Rectangle.vue'
import Rectangular from '../../mixins/Marks/Rectangular.js'
import createScale from '@/scales/createScale.js'

export default {
  name: 'GradientLegend',

  mixins: [BaseLegend, Rectangular],

  props: {
    color: {
      type: [String, Object, Array],
      default: '#8FD8D8',
    },
    labelPadding: {
      type: Number,
      default: 5
    },
    x: {
      type: [Number, Object, Array],
      default: 0,
    },
    y: {
      type: [Number, Object, Array],
      default: 0,
    },

    scale: {
      type: [Number, Object, Array],
      default: undefined,
    }
  },

  computed: {
    gradientWidth () {
      return this.width * 0.7
      },

    gradientHeight () {
      return this.height * 0.9
      },

    colorScale () {
      console.log(this.fill)
      let color = this.color
      console.log(color, color.constructor, color.fromZero)
      if (color.constructor === String) {
        return () => {return color}
      } else if (color.constructor === Array) {
        return (index) => {return color[index]}
      } else {
        let scaleOptions = {
          aestheticType: 'color',
          scaleArgs: [[0, this.numTicks], color.fromZero]
        }

        let scalingFunction = createScale(color.scale, scaleOptions)
        return scalingFunction
      }
    },

    offset () {
      return 100 / (this.numTicks - 1)
    },

    colors () {
      let ticks = this.numTicks
      let colors = []

      for (let i = 0; i < ticks; i++) {
        let color = this.colorScale(i)

        colors.push(color)
      }
      return colors
    },

    segmentHeight () {
      if (this.orient === 'vertical') {
        return this.gradientHeight / (this.numTicks - 1)
      } else if (this.orient === 'horizontal') {
        return this.height / (this.numTicks - 1)
      }
    },

    // texts () {
    //   let texts = []
    //   let ticks = this.numTicks
    //   let l = this.legendLabels
    //
    //   for (let i = 0; i < ticks - 1; i++) {
    //     let h = this.segmentHeight * i + 5
    //     texts.push({h: h, label: l[i]})
    //   }
    //   console.log(texts)
    //   console.log(texts)
    //   return texts
    // }
  },

  methods: {
    setHeight () {
      this.height = this.gradientHeight
    }
  }

}
</script>

<style scoped>
.legend-title {
  font-family: Helvetica;
  fill: black;
  font-size: 14px;
}

.legend-text {
  font-family: Helvetica;
  fill: black;
  font-size: 11px;
}
</style>
