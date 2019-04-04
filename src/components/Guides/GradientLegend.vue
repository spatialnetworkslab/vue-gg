<!-- fix positioning x and y -->
<template>
  <g :transform="`translate(${legendLeft}, ${legendTop})`">
    <!-- Gradient definition -->
    <defs>
      <linearGradient
        id="grad1"
        :x2="composeGradient.endX"
        :y2="composeGradient.endY"
        x1="0%"
        y1="0%">
        <stop
          v-for="(c,i) in colors"
          :key="i"
          :offset="`${c.offset + '%'}`"
          :style="`stop-color:${c.color};stop-opacity:${c.opacity}`" />
      </linearGradient>
    </defs>

    <!-- Vertical/horizontal orientation -->
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
        :x="positionElements.title"
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
        :y2="89"
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
            :opacity="legendOpacity"
          />
          <g v-if="orientation === 'vertical' ">
            <vgg-map v-slot="{ row }">
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
import { scaleLinear } from 'd3-scale'

export default {
  name: 'DiscreteLegend',

  mixins: [BaseLegend, Rectangular],

  props: {
    type: {
      type: String,
      default: 'gradient'
    },

    legendOpacity: {
      type: Number,
      default: 1
    }
  },

  computed: {
    domain () {
      let domain = []
      if (this._domainType.includes('interval')) {
        let scale = this.scale.domain ? this.scale.domain : this.scale
        for (let i = 0; i < this.$$dataInterface.getColumn(scale).length; i++) {
          domain.push([this.legendLabels[i].value, this.legendLabels[i + 1].value])
        }
      } else {
        domain = this.legendLabels
      }
      return domain
    },

    colors () {
      let l = this.domain; let fill; let fillOpacity; let colors = []

      // create fill/fillOpacity scales for rectangles
      if (!this.checkValidColor(this.fill)) {
        fill = this.generateScale('fill', this.fill)
        fillOpacity = 1
      } else if (this.fillOpacity && this.checkValidColor(this.fill)) {
        fill = this.fill
        fillOpacity = this.generateScale('fillOpacity', this.fillOpacity)
      } else {
        throw new Error('If `fill` is set to a color (HSL, RGB or CSS value), then `fillOpacity` must be specified to create the legend')
      }

      let domain = this._domainType.includes('interval') ? [l[0][0], l[l.length - 1][1]] : this._domain
      let sectionScale = this.sectionScale(domain)
      let opacity = 1; let color

      if (!this.flip) {
        if (this.orientation === 'vertical') {
          for (let i = l.length; i > 0; i--) {
            if (fill.constructor === Function) {
              color = this._domainType.includes('interval') ? fill(l[i - 1]) : fill(l[i - 1].value)
              opacity = fillOpacity
            } else if (fillOpacity.constructor === Function) {
              color = fill
              opacity = this._domainType.includes('interval') ? fillOpacity(l[i - 1]) : fillOpacity(l[i - 1].value)
            }

            let offset = 100 - (this._domainType.includes('interval') ? sectionScale(l[i - 1][0]) : sectionScale(l[i - 1].value))
            colors.push({ color, offset, opacity })
          }
        } else {
          for (let i = 0; i < l.length; i++) {
            if (fill.constructor === Function) {
              color = this._domainType.includes('interval') ? fill(l[i]) : fill(l[i].value)
              opacity = fillOpacity
            } else if (fillOpacity.constructor === Function) {
              color = fill
              opacity = this._domainType.includes('interval') ? fillOpacity(l[i]) : fillOpacity(l[i].value)
            }

            let offset = this._domainType.includes('interval') ? sectionScale(l[i][0]) : sectionScale(l[i].value)
            colors.push({ color, offset, opacity })
          }
        }
      } else {
        if (this.orientation === 'vertical') {
          for (let i = 0; i < l.length; i++) {
            if (fill.constructor === Function) {
              color = this._domainType.includes('interval') ? fill(l[i]) : fill(l[i].value)
              opacity = fillOpacity
            } else if (fillOpacity.constructor === Function) {
              color = fill
              opacity = this._domainType.includes('interval') ? fillOpacity(l[i]) : fillOpacity(l[i].value)
            }

            let offset = this._domainType.includes('interval') ? sectionScale(l[i][0]) : sectionScale(l[i].value)
            colors.push({ color, offset, opacity })
          }
        } else {
          for (let i = l.length; i > 0; i--) {
            if (fill.constructor === Function) {
              color = this._domainType.includes('interval') ? fill(l[i - 1]) : fill(l[i - 1].value)
              opacity = fillOpacity
            } else if (fillOpacity.constructor === Function) {
              color = fill
              opacity = this._domainType.includes('interval') ? fillOpacity(l[i - 1]) : fillOpacity(l[i - 1].value)
            }

            let offset = 100 - (this._domainType.includes('interval') ? sectionScale(l[i - 1][0]) : sectionScale(l[i - 1].value))
            colors.push({ color, offset, opacity })
          }
        }
      }
      return colors
    },

    composeGradient () {
      let specs = {}
      if (this.orientation === 'vertical') {
        specs.endX = '0%'
        specs.endY = '100%'
      } else {
        specs.endX = '100%'
        specs.endY = '0%'
      }
      return specs
    },

    boxes () {
      let boxes = []
      let l = this.legendLabels
      let ticks = this.legendLabels.length
      let domain = this._domainType.includes('interval') ? [this.legendLabels[0].value, this.legendLabels[this.legendLabels.length - 1].value] : this._domain
      let sectionScale = scaleLinear().domain(domain).range([0, 100])

      if (!this.flip) {
        for (let i = 0; i < ticks; i++) {
          boxes.push({ location: sectionScale(l[i].value), label: l[i].label })
        }
      } else {
        for (let i = ticks - 1; i >= 0; i--) {
          boxes.push({ location: 100 - sectionScale(l[i].value), label: l[i].label })
        }
      }

      return boxes
    }
  }
}
</script>
