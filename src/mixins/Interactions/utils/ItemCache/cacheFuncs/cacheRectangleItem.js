import findBoundingBox from '../../geometry/findBoundingBox.js'
import { syncListenerTrackers, updateListenerTrackers } from './syncListenerTrackers.js'

export default function (uid, type, coordinates, instance, itemCache, listeners, selectable, listenerTrackers) {
  let args = [coordinates]
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
    let { minX, minY, maxX, maxY } = findBoundingBox(coordinates)
    let geometry = { type, coordinates }

    let item = { uid, geometry, instance, minX, maxX, minY, maxY }

    updateListenerTrackers(listenerTrackers, oldListeners, listeners, oldSelectable, selectable, oldItem, item)

    if (hasnt) {
      itemCache.addItem(uid, args, item, listeners, selectable)
    } else {
      itemCache.updateItem(uid, args, item, listeners, selectable)
    }
  } else {
    syncListenerTrackers(listenerTrackers, oldListeners, listeners, oldSelectable, selectable, oldItem)
    itemCache.updateListeners(uid, listeners)
    itemCache.updateSelectable(uid, listeners)
  }
}
