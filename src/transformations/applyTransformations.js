import applyTranformation from './applyTransformation.js'

export default function (inputData, transform) {
  let data = JSON.parse(JSON.stringify(inputData))

  if (transform.constructor === Array) {
    for (let transformation of transform) {
      data = applyTranformation(data, transformation)
    }
  }

  if (transform.constructor === Object) {
    data = applyTranformation(data, transform)
  }

  return data
}
