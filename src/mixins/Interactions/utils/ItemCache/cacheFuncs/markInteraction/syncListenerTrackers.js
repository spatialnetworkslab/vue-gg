// This one is used if the item has been updated
export function updateListenerTrackers (listenerTrackers, oldListeners, newListeners, oldItem, newItem) {
  for (let listener in oldListeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.remove(oldItem)
    listenerTracker.trackedItems--
  }

  for (let listener in newListeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.insert(newItem)
    listenerTracker.trackedItems++
  }
}

// This one is used if the item stays the same
export function syncListenerTrackers (listenerTrackers, oldListeners, newListeners, item) {
  for (let listener in oldListeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.remove(item)
    listenerTracker.trackedItems--
  }

  for (let listener in newListeners) {
    let listenerTracker = listenerTrackers[listener]
    listenerTracker.spatialIndex.insert(item)
    listenerTracker.trackedItems++
  }
}
