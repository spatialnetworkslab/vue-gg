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
              <vgg-path
                v-if="shape==='line'"
                :points="[[0, row.location], [70, row.location]]"
                :strokeWidth="strokeWidth"
              />
              <vgg-symbol
                v-else
                :x="0"
                :y="row.location"
                :stroke="row.stroke"
                :stroke-width="5"
                :size="row.size"
                :shape="shape"
                :fill="row.fill"
              />
              <vgg-label
                :x="80"
                :y="row.location"
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
                :y="row.location"
                :stroke="row.stroke"
                :stroke-width="strokeWidth"
                :size="size"
                :shape="shape"
                fill="none"
              />
              <vgg-label
                :x="5"
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

    <!-- Horizontal gradient -->
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
        <vgg-data :data="symbols">
          <g v-if="!flipNumbers">
            <vgg-map v-slot="{ row }">
              <vgg-symbol
                :x="row.location"
                :y="labelPadding"
                :stroke="row.stroke"
                :stroke-width="strokeWidth"
                :size="size"
                :shape="shape"
                fill="none"
              />
              <vgg-label
                :x="row.location"
                :y="50 + labelPadding"
                :text="row.label"
                :font-size="fontSize"
                :anchor-point="'center'"
              />
            </vgg-map>
          </g><g v-else>
            <vgg-map v-slot="{ row }">
              <vgg-symbol
                :x="row.location"
                y="60"
                :stroke="row.stroke"
                :stroke-width="strokeWidth"
                :size="size"
                :shape="shape"
                fill="none"
              />
              <vgg-label
                :x="row.location"
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
      default: 20,
    },

    strokeWidth: {
      type: [Number, Object, Array],
      default: 10,
    },

    // colorScale: {
    //   type: [String, Array],
    //   default: undefined
    // },

    stroke: {
      type: String,
      default: '#8FD8D8',
    },

    fill: {
      type: String,
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

  computed:{
    // strokeOpacity, fillOpacity
    opacityScale () {

    },

    // covers size/radius, strokeWidth
    sizeScale () {
      let size = this.size
      if (size.constructor === Number) {
        return () => {return size}
      } else if (size.constructor === Array) {
        return (index) => {return size[index]}
      } else {
        let scaleOptions = {
          aestheticType: 'size',
          domain: this._parsedScalingOptions[0],
          domainMid: (this._parsedScalingOptions[0][0] + this._parsedScalingOptions[0][1])/2,
          range: this.size.range ? this.size.range : undefined,
        }
        console.log('range y', this.parentBranch.ranges.y)
        let scalingFunction = createScale('size', this.$$dataInterface, scaleOptions)
        return scalingFunction
      }
    },

    // work on categorical scales - shapes, colors, sizes, stroke widths
    symbols () {
      let symbols = []
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
          console.log('scale function', this.sizeScale(l[i]), l[i])
          symbols.push({size: this.sizeScale(l[i]), fill: this.colorScale(l[i]), stroke: this.colorScale(l[i]), location: location, label: l[i]})
          //symbols.push({strokeWidth: , stroke: , fill: , strokeOpacity: , fillOpacity, start: start, end: end, location: location, label: l[i]})
        }
      } else {
        for (let i = ticks - 1; i >=0; i--) {
          start = end
          end += this.segmentHeight
          location = (start + end)/2
          //symbols.push({color: this.colorScale(l[i]), start: start, end: end, location: location, label: l[i]})
          symbols.push({size: this.sizeScale(l[i]), fill: this.colorScale(l[i]), stroke: this.colorScale(l[i]), location: location, label: l[i]})
       }
      }

      return symbols
    }
  },

  methods: {


  }

}
</script>
