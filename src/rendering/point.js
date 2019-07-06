import createSVGStyle from './utils/createSVGStyle.js'
import checkGeometry from './utils/checkGeometry.js'

export function renderSVG (createElement, { $$transform }, { props, addToSpatialIndex, validGeomTypes }) {
  if (props.geometry) {
    checkGeometry('point', validGeomTypes, props.geometry)
  }

  let xy = props.geometry
    ? props.geometry.coordinates
    : [props.x, props.y]

  let [cx, cy] = $$transform(xy)

  addToSpatialIndex([cx, cy])

  return createElement('circle', {
    attrs: {
      'cx': cx,
      'cy': cy,
      'r': props.radius
    },
    style: createSVGStyle(props)
  })
}
