export default {
  bulge
}

function bulge (range, positioningSettings, prop) {
  let basedOn = positioningSettings.basedOn
  let padding = positioningSettings.padding

  return propsPerMark => {
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

      if (padding) {
        dLeft -= padding
        dRight -= padding
      }

      let value = Math.min(dLeft, dRight)

      if (['w', 'h'].includes(prop)) { value *= 2 }
      // if (['r', 'radius'].includes(prop)) {}

      let originalIndex = coordsSorted[i][1]
      propsPerMark[originalIndex][prop] = value
    }
  }
}
