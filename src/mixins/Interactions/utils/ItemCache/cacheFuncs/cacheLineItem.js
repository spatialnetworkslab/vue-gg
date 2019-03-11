import findBoundingBox from '../../geometry/findBoundingBox.js'
import { syncListeners, updateIndices } from './syncSpatialIndices.js'

export default function (uid, type, coordinates, instance, itemCache, listeners, selectable, spatialIndices) {
  let args = [coordinates, instance.strokeWidth]
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
    let geometry = {
      type,
      coordinates,
      strokeWidth: instance.strokeWidth,
      pathType: 'LineString'
    }

    let item = { uid, geometry, instance, minX, maxX, minY, maxY }

    updateIndices(spatialIndices, oldListeners, listeners, oldSelectable, selectable, oldItem, item)

    if (hasnt) {
      itemCache.addItem(uid, args, item, listeners, selectable)
    } else {
      itemCache.updateItem(uid, args, item, listeners, selectable)
    }
  } else {
    syncListeners(spatialIndices, oldListeners, listeners, oldSelectable, selectable, oldItem)
    itemCache.updateListeners(uid, listeners)
    itemCache.updateSelectable(uid, selectable)
  }
}
