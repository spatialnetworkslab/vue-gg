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
        <vgg-data :data="symbols">
          <g v-if="!flipNumbers">
            <vgg-map v-slot="{ row }">
              <vgg-symbol
                :x="0"
                :y="row.labelPost"
                :stroke="row.color"
                :stroke-width="strokeWidth"
                :size="size"
                :shape="shape"
                fill="none"
              />
              <vgg-label
                :x="95"
                :y="row.labelPost"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g>
          <g v-else>
            <vgg-map v-slot="{ row }">
              <vgg-symbol
                :x="100"
                :y="row.labelPost"
                :stroke="row.color"
                :stroke-width="strokeWidth"
                :size="size"
                :shape="shape"
                fill="none"
              />
              <vgg-label
                :x="5"
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
        <vgg-data :data="symbols">
          <g v-if="!flipNumbers">
            <vgg-map v-slot="{ row }">
              <vgg-symbol
                :x="row.labelPost"
                :y="labelPadding"
                :stroke="row.color"
                :stroke-width="strokeWidth"
                :size="size"
                :shape="shape"
                fill="none"
              />
              <vgg-label
                :x="row.labelPost"
                :y="50 + labelPadding"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g><g v-else>
            <vgg-map v-slot="{ row }">
              <vgg-symbol
                :x="row.labelPost"
                :y="60"
                :stroke="row.color"
                :stroke-width="strokeWidth"
                :size="size"
                :shape="shape"
                fill="none"
              />
              <vgg-label
                :x="row.labelPost"
                :y="labelPadding"
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
  name: 'SymbolLegend',

  mixins: [BaseLegend, Rectangular],

  props: {
    shape: {
      type: String,
      default: 'circle',
      validator: function (value) {
        return ['circle', 'square', 'cross', 'diamond', 'triangle-up', 'triangle-left', 'triangle-right' ,'triangle-down' ,'star'].indexOf(value) !== -1
      },
    },

    symbolOpacity: {
      type: [Number, Object, Array],
      default: 20,
    },

    color: {
      type: String,
      default: '#8FD8D8',
    },

    size: {
      type: Number,
      default: 10,
    },
    // colorScale: {
    //   type: [String, Array],
    //   default: undefined
    // },

    symbolShape: {
      type: [String, Array],
      default: 'rect'
    },

    symbolPadding: {
      type: Number,
      default: 5
    },

    labelPadding: {
      type: Number,
      default: 10
    },

    strokeColor: {
      type: String,
      default: '#8FD8D8',
    },

    strokeWidth: {
      type: [Number, Object, Array],
      default: 20,
    },

    strokeOpacity: {
      type: [Number, Object, Array],
      default: 1,
    },

    fill: {
      type: String,
      default: '#8FD8D8',
    },

    fillOpacity: {
      type: [Number, Object, Array],
      default: 1,
    },

    opacity: {
      type: [Number, Object, Array],
      default: 1,
    },
  },

  computed: {
    symbolWidthScale () {
      let size = this.symbolWidth
      if (size.constructor === Number) {
        return () => {return size}
      } else if (size.constructor === Array) {
        return (index) => {return size[index]}
      } else {
        let scaleOptions = {
          aestheticType: 'xy',
          scaleArgs: [this.domain, size.range]
        }
        let scalingFunction = createScale(size.scale, scaleOptions)
        return scalingFunction
      }
    },

    symbolHeightScale () {
      let size = this.symbolHeight
      if (size.constructor === Number) {
        return () => {return size}
      } else if (size.constructor === Array) {
        return (index) => {return size[index]}
      } else {
        let scaleOptions = {
          aestheticType: 'xy',
          scaleArgs: [this.domain, size.range]
        }
        let scalingFunction = createScale(size.scale, scaleOptions)
        return scalingFunction
      }
    },

    colorScaleFunc () {
      let color = this.color
      let colorScale = this.colorScale
      if (!colorScale) {
        return () => {return color}
      }
      if (colorScale.constructor === Array) {
        return (index) => {return colorScale[index]}
      } else {
        let scaleOptions = {
          aestheticType: 'color',
          scaleArgs: [this.domain, 0]
        }
        let scalingFunction = createScale(colorScale, scaleOptions)
        return scalingFunction
      }
    },

    symbols () {
      let symbols = []
      let l = this.legendLabels
      for (let i = 0; i < l.length; i++) {
        let w = this.symbolWidthScale(i)
        let h = this.symbolHeightScale(i)
        let c = this.colorScaleFunc(i)
        symbols.push({w: w, h: h, color: c, label: l[i]})
      }
      return symbols
    },

    maxSymbolHeight () {
      return this.symbols[this.symbols.length - 1].h
    },

    maxSymbolWidth () {
      return this.symbols[this.symbols.length - 1].w
    },

    symbols () {
      let symbols = []
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
          symbols.push({color: this.colorScale(l[i]), start: start, end: end, labelPost: labelPost, label: l[i]})
        }
      } else {
        for (let i = ticks - 1; i >=0; i--) {
          start = end
          end += this.segmentHeight
          labelPost = (start + end)/2
          symbols.push({color: this.colorScale(l[i]), start: start, end: end, labelPost: labelPost, label: l[i]})
       }
      }

      return symbols
    }
  },

  methods: {
  }

}
</script>
