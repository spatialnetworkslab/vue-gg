import rbush from 'rbush'
// import debounce from 'lodash.debounce'

import ItemCache from './utils/ItemCache/ItemCache.js'
import cacheItem from './utils/ItemCache/cacheFuncs/cacheItem.js'
import removeItem from './utils/ItemCache/cacheFuncs/removeItem.js'
import collisionTest from './utils/collisionTest.js'
import getCoords from './utils/getCoords.js'

export default {
  data () {
    return {
      interactionManager: Object.freeze({
        // This object contains one spatial index per listener
        listenerTrackers: {
          click: {
            spatialIndex: rbush(),
            active: false,
            trackedItems: 0,

            handler: this._handleClickListener
          },

          mousemove: {
            spatialIndex: rbush(),
            active: false,
            trackedItems: 0,

            hovering: {},
            hoverItems: 0,

            selectableSpatialIndex: rbush(),
            trackedBrushes: 0,
            brushHandlers: {},
            trackedSelectables: 0,

            handler: this._handleMouseMoveListener
          },

          mousedown: {
            active: false,
            trackedBrushes: 0,
            brushHandlers: {},

            handler: this._handleMouseDownListener
          },

          mouseup: {
            active: false,
            trackedBrushes: 0,
            brushHandlers: {},

            handler: this._handleMouseUpListener
          }
        },

        // This object caches and keeps track of all indexed marks.
        // Mark interaction (mouseover, hover, click etc) are mostly handled
        // in this mixin.
        markCache: new ItemCache(),

        // We use a separate one for selectables, because of different indexing
        // requirements (for selection, you only need to index the centroid of a polygon,
        // for example). These are mostly handled in the appropriate Brushable mixin.
        selectableCache: new ItemCache()
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
    let listenerTrackers = this.interactionManager.listenerTrackers
    for (let listenerName in listenerTrackers) {
      listenerTrackers[listenerName].handler.bind(this)
    }
  },

  methods: {
    // These functions are exposed to other components
    addItem (uid, type, coordinates, instance, events, parentSectionChain) {
      this._cacheItem(uid, type, coordinates, instance, events, parentSectionChain)
    },

    removeItem (uid) {
      this._removeItem(uid)
    },

    addBrush (uid, handlers) {
      for (let listener of ['mousedown', 'mousemove', 'mouseup']) {
        let listenerTracker = this.interactionManager.listenerTrackers[listener]
        listenerTracker.trackedBrushes++
        listenerTracker.brushHandlers[uid] = handlers[listener]
      }

      this._updateListeners()
    },

    removeBrush (uid) {
      for (let listener of ['mousedown', 'mousemove', 'mouseup']) {
        let listenerTracker = this.interactionManager.listenerTrackers[listener]
        listenerTracker.trackedBrushes--
        delete listenerTracker.brushHandlers[uid]
      }

      this._updateListeners()
    },

    // These functions are all for internal use only
    _cacheItem (uid, type, coordinates, instance, events, parentSectionChain) {
      let markCache = this.interactionManager.markCache
      let selectableCache = this.interactionManager.selectableCache
      let listenerTrackers = this.interactionManager.listenerTrackers

      cacheItem(uid, type, coordinates, instance, markCache, selectableCache, events, listenerTrackers, parentSectionChain)

      this._updateListeners()
    },

    _removeItem (uid) {
      let markCache = this.interactionManager.markCache
      let selectableCache = this.interactionManager.selectableCache
      let listenerTrackers = this.interactionManager.listenerTrackers

      removeItem(uid, markCache, selectableCache, listenerTrackers)

      this._updateListeners()
    },

    _updateListeners () {
      for (let listener in this.interactionManager.listenerTrackers) {
        let listenerTracker = this.interactionManager.listenerTrackers[listener]

        let trackedItems = listenerTracker.trackedItems || 0
        let trackedBrushes = listenerTracker.trackedBrushes || 0
        let trackedSelectables = listenerTracker.trackedSelectables || 0

        if (trackedItems === 0 && trackedBrushes === 0 && trackedSelectables === 0) {
          let handler = listenerTracker.handler.bind(this)
          listenerTracker.active = false
          this.svg.removeEventListener(listener, handler)
        } else {
          if (listenerTracker.active === false) {
            let handler = listenerTracker.handler.bind(this)
            listenerTracker.active = true
            this.svg.addEventListener(listener, handler)
          }
        }
      }
    },

    _handleClickListener (e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let listenerTracker = this.interactionManager.listenerTrackers['click']
      let hits = collisionTest(coords, listenerTracker.spatialIndex)

      for (let hit of hits) {
        let uid = hit.uid

        let events = this.interactionManager.markCache.getListeners(uid)['click']

        for (let event of events) {
          hit.instance.$emit(event, e)
        }
      }
    },

    _handleMouseMoveListener (e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let listenerTracker = this.interactionManager.listenerTrackers['mousemove']

      if (listenerTracker.trackedItems !== 0) {
        this._handleMouseMoveMarks(coords, e)
      }

      if (listenerTracker.trackedBrushes !== 0) {
        for (let sectionID in listenerTracker.brushHandlers) {
          let handler = listenerTracker.brushHandlers[sectionID]
          handler(coords, e)
        }
      }
    },

    _handleMouseMoveMarks (coords, e) {
      let listenerTracker = this.interactionManager.listenerTrackers['mousemove']
      let hits = collisionTest(coords, listenerTracker.spatialIndex)

      let newHits = {}

      // First we check if we have new hits (hover, mouseover)
      for (let hit of hits) {
        let uid = hit.uid
        newHits[uid] = true

        // If this was already a hit, we do nothing
        if (!listenerTracker.hovering[uid]) {
          listenerTracker.hovering[uid] = true
          listenerTracker.hoverItems++

          let events = this.interactionManager.markCache.getListeners(uid)['mousemove']

          for (let event of events) {
            if (event === 'mouseover' || event === 'hover') {
              hit.instance.$emit(event, e)
            }
          }
        }
      }

      // Second, we check if some things that were previous hits, are now not
      // hits anymore (mouseout)
      for (let uid in listenerTracker.hovering) {
        if (!newHits[uid]) {
          let cache = this.interactionManager.markCache
          let events = cache.getListeners(uid)['mousemove']
          let instance = cache.getItem(uid).instance

          for (let event of events) {
            if (event === 'mouseout') {
              instance.$emit('mouseout', e)
            }
          }

          // If this is the last one, and it is just about to be deleted:
          // emit 'null'
          if (listenerTracker.hoverItems === 1) {
            instance.$emit('hover', null)
          }

          delete listenerTracker.hovering[uid]
          listenerTracker.hoverItems--
        }
      }
    },

    _handleMouseDownListener (e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let listenerTracker = this.interactionManager.listenerTrackers['mousedown']

      for (let sectionID in listenerTracker.brushHandlers) {
        let handler = listenerTracker.brushHandlers[sectionID]
        handler(coords, e)
      }
    },

    _handleMouseUpListener (e) {
      let coords = getCoords(this.svg, this.svgPoint, e)
      let listenerTracker = this.interactionManager.listenerTrackers['mouseup']

      for (let sectionID in listenerTracker.brushHandlers) {
        let handler = listenerTracker.brushHandlers[sectionID]
        handler(coords, e)
      }
    }
  },

  provide () {
    let $$interactionManager = this
    return { $$interactionManager }
  }
}
