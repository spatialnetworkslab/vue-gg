export function calculateWidths (axes, coords, defaultFraction = 8) {
  let widths = { top: 0, bottom: 0, left: 0, right: 0 }

  for (let axis in axes) {
    let axisOptions = axes[axis]
    if (axisOptions) {
      widths[axis] = calculateWidth(axis, axisOptions, coords, defaultFraction)
    }
  }

  return widths
}

function calculateWidth (axis, axisOptions, coords, defaultFraction = 8) {
  if (['bottom', 'top'].includes(axis)) {
    let yRange = coords.y2 - coords.y1
    let h = axisOptions && axisOptions.constructor === Object ? axisOptions.h : undefined
    return h || Math.abs(yRange) / defaultFraction
  }
  if (['left', 'right'].includes(axis)) {
    let xRange = coords.x2 - coords.x1
    let w = axisOptions && axisOptions.constructor === Object ? axisOptions.w : undefined
    return w || Math.abs(xRange) / defaultFraction
  }
}

export function createAxisProps (axis, axisOptions, coords, widths, scales) {
  let x1, x2, y1, y2, scale

  if (axis === 'bottom') {
    x1 = coords.x1 + widths.left
    x2 = coords.x2 - widths.right
    y1 = coords.y1
    y2 = y1 + widths.bottom
    scale = scales.x
  }

  if (axis === 'top') {
    x1 = coords.x1 + widths.left
    x2 = coords.x2 - widths.right
    y1 = coords.y2 - widths.top
    y2 = coords.y2
    scale = scales.x
  }

  if (axis === 'left') {
    x1 = coords.x1
    x2 = x1 + widths.left
    y1 = coords.y1 + widths.bottom
    y2 = coords.y2 - widths.top
    scale = scales.y
  }

  if (axis === 'right') {
    x1 = coords.x2 - widths.right
    x2 = coords.x2
    y1 = coords.y1 + widths.bottom
    y2 = coords.y2 - widths.top
    scale = scales.y
  }

  let newProps = { x1, x2, y1, y2, scale }
  newProps = applyProps(newProps, axisOptions)

  return newProps
}

export function applyProps (newProps, oldProps) {
  let positionProps = ['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h']
  if (oldProps && oldProps.constructor === Object) {
    for (let oldProp in oldProps) {
      if (!positionProps.includes(oldProp)) {
        newProps[oldProp] = oldProps[oldProp]
      }
    }

    return newProps
  } else {
    return newProps
  }
}
