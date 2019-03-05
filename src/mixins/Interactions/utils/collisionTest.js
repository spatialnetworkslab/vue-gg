import pointInPolygon from './geometry/pointInPolygon.js'
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

    if (candidate.geometry.type === 'rectangle') {
      if (collisionTestRectangle(x, y, candidate)) { hits.push(candidate) }
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
  let geometry = candidate.geometry
  if (geometry.lineType === 'LineString') {
    if (lineIntersection([x, y], geometry.strokeWidth, geometry.coordinates)) {
      return true
    }
  }

  if (geometry.lineType === 'MultiLineString') {
    for (let line of geometry.coordinates) {
      if (lineIntersection([x, y], geometry.strokeWidth, line)) {
        return true
      }
    }
  }

  return false
}

function collisionTestRectangle (x, y, candidate) {
  let geometry = candidate.geometry
  return pointInPolygon([x, y], geometry.coordinates)
}

function collisionTestPolygon (x, y, candidate) {
  let geometry = candidate.geometry

  if (geometry.polygonType === 'SimplePolygon') {
    if (pointInPolygon([x, y], geometry.coordinates)) {
      return true
    }
  }

  if (geometry.polygonType === 'Polygon') {
    if (pointInPolygon([x, y], geometry.coordinates[0])) {
      return true
    }
  }

  if (geometry.polygonType === 'MultiPolygon') {
    for (let polygon of geometry.coordinates) {
      if (pointInPolygon([x, y], polygon[0])) {
        return true
      }
    }
  }

  return false
}
