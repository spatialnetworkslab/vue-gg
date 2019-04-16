import { textAnchorPoint } from '../utils/anchorPoint.js'
import createSVGStyle from '../mixins/Marks/utils/createSVGStyle.js'

export function renderSVG (createElement, $$transform, props) {
  let [cx, cy] = $$transform([props.x, props.y])
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
