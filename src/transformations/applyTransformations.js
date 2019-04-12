import cloneDeep from 'lodash.clonedeep'
import applyTranformation from './applyTransformation.js'
import isEmptyDataframe from '../utils/isEmptyDataframe.js'

export default function (inputData, transform, allowEmpty) {
  let data = cloneDeep(inputData)

  if (transform.constructor === Array) {
    for (let transformation of transform) {
      data = applyTranformation(data, transformation)
      if (!allowEmpty && isEmptyDataframe(data)) { return false }
    }
  }

  if (transform.constructor === Object) {
    data = applyTranformation(data, transform)
    if (!allowEmpty && isEmptyDataframe(data)) { return false }
  }

  return data
}
