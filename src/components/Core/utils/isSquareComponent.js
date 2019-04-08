export default function (component) {
  let props = component.componentOptions.Ctor.options.props
  let squareProps = ['x1', 'x2', 'y1', 'y2']
  for (let prop of squareProps) {
    if (!props[prop]) {
      return false
    }
  }
  return true
}
