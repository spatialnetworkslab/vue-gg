import cachePointMark from './markInteraction/cachePointMark.js'
import cacheRectangleMark from './markInteraction/cacheRectangleMark.js'
import cacheLineMark from './markInteraction/cacheLineMark.js'
import cachePathMark from './markInteraction/cachePathMark.js'

import cachePointSelectable from './selections/cachePointSelectable.js'
import cacheRectangleSelectable from './selections/cacheRectangleSelectable.js'
import cacheLineSelectable from './selections/cacheLineSelectable.js'
import cachePathSelectable from './selections/cachePathSelectable.js'

export default function (uid, type, coordinates, instance, markCache, selectableCache, events, listenerTrackers) {
  let listeners = getListeners(events)
  let selectable = isSelectable(events)

  if (['point', 'symbol'].includes(type)) {
    if (events.length > 0) {
      cachePointMark(uid, type, coordinates, instance, markCache, listeners, listenerTrackers)
    }

    if (selectable) {
      cachePointSelectable(uid, type, coordinates, instance, selectableCache, listenerTrackers)
    }
  }

  if (type === 'rectangle') {
    if (events.length > 0) {
      cacheRectangleMark(uid, type, coordinates, instance, markCache, listeners, listenerTrackers)
    }

    if (selectable) {
      cacheRectangleSelectable(uid, type, coordinates, instance, selectableCache, listenerTrackers)
    }
  }

  if (type === 'line') {
    if (events.length > 0) {
      cacheLineMark(uid, type, coordinates, instance, markCache, listeners, listenerTrackers)
    }

    if (selectable) {
      cacheLineSelectable(uid, type, coordinates, instance, selectableCache, listenerTrackers)
    }
  }

  if (['polygon', 'multiline', 'path', 'area', 'trail'].includes(type)) {
    if (events.length > 0) {
      cachePathMark(uid, type, coordinates, instance, markCache, listeners, listenerTrackers)
    }

    if (selectable) {
      cachePathSelectable(uid, type, coordinates, instance, selectableCache, listenerTrackers)
    }
  }
}

const listenerLookup = {
  click: 'click',
  hover: 'mousemove',
  mouseover: 'mousemove',
  mouseout: 'mousemove'
}

const selectEvents = ['select', 'unselect']

// Creates an object with listeners (click, mousemove) as keys, and arrays of
// events (click, hover, mouseenter, mouseout...) as values.
// Used to trigger the appriopriate events when the listeners register a collision
function getListeners (events) {
  let listeners = {}

  for (let event of events) {
    let listener = listenerLookup[event]
    if (listener) {
      listeners[listener] = listeners[listener] || []
      listeners[listener].push(event)
    }
  }

  return listeners
}

function isSelectable (events) {
  for (let event of selectEvents) {
    if (events.includes(event)) { return true }
  }
  return false
}
