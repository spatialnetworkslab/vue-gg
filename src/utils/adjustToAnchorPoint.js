export default function ([x, y], width, height, oldAnchorPoint, newAnchorPoint) {
  // In this particular case we don't need to do anything
  if (oldAnchorPoint === newAnchorPoint) { return [x, y] }

  // In all other cases:
  // First we will convert the defaultAnchorPoint to a 'centered' anchor point
  let centered = []

  if (oldAnchorPoint === 'center') {
    centered = [x, y]
  } else {
    centered[0] = oldAnchorPoint.startsWith('l') ? x - width / 2 : x + width / 2
    centered[1] = oldAnchorPoint.endsWith('b') ? y + height / 2 : y - height / 2
  }

  // Second, we convert the centered anchor point to the new anchor point
  if (newAnchorPoint === 'center') {
    return centered
  } else {
    let [cx, cy] = centered
    let translated = []

    translated[0] = newAnchorPoint.startsWith('l') ? cx + width / 2 : cx - width / 2
    translated[1] = newAnchorPoint.endsWith('b') ? cy - height / 2 : cy + height / 2

    return translated
  }
}
