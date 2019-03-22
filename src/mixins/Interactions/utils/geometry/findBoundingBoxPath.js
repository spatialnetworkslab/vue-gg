import findBoundingBox from './findBoundingBox.js'

export default function (coordinates, pathType) {
  // Polygon types
  if (pathType === 'SimplePolygon') {
    return findBoundingBox(coordinates)
  }

  if (pathType === 'Polygon') {
    return findBoundingBox(coordinates[0])
  }

  if (pathType === 'MultiPolygon') {
    let bbox = findBoundingBox(coordinates[0][0])

    for (let i = 1; i < coordinates.length; i++) {
      let newBBox = findBoundingBox(coordinates[i][0])
      bbox = updateBBox(bbox, newBBox)
    }

    return bbox
  }

  // MultiLine types
  if (pathType === 'LineString') {
    return findBoundingBox(coordinates)
  }

  if (pathType === 'MultiLineString') {
    let bbox = findBoundingBox(coordinates[0])

    for (let i = 1; i < coordinates.length; i++) {
      let newBBox = findBoundingBox(coordinates[i])
      bbox = updateBBox(bbox, newBBox)
    }

    return bbox
  }
}

function updateBBox (o, n) {
  return {
    minX: o.minX < n.minX ? o.minX : n.minX,
    minY: o.minY < n.minY ? o.minY : n.minY,
    maxX: o.maxX > n.maxX ? o.maxX : n.maxX,
    maxY: o.maxY > n.maxY ? o.maxY : n.maxY
  }
}
