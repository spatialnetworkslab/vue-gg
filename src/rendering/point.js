import createSVGStyle from './utils/createSVGStyle.js'

export function renderSVG (createElement, { $$transform, props, addToSpatialIndex }) {
  let [cx, cy] = $$transform([props.x, props.y])

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
