import findBoundingBoxPath from '../../../geometry/findBoundingBoxPath.js'
import { syncListenerTrackers, updateListenerTrackers } from './syncListenerTrackers.js'

export default function (uid, type, coords, props, cache, eventsPerListener, listenerTrackers) {
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

    let item = { uid, eventsPerListener, geometry, minX, minY, maxX, maxY }

    updateListenerTrackers(listenerTrackers, oldListeners, eventsPerListener, oldItem, item)

    if (hasnt) {
      cache.addItem(uid, args, item, eventsPerListener)
    } else {
      cache.updateItem(uid, args, item, eventsPerListener)
    }
  } else {
    syncListenerTrackers(listenerTrackers, oldListeners, eventsPerListener, oldItem)
    cache.updateListeners(uid, eventsPerListener)
  }
}
