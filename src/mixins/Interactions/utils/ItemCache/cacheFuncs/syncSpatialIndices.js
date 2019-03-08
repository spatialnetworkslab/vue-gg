// This one is used if the item has been updated
export function updateIndices (spatialIndices, oldListeners, newListeners, oldItem, newItem) {
  for (let listener in oldListeners) {
    let spatialIndex = spatialIndices[listener]
    spatialIndex.bush.remove(oldItem)
    spatialIndex.trackedItems--
  }

  for (let listener in newListeners) {
    let spatialIndex = spatialIndices[listener]
    spatialIndex.bush.insert(newItem)
    spatialIndex.trackedItems++
  }
}

// This one is used if the item stays the same
export function syncListeners (spatialIndices, oldListeners, newListeners, item) {
  // If the listeners have stayed the same, we don't need to do anything
  if (sameListeners(oldListeners, newListeners)) { return }

  // If the listeners have changed, we will remove the old ones and add the new ones
  for (let listener in oldListeners) {
    let spatialIndex = spatialIndices[listener]
    spatialIndex.bush.remove(item)
    spatialIndex.trackedItems--
  }

  for (let listener in newListeners) {
    let spatialIndex = spatialIndices[listener]
    spatialIndex.bush.insert(item)
    spatialIndex.trackedItems++
  }
}

function sameListeners (oldObj, newObj) {
  if (Object.keys(oldObj).length !== Object.keys(newObj).length) { return false }

  for (let key in oldObj) {
    if (!newObj.hasOwnProperty(key)) { return false }
    if (!sameArrays(oldObj[key], newObj[key])) { return false }
  }

  return true
}

// https://stackoverflow.com/a/43478439/10573487
function sameArrays (_oldArr, _newArr) {
  if (_oldArr.length !== _newArr.length) { return false }

  let oldArr = _oldArr.sort()
  let newArr = _newArr.sort()

  for (let i = 0; i < oldArr.length; i++) {
    if (oldArr[i] !== newArr[i]) {
      return false
    }
  }

  return true
}
