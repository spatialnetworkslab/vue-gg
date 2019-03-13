import updateListenerTracker from './updateListenerTracker.js'
import findCentroidPath from '../../../geometry/findCentroidPath.js'

export default function (uid, type, coords, instance, cache, listenerTrackers) {
  let args = [coords]
  let hasnt = !cache.hasItem(uid)
  let nonIdentical = !cache.itemIsIdentical(uid, args)

  let listenerTracker = listenerTrackers.mousemove

  let oldItem

  if (!hasnt) {
    oldItem = cache.getItem(uid)
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

    let [x, y] = findCentroidPath(coordinates, pathType)
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
