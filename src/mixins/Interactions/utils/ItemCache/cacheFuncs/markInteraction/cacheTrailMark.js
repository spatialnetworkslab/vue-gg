import findBoundingBoxPath from '../../../geometry/findBoundingBoxPath.js'
import { syncListenerTrackers, updateListenerTrackers } from './syncListenerTrackers.js'

export default function (uid, type, coords, props, cache, listeners, listenerTrackers) {
  let args = [coords]
  let hasnt = !cache.hasItem(uid)
  let nonIdentical = !cache.itemIsIdentical(uid, args)

  let oldItem
  let oldListeners = {}

  if (!hasnt) {
    oldItem = cache.getItem(uid)
    oldListeners = cache.getListeners(uid)
  }

  if (hasnt || nonIdentical) {
    let coordinates = coords.map(c => c.coord)
    let pathType = 'LineString'

    let { minX, minY, maxX, maxY } = findBoundingBoxPath(coordinates, pathType)
    let geometry = {
      type,
      coordinates: coords,
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
