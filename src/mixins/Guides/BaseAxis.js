import Rectangular from '../Marks/Rectangular.js'
import DataReceiver from '../../mixins/Data/DataReceiver.js'
import ScaleReceiver from '../../mixins/Scales/ScaleReceiver.js'

export default {
  mixins: [Rectangular, DataReceiver, ScaleReceiver],

  props: {
    scale: {
      type: [Array, String, Object],
      required: true
    },

    format: {
      type: [String, Function, undefined],
      default: undefined
    },

    flip: {
      type: Boolean,
      default: false
    },

    // STYLING OPTIONS //

    // If true render axis main line
    domain: {
      type: Boolean,
      default: true
    },

    domainColor: {
      type: String,
      default: 'black'
    },

    domainOpacity: {
      type: Number,
      default: 1
    },

    domainWidth: {
      type: Number,
      default: 1
    },

    labels: {
      type: Boolean,
      default: true
    },

    // hide labels that exceed axis range
    // labelBound: {
    //   type: Boolean,
    //   default: false
    // },

    labelColor: {
      type: String,
      default: 'black'
    },

    labelFont: {
      type: String,
      default: 'Helvetica'
    },

    labelFontSize: {
      type: Number,
      default: 10
    },

    labelFontWeight: {
      type: [String, Number],
      default: 'normal'
    },

    labelOpacity: {
      type: Number,
      default: 1
    },

    // Distance between tick and label **
    // labelPadding: {
    //   type: Number,
    //   default: 0
    // },

    labelRotate: {
      type: Boolean,
      default: false
    },

    ticks: {
      type: Boolean,
      default: true
    },

    tickColor: {
      type: String,
      default: 'black'
    },

    tickValues: {
      type: [Array, undefined],
      default: undefined
    },

    tickCount: {
      type: Number,
      default: 10
    },

    tickExtra: {
      type: Boolean,
      default: true
    },

    tickExtraLabel: {
      type: Boolean,
      default: false
    },

    tickOpacity: {
      type: Number,
      default: 1
    },

    tickSize: {
      type: Number,
      default: 7
    },

    tickWidth: {
      type: Number,
      default: 0.5
    },

    title: {
      type: String,
      default: ''
    },

    titleAnchorPoint: {
      type: String,
      default: 'center',
      validator: p => ['center', 'lb', 'lt', 'rt', 'rb', 'l', 'r', 't', 'b'].includes(p)
    },

    titleAngle: {
      type: Number,
      default: 0
    },

    titleColor: {
      type: String,
      default: 'black'
    },

    titleFont: {
      type: String,
      default: 'Helvetica'
    },

    titleFontSize: {
      type: Number,
      default: 12
    },

    titleFontWeight: {
      type: Number,
      default: 500
    },

    titleOpacity: {
      type: Number,
      default: 1
    }
  },

  computed: {
    parentDomains () {
      return this.parentBranch.domains
    },

    parentDomainWidths () {
      return {
        x: this.parentDomains.x2 - this.parentDomains.x1,
        y: this.parentDomains.y2 - this.parentDomains.y1
      }
    },

    widthX () {
      let { x1, x2 } = this.axisCoords
      return x2 - x1
    },

    widthY () {
      let { y1, y2 } = this.axisCoords
      return y2 - y1
    }
  }
}
