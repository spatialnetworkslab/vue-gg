import createSVGStyle from './utils/createSVGStyle.js'

export function renderSVG (createElement, { $$transform, props, events, addToSpatialIndex }) {
  let [cx, cy] = $$transform([props.x, props.y])

  if (events) {
    addToSpatialIndex([cx, cy], events)
  }

  return createElement('circle', {
    attrs: {
      'cx': cx,
      'cy': cy,
      'r': props.radius
    },
    style: createSVGStyle(props)
  })
}
