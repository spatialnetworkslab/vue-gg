export default function (listenerTracker, oldItem, newItem) {
  if (oldItem) {
    listenerTracker.selectableSpatialIndex.remove(oldItem)
    listenerTracker.trackedSelectables--
  }

  listenerTracker.selectableSpatialIndex.insert(newItem)
  listenerTracker.trackedSelectables++
}
