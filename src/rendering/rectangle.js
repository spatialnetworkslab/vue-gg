import { getCoordinateSpecification, invalidCombination } from '../mixins/Marks/Rectangular.js'
import {
  interpolatePoints,
  transformPoints,
  createPath
} from './utils/createPath.js'
import createSVGStyle from './utils/createSVGStyle.js'

export function renderSVG (
  createElement,
  { $$transform, parentBranch },
  { props, interpolate, addToSpatialIndex }
) {
  let invalidX = invalidCombination(props.x1, props.x2, props.x, props.w)
  let invalidY = invalidCombination(props.y1, props.y2, props.y, props.h)

  if (invalidX || invalidY) {
    throw new Error('Invalid combination of props')
  }

  let coords = getCoordinateSpecification(props, parentBranch)

  let points = [
    [coords.x1, coords.y1],
    [coords.x1, coords.y2],
    [coords.x2, coords.y2],
    [coords.x2, coords.y1],
    [coords.x1, coords.y1]
  ]

  let transformedPoints
  let path

  if (interpolate) {
    let interpolatedPoints = interpolatePoints(points)
    transformedPoints = transformPoints(interpolatedPoints, $$transform)
    path = createPath(transformedPoints)
  }

  if (!interpolate) {
    transformedPoints = transformPoints(points, $$transform)
    path = createPath(transformedPoints)
  }

  addToSpatialIndex(transformedPoints)

  return createElement('path', {
    attrs: {
      'd': path
    },
    style: createSVGStyle(props)
  })
}
