import findBoundingBoxPath from '../../geometry/findBoundingBoxPath.js'
import { syncListenerTrackers, updateListenerTrackers } from './syncListenerTrackers.js'

export default function (uid, type, coords, instance, itemCache, listeners, selectable, listenerTrackers) {
  let args = [coords, instance.strokeWidth]
  let hasnt = !itemCache.hasItem(uid)
  let nonIdentical = !itemCache.itemIsIdentical(uid, args)

  let oldItem
  let oldListeners = {}
  let oldSelectable = false

  if (!hasnt) {
    oldItem = itemCache.getItem(uid)
    oldListeners = itemCache.getListeners(uid)
    oldSelectable = itemCache.getSelectable(uid)
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

      if (['polygon', 'area', 'trail'].includes(type)) {
        pathType = 'SimplePolygon'
      }
    }

    let { minX, minY, maxX, maxY } = findBoundingBoxPath(coordinates, pathType)
    let geometry = {
      type,
      coordinates,
      strokeWidth: instance.strokeWidth,
      pathType
    }

    let item = { uid, geometry, instance, minX, minY, maxX, maxY }

    updateListenerTrackers(listenerTrackers, oldListeners, listeners, oldSelectable, selectable, oldItem, item)

    if (hasnt) {
      itemCache.addItem(uid, args, item, listeners, selectable)
    } else {
      itemCache.updateItem(uid, args, item, listeners, selectable)
    }
  } else {
    syncListenerTrackers(listenerTrackers, oldListeners, listeners, oldSelectable, selectable, oldItem)
    itemCache.updateListeners(uid, listeners)
    itemCache.updateSelectable(uid, selectable)
  }
}
