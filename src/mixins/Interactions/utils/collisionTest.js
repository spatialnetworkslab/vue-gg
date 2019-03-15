import pointInPolygon from './geometry/pointInPolygon.js'
import pointDistance from './geometry/pointDistance.js'
import lineIntersection from './geometry/lineIntersection.js'
import trailIntersection from './geometry/trailIntersection.js'

export default function ({ x, y }, spatialIndex) {
  let hitCandidates = spatialIndex.search({
    minX: x, minY: y, maxX: x, maxY: y
  })

  let hits = []

  for (let candidate of hitCandidates) {
    if (['point', 'symbol'].includes(candidate.geometry.type)) {
      if (collisionTestPoint(x, y, candidate)) { hits.push(candidate) }
    } else if (candidate.geometry.type === 'rectangle') {
      if (collisionTestRectangle(x, y, candidate)) { hits.push(candidate) }
    } else if (['line', 'multiline', 'path'].includes(candidate.geometry.type)) {
      if (collisionTestLine(x, y, candidate)) { hits.push(candidate) }
    } else if (['polygon', 'area'].includes(candidate.geometry.type)) {
      if (collisionTestPolygon(x, y, candidate)) { hits.push(candidate) }
    } else if (candidate.geometry.type === 'trail') {
      if (collisionTestTrail(x, y, candidate)) { hits.push(candidate) }
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

  // Polygon types
  if (geometry.pathType === 'SimplePolygon') {
    if (lineIntersection([x, y], geometry.strokeWidth, geometry.coordinates)) {
      return true
    }
  }

  if (geometry.pathType === 'Polygon') {
    if (lineIntersection([x, y], geometry.strokeWidth, geometry.coordinates[0])) {
      return true
    }
  }

  if (geometry.pathType === 'MultiPolygon') {
    for (let polygon of geometry.coordinates) {
      if (lineIntersection([x, y], geometry.strokeWidth, polygon[0])) {
        return true
      }
    }
  }

  // MultiLine types
  if (geometry.pathType === 'LineString') {
    if (lineIntersection([x, y], geometry.strokeWidth, geometry.coordinates)) {
      return true
    }
  }

  if (geometry.pathType === 'MultiLineString') {
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

  // Polygon types
  if (geometry.pathType === 'SimplePolygon') {
    if (pointInPolygon([x, y], geometry.coordinates)) {
      return true
    }
  }

  if (geometry.pathType === 'Polygon') {
    if (pointInPolygon([x, y], geometry.coordinates[0])) {
      return true
    }
  }

  if (geometry.pathType === 'MultiPolygon') {
    for (let polygon of geometry.coordinates) {
      if (pointInPolygon([x, y], polygon[0])) {
        return true
      }
    }
  }

  // MultiLine types
  if (geometry.pathType === 'LineString') {
    if (pointInPolygon([x, y], geometry.coordinates)) {
      return true
    }
  }

  if (geometry.pathType === 'MultiLineString') {
    for (let polygon of geometry.coordinates) {
      if (pointInPolygon([x, y], polygon)) {
        return true
      }
    }
  }

  return false
}

function collisionTestTrail (x, y, candidate) {
  let geometry = candidate.geometry
  return trailIntersection([x, y], geometry.coordinates)
}
