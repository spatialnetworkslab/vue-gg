// Returns the biggest polygon out of an array of polygons.
import calculateArea from './calculateArea.js'

export default function (polygons, type) {
  // We will just calculate the size of each polygon without holes.
  let currentHighestID
  let currentHighestArea = 0
  let area
  for (let subID in polygons) {
    area = calculateArea(polygons[subID], type)
    if (area > currentHighestArea) {
      currentHighestArea = area
      currentHighestID = subID
    }
  }
  return polygons[currentHighestID]
}
