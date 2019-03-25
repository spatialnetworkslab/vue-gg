export default function (uid, type, coordinates, instance, cache, listeners, listenerTrackers) {
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
  if (type === 'point') { radius = instance.radius }
  if (type === 'symbol') { radius = instance.size / 2 }

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

  let item = { uid, geometry, instance, minX, maxX, minY, maxY }

  cache.addItem(uid, [], item, listeners)

  for (let listener in listeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.insert(item)
    listenerTracker.trackedItems++
  }
}
