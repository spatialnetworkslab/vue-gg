// This one is used if the item has been updated
export function updateIndices (spatialIndices, oldListeners, newListeners, oldSelectable, newSelectable, oldItem, newItem) {
  for (let listener in oldListeners) {
    let spatialIndex = spatialIndices[listener]
    spatialIndex.bush.remove(oldItem)
    spatialIndex.trackedItems--
  }

  if (oldSelectable) {
    let spatialIndex = spatialIndices.mousemove
    spatialIndex.selectableBush.remove(oldItem)
    spatialIndex.trackedSelectables--
  }

  for (let listener in newListeners) {
    let spatialIndex = spatialIndices[listener]
    spatialIndex.bush.insert(newItem)
    spatialIndex.trackedItems++
  }

  if (newSelectable) {
    let spatialIndex = spatialIndices.mousemove
    spatialIndex.selectableBush.insert(newItem)
    spatialIndex.trackedSelectables++
  }
}

// This one is used if the item stays the same
export function syncListeners (spatialIndices, oldListeners, newListeners, oldSelectable, newSelectable, item) {
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

  for (let listener in newListeners) {
    let spatialIndex = spatialIndices[listener]
    spatialIndex.bush.insert(item)
    spatialIndex.trackedItems++
  }

  if (newSelectable) {
    let spatialIndex = spatialIndices.mousemove
    spatialIndex.selectableBush.insert(item)
    spatialIndex.trackedSelectables++
  }
}
