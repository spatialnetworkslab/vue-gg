import findBoundingBox from '../../geometry/findBoundingBox.js'
import { syncListeners, updateIndices } from './syncSpatialIndices.js'

export default function (uid, type, coordinates, instance, itemCache, listeners, spatialIndices) {
  let args = [coordinates]
  let hasnt = !itemCache.hasItem(uid)
  let nonIdentical = !itemCache.itemIsIdentical(uid, args)

  let oldItem
  let oldListeners = {}

  if (!hasnt) {
    oldItem = itemCache.getItem(uid)
    oldListeners = itemCache.getListeners(uid)
  }

  if (hasnt || nonIdentical) {
    let { minX, minY, maxX, maxY } = findBoundingBox(coordinates)
    let geometry = { type, coordinates }

    let item = { uid, geometry, instance, minX, maxX, minY, maxY }

    updateIndices(spatialIndices, oldListeners, listeners, oldItem, item)

    if (hasnt) {
      itemCache.addItem(uid, args, item, listeners)
    } else {
      itemCache.updateItem(uid, args, item, listeners)
    }
  } else {
    syncListeners(spatialIndices, oldListeners, listeners, oldItem)
    itemCache.updateListeners(uid, listeners)
  }
}
