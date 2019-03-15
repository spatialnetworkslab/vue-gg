<template>
  <g :transform="`translate(${legendLeft}, ${legendTop})`">

    <!-- Vertical orientation -->
    <vgg-section
      v-if="orientation==='vertical'"
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
        <vgg-data :data="symbols">
          <vgg-grid
            :cols="columns"
            :layout-padding="0"
            :cell-padding="{ l: 0.5, r: 0.5, b: symbolPadding + 0.5}"
          >
            <vgg-section
              v-for="s,i in symbols"
              :key="i"
              :scale-x="[0, 1]"
              :scale-y="[0, 1]"
            >
              <vgg-multi-line
                v-if="shape==='line'"
                :x="positionElements.multilineX"
                :y="[0.5, 0.5]"
                :stroke-width="s.strokeWidth"
                :stroke="s.stroke"
                :stroke-linecap="linecap"
                :stroke-opacity="s.strokeOpacity"
                :fill-opacity="s.fillOpacity"
              />
              <vgg-symbol
                v-else
                :x="positionElements.symbolX"
                :y="0.5"
                :stroke="s.stroke"
                :stroke-width="s.strokeWidth"
                :size="s.size"
                :shape="shape"
                :fill="s.fill"
                :stroke-opacity="s.strokeOpacity"
                :fill-opacity="s.fillOpacity"
              />
              <vgg-label
                v-if="labelRotate"
                :x="positionElements.labelX"
                :y="0.5"
                :text="s.label"
                :font-size="labelFontSize"
                :anchor-point="'center'"
                :opacity="labelOpacity"
                :font-family="labelFont"
                :font-weight="labelFontWeight"
                :rotation="flip ? 30 : -30"
                :fill="labelColor"
              />
              <vgg-label
                v-else
                :x="positionElements.labelX"
                :y="0.5"
                :text="s.label"
                :font-size="labelFontSize"
                :anchor-point="'center'"
                :opacity="labelOpacity"
                :font-family="labelFont"
                :font-weight="labelFontWeight"
                :fill="labelColor"
              />
            </vgg-section>
          </vgg-grid>
        </vgg-data>
      </vgg-section>
    </vgg-section>

    <!-- Horizontal orientation -->
    <vgg-section
      v-if="orientation==='horizontal'"
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
        :y2="95"
        :scale-x="[0, 100]"
        :scale-y="[0, 100]"
      >
      <vgg-data :data="symbols">
        <vgg-grid
          :cols="columns"
          :layout-padding="0"
          :cell-padding="{ l: 0.5, r: 0.5, b: symbolPadding + 0.5}"
        >
          <vgg-section
            v-for="s in symbols"
            :scale-x="[0, 1]"
            :scale-y="[0, 1]"
          >
            <vgg-multi-line
              v-if="shape==='line'"
              :x="[0.4, 0.6]"
              :y="positionElements.multilineY"
              :stroke-width="s.strokeWidth"
              :stroke="s.stroke"
              :stroke-linecap="linecap"
              :stroke-opacity="s.strokeOpacity"
              :fill-opacity="s.fillOpacity"
            />
            <vgg-symbol
              v-else
              :x="0.5"
              :y="positionElements.symbolY"
              :stroke="s.stroke"
              :stroke-width="s.strokeWidth"
              :size="s.size"
              :shape="shape"
              :fill="s.fill"
              :stroke-opacity="s.strokeOpacity"
              :fill-opacity="s.fillOpacity"
            />

            <vgg-label
              v-if="labelRotate"
              :x="0.5"
              :y="positionElements.labelY"
              :text="s.label"
              :font-size="labelFontSize"
              :anchor-point="'center'"
              :opacity="labelOpacity"
              :font-family="labelFont"
              :font-weight="labelFontWeight"
              :rotation="flip ? 30 : -30"
              :fill="labelColor"
            />
            <vgg-label
              v-else
              :x="0.5"
              :y="positionElements.labelY"
              :text="s.label"
              :font-size="labelFontSize"
              :anchor-point="'center'"
              :opacity="labelOpacity"
              :font-family="labelFont"
              :font-weight="labelFontWeight"
              :fill="labelColor"
            />
          </vgg-section>
        </vgg-grid>
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

    linecap: {
      type: String,
      default: 'round',
      validator: function (value) {
        return ['round', 'square', 'butt'].indexOf(value) !== -1
      },
    },
    // sizeScale
    size: {
      type: [Number, Object, Array],
      default: 16,
    },

    strokeWidth: {
      type: [Number, Object, Array],
      default: 2,
    },

    columns: {
      type: Number,
      default: function (value) { if (this.orientation === "vertical") { return 1 } else if (this.tickCount.constructor === Number) { return this.tickCount } else { return 10 }}
    },

    stroke: {
      type: [Object, Array, String],
      default: undefined,
    },

    fill: {
      type: [Object, Array, String],
      default: 'none',
    },

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
      default: 0.05
    },

    shape:{
      type: [Array, String],
      default: 'circle'
    }
  },

  computed: {
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
          symbol = {location: location, start: start, end: end, label: l[i]}
          symbols.push(this.parseAttributes(symbol, l[i]))
        }
      }

    return symbols
    }
  },

  methods: {
    // scale generator for stroke, fill opacities
    generateOpacityScale (prop, opacityBasis) {
      let opacity = opacityBasis

      if (opacity.constructor === Number) {
        return () => {return opacity}
      } else if (opacity.constructor === Array) {
        return (index) => {return opacity[index]}
      } else {
        let scaleOptions = {
          aestheticType: prop,
          domain: this._domain,
          domainMid: (this._domain[0] + this._domain[1])/2,
          range: opacity.range ? opacity.range : this.scale.range ? this.scale.range : [0,1],
        }
        let scalingFunction = createScale(prop, this.$$dataInterface, scaleOptions)
        return scalingFunction
      }
    },

    // scale generator for  size/radius, strokeWidth
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
          domainMid: (this._domain[0] + this._domain[1])/2,
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

      if (this.strokeWidth && this.strokeWidth.constructor != Number) {
        let strokeWidthScale = this.generateSizeScale('strokeWidth', this.strokeWidth)
        if (strokeWidthScale(value) < 0){
          symbol.strokeWidth = Math.abs(strokeWidthScale(value))/2
        } else if (strokeWidthScale(value) === 0){
          symbol.strokeWidth = 0.0001
        } else {
          symbol.strokeWidth = strokeWidthScale(value)
        }
      } else {
        if (this.strokeWidth.constructor === Number){
          symbol.strokeWidth = this.strokeWidth
        } else {
          symbol.strokeWidth = 5
        }
      }

      if (this.fillOpacity && this.fillOpacity.constructor != Number) {
        let fillOpacityScale = this.generateOpacityScale('fillOpacity', this.fillOpacity)
        if (fillOpacityScale(value) < 0){
          symbol.fillOpacity = Math.abs(fillOpacityScale(value))/2
        } else if (fillOpacityScale(value) === 0){
          symbol.fillOpacity = 0.0001
        } else {
          symbol.fillOpacity = fillOpacityScale(value)
        }
      } else {
        if (this.fillOpacity.constructor === Number){
          symbol.fillOpacity = this.fillOpacity
        } else {
          symbol.fillOpacity = 1
        }
      }

      if (this.strokeOpacity && this.strokeOpacity.constructor != Number) {
        let strokeOpacityScale = this.generateOpacityScale('strokeOpacity', this.strokeOpacity)
        if (strokeOpacityScale(value) < 0){
          symbol.strokeOpacity = Math.abs(strokeOpacityScale(value))/2
        } else if (strokeOpacityScale(value) === 0){
          symbol.strokeOpacity = 0.0001
        } else {
          symbol.strokeOpacity = strokeOpacityScale(value)
        }
      } else {
        if (this.strokeOpacity.constructor === Number){
          symbol.strokeOpacity = this.strokeOpacity
        } else {
          symbol.strokeOpacity = 1
        }
      }

      return symbol
    },
  }
}
</script>
