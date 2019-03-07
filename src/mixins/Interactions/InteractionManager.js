import rbush from 'rbush'
import ItemCache from './utils/ItemCache.js'
import cacheItem from './utils/cacheItem.js'
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
        listeners: {
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

        // This object keeps track of all indexed items
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
    // These three functions are exposed to the component
    addItem (uid, type, coordinates, instance, listeners) {
      let strUid = uid.toString()
      this._cacheItem(strUid, type, coordinates, instance, listeners)

      // let cache = this.interactionManager.itemCache
      // if (cache.hasOwnProperty(strUid)) {
      //   // If it is, see if it has changed
      //   let oldItem = cache[strUid]
      //   if (elementChanged(oldItem, item)) {
      //     // If it has, we remove the old item from the indices and cache
      //     this._unIndexItem(oldItem, listeners)
      //     delete cache[strUid]
      //
      //     // And then we add the new item back to the cache and indices
      //     cache[strUid] = item
      //     this._indexItem(item, strUid, listeners)
      //   }
      // } else {
      //   // If the item was not yet in the cache: add it
      //   cache[strUid] = item
      //   this._indexItem(strUid, listeners, item)
      // }
    },

    removeItem (uid, listeners) {

    },

    // These functions are all for internal use only
    _cacheItem (uid, type, coordinates, instance, listeners) {
      let itemCache = this.interactionManager.itemCache
      let spatialIndices = this.spatialIndices

      cacheItem(uid, type, coordinates, instance, itemCache, listeners, spatialIndices)
    },

    _indexItem (item, uid, listeners) {
      for (let customListener of listeners) {
        if (customListener === 'click') {
          this.interactionManager.spatialIndex.click.insert(item)
        }

        if (customListener === 'hover') {
          this.interactionManager.spatialIndex.mousemove.insert(item)
        }
      }
    },

    _unIndexItem (uid) {
      // let strUid = uid.toString()
      // let cache = this.interactionManager.itemCache
      // this.interactionManager.spatialIndex.remove(cache[strUid])
    },

    _updateListener (customListener) {
      if (customListener === 'click') {
        this.updateClickListener(customListener)
      }
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
