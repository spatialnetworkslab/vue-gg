export default function (uid, type, coordinates, instance, itemCache, listeners, selectable, spatialIndices) {
  // The point calculation is so fast that the cache logic is probably slower.
  // So we will just always update the point
  if (itemCache.hasItem(uid)) {
    let item = itemCache.getItem(uid)
    let oldListeners = itemCache.getListeners(uid)
    let oldSelectable = itemCache.getSelectable(uid)

    for (let listener in oldListeners) {
      let spatialIndex = spatialIndices[listener]
      spatialIndex.bush.remove(item)
      spatialIndex.trackedItems--
    }

    if (oldSelectable) {
      let spatialIndex = spatialIndices.mousemove
      spatialIndex.selectableBush.remove(item)
      spatialIndex.trackedSelectables--
    }

    itemCache.deleteItem(uid)
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

  itemCache.addItem(uid, [], item, listeners)

  for (let listener in listeners) {
    let spatialIndex = spatialIndices[listener]
    spatialIndex.bush.insert(item)
    spatialIndex.trackedItems++
  }

  if (selectable) {
    let spatialIndex = spatialIndices.mousemove
    spatialIndex.selectableBush.insert(item)
    spatialIndex.trackedSelectables++
  }
}
