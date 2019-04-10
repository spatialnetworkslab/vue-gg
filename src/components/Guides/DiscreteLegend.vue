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
        :y2="89"
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

          <vgg-data :data="ticks">
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
          <vgg-data :data="aesthetics">
            <vgg-map v-slot="{ row }">
              <vgg-rectangle
                :x1="row.start"
                :x2="row.end"
                :y1="positionElements.rectangle.y1"
                :y2="positionElements.rectangle.y2"
                :fill="row.fill"
                :opacity="row.fillOpacity ? row.fillOpacity : legendOpacity"
              />
            </vgg-map>
          </vgg-data>

          <vgg-data :data="ticks">
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
          </vgg-data>
        </g>

      </vgg-section>
    </vgg-section>
  </g>
</template>

<script>
import BaseLegend from '../../mixins/Guides/BaseLegend.js'
import Rectangular from '../../mixins/Marks/Rectangular.js'

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
      let aesthetics = []; let fillOpacity; let fill; let domain = []; let valueDomain = []; let sectionScale

      // create section length scale and format valueDomain from legend labels, depending on if interval domain type or not
      if (this._domainType.includes('interval')) {
        let scale = this.legendCache.scale.domain ? this.legendCache.scale.domain : this.legendCache.scale
        for (let i = 0; i < this.$$dataInterface.getColumn(scale).length; i++) {
          valueDomain.push([this.legendLabels[i].value, this.legendLabels[i + 1].value])
        }
        domain = [valueDomain[0][0], valueDomain[valueDomain.length - 1][1]]
      } else {
        valueDomain = this.legendLabels
        domain = [0, valueDomain.length - 1]
      }

      sectionScale = this._domainType.includes('interval') ? this.sectionScale(domain) : 100 / this.legendLabels.length

      // create fill/fillOpacity scales for rectangles
      if (!this.checkValidColor(this.legendCache.fill)) {
        fill = this.generateScale('fill', this.legendCache.fill)
        fillOpacity = 1
      } else if (this.legendCache.fillOpacity && this.checkValidColor(this.legendCache.fill)) {
        fill = this.legendCache.fill
        fillOpacity = this.generateScale('fillOpacity', this.legendCache.fillOpacity)
      } else {
        throw new Error('If `fill` is set to a color (HSL, RGB or CSS value), then `fillOpacity` must be specified to create the legend')
      }

      // generate aesthetics for discrete color rectangles
      if (!this.flip) {
        for (let i = 0; i < valueDomain.length; i++) {
          aesthetics[i] = {}
          aesthetics[i].start = i === 0 ? 0 : aesthetics[i - 1].end

          if (this._domainType.includes('interval')) {
            aesthetics[i].end = sectionScale(valueDomain[i][1])
          } else {
            aesthetics[i].end = sectionScale * (i + 1)
          }

          if (fill.constructor === Function) {
            aesthetics[i].fill = this._domainType.includes('interval') ? fill(valueDomain[i]) : fill(valueDomain[i].value)
            aesthetics[i].fillOpacity = fillOpacity
          } else if (fillOpacity.constructor === Function) {
            aesthetics[i].fill = fill
            aesthetics[i].fillOpacity = this._domainType.includes('interval') ? fillOpacity(valueDomain[i]) : fillOpacity(valueDomain[i].value)
          }
        }
      } else {
        for (let i = valueDomain.length - 1; i >= 0; i--) {
          aesthetics[i] = {}
          aesthetics[i].start = i === valueDomain.length - 1 ? 0 : aesthetics[i + 1].end

          if (this._domainType.includes('interval')) {
            aesthetics[i].end = 100 - sectionScale(valueDomain[i][0])
          } else {
            aesthetics[i].end = 100 - (sectionScale * i)
          }

          if (fill.constructor === Function) {
            aesthetics[i].fill = this._domainType.includes('interval') ? fill(valueDomain[i]) : fill(valueDomain[i].value)
            aesthetics[i].fillOpacity = fillOpacity
          } else if (fillOpacity.constructor === Function) {
            aesthetics[i].fill = fill
            aesthetics[i].fillOpacity = this._domainType.includes('interval') ? fillOpacity(valueDomain[i]) : fillOpacity(valueDomain[i].value)
          }
        }
      }

      return aesthetics
    },

    ticks () {
      let ticks = []
      let l = this.legendLabels
      let tickCount = this.legendLabels.length
      let start = 0; let end = 0; let location
      let domain = this._domainType.includes('interval') ? [this.legendLabels[0].value, this.legendLabels[this.legendLabels.length - 1].value] : this._domain
      let sectionScale = this._domainType.includes('interval') ? this.sectionScale(domain) : 100 / (tickCount)

      if (!this.flip) {
        for (let i = 0; i < tickCount; i++) {
          start = end
          if (this._domainType.includes('interval')) {
            end = sectionScale(l[i].value)
          } else {
            end += sectionScale
          }

          location = this._domainType.includes('interval') ? end : (start + end) / 2
          ticks.push({ location: location, label: l[i].label })
        }
      } else {
        for (let i = tickCount - 1; i >= 0; i--) {
          start = end

          if (this._domainType.includes('interval')) {
            end = 100 - sectionScale(l[i].value)
          } else {
            end = 100 - sectionScale * i
          }

          // end = 100 - sectionScale(l[i].value)
          location = this._domainType.includes('interval') ? end : (start + end) / 2
          ticks.push({ location: location, label: l[i].label })
        }
      }

      return ticks
    }
  }
}
</script>
this.legendCache.fillOpacity
