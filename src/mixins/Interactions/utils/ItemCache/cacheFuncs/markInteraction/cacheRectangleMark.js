import findBoundingBox from '../../../geometry/findBoundingBox.js'
import { syncListenerTrackers, updateListenerTrackers } from './syncListenerTrackers.js'

export default function (uid, type, coordinates, instance, cache, listeners, listenerTrackers) {
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

    let item = { uid, geometry, instance, minX, maxX, minY, maxY }

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
