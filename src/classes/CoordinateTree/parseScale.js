export default function (scaleSpecification) {
  let scaleTypeX
  let scaleTypeY

  if (scaleSpecification === undefined) { return [{}, {}] }

  if (scaleSpecification.constructor === String) {
    scaleTypeX = { scale: scaleSpecification }
    scaleTypeY = { scale: scaleSpecification }
  } else if (scaleSpecification.constructor === Object) {
    if (scaleSpecification.hasOwnProperty('x')) {
      if (scaleSpecification.x.constructor === String) {
        scaleTypeX = { scale: scaleSpecification.x }
      } else if (scaleSpecification.x.constructor === Object) {
        scaleTypeX = scaleSpecification.x
      } else {
        throw new Error('Scale specification x must be String or Object')
      }
    } else {
      scaleTypeX = {}
    }

    if (scaleSpecification.hasOwnProperty('y')) {
      if (scaleSpecification.y.constructor === String) {
        scaleTypeY = { scale: scaleSpecification.y }
      } else if (scaleSpecification.y.constructor === Object) {
        scaleTypeY = scaleSpecification.y
      } else {
        throw new Error('Scale specification y must be String or Object')
      }
    } else {
      scaleTypeY = {}
    }
  } else {
    throw new Error('Scale specification must be String or Object')
  }

  return [scaleTypeX, scaleTypeY]
}
