export default function (aesthetics) {
  let styles = [
    'fill',
    'stroke',
    'strokeWidth',
    'opacity',
    'fillOpacity',
    'strokeOpacity'
  ]
  let styleDef = {}
  for (let i = 0; i < styles.length; i++) {
    if (aesthetics[styles[i]]) {
      styleDef[styles[i]] = aesthetics[styles[i]]
    }
  }
  return styleDef
}
