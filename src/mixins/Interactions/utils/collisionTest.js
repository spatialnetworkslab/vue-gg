import pointInPolygon from './geometry/pointInPolygon.js'
import biggestArea from './geometry/biggestArea.js'
import pointDistance from './geometry/pointDistance.js'
import lineIntersection from './geometry/lineIntersection.js'

export default function ({ x, y }, spatialIndex) {
  let hitCandidates = spatialIndex.search({
    minX: x, minY: y, maxX: x, maxY: y
  })

  let hits = []

  for (let candidate of hitCandidates) {
    if (candidate.geometry.type === 'point') {
      if (collisionTestPoint(x, y, candidate)) { hits.push(candidate) }
    }

    if (candidate.geometry.type === 'line') {
      if (collisionTestLine(x, y, candidate)) { hits.push(candidate) }
    }

    if (candidate.geometry.type === 'polygon') {
      if (collisionTestPolygon(x, y, candidate)) { hits.push(candidate) }
    }
  }

  return hits
}

function collisionTestPoint (x, y, candidate) {
  // Points are stored using their bounding box, but obviously points are round,
  // not square. So here we will see if there is an actual hit.
  let geometry = candidate.geometry
  let geometryRadius = geometry.radius
  let geometryCoords = [geometry.x, geometry.y]
  let mouseCoords = [x, y]
  let distance = pointDistance(geometryCoords, mouseCoords)
  return distance < geometryRadius
}

function collisionTestLine (x, y, candidate) {
  if (candidate.lineType === 'LineString') {
    if (lineIntersection([x, y], candidate.strokeWidth, candidate.coordinates)) {
      return true
    }
  }

  if (candidate.lineType === 'MultiLineString') {
    for (let line of candidate.coordinates) {
      if (lineIntersection([x, y], candidate.strokeWidth, line)) {
        return true
      }
    }
  }

  return false
}

function collisionTestPolygon (x, y, candidate) {
  if (candidate.polygonType === 'Polygon') {
    if (pointInPolygon([x, y], candidate.coordinates[0])) {
      return true
    }
  }

  if (candidate.polygonType === 'MultiPolygon') {
    let biggestPolygon = biggestArea(candidate.coordinates)
    if (pointInPolygon([x, y], biggestPolygon[0])) {
      return true
    }
  }

  return false
}
