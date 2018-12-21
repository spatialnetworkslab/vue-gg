export default function (scaleSpecification) {
  let scaleTypeX
  let scaleTypeY

  if (scaleSpecification === undefined) { return [scaleTypeX, scaleTypeY] }

  if (scaleSpecification.constructor === String) {
    scaleTypeX = scaleSpecification
    scaleTypeY = scaleSpecification
  } else if (scaleSpecification.constructor === Object) {
    if (scaleSpecification.hasOwnProperty('x')) {
      scaleTypeX = scaleSpecification.x
    }

    if (scaleSpecification.hasOwnProperty('y')) {
      scaleTypeY = scaleSpecification.y
    }
  } else {
    throw new Error('Scale specification must be String or Object')
  }

  return [scaleTypeX, scaleTypeY]
}
