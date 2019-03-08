import rbush from 'rbush'
import ItemCache from './utils/ItemCache/ItemCache.js'
import cacheItem from './utils/ItemCache/cacheFuncs/cacheItem.js'
import collisionTest from './utils/collisionTest.js'

export default {
  data () {
    return {
      interactionManager: Object.freeze({
        // This object contains one spatial index per listener
        spatialIndices: {
          click: {
            bush: rbush(),
            active: false,
            trackedItems: 0,
            handler (e) { this._handleListener('click', e) }
          },
          mousemove: {
            bush: rbush(),
            active: false,
            trackedItems: 0,
            handler (e) { this._handleListener('mousemove', e) }
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
    addItem (_uid, type, coordinates, instance, events) {
      let uid = _uid.toString()
      this._cacheItem(uid, type, coordinates, instance, events)
    },

    removeItem (_uid) {
      let uid = _uid.toString()
      this._removeItem(uid)
    },

    // These functions are all for internal use only
    _cacheItem (uid, type, coordinates, instance, events) {
      let itemCache = this.interactionManager.itemCache
      let spatialIndices = this.interactionManager.spatialIndices

      cacheItem(uid, type, coordinates, instance, itemCache, events, spatialIndices)

      this._updateListeners()
    },

    _removeItem (uid) {
      let cache = this.interactionManager.itemCache
      let item = cache.getItem(uid)
      let listeners = cache.getListeners(uid)

      for (let listener in listeners) {
        let spatialIndex = this.spatialIndices[listener]
        spatialIndex.bush.remove(item)
        spatialIndex.trackedItems--
      }

      cache.deleteItem(uid)

      this._updateListeners()
    },

    _updateListeners () {
      for (let listener in this.interactionManager.spatialIndices) {
        let spatialIndex = this.interactionManager.spatialIndices[listener]

        if (spatialIndex.trackedItems === 0) {
          this.active = false
          this.svg.removeEventListener(listener, spatialIndex.handler)
        } else {
          if (this.active === false) {
            this.active = true
            this.svg.addEventListener(listener, spatialIndex.handler)
          }
        }
      }
    },

    _handleListener (listener, e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let hits = collisionTest(coords, this.interactionManager.spatialIndices[listener])

      for (let hit of hits) {
        let uid = hit.uid
        let events = this.interactionManager.itemCache.getListeners(uid)[listener]

        for (let event of events) {
          hit.instance.$emit(event, e)
        }
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
