export default function (aesthetics) {
  let styles = ['fill',
    'stroke',
    'strokeWidth',
    'opacity',
    'fillOpacity',
    'strokeOpacity'
  ]
  let styleDef = ''
  for (let i = 0; i < styles.length; i++) {
    let style = styles[i]
    if (aesthetics[style]) {
      styleDef += `${camelCaseToDash(style)}: ${aesthetics[style]}; `
    }
  }
  return styleDef
}

// from https://gist.github.com/youssman/745578062609e8acac9f#gistcomment-2586740
function camelCaseToDash (str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([^0-9])/g, '$1-$2')
    .replace(/([^0-9])([0-9])/g, '$1-$2')
    .replace(/-+/g, '-')
    .toLowerCase()
}
