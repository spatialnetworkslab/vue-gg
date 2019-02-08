export function calculateGridLayout (rows, cols, options, ranges) {
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

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      let x1 = left + colIndex * cellWidth + cP.l
      let x2 = x1 + cellWidth - cP.l - cP.r
      let y1 = bottom + rowIndex * cellHeight + cP.b
      let y2 = y1 + cellHeight - cP.b - cP.t

      cells.push({ x1, x2, y1, y2 })
    }
  }

  return cells
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
