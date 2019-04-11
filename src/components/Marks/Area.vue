<script>
import Path from '../../mixins/Marks/Path.js'

export default {
  mixins: [Path],

  props: {
    close: {
      type: Boolean,
      default: true
    },

    sort: {
      type: String,
      default: 'x',
      validator: s => ['x', 'y'].includes(s)
    },

    fill: {
      type: String,
      default: '#000000'
    },

    stroke: {
      type: [String, undefined],
      default: undefined
    },

    points: {
      type: undefined,
      default: undefined
    },

    geometry: {
      type: undefined,
      default: undefined
    },
  },

  data () {
    return {
      pathType: 'area'
    }
  },

  methods: {
    getAreaRegress () {
      if (this.regression1 ^ this.regression2) {
        console.warn('Please specify both regression1 and regression2 props, otherwise area mark may not render as expected')
      }

      let areaRegress1 = this.regression1 ? this.regression1 : this.regression
      let areaRegress2 = this.regression2 ? this.regression2 : this.regression

      return { areaRegress1, areaRegress2 }
    },

    getAreaCurves () {
      if (this.curve1 ^ this.curve2) {
        console.warn('Please specify both curve1 and curve2 props, otherwise area mark may not render as expected')
      }
      let areaCurve1 = this.curve1 ? this.curve1 : this.curve
      let areaCurve2 = this.curve2 ? this.curve2 : this.curve

      if (areaCurve2 === 'curveStepAfter') {
        areaCurve2 = 'curveStepBefore'
      } else if (areaCurve2 === 'curveStepBefore') {
        areaCurve2 = 'curveStepAfter'
      } else if (areaCurve2['type'] === 'curveStepAfter') {
        areaCurve2['type'] = 'curveStepBefore'
      } else if (areaCurve2['type'] === 'curveStepBefore') {
        areaCurve2['type'] = 'curveStepAfter'
      }

      return { areaCurve1, areaCurve2 }
    },

    getOtherPoints () {
      let points

      let aesthetics = this._props

      // if neither x2 nor y2 is given, assume x2 is bottom of section
      if (!aesthetics.x2 && !aesthetics.y2) {
        let yMin = this.parentBranch.domains.y[0]
        points = this.generatePoints([yMin], aesthetics.y)
      } 

      if (aesthetics.x2 && !aesthetics.y2) {
        points = this.generatePoints(aesthetics.x2, aesthetics.y)
      }

      if (!aesthetics.x2 && aesthetics.y2) {
        points = this.generatePoints(aesthetics.x, aesthetics.y2)
      }

      if (aesthetics.x2 && aesthetics.y2) {
        points = this.generatePoints(aesthetics.x2, aesthetics.y2)
      }

      if (this.sort) { points = this.sortPoints(points) }

      return points.reverse()
    }
  }
}
</script>
