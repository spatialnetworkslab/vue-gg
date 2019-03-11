<template>
  <g :transform="`translate(${legendLeft}, ${legendTop})`">
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
        :x="titleX"
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
        <vgg-data :data="symbols">
          <g v-if="!flipNumbers">
            <vgg-map v-slot="{ row, i }">
              <vgg-path
                v-if="shape==='line'"
                :points="[[20, row.location], [50, row.location]]"
                :strokeWidth="row.strokeWidth"
              />
              <vgg-symbol
                v-else
                :x="20"
                :y="row.location + symbolPadding * i/10"
                :stroke="row.stroke"
                :stroke-width="row.strokeWidth"
                :size="row.size"
                :shape="shape"
                :fill="row.fill"
              />
              <vgg-label
                v-if="shape==='line'"
                :x="80"
                :y="row.location"
                :text="row.label"
                :font-size="fontSize"
              />
              <vgg-label
                v-else
                :x="70"
                :y="row.location + labelPadding * i/10"
                :text="row.label"
                :font-size="fontSize"
              />
            </vgg-map>
          </g>
          <g v-else>
            <vgg-map v-slot="{ row, i }">
              <vgg-symbol
                :x="80"
                :y="row.location + symbolPadding * i/10"
                :stroke="row.stroke"
                :stroke-width="row.strokeWidth"
                :size="row.size"
                :shape="shape"
                :fill="row.fill"
              />
              <vgg-label
                :x="30 - labelPadding"
                :y="row.location + labelPadding * i/10"
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
      v-if="direction==='horizontal'"
      :x1="0"
      :x2="width"
      :y1="0"
      :y2="height"
      :scale-x="[0, 100]"
      :scale-y="[0, 100]"
    >
      <vgg-label
        :text="title"
        :x="titleX"
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
      <vgg-data :data="symbols">
        <g v-if="!flipNumbers">
          <vgg-map v-slot="{ row, i }">
            <vgg-path
              v-if="shape==='line'"
              :points="[[0, row.location], [70, row.location]]"
              :strokeWidth="row.strokeWidth"
              :stroke="row.stroke"
            />
            <vgg-symbol
              v-else
              :x="row.location + symbolPadding * i"
              :y="70"
              :stroke="row.stroke"
              :stroke-width="row.strokeWidth"
              :size="row.size"
              :shape="shape"
              :fill="row.fill"
            />
            <vgg-label
              :x="row.location + symbolPadding * i"
              :y="30"
              :text="row.label"
              :font-size="fontSize"
            />
          </vgg-map>
        </g>
        <g v-else>
          <vgg-map v-slot="{ row, i }">
            <vgg-symbol
              :x="row.location + symbolPadding * i"
              :y="30"
              :stroke="row.stroke"
              :stroke-width="row.strokeWidth"
              :size="row.size"
              :shape="shape"
              :fill="row.fill"
            />
            <vgg-label
              :x="row.location + labelPadding * i"
              :y="70"
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
    type: {
      type: String,
      default: 'symbol'
    },

    shape: {
      type: String,
      default: 'circle',
      validator: function (value) {
        return ['circle', 'square', 'cross', 'diamond', 'triangle-up', 'triangle-left', 'triangle-right' ,'triangle-down' ,'star'].indexOf(value) !== -1
      },
    },

    // distance of text from symbols
    labelPadding: {
      type: Number,
      default: 5
    },

    // sizeScale
    size: {
      type: [Number, Object, Array],
      default: 10,
    },

    strokeWidth: {
      type: [Number, Object, Array],
      default: 2,
    },

    // colorScale: {
    //   type: [String, Array],
    //   default: undefined
    // },

    stroke: {
      type: [Object, Array, String],
      default: undefined,
    },

    fill: {
      type: [Object, Array, String],
      default: 'none',
    },

    // opacityScale
    strokeOpacity: {
      type: [Number, Object, Array],
      default: 1,
    },

    fillOpacity: {
      type: [Number, Object, Array],
      default: 1,
    },

    symbolPadding:{
      type : Number,
      default: 5
    },

    shape:{
      type: [Array, String],
      default: 'circle'
    },

    fillShape:{
      type: Boolean,
      default: false
    }
  },

  computed: {
    // strokeOpacity, fillOpacity
    opacityScale () {

    },

    // work on categorical scales - shapes, colors, sizes, stroke widths
    symbols () {
      let symbols = []
      let ticks = this.tickCount
      let l = this.legendLabels, start = 0, end = 0, location, symbol
      let sizeScale = this.generateSizeScale
      if (!this.flip) {
         for (let i = 0; i < ticks; i++) {
          if (i === 0) {
            end += this.segmentHeight
          } else {
            start = end
            end += this.segmentHeight
          }
          location = (start + end)/2
          symbol = {location: location, label: l[i]}
          symbols.push(this.parseAttributes(symbol, l[i]))
        }
      } else {
        for (let i = ticks - 1; i >=0; i--) {
          start = end
          end += this.segmentHeight
          location = (start + end)/2
          symbol = {location: location, label: l[i]}
          symbols.push(this.parseAttributes(symbol, l[i]))
        }
      }
    console.log(symbols)
    return symbols
    }
  },

  methods: {
    // covers size/radius, strokeWidth
    generateSizeScale (prop, sizeBasis) {
      let size = sizeBasis
      if (size.constructor === Number) {
        return () => {return size}
      } else if (size.constructor === Array) {
        return (index) => {return size[index]}
      } else {
        let scaleOptions = {
          aestheticType: prop,
          domain: this._domain,
          domainMid: (this._parsedScalingOptions[0][0] + this._parsedScalingOptions[0][1])/2,
          range: size.range ? size.range : this.scale.range ? this.scale.range : [0,10],
        }
        let scalingFunction = createScale(prop, this.$$dataInterface, scaleOptions)
        return scalingFunction
      }
    },

    parseAttributes (symbol, value) {
      // figure out which to prioritize - fill or stroke?
      if (this.stroke) {
        if (this.stroke === 'none' || this.stroke.constructor === String) {
          symbol.stroke = this.stroke
        } else {
          let strokeScale = this.generateColorScale('stroke', this.stroke)
          symbol.stroke = strokeScale(value)
        }
      } else {
        symbol.stroke = 'black'
      }

      if (this.fill != "none") {
        let fillScale = this.generateColorScale('fill', this.fill)
        symbol.fill = fillScale(value)
      } else if (this.fill.constructor === String) {
        symbol.fill = this.fill
      }

      // how to deal with negative values given by scale?
      if (this.size) {
        let sizeScale = this.generateSizeScale('size', this.size)
        if (sizeScale(value) < 0){
          symbol.size = Math.abs(sizeScale(value))/2
        } else {
          symbol.size = sizeScale(value)
        }
      } else {
        symbol.size = 10
      }

      if (this.strokeWidth) {
        let strokeWidthScale = this.generateSizeScale('strokeWidth', this.strokeWidth)
        if (strokeWidthScale(value) < 0){
          symbol.strokeWidth = Math.abs(strokeWidthScale(value))/2
        } else if (strokeWidthScale(value) === 0){
          symbol.strokeWidth = 0.0001
        } else {
          symbol.strokeWidth = strokeWidthScale(value)
        }
      } else {
        symbol.strokeWidth = 5
      }
      // if (this.fillOpacity) {
      //
      // }
      //
      // if (this.strokeOpacity) {
      //
      // }
      //
      // if (this.strokeDash) {
      //
      // }
      return symbol
    },
  }
}
</script>
