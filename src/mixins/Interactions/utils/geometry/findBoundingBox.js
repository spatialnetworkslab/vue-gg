export default function (coordinates) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (let pair of coordinates) {
    if (pair[0] < minX) { minX = pair[0] }
    if (pair[1] < minY) { minY = pair[1] }
    if (pair[0] > maxX) { maxX = pair[0] }
    if (pair[1] > maxY) { maxY = pair[1] }
  }
  return { minX, minY, maxX, maxY }
}
