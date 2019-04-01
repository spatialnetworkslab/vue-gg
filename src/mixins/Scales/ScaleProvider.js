import parseScaleOptions from '../../scales/utils/parseScaleOptions.js'
import DataReceiver from '../Data/DataReceiver.js'
import { createPropCache, createWatchers } from '../../components/Core/utils/propCache.js'

export default {
  mixins: [DataReceiver],

  inject: ['$$scaleManager'],

  props: {
    scales: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      scaleCache: createPropCache(this, ['scales'])
    }
  },

  watch: {
    scales: {
      handler (newScales, oldScales) {
        let newScaleKeys = this.difference(newScales, oldScales)
        for (let scaleName of newScaleKeys) {
          let scale = this.scaleCache.scales[scaleName]

          let parsedScale = parseScaleOptions(
            scale, this.$$dataInterface, this.$$scaleManager
          )

          this.$$scaleManager.storeScale(name, parsedScale)
        }

        let oldScaleKeys = this.difference(oldScales, newScales)
        for (let scaleName of oldScaleKeys) {
          this.$$scaleManager.deleteScale(scaleName)
        }
      },
      deep: true
    }
  },

  created () {
    for (let scaleName in this.scaleCache.scales) {
      let scale = this.scaleCache.scales[scaleName]

      let parsedScale = parseScaleOptions(
        scale, this.$$dataInterface, this.$$scaleManager
      )

      this.$$scaleManager.storeScale(scaleName, parsedScale)
    }
  },

  mounted () {
    createWatchers(this, this.scaleCache)
  },

  methods: {
    difference (keep, remove) {
      let removeKeys = Object.keys(remove)
      return Object.keys(keep).filter(keepKey => !removeKeys.includes(keepKey))
    }
  }
}
