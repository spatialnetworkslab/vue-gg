export default function (uid, type, coordinates, props, cache, eventsPerListener, listenerTrackers) {
  // The point calculation is so fast that the cache logic is probably slower.
  // So we will just always update the point
  if (cache.hasItem(uid)) {
    let item = cache.getItem(uid)
    let oldListeners = cache.getListeners(uid)

    for (let listener in oldListeners) {
      let listenerTracker = listenerTrackers[listener]
      listenerTracker.spatialIndex.remove(item)
      listenerTracker.trackedItems--
    }

    cache.deleteItem(uid)
  }

  let radius
  if (type === 'point') { radius = props.radius }
  if (type === 'symbol') { radius = props.size / 2 }

  let minX = coordinates[0] - radius
  let maxX = coordinates[0] + radius
  let minY = coordinates[1] - radius
  let maxY = coordinates[1] + radius

  let geometry = {
    x: coordinates[0],
    y: coordinates[1],
    radius,
    type
  }

  let item = { uid, eventsPerListener, geometry, minX, maxX, minY, maxY }

  cache.addItem(uid, [], item, eventsPerListener)

  for (let listener in eventsPerListener) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.insert(item)
    listenerTracker.trackedItems++
  }
}
