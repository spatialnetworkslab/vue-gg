export default function (prop, variableType, scale, availableScales) {
  if (!availableScales.hasOwnProperty(scale)) {
    throw new Error(`
      Prop '${prop}', variable type '${variableType}':
      No scale '${scale}' found
    `)
  }
}
