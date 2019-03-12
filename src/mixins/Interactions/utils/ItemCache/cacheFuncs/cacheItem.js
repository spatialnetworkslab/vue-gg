import cachePointItem from './cachePointItem.js'
import cacheRectangleItem from './cacheRectangleItem.js'
import cacheLineItem from './cacheLineItem.js'
import cachePathItem from './cachePathItem.js'

export default function (uid, type, coordinates, instance, itemCache, events, listenerTrackers) {
  let listeners = getListeners(events)
  let selectable = isSelectable(events)

  if (['point', 'symbol'].includes(type)) {
    cachePointItem(uid, type, coordinates, instance, itemCache, listeners, selectable, listenerTrackers)
    return
  }

  if (type === 'rectangle') {
    cacheRectangleItem(uid, type, coordinates, instance, itemCache, listeners, selectable, listenerTrackers)
    return
  }

  if (type === 'line') {
    cacheLineItem(uid, type, coordinates, instance, itemCache, listeners, selectable, listenerTrackers)
    return
  }

  if (['polygon', 'multiline', 'path', 'area', 'trail'].includes(type)) {
    cachePathItem(uid, type, coordinates, instance, itemCache, listeners, selectable, listenerTrackers)
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
