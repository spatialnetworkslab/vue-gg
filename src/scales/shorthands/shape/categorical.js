import scaleFromRange from './scaleFromRange.js'

export default {
  shape8,
  triangles,
  stars,
  polygons
}

function shape8 (domain) {
  let shapeOptions = ['circle', 'square', 'triangle-up', 'diamond', 'cross', 'star', 'hexagon', 'crossSharp']

  return scaleFromRange(domain, shapeOptions)
}

function triangles (domain) {
  let shapeOptions = ['triangle-up', 'triangle-down', 'triangle-left', 'triangle-right']

  return scaleFromRange(domain, shapeOptions)
}

function stars (domain) {
  let shapeOptions = ['triangle-up', 'star4', 'star5', 'star6']

  return scaleFromRange(domain, shapeOptions)
}

function polygons (domain) {
  let shapeOptions = ['triangle-up', 'square', 'pentagon', 'hexagon', 'octagon', 'decagon']

  return scaleFromRange(domain, shapeOptions)
}
