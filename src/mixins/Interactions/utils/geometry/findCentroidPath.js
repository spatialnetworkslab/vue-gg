import biggestArea from './biggestArea.js'
import findCentroid from './findCentroid.js'

export default function (coordinates, pathType) {
  // Polygon types
  if (pathType === 'SimplePolygon') {
    return findCentroid(coordinates)
  }

  if (pathType === 'Polygon') {
    return findCentroid(coordinates[0]) // We'll just ignore holes
  }

  if (pathType === 'MultiPolygon') {
    // We will take the coordinates of the largest polygon.
    // Alternatively, we could calculate one centroid for each sub polygon,
    // weigh those by area, and calculate the point of gravity of those.
    return findCentroid(biggestArea(coordinates, 'polygon')[0])
  }

  // Multiline types
  if (pathType === 'LineString') {
    return findCentroid(coordinates)
  }

  if (pathType === 'MultiLineString') {
    return findCentroid(biggestArea(coordinates, 'line'))
  }
}
