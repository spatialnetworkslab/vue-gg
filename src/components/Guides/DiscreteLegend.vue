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

          <!-- <vgg-data :data="ticks">
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
          </vgg-data> -->

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
import { scaleLinear, scaleOrdinal } from 'd3-scale'

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

    aesthetics () {
      // fix to allow for both binned and non-binned data
      let aesthetics = []; let fillOpacity; let fill; let start = 0; let end = 0; let valueDomain = []; let sectionScale

      // create section length scale and format valueDomain from legend labels, depending on if interval domain type or not
      if (this._domainType.includes('interval')) {
        // valueDomain = this.$$dataInterface.getColumn(this.scale)
        for (let i = 0; i < this.$$dataInterface.getColumn(this.scale).length; i++) {
          valueDomain.push([this.legendLabels[i].value, this.legendLabels[i + 1].value])
        }
        console.log(valueDomain)
        sectionScale = scaleOrdinal().domain(valueDomain).range([0, 100])
      } else {
        valueDomain = this.legendLabels
        sectionScale = scaleLinear().domain(this._domain).range([0, 100])
      }

      // create fill/fillOpacity scales for rectangles
      if (!this.checkValidColor(this.fill)) {
        fill = this.generateColorScale('fill', this.fill)
        fillOpacity = 1
      } else if (this.fillOpacity && this.checkValidColor(this.fill)) {
        fill = this.fill
        fillOpacity = this.generateScale('fillOpacity', this.fillOpacity)
      } else {
        throw new Error('If `fill` is set to a color (HSL, RGB or CSS value), then `fillOpacity` must be specified to create the legend')
      }

      // generate aesthetics for discrete color rectangles
      if (!this.flip) {
        for (let i = 0; i < valueDomain.length - 1; i++) {
          aesthetics[i] = {}
          if (i === 0) {
            end += this._domainType.includes('interval') ? sectionScale(valueDomain[1]) : sectionScale(valueDomain[1].value)
          } else {
            start = end
            end = this._domainType.includes('interval') ? sectionScale(valueDomain[i + 1]) : sectionScale(valueDomain[i + 1].value)
          }

          aesthetics[i].start = start
          aesthetics[i].end = end

          if (this._domainType.includes('interval')) {
            if (fill.constructor === Function) {
              aesthetics[i].fill = this._domainType.includes('interval') ? fill(valueDomain[i]) : fill(valueDomain[i].value)
              aesthetics[i].fillOpacity = fillOpacity
            } else if (fillOpacity.constructor === Function) {
              aesthetics[i].fill = fill
              aesthetics[i].fillOpacity = this._domainType.includes('interval') ? fillOpacity(valueDomain[i]) : fillOpacity(valueDomain[i].value)
            }
          } else {
            aesthetics[i].fill = this._domainType.includes('interval') ? fill(valueDomain[i]) : fill(valueDomain[i].value)
            aesthetics[i].fillOpacity = fillOpacity
          }
        }
      } else {
        for (let i = valueDomain.length - 1; i >= 1; i--) {
          aesthetics[i] = {}
          aesthetics[i].start = end
          if (this._domainType.includes('interval')) {
            aesthetics[i].end = 100 - sectionScale(valueDomain[i - 1])
            if (fill.constructor === Function) {
              aesthetics[i].fill = fill(valueDomain[i].value)
              aesthetics[i].fillOpacity = fillOpacity
            } else if (fillOpacity.constructor === Function) {
              aesthetics[i].fill = fill
              aesthetics[i].fillOpacity = fillOpacity(valueDomain[i].value)
            }
          } else {
            aesthetics[i].end = 100 - sectionScale(valueDomain[i - 1].value)
            aesthetics[i].fill = fill(valueDomain[i].value)
            aesthetics[i].fillOpacity = fillOpacity
          }
        }
      }
      console.log(aesthetics)
      return aesthetics
    },

    ticks () {
      let ticks = []
      let l = this.legendLabels
      let tickCount = this.tickCount < this.legendLabels.length ? this.tickCount : this.legendLabels.length
      let start = 0; let end = 0; let location

      if (!this.flip) {
        for (let i = 0; i < tickCount; i++) {
          if (this._domainType.includes('interval')) {
            location = this.sectionScale(l[i].value)
          } else {
            if (i === 0) {
              end += this.sectionScale(l[i + 1].value)
            } else {
              start = this.sectionScale(l[i].value)
              end = this.sectionScale(l[i + 1].value)
            }
            location = (start + end) / 2
          }

          ticks.push({ location: location, label: l[i].label })
        }
      } else {
        for (let i = tickCount - 1; i >= 0; i--) {
          if (this._domainType.includes('interval')) {
            location = 100 - this.sectionScale(l[i].value)
          } else {
            if (i === 0) {
              end += this.sectionScale(l[i + 1].value)
            } else {
              start = this.sectionScale(l[i].value)
              end = this.sectionScale(l[i + 1].value)
            }
            location = (start + end) / 2
          }

          ticks.push({ location: location, label: l[i].label })
        }
      }
      console.log(ticks)
      return ticks
    }
  },

  methods: {
    sectionScale () {
      return scaleLinear().domain(this._domain).range([0, 100])
    }
  }
}
</script>
