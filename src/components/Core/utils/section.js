export function calculateWidths (axes, ranges) {
  let widths = { top: 0, bottom: 0, left: 0, right: 0 }

  let xRange = ranges.x[1] - ranges.x[0]
  let yRange = ranges.y[1] - ranges.y[0]

  for (let axis of axes) {
    if (['bottom', 'top'].includes(axis)) {
      widths[axis] = Math.abs(yRange) / 8
    }
    if (['left', 'right'].includes(axis)) {
      widths[axis] = Math.abs(xRange) / 8
    }
  }

  return widths
}

export function createAxisProps (axis, ranges, widths, scales) {
  let x1, x2, y1, y2, scale

  if (axis === 'bottom') {
    x1 = ranges.x[0] + widths.left
    x2 = ranges.x[1] - widths.right
    y1 = ranges.y[0]
    y2 = y1 + widths.bottom
    scale = scales.x
  }

  if (axis === 'top') {
    x1 = ranges.x[0] + widths.left
    x2 = ranges.x[1] - widths.right
    y1 = ranges.y[1] - widths.top
    y2 = ranges.y[1]
    scale = scales.x
  }

  if (axis === 'left') {
    x1 = ranges.x[0]
    x2 = x1 + widths.left
    y1 = ranges.y[0] + widths.bottom
    y2 = ranges.y[1] - widths.top
    scale = scales.y
  }

  if (axis === 'right') {
    x1 = ranges.x[1] - widths.right
    x2 = ranges.x[1]
    y1 = ranges.y[0] + widths.bottom
    y2 = ranges.y[1] - widths.top
    scale = scales.y
  }

  let newProps = { x1, x2, y1, y2, scale }
  return newProps
}
