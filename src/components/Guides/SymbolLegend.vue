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

        <vgg-grid
          v-if="checkGrid.columns"
          :cols="checkGrid.columns"
          :layout-padding="0"
          :cell-padding="{ l: 0.5, r: 0.5, b: symbolPadding + 0.5}"
        >
          <vgg-section
            v-for="(s, i) in symbols"
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
              :shape="s.shape"
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
              :anchor-point="positionElements.labelAnchorPoint"
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
              :anchor-point="positionElements.labelAnchorPoint"
              :opacity="labelOpacity"
              :font-family="labelFont"
              :font-weight="labelFontWeight"
              :fill="labelColor"
            />
          </vgg-section>
        </vgg-grid>

        <vgg-grid
          v-if="checkGrid.rows"
          :rows="checkGrid.rows"
          :layout-padding="0"
          :cell-padding="{ l: 0.5, r: 0.5, b: symbolPadding + 0.5}"
        >
          <vgg-section
            v-for="(s, i) in symbols"
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
              :shape="s.shape"
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
              :anchor-point="positionElements.labelAnchorPoint"
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
              :anchor-point="positionElements.labelAnchorPoint"
              :opacity="labelOpacity"
              :font-family="labelFont"
              :font-weight="labelFontWeight"
              :fill="labelColor"
            />
          </vgg-section>
        </vgg-grid>

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
        <vgg-grid
          v-if="checkGrid.columns"
          :cols="checkGrid.columns"
          :layout-padding="0"
          :cell-padding="{ l: 0.5, r: 0.5, b: symbolPadding + 0.5}"
        >
          <vgg-section
            v-for="(s, i) in symbols"
            :key="i"
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
              :shape="s.shape"
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
              :anchor-point="positionElements.labelAnchorPoint"
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
              :anchor-point="positionElements.labelAnchorPoint"
              :opacity="labelOpacity"
              :font-family="labelFont"
              :font-weight="labelFontWeight"
              :fill="labelColor"
            />
          </vgg-section>
        </vgg-grid>

        <vgg-grid
          v-if="checkGrid.rows"
          :rows="checkGrid.rows"
          :layout-padding="0"
          :cell-padding="{ l: 0.5, r: 0.5, b: symbolPadding + 0.5}"
        >
          <vgg-section
            v-for="(s, i) in symbols"
            :key="i"
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
              :shape="s.shape"
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
              :anchor-point="positionElements.labelAnchorPoint"
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
              :anchor-point="positionElements.labelAnchorPoint"
              :opacity="labelOpacity"
              :font-family="labelFont"
              :font-weight="labelFontWeight"
              :fill="labelColor"
            />
          </vgg-section>
        </vgg-grid>

      </vgg-section>
    </vgg-section>
  </g>
</template>

<script>
import BaseLegend from '@/mixins/Guides/BaseLegend.js'
import createScale from '@/scales/createScale.js'

