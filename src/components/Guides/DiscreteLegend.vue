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
        <g v-if="orientation==='vertical'">
          <vgg-data :data="aesthetics">
            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="positionElements.rectangle.x1"
                :x2="positionElements.rectangle.x2"
                :y1="row.start"
                :y2="row.end"
                :fill="row.fill"
                :opacity="row.fillOpacity ? row.fillOpacity : legendOpacity"
              />
            </vgg-map>
          </vgg-data>

          <vgg-data :data="labels">
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
          </vgg-data>

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
      default: 'discrete'
    },

    legendOpacity: {
      type: Number,
      default: 1
    }
  },

  computed: {
    sectionScale () {
      return scaleLinear().domain(this._domain).range([0, 100])
    },

    aesthetics () {
      let aesthetics = []; let fillOpacity; let fill; let start = 0; let end = 0

      if (!this.checkValidColor(this.fill)) {
        fill = this.generateColorScale('fill', this.fill)
        fillOpacity = 1
      } else if (this.fillOpacity) {
        fill = this.fill
        fillOpacity = this.generateScale('fillOpacity', this.fillOpacity)
      } else {
        throw new Error('If `fill` is set to a color (HSL, RGB or CSS value), then `fillOpacity` must be specified to create the legend')
      }
      let valueDomain = this.$$dataInterface.getColumn(this.scale)

      console.log(valueDomain)
      if (!this.flip) {
        for (let i = 0; i < valueDomain.length; i++) {
          aesthetics[i] = {}
          if (i === 0) {
            end += this.sectionScale(valueDomain[1][1])
          } else {
            start = this.sectionScale(valueDomain[i][0])
            end = this.sectionScale(valueDomain[i][1])
          }

          if (this._domainType.includes('interval')) {
            if (fill.constructor === Function) {
              aesthetics[i].fill = fill(valueDomain[i])
              aesthetics.fillOpacity = fillOpacity
            } else if (fillOpacity.constructor === Function) {
              aesthetics[i].fill = fill
              aesthetics.fillOpacity = fillOpacity(valueDomain[i])
            }
          } else {
            aesthetics[i].fill = fill(valueDomain[i])
            aesthetics[i].fillOpacity = fillOpacity
          }
        }
      } else {
        for (let i = valueDomain.length - 1; i >= 0; i--) {
          aesthetics[i] = {}
          start = end
          end = 100 - this.sectionScale(l[i].value)

          if (this._domainType.includes('interval')) {
            if (fill.constructor === Function) {
              aesthetics[i].fill = fill(valueDomain[i])
              aesthetics.fillOpacity = fillOpacity
            } else if (fillOpacity.constructor === Function) {
              aesthetics[i].fill = fill
              aesthetics.fillOpacity = fillOpacity(valueDomain[i])
            }
          } else {
            aesthetics[i].fill = fill(valueDomain[i])
            aesthetics.fillOpacity = fillOpacity
          }
        }
      }
      console.log(aesthetics)
      return aesthetics
    },

    labels () {
      let labels = []
      let l = this.legendLabels
      let ticks = this.tickCount < this.legendLabels.length ? this.tickCount : this.legendLabels.length
      let start = 0; let end = 0; let location

      if (!this.flip) {
        for (let i = 0; i < l.length; i++) {
          location = this.sectionScale(l[i].value)
          labels.push({ location: location, label: l[i].label })
        }
      } else {
        for (let i = l.length - 1; i >= 0; i--) {
          location = 100 - this.sectionScale(l[i].value)
          labels.push({ location: location, label: l[i].label })
        }
      }
      console.log(labels)
      return labels
    }
  }
}
</script>
