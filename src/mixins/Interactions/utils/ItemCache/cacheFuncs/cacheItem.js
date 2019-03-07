import cachePointItem from './cachePointItem.js'
import cacheRectangleItem from './cacheRectangleItem.js'
import cacheLineItem from './cacheLineItem.js'
import cachePathItem from './cachePathItem.js'

export default function (uid, type, coordinates, instance, itemCache, listeners, spatialIndices) {
  let nativeListeners = getNativeListeners(listeners)

  if (['point', 'symbol'].includes(type)) {
    cachePointItem(uid, type, coordinates, instance, itemCache, nativeListeners, spatialIndices)
    return
  }

  if (type === 'rectangle') {
    cacheRectangleItem(uid, type, coordinates, instance, itemCache, nativeListeners, spatialIndices)
    return
  }

  if (type === 'line') {
    cacheLineItem(uid, type, coordinates, instance, itemCache, nativeListeners, spatialIndices)
    return
  }

  if (['polygon', 'multiline', 'path', 'area', 'trail'].includes(type)) {
    cachePathItem(uid, type, coordinates, instance, itemCache, nativeListeners, spatialIndices)
  }
}

const nativeLookup = {
  click: 'click',
  hover: 'mousemove'
}

function getNativeListeners (listeners) {
  let nativeListeners = {}

  for (let listener of listeners) {
    let nativeListener = nativeLookup[listener]
    if (nativeListener) {
      nativeListeners[nativeListener] = nativeListeners[nativeListener] || []
      nativeListeners[nativeListener].push(listener)
    }
  }

  return nativeListeners
}
