import findBoundingBox from './geometry/findBoundingBox.js'
import findBoundingBoxPath from './geometry/findBoundingBoxPath.js'

export default function (uid, type, coordinates, instance, itemCache, listeners, spatialIndices) {
  if (['point', 'symbol'].includes(type)) {
    cachePointItem(uid, type, coordinates, instance, itemCache)
    return
  }

  if (type === 'rectangle') {
    cacheRectangleItem(uid, type, coordinates, instance, itemCache)
    return
  }

  if (type === 'line') {
    cacheLineItem(uid, type, coordinates, instance, itemCache)
    return
  }

  if (['polygon', 'multiline', 'path', 'area', 'trail'].includes(type)) {
    cachePathItem(uid, type, coordinates, instance, itemCache)
  }
}

function cachePointItem (uid, type, coordinates, instance, itemCache) {
  // The point calculation is so fast that the cache logic is probably slower.
  // So we will just always update the point
  if (itemCache.hasItem(uid)) {
    itemCache.deleteItem(uid)
  }

  let radius
  if (type === 'point') { radius = instance.radius }
  if (type === 'symbol') { radius = instance.size / 2 }

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

  let item = { geometry, instance, minX, maxX, minY, maxY }
  itemCache.addItem(uid, [], item)
}

function cacheRectangleItem (uid, type, coordinates, instance, itemCache) {
  let args = [coordinates]
  let hasnt = !itemCache.hasItem(uid)
  let nonIdentical = !itemCache.itemIsIdentical(uid, args)

  if (hasnt || nonIdentical) {
    let { minX, minY, maxX, maxY } = findBoundingBox(coordinates)
    let geometry = { type, coordinates }

    let item = { geometry, instance, minX, maxX, minY, maxY }

    if (hasnt) {
      itemCache.addItem(uid, args, item)
    } else {
      itemCache.updateItem(uid, args, item)
    }
  }
}

function cacheLineItem (uid, type, coordinates, instance, itemCache) {
  let args = [coordinates, instance.strokeWidth]
  let hasnt = !itemCache.hasItem(uid)
  let nonIdentical = !itemCache.itemIsIdentical(uid, args)

  if (hasnt || nonIdentical) {
    let { minX, minY, maxX, maxY } = findBoundingBox(coordinates)
    let geometry = {
      type,
      coordinates,
      strokeWidth: instance.strokeWidth,
      pathType: 'LineString'
    }

    let item = { geometry, instance, minX, maxX, minY, maxY }

    if (hasnt) {
      itemCache.addItem(uid, args, item)
    } else {
      itemCache.updateItem(uid, args, item)
    }
  }
}

function cachePathItem (uid, type, coords, instance, itemCache) {
  let args = [coords, instance.strokeWidth]
  let hasnt = !itemCache.hasItem(uid)
  let nonIdentical = !itemCache.itemIsIdentical(uid, args)

  if (hasnt || nonIdentical) {
    let coordinates
    let pathType

    if (coords.constructor === Object && coords.hasOwnProperty('type')) {
      // If we are dealing with a GeoJSON geometry
      coordinates = coords.coordinates
      pathType = coords.type
    } else {
      // If we are dealing with our own, simple polygon coordinates
      coordinates = coords

      if (['multiline', 'path'].includes(type)) {
        pathType = 'LineString'
      }

      if (['polygon', 'area', 'trail'].includes(type)) {
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

    let item = { geometry, instance, minX, minY, maxX, maxY }

    if (hasnt) {
      itemCache.addItem(uid, args, item)
    } else {
      itemCache.updateItem(uid, args, item)
    }
  }
}
