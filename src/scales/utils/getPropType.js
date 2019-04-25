export default function (prop) {
  if (['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h'].includes(prop)) {
    return 'coord'
  }

  if (['stroke', 'fill'].includes(prop)) {
    return 'color'
  }

  if ([
    'width', 'height', 'fontSize', 'strokeWidth', 'size',
    'opacity', 'strokeOpacity', 'fillOpacity',
    'radius'
  ].includes(prop)) {
    return 'numeric'
  }

  if (['shape'].includes(prop)) {
    return 'shape'
  }
}
