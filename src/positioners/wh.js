export default {
  bulge
}

function bulge (prop, range, positioningSettings) {
  return propsPerMark => {
    let basedOn = positioningSettings.basedOn || guessBasedOn(prop, propsPerMark[0])
    let padding = positioningSettings.padding || 0

    // Sort ascending
    let coordsSorted = propsPerMark.map((props, ix) => [props[basedOn], ix]).sort((a, b) => a[0] > b[0])
    let len = coordsSorted.length

    for (let i = 0; i < len; ++i) {
      let center = coordsSorted[i][0]
      let dLeft // distance to nearest mark on the left
      let dRight // distance to nearest mark on the right

      if (i === 0) {
        dLeft = Math.abs(center - range[0])
      } else {
        dLeft = Math.abs(center - coordsSorted[i - 1][0]) / 2
      }

      if (i === len - 1) {
        dRight = Math.abs(center - range[1])
      } else {
        dRight = Math.abs(center - coordsSorted[i + 1][0]) / 2
      }

      dLeft -= padding
      dRight -= padding

      let value = Math.min(dLeft, dRight) * 2

      let originalIndex = coordsSorted[i][1]
      propsPerMark[originalIndex][prop] = value
    }
  }
}

function guessBasedOn (prop, firstRow) {
  if (prop === 'w') {
    if (firstRow.hasOwnProperty('x1')) { return 'x1' }
    if (firstRow.hasOwnProperty('x2')) { return 'x2' }
    if (firstRow.hasOwnProperty('x')) { return 'x' }
  }

  if (prop === 'h') {
    if (firstRow.hasOwnProperty('y1')) { return 'y1' }
    if (firstRow.hasOwnProperty('y2')) { return 'y2' }
    if (firstRow.hasOwnProperty('y')) { return 'y' }
  }
}
