import {
  interpolatePoints,
  interpolatePointsFromFunc,
  transformPoints,
  createPath
} from './utils/createPath.js'
import createSVGStyle from './utils/createSVGStyle.js'

export function renderSVG (
  createElement,
  { $$transform, $$coordinateTreeParent, $$coordinateTree },
  { props, interpolate, addToSpatialIndex }
) {
  let coords = [
    [props.x1, props.y1],
    [props.x2, props.y2]
  ]

  let path = createLinePath(
    props.func, coords, $$transform, $$coordinateTreeParent, $$coordinateTree,
    interpolate, addToSpatialIndex
  )

  return createElement('path', {
    attrs: {
      'd': path
    },
    style: createSVGStyle(props)
  })
}

function createLinePath (
  func, coords, $$transform, $$coordinateTreeParent, $$coordinateTree,
  interpolate, addToSpatialIndex
) {
  let transformedPoints
  let path

  if (func) {
    let parentId = $$coordinateTreeParent
    let domains = $$coordinateTree.getBranch(parentId).domains

    let points = interpolatePointsFromFunc(func, domains)
    transformedPoints = transformPoints(points, $$transform)
    path = createPath(transformedPoints)
  }

  if (!func) {
    if (interpolate) {
      let points = interpolatePoints(coords)
      transformedPoints = transformPoints(points, $$transform)
      path = createPath(transformedPoints)
    }

    if (!interpolate) {
      transformedPoints = transformPoints(coords, $$transform)
      path = createPath(transformedPoints)
    }
  }

  addToSpatialIndex(transformedPoints)

  return path
}
