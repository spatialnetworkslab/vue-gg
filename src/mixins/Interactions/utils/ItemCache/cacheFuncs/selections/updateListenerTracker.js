export default function (listenerTrackers, oldItem, newItem) {
  let listenerTracker = listenerTrackers.mousemove
  listenerTracker.spatialIndex.remove(oldItem)
  listenerTracker.trackedItems--

  listenerTracker.spatialIndex.insert(newItem)
  listenerTracker.trackedItems++
}
