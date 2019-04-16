import findBoundingBoxPath from '../../../geometry/findBoundingBoxPath.js'
import { syncListenerTrackers, updateListenerTrackers } from './syncListenerTrackers.js'

export default function (uid, type, coords, props, cache, listeners, listenerTrackers) {
  let args = [coords, props.strokeWidth]
  let hasnt = !cache.hasItem(uid)
  let nonIdentical = !cache.itemIsIdentical(uid, args)

  let oldItem
  let oldListeners = {}

  if (!hasnt) {
    oldItem = cache.getItem(uid)
    oldListeners = cache.getListeners(uid)
  }

  if (hasnt || nonIdentical) {
    let coordinates
    let pathType

    if (coords.constructor === Object && coords.hasOwnProperty('type')) {
      // If we are dealing with a GeoJSON geometry
      coordinates = coords.coordinates
      pathType = coords.type
    } else {
      // If we are dealing with our own, simple polygon coordinates
      coordinates = coords

      if (['multiline', 'path'].includes(type)) {
        pathType = 'LineString'
      }

      if (['polygon', 'area'].includes(type)) {
        pathType = 'SimplePolygon'
      }
    }

    let { minX, minY, maxX, maxY } = findBoundingBoxPath(coordinates, pathType)
    let geometry = {
      type,
      coordinates,
      strokeWidth: props.strokeWidth,
      pathType
    }

    let item = { uid, geometry, minX, minY, maxX, maxY }

    updateListenerTrackers(listenerTrackers, oldListeners, listeners, oldItem, item)

    if (hasnt) {
      cache.addItem(uid, args, item, listeners)
    } else {
      cache.updateItem(uid, args, item, listeners)
    }
  } else {
    syncListenerTrackers(listenerTrackers, oldListeners, listeners, oldItem)
    cache.updateListeners(uid, listeners)
  }
}
