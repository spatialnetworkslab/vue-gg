// This one is used if the item has been updated
export function updateListenerTrackers (listenerTrackers, oldListeners, newListeners, oldSelectable, newSelectable, oldItem, newItem) {
  for (let listener in oldListeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.remove(oldItem)
    listenerTracker.trackedItems--
  }

  if (oldSelectable) {
    let listenerTracker = listenerTrackers.mousemove
    listenerTracker.selectableSpatialIndex.remove(oldItem)
    listenerTracker.trackedSelectables--
  }

  for (let listener in newListeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.insert(newItem)
    listenerTracker.trackedItems++
  }

  if (newSelectable) {
    let listenerTracker = listenerTrackers.mousemove
    listenerTracker.selectableSpatialIndex.insert(newItem)
    listenerTracker.trackedSelectables++
  }
}

// This one is used if the item stays the same
export function syncListenerTrackers (listenerTrackers, oldListeners, newListeners, oldSelectable, newSelectable, item) {
  for (let listener in oldListeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.remove(item)
    listenerTracker.trackedItems--
  }

  if (oldSelectable) {
    let listenerTracker = listenerTrackers.mousemove
    listenerTracker.selectableSpatialIndex.remove(item)
    listenerTracker.trackedSelectables--
  }

  for (let listener in newListeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.insert(item)
    listenerTracker.trackedItems++
  }

  if (newSelectable) {
    let listenerTracker = listenerTrackers.mousemove
    listenerTracker.selectableSpatialIndex.insert(item)
    listenerTracker.trackedSelectables++
  }
}