export default {
  name: 'SymbolLegend',

  mixins: [BaseLegend],

  props: {
    type: {
      type: String,
      default: 'symbol'
    },

    shape: {
      type: [String, Object, Array],
      default: 'circle'
    },

    linecap: {
      type: String,
      default: 'round',
      validator: function (value) {
        return ['round', 'square', 'butt'].indexOf(value) !== -1
      }
    },
    // sizeScale
    size: {
      type: [Number, Object, Array],
      default: 16
    },

    strokeWidth: {
      type: [Number, Object, Array],
      default: 2
    },

    columns: {
      type: Number,
      default: undefined
    },

    rows: {
      type: Number,
      default: undefined
    },

    stroke: {
      type: [Object, Array, String],
      default: undefined
    },

    fill: {
      type: [Object, Array, String],
      default: 'none'
    },

    strokeOpacity: {
      type: [Number, Object, Array],
      default: 1
    },

    fillOpacity: {
      type: [Number, Object, Array],
      default: 1
    },

    symbolPadding: {
      type: Number,
      default: 0.05
    }
  },

  computed: {
    scales () {
      let scales = {}

      if (this.shape) {
        if (this.shape.constructor === String) {
          scales.shape = this.shape
        } else {
          let shapeScale = this.generateScale('shape', this.shape)
          scales.shape = shapeScale
        }
      } else {
        scales.shape = 'circle'
      }

      // figure out which to prioritize - fill or stroke?
      if (this.stroke) {
        if (this.stroke === 'none' || this.stroke.constructor === String) {
          scales.stroke = this.stroke
        } else {
          let strokeScale = this.generateScale('stroke', this.stroke)
          scales.stroke = strokeScale
        }
      } else {
        scales.stroke = 'black'
      }

      if (this.fill !== 'none') {
        let fillScale = this.generateScale('fill', this.fill)
        scales.fill = fillScale
      } else if (this.fill.constructor === String) {
        scales.fill = this.fill
      }

      if (this.size) {
        let sizeScale = this.generateScale('size', this.size)
        scales.size = sizeScale
      } else {
        scales.size = 10
      }
      if (this.strokeWidth) {
        if (this.strokeWidth.constructor !== Number) {
          let strokeWidthScale = this.generateScale('strokeWidth', this.strokeWidth)
          scales.strokeWidth = strokeWidthScale
        } else {
          if (this.strokeWidth.constructor === Number) {
            scales.strokeWidth = this.strokeWidth
          } else {
            scales.strokeWidth = 5
          }
        }
      }

      if (this.fillOpacity) {
        if (this.fillOpacity.constructor !== Number) {
          let fillOpacityScale = this.generateScale('fillOpacity', this.fillOpacity)
          scales.fillOpacity = fillOpacityScale
        } else {
          if (this.fillOpacity.constructor === Number) {
            scales.fillOpacity = this.fillOpacity
          } else {
            scales.fillOpacity = 1
          }
        }
      }

      if (this.strokeOpacity) {
        if (this.strokeOpacity.constructor !== Number) {
          let strokeOpacityScale = this.generateScale('strokeOpacity', this.strokeOpacity)
          scales.strokeOpacity = strokeOpacityScale
        } else {
          if (this.strokeOpacity.constructor === Number) {
            scales.strokeOpacity = this.strokeOpacity
          } else {
            scales.strokeOpacity = 1
          }
        }
      }

      return scales
    },

    // work on categorical scales - shapes, colors, sizes, stroke widths
    symbols () {
      let symbols = []
      let l = this.legendLabels
      let ticks = this.tickCount < this.legendLabels.length ? this.tickCount : this.legendLabels.length
      let start = 0; let end = 0; let location; let symbol
      let segHeight = 100 / ticks

      if (!this.flip) {
        for (let i = 0; i < ticks; i++) {
          if (i !== 0) {
            start = end
          }
          end += segHeight
          location = (start + end) / 2
          symbol = { location: location, label: l[i].label }
          symbols.push(this.parseAttributes(symbol, l[i].value))
        }
      } else {
        for (let i = ticks - 1; i >= 0; i--) {
          start = end
          end += segHeight
          location = (start + end) / 2
          symbol = { location: location, start: start, end: end, label: l[i].label }
          symbols.push(this.parseAttributes(symbol, l[i].value))
        }
      }

      return symbols
    },

    checkGrid () {
      let grid = {}

      if (this.columns && this.rows) {
        throw new Error('Specify only columns or only rows')
      } else if (!this.rows && !this.columns) {
        if (this.orientation === 'vertical') {
          grid = { columns: 1 }
        } else if (this.orientation === 'horizontal') {
          grid = { rows: 1 }
        }
      } else {
        if (this.rows) {
          grid = { rows: this.rows }
        } else {
          grid = { columns: this.columns }
        }
      }
      console.log(grid, this.title)
      return grid
    }
  },

  methods: {
    // CSS color recognition for color reliant properties
    checkValidColor (color) {
      let e = document.getElementById('divValidColor')
      if (!e) {
        e = document.createElement('div')
        e.id = 'divValidColor'
      }
      e.style.borderColor = ''
      e.style.borderColor = color
      let tmpcolor = e.style.borderColor
      if (tmpcolor.length === 0) {
        return false
      }
      return true
    },

    generateScale (prop, scaleBasis) {
      let scaleOptions

      if (scaleBasis.constructor === Number) {
        return () => { return scaleBasis }
      // } else if (scaleBasis.constructor === Array) { // FIX THIS
      //   return (index) => { return scaleBasis[index] }
      } else {
        let scalingFunction

        if (prop === 'strokeOpacity' || prop === 'fillOpacity') {
          if (this._domainType === 'categorical') {
            scaleOptions = {
              aestheticType: prop,
              domain: scaleBasis.domain ? scaleBasis.domain : this._domain,
              range: scaleBasis.range ? scaleBasis.range : this.scale.range ? this.scale.range : [0, 1]
            }
          } else {
            scaleOptions = {
              aestheticType: prop,
              domain: scaleBasis.domain ? scaleBasis.domain : this._domain,
              domainMid: (this._domain[0] + this._domain[1]) / 2,
              range: scaleBasis.range ? scaleBasis.range : this.scale.range ? this.scale.range : [0, 1]
            }
          }
        } else if (prop === 'stroke' || prop === 'fill') {
          if (this._domainType === 'categorical') {
            scaleOptions = {
              aestheticType: prop,
              domain: scaleBasis.domain ? scaleBasis.domain : this._domain,
              type: scaleBasis.type,
              ranges: scaleBasis.ranges
            }
          } else {
            scaleOptions = {
              aestheticType: prop,
              domain: scaleBasis.domain ? scaleBasis.domain : this._domain,
              domainMid: (this._parsedScalingOptions[0][0] + this._parsedScalingOptions[0][1]) / 2,
              scaleArgs: [[0, this.tickCount]],
              type: scaleBasis.type,
              ranges: scaleBasis.ranges
            }
          }
        } else if (prop === 'size' || prop === 'radius' || prop === 'strokeWidth') {
          if (this._domainType === 'categorical') {
            scaleOptions = {
              aestheticType: prop,
              domain: this._domain,
              range: scaleBasis.range ? scaleBasis.range : this.scale.range ? this.scale.range : [0, 10]
            }
          } else {
            scaleOptions = {
              aestheticType: prop,
              domain: this._domain,
              domainMid: (this._domain[0] + this._domain[1]) / 2,
              range: scaleBasis.range ? scaleBasis.range : this.scale.range ? this.scale.range : [0, 10]
            }
          }
        } else if (prop === 'shape') {
          if (scaleBasis.type) {
            scaleOptions = {
              domain: scaleBasis.domain ? scaleBasis.domain : this._domain,
              type: scaleBasis.type
            }
          } else {
            scaleOptions = {
              domain: this._domain,
              ranges: scaleBasis.ranges ? scaleBasis.ranges : ['circle', 'square']
            }
          }
        }

        scalingFunction = createScale(prop, this.$$dataInterface, scaleOptions)

        return scalingFunction
      }
    },

    parseAttributes (symbol, value) {
      for (let item in this.scales) {
        if (this.scales[item].constructor === String || this.scales[item].constructor === Number) {
          symbol[item] = this.scales[item]
        } else if (this.scales[item].constructor === Function) {
          if (item === 'size' || item === 'strokeWidth') {
            if (this.scales[item](value) < 0) {
              symbol[item] = Math.abs(this.scales[item](value)) / 2
            } else {
              symbol[item] = this.scales[item](value)
            }
          } else if (item === 'fillOpacity' || item === 'strokeOpacity') {
            if (this.scales[item](value) < 0) {
              symbol[item] = Math.abs(this.scales[item](value)) / 2
            } else if (this.scales[item](value) === 0) {
              symbol[item] = 0.0001
            } else {
              symbol[item] = this.scales[item](value)
            }
          } else if (this.checkValidColor(value) && (item === 'fill' || item === 'stroke')) {
            symbol[item] = value
          } else {
            symbol[item] = this.scales[item](value)
          }
        } else {
          symbol[item] = this.scales[item](value)
        }
      }
      return symbol
    }
  }
}
</script>
