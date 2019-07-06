import { textAnchorPoint } from '../utils/anchorPoint.js'
import createSVGStyle from './utils/createSVGStyle.js'
import checkGeometry from './utils/checkGeometry.js'

export function renderSVG (createElement, { $$transform }, { props, validGeomTypes }) {
  if (props.geometry) {
    checkGeometry('label', validGeomTypes, props.geometry)
  }

  let xy = props.geometry
    ? props.geometry.coordinates
    : [props.x, props.y]

  let [cx, cy] = $$transform(xy)

  let anchorPoint = textAnchorPoint(props.anchorPoint)
  let transform = calcTransform(props.rotation, cx, cy)
  let styles = createSVGStyle(props)

  styles['fontSize'] = props.fontSize + 'px'
  styles['font-family'] = props.fontFamily
  styles['font-weight'] = props.fontWeight

  return createElement('text', {
    attrs: {
      'x': cx,
      'y': cy,
      'fill': props.color,
      'text-anchor': anchorPoint.textAnchor,
      'dominant-baseline': anchorPoint.dominantBaseline,
      'transform': transform,
      'class': 'vgg-label'
    },
    style: styles
  }, props.text)
}

function calcTransform (rotation, cx, cy) {
  return `rotate(${rotation}, ${cx}, ${cy})`
}
