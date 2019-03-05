import findBoundingBox from './geometry/findBoundingBox.js'
import findBoundingBoxPolygon from './geometry/findBoundingBoxPolygon.js'

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

  if (type === 'polygon') {
    return createPolygonItem(type, coordinates, instance)
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
    lineType: 'LineString'
  }

  return { geometry, instance, minX, maxX, minY, maxY }
}

function createPolygonItem (type, coords, instance) {
  let coordinates
  let polygonType

  if (coords.constructor === Object && coords.hasOwnProperty('type')) {
    // If we are dealing with a GeoJSON geometry
    coordinates = coords.coordinates
    polygonType = coords.type
  } else {
    // If we are dealing with our own, simple polygon coordinates
    coordinates = coords
    polygonType = 'SimplePolygon'
  }

  let { minX, minY, maxX, maxY } = findBoundingBoxPolygon(coordinates, polygonType)
  let geometry = { type, coordinates, polygonType }

  return { geometry, instance, minX, minY, maxX, maxY }
}
