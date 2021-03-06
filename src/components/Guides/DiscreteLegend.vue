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
              <!-- We use a default value for opacity because if row.fillOpacity is 0, then it registers as false -->
              <vgg-rectangle
                :x1="positionElements.rectangle.x1"
                :x2="positionElements.rectangle.x2"
                :y1="row.start"
                :y2="row.end"
                :fill="row.fill"
                :opacity="row.fillOpacity ? row.fillOpacity : 0.001"
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
              <!-- We use a default value for opacity because if row.fillOpacity is 0, then it registers as false -->
              <vgg-rectangle
                :x1="row.start"
                :x2="row.end"
                :y1="positionElements.rectangle.y1"
                :y2="positionElements.rectangle.y2"
                :fill="row.fill"
                :opacity="row.fillOpacity ? row.fillOpacity : 0.001"
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
      let aesthetics = []; let fillOpacity; let fill; let _fill; let domain = []; let valueDomain = []; let sectionScale

      // create section length scale and format valueDomain from legend labels, depending on if interval domain type or not
      if (this._domainType.includes('interval')) {
        for (let i = 0; i < this.legendTicks.length - 1; i++) {
          valueDomain.push([this.legendTicks[i].value, this.legendTicks[i + 1].value])
        }
        domain = [valueDomain[0][0], valueDomain[valueDomain.length - 1][1]]
      } else {
        valueDomain = this.legendTicks
        domain = [0, valueDomain.length - 1]
      }

      // sectionScale = this._domainType.includes('interval') ? this.sectionScale(domain) : 100 / this.legendTicks.length
      if (this._domainType.includes('interval')) {
        sectionScale = this.sectionScale(domain)
      } else if (this.legendCache.classification) {
        sectionScale = this.sectionScale([this._parsedScalingOptions.boundaries[0], this._parsedScalingOptions.boundaries[this._parsedScalingOptions.boundaries.length - 1]])
      } else {
        sectionScale = 100 / this.legendTicks.length
      }

      // create fill/fillOpacity scales for rectangles
      _fill = this.legendCache.fill || 'none'

      if (!this.checkValidColor(_fill)) {
        if (this.legendCache.scale && this.legendCache.classification) {
          throw new Error('Invalid input: Use only `scale` or `classification`')
        } else if (this.legendCache.scale && !this.legendCache.classification) {
          fill = this.generateScale('fill', _fill)
          fillOpacity = 1
        } else if (!this.legendCache.scale && this.legendCache.classification) {
          fill = this.generateClassification('fill', _fill)
          fillOpacity = 1
        }
      } else if (this.legendCache.fillOpacity && this.checkValidColor(_fill)) {
        if (this.legendCache.scale && this.legendCache.classification) {
          throw new Error('Invalid input: Use only `scale` or `classification`')
        } else if (this.legendCache.scale && !this.legendCache.classification) {
          fill = _fill
          fillOpacity = this.generateScale('fillOpacity', this.legendCache.fillOpacity)
        } else if (!this.legendCache.scale && this.legendCache.classification) {
          fill = _fill
          fillOpacity = this.generateClassification('fillOpacity', this.legendCache.fillOpacity)
        }
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
          } else if (this.legendCache.classification) {
            aesthetics[i].end = sectionScale(valueDomain[i].value)
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

          this.checkValidity(aesthetics[i].fill, aesthetics[i].fillOpacity, valueDomain[i])
        }
      } else {
        for (let i = valueDomain.length - 1; i >= 0; i--) {
          aesthetics[i] = {}
          aesthetics[i].start = i === valueDomain.length - 1 ? 0 : aesthetics[i + 1].end

          if (this._domainType.includes('interval')) {
            aesthetics[i].end = 100 - sectionScale(valueDomain[i][0])
          } else if (this.legendCache.classification) {
            aesthetics[i].end = sectionScale(valueDomain[i].value)
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

          this.checkValidity(aesthetics[i].fill, aesthetics[i].fillOpacity, valueDomain[i])
        }
      }

      return aesthetics
    },

    ticks () {
      let ticks = []
      let l = this.legendTicks
      let start = 0; let end = 0; let location
      let domain = this._domainType.includes('interval') ? [this.legendTicks[0].value, this.legendTicks[this.legendTicks.length - 1].value] : this._domain
      let sectionScale
      if (this._domainType.includes('interval')) {
        sectionScale = this.sectionScale(domain)
      } else if (this.legendCache.classification) {
        sectionScale = this.sectionScale([this._parsedScalingOptions.boundaries[0], this._parsedScalingOptions.boundaries[this._parsedScalingOptions.boundaries.length - 1]])
      } else {
        sectionScale = 100 / l.length
      }
      // let sectionScale = this._domainType.includes('interval') ? this.sectionScale(domain) : 100 / l.length

      if (!this.showFirst) {
        l.shift()
      }

      if (!this.showLast) {
        l.pop()
      }

      if (!this.flip) {
        for (let i = 0; i < l.length; i++) {
          start = end
          if (this._domainType.includes('interval') || this.legendCache.classification) {
            end = sectionScale(l[i].value)
          } else {
            end += sectionScale
          }

          location = this._domainType.includes('interval') || this.legendCache.classification ? end : (start + end) / 2
          ticks.push({ location: location, label: l[i].label })
        }
      } else {
        for (let i = l.length - 1; i >= 0; i--) {
          start = end

          if (this._domainType.includes('interval') || this.legendCache.classification) {
            end = 100 - sectionScale(l[i].value)
          } else {
            end = 100 - sectionScale * i
          }

          // end = 100 - sectionScale(l[i].value)
          location = this._domainType.includes('interval') || this.legendCache.classification ? end : (start + end) / 2
          ticks.push({ location: location, label: l[i].label })
        }
      }

      return ticks
    }
  }

}
</script>
this.legendCache.fillOpacity
