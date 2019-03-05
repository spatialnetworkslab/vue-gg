import findBoundingBox from './geometry/findBoundingBox.js'

export default function (type, coordinates, instance) {
  if (type === 'point') {
    return createPointItem(type, coordinates, instance)
  }

  if (type === 'rectangle') {
    return createRectangleItem(type, coordinates, instance)
  }

  if (type === 'line') {
    // TODO
  }

  if (type === 'polygon') {
    // TODO
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
