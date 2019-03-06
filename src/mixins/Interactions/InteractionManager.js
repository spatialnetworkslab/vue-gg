import rbush from 'rbush'
import collisionTest from './utils/collisionTest.js'
import createIndexItem from './utils/createIndexItem.js'
import elementChanged from './utils/elementChanged.js'

export default {
  data () {
    return {
      interactionManager: Object.freeze({
        nativeListeners: {}, // keys: native listeners (click, mouseover, etc)
        spatialIndex: rbush(),
        indexCache: {}
      })
    }
  },

  computed: {
    svg () {
      return this.$el
    },

    svgPoint () {
      return this.svg.createSVGPoint()
    }
  },

  methods: {
    addElement (uid, type, coordinates, instance, listeners) {
      this.indexElement(uid, type, coordinates, instance)

      for (let listener of listeners) {
        this.startListener(listener)
      }
    },

    indexElement (uid, type, coordinates, instance) {
      let strUid = uid.toString()
      let item = createIndexItem(type, coordinates, instance)
      let cache = this.interactionManager.indexCache

      if (cache.hasOwnProperty(strUid)) {
        if (elementChanged(cache[strUid], item)) {
          this.unIndexElement(uid)
          cache[strUid] = item
          this.interactionManager.spatialIndex.insert(cache[strUid])
        }
      } else {
        cache[strUid] = item
        this.interactionManager.spatialIndex.insert(cache[strUid])
      }
    },

    unIndexElement (uid) {
      let strUid = uid.toString()
      let cache = this.interactionManager.indexCache
      this.interactionManager.spatialIndex.remove(cache[strUid])
      delete cache[strUid]
    },

    cacheHasElement (uid) {
      let strUid = uid.toString()
      let cache = this.interactionManager.indexCache
      return cache.hasOwnProperty(strUid)
    },

    startListener (customListener) {
      if (customListener === 'click') {
        this.startClickListener(customListener)
      }
    },

    startClickListener (customListener) {
      if (!this.interactionManager.nativeListeners.click) {
        this.interactionManager.nativeListeners.click = true
        this.svg.addEventListener('click', e => this.handleListener(customListener, e))
      }
    },

    handleListener (customListener, e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let hits = collisionTest(coords, this.interactionManager.spatialIndex)

      for (let hit of hits) {
        hit.instance.$emit(customListener, e)
      }
    }
  },

  provide () {
    let $$interactionManager = this
    return { $$interactionManager }
  }
}

// https://stackoverflow.com/a/42711775/10573487
function getCoords (svg, svgPoint, { clientX, clientY }) {
  svgPoint.x = clientX
  svgPoint.y = clientY

  return svgPoint.matrixTransform(svg.getScreenCTM().inverse())
}
