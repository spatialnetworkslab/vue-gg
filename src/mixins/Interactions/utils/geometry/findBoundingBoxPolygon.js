import findBoundingBox from './findBoundingBox.js'

export default function (coordinates, polygonType) {
  if (polygonType === 'SimplePolygon') {
    return findBoundingBox(coordinates)
  }

  if (polygonType === 'Polygon') {
    return findBoundingBox(coordinates[0])
  }

  if (polygonType === 'MultiPolygon') {
    let bbox = findBoundingBox(coordinates[0][0])

    for (let i = 1; i < coordinates.length; i++) {
      let newBBox = findBoundingBox(coordinates[i][0])
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
