import cloneDeep from 'lodash.clonedeep'
import applyTranformation from './applyTransformation.js'

export default function (inputData, transform) {
  let data = cloneDeep(inputData)

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