import updateListenerTracker from './updateListenerTracker.js'
import findCentroid from '../../../geometry/findCentroid.js'

export default function (uid, type, coordinates, instance, cache, listenerTrackers) {
  let args = [coordinates]
  let hasnt = !cache.hasItem(uid)
  let nonIdentical = !cache.itemIsIdentical(uid, args)

  let listenerTracker = listenerTrackers.mousemove

  let oldItem

  if (!hasnt) {
    oldItem = cache.getItem(uid)
  }

  if (hasnt || nonIdentical) {
    let [x, y] = findCentroid(coordinates)
    let minX = x
    let maxX = x
    let minY = y
    let maxY = y

    let item = { uid, instance, minX, maxX, minY, maxY }

    updateListenerTracker(listenerTracker, oldItem, item)

    if (hasnt) {
      cache.addItem(uid, args, item)
    } else {
      cache.updateItem(uid, args, item)
    }
  }
}
