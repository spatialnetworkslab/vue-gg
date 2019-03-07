import rbush from 'rbush'
import ItemCache from './utils/ItemCache/ItemCache.js'
import cacheItem from './utils/ItemCache/cacheFuncs/cacheItem.js'
import collisionTest from './utils/collisionTest.js'

export default {
  data () {
    return {
      interactionManager: Object.freeze({
        // This object contains one spatial index per native event listener
        spatialIndices: {
          click: rbush(),
          mousemove: rbush()
        },

        // This object keeps track of which native listeners are active,
        // and how many items they are tracking
        nativeListeners: {
          click: {
            active: false,
            trackedItems: 0
          },
          mousemove: {
            active: false,
            trackedItems: 0,
            last: null
          }
        },

        // This object caches and keeps track of all indexed items
        itemCache: new ItemCache()
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
    // These two functions are exposed to the component
    addItem (_uid, type, coordinates, instance, listeners) {
      let uid = _uid.toString()
      this._cacheItem(uid, type, coordinates, instance, listeners)
    },

    removeItem (_uid) {
      let uid = _uid.toString()
      this._removeItem(uid)
    },

    // These functions are all for internal use only
    _cacheItem (uid, type, coordinates, instance, listeners) {
      let itemCache = this.interactionManager.itemCache
      let spatialIndices = this.spatialIndices

      cacheItem(uid, type, coordinates, instance, itemCache, listeners, spatialIndices)
    },

    _removeItem (uid) {
      // TODO
    },

    _updateClickListener (customListener) {
      let clickListener = this.interactionManager.listeners.click
      if (!clickListener.active) {
        clickListener.active = true
        this.svg.addEventListener('click', e => this.handleListener(customListener, e))
      }
    },

    _handleListener (customListener, e) {
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
