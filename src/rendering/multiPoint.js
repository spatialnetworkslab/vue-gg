import createSVGStyle from './utils/createSVGStyle.js'
import checkGeometry from './utils/checkGeometry.js'

export function renderSVG (createElement, { $$transform }, { props, validGeomTypes }) {
  if (props.geometry) {
    checkGeometry('multi-point', validGeomTypes, props.geometry)
  }

  let points = props.geometry
    ? props.geometry.coordinates
    : props.points

  return createElement('g',
    points.map(p => {
      let [cx, cy] = $$transform(p)
      return createElement('circle', {
        attrs: {
          'cx': cx,
          'cy': cy,
          'r': props.radius
        },
        style: createSVGStyle(props)
      })
    })
  )
}
