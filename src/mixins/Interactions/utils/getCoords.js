// https://stackoverflow.com/a/42711775/10573487
export default function (svg, svgPoint, { clientX, clientY }) {
  svgPoint.x = clientX
  svgPoint.y = clientY

  return svgPoint.matrixTransform(svg.getScreenCTM().inverse())
}
