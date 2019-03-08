import rbush from 'rbush'
import debounce from 'lodash.debounce'

import ItemCache from './utils/ItemCache/ItemCache.js'
import cacheItem from './utils/ItemCache/cacheFuncs/cacheItem.js'
import collisionTest from './utils/collisionTest.js'
import getCoords from './utils/getCoords.js'

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
            handler (e) { this._handleClickListener(e) }
          },
          mousemove: {
            bush: rbush(),
            active: false,
            trackedItems: 0,
            handler (e) { debounce(this._handleMouseMoveListener, 25)(e) },
            hovering: {},
            hoverItems: 0
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

  mounted () {
    let spatialIndices = this.interactionManager.spatialIndices
    for (let listener in spatialIndices) {
      spatialIndices[listener].handler.bind(this)
    }
  },

  methods: {
    // These two functions are exposed to the component
    addItem (uid, type, coordinates, instance, events) {
      this._cacheItem(uid, type, coordinates, instance, events)
    },

    removeItem (uid) {
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
        let spatialIndex = this.interactionManager.spatialIndices[listener]
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
          let handler = spatialIndex.handler.bind(this)
          spatialIndex.active = false
          this.svg.removeEventListener(listener, handler)
        } else {
          if (spatialIndex.active === false) {
            let handler = spatialIndex.handler.bind(this)
            spatialIndex.active = true
            this.svg.addEventListener(listener, handler)
          }
        }
      }
    },

    _handleClickListener (e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let spatialIndex = this.interactionManager.spatialIndices['click']
      let hits = collisionTest(coords, spatialIndex)

      for (let hit of hits) {
        let uid = hit.uid

        let events = this.interactionManager.itemCache.getListeners(uid)['click']

        for (let event of events) {
          hit.instance.$emit(event, e)
        }
      }
    },

    _handleMouseMoveListener (e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let spatialIndex = this.interactionManager.spatialIndices['mousemove']
      let hits = collisionTest(coords, spatialIndex)

      let newHits = {}

      // First we check if we have new hits (hover, mouseover)
      for (let hit of hits) {
        let uid = hit.uid
        newHits[uid] = true

        // If this was already a hit, we do nothing
        if (!spatialIndex.hovering[uid]) {
          spatialIndex.hovering[uid] = true
          spatialIndex.hoverItems++

          let events = this.interactionManager.itemCache.getListeners(uid)['mousemove']

          for (let event of events) {
            if (event === 'mouseover' || event === 'hover') {
              hit.instance.$emit(event, e)
            }
          }
        }
      }

      // Second, we check if some things that were previous hits, are now not
      // hits anymore (mouseout)
      for (let uid in spatialIndex.hovering) {
        if (!newHits[uid]) {
          let cache = this.interactionManager.itemCache
          let events = cache.getListeners(uid)['mousemove']
          let instance = cache.getItem(uid).instance

          for (let event of events) {
            if (event === 'mouseout') {
              instance.$emit('mouseout', e)
            }
          }

          // If this is the last one, and it is just about to be deleted:
          // emit 'null'
          if (spatialIndex.hoverItems === 1) {
            instance.$emit('hover', null)
          }

          delete spatialIndex.hovering[uid]
          spatialIndex.hoverItems--
        }
      }
    }
  },

  provide () {
    let $$interactionManager = this
    return { $$interactionManager }
  }
}
