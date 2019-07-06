export default function (uid, type, coordinates, cache, events, listenerTrackers, parentSectionChain) {
  let listenerTracker = listenerTrackers.mousemove

  if (cache.hasItem(uid)) {
    let item = cache.getItem(uid)
    listenerTracker.selectableSpatialIndex.remove(item)
    listenerTracker.trackedSelectables--

    cache.deleteItem(uid)
  }

  let minX = coordinates[0]
  let maxX = coordinates[0]
  let minY = coordinates[1]
  let maxY = coordinates[1]

  let item = { uid, events, minX, maxX, minY, maxY, parentSectionChain }

  cache.addItem(uid, [], item)

  listenerTracker.selectableSpatialIndex.insert(item)
  listenerTracker.trackedSelectables++
}
