export function validateGridOptions (options) {
  let hasRows = options.rows !== undefined
  let hasCols = options.cols !== undefined
  if (hasRows && hasCols) { throw new Error('Cannot have both rows and cols') }
  if (!hasRows && !hasCols) {
    throw new Error('Layout must have either rows or cols specified')
  }
  if (hasCols && options.cols < 1) { throw new Error('Cols must be higher than 0') }
  if (hasRows && options.rows < 1) { throw new Error('Rows must be higher than 0') }
}

export function calculateRowsCols (options, numberOfCells) {
  let rows
  let cols

  if (options.cols) {
    rows = Math.ceil(numberOfCells / options.cols)
    cols = options.cols
  }

  if (options.rows) {
    rows = options.rows
    cols = Math.ceil(numberOfCells / options.rows)
  }

  return { rows, cols }
}

export function calculateGridLayout (rows, cols, options, ranges, axes, start) {
  let lP = getPadding(options.layoutPadding)
  let cP = getPadding(options.cellPadding)

  let left = ranges.x[0] + lP.l
  let right = ranges.x[1] - lP.r
  let bottom = ranges.y[0] + lP.b
  let top = ranges.y[1] - lP.t

  let width = right - left
  let height = top - bottom

  let cellWidth = width / cols
  let cellHeight = height / rows

  let cells = []

  if (start === 'b') {
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        let x1 = left + colIndex * cellWidth + cP.l
        let x2 = x1 + cellWidth - cP.l - cP.r
        let y1 = bottom + rowIndex * cellHeight + cP.b
        let y2 = y1 + cellHeight - cP.b - cP.t

        cells.push({ x1, x2, y1, y2 })
      }
    }
  }

  if (start === 't') {
    for (let rowIndex = rows - 1; rowIndex >= 0; rowIndex--) {
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        let x1 = left + colIndex * cellWidth + cP.l
        let x2 = x1 + cellWidth - cP.l - cP.r
        let y1 = bottom + rowIndex * cellHeight + cP.b
        let y2 = y1 + cellHeight - cP.b - cP.t

        cells.push({ x1, x2, y1, y2 })
      }
    }
  }

  return cells
}

export function updateGridComponents (components, gridLayout) {
  let newComponents = []
  for (let i = 0; i < components.length; i++) {
    let component = components[i]
    let layout = gridLayout[i]
    newComponents.push(updateComponent(component, layout))
  }

  return newComponents
}

function getPadding (padding) {
  let paddings = {
    l: 0,
    r: 0,
    t: 0,
    b: 0
  }

  if (!padding) return paddings

  if (padding.constructor === Number) {
    for (let key in paddings) { paddings[key] = padding }
  }

  if (padding.constructor === Object) {
    for (let key in padding) { paddings[key] = padding[key] }
  }

  return paddings
}

export function updateComponent (component, layout) {
  let clonedComponent = component
  let props = mergeProps(layout, component.componentOptions.propsData)
  clonedComponent.componentOptions.propsData = props
  return clonedComponent
}

function mergeProps (coords, other) {
  let props = Object.assign({}, coords)

  for (let key in other) {
    if (!['x1', 'x2', 'y1', 'y2', 'x', 'y', 'w', 'h'].includes(key)) {
      props[key] = other[key]
    }
  }

  return props
}
