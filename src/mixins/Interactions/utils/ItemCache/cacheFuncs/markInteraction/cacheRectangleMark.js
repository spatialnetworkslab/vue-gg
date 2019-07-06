import findBoundingBox from '../../../geometry/findBoundingBox.js'
import { syncListenerTrackers, updateListenerTrackers } from './syncListenerTrackers.js'

export default function (uid, type, coordinates, props, cache, eventsPerListener, listenerTrackers) {
  let args = [coordinates]
  let hasnt = !cache.hasItem(uid)
  let nonIdentical = !cache.itemIsIdentical(uid, args)

  let oldItem
  let oldListeners = {}

  if (!hasnt) {
    oldItem = cache.getItem(uid)
    oldListeners = cache.getListeners(uid)
  }

  if (hasnt || nonIdentical) {
    let { minX, minY, maxX, maxY } = findBoundingBox(coordinates)
    let geometry = { type, coordinates }

    let item = { uid, eventsPerListener, geometry, minX, maxX, minY, maxY }

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
