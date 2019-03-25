const bboxKeys = ['minX', 'minY', 'maxX', 'maxY']

export default function (oldItem, newItem) {
  for (let key of bboxKeys) {
    if (oldItem[key] !== newItem[key]) {
      return true
    }
  }

  if (JSON.stringify(oldItem.geometry) !== JSON.stringify(newItem.geometry)) {
    return true
  }

  return false
}
