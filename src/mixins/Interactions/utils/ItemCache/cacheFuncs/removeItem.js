export default function (uid, markCache, selectableCache, listenerTrackers) {
  if (markCache.hasItem(uid)) {
    let item = markCache.getItem(uid)
    let listeners = markCache.getListeners(uid)

    for (let listener in listeners) {
      let listenerTracker = listenerTrackers[listener]
      listenerTracker.spatialIndex.remove(item)
      listenerTracker.trackedItems--
    }

    markCache.deleteItem(uid)
  }

  if (selectableCache.hasItem(uid)) {
    let item = selectableCache.getItem(uid)

    let listenerTracker = listenerTrackers.mousemove
    listenerTracker.selectableSpatialIndex.remove(item)
    listenerTracker.trackedSelectables--

    selectableCache.deleteItem(uid)
  }
}
