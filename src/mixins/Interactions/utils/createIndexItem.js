import findBoundingBox from './geometry/findBoundingBox.js'
import findBoundingBoxPath from './geometry/findBoundingBoxPath.js'

export default function (type, coordinates, instance) {
  if (type === 'point') {
    return createPointItem(type, coordinates, instance)
  }

  if (type === 'rectangle') {
    return createRectangleItem(type, coordinates, instance)
  }

  if (type === 'line') {
    return createLineItem(type, coordinates, instance)
  }

  if (['polygon', 'multiline', 'area'].includes(type)) {
    return createPathItem(type, coordinates, instance)
  }

  if (type === 'trail') {
    return createTrailItem(type, coordinates, instance)
  }
}

function createPointItem (type, coordinates, instance) {
  let radius = instance.radius

  let minX = coordinates[0] - radius
  let maxX = coordinates[0] + radius
  let minY = coordinates[1] - radius
  let maxY = coordinates[1] + radius

  let geometry = {
    x: coordinates[0],
    y: coordinates[1],
    radius,
    type
  }

  return { geometry, instance, minX, maxX, minY, maxY }
}

function createRectangleItem (type, coordinates, instance) {
  let { minX, minY, maxX, maxY } = findBoundingBox(coordinates)
  let geometry = { type, coordinates }

  return { geometry, instance, minX, maxX, minY, maxY }
}

function createLineItem (type, coordinates, instance) {
  let { minX, minY, maxX, maxY } = findBoundingBox(coordinates)
  let geometry = {
    type,
    coordinates,
    strokeWidth: instance.strokeWidth,
    pathType: 'LineString'
  }

  return { geometry, instance, minX, maxX, minY, maxY }
}

function createPathItem (type, coords, instance) {
  let coordinates
  let pathType

  if (coords.constructor === Object && coords.hasOwnProperty('type')) {
    // If we are dealing with a GeoJSON geometry
    coordinates = coords.coordinates
    pathType = coords.type
  } else {
    // If we are dealing with our own, simple polygon coordinates
    coordinates = coords

    if (type === 'multiline') {
      pathType = 'LineString'
    }

    if (type === 'polygon') {
      pathType = 'SimplePolygon'
    }

    if (type === 'area') {
      pathType = 'SimplePolygon'
    }
  }

  let { minX, minY, maxX, maxY } = findBoundingBoxPath(coordinates, pathType)
  let geometry = {
    type,
    coordinates,
    strokeWidth: instance.strokeWidth,
    pathType
  }

  return { geometry, instance, minX, minY, maxX, maxY }
}

function createTrailItem (type, points, instance) {
  let pathType = 'SimplePolygon'
  let { minX, minY, maxX, maxY } = findBoundingBoxPath(points, pathType)

  let geometry = {
    type,
    pathType,
    coordinates: points
  }

  return { geometry, instance, minX, minY, maxX, maxY }
}
