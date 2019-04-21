import transformations from './transformations'
import checkKeyValuePair from './utils/checkKeyValuePair.js'

export default function (data, instructions, scaleManager) {
  if (instructions.constructor !== Object) {
    throw new Error('Transformation(s) must be specified as objects')
  }

  let key = checkKeyValuePair(instructions, Object.keys(transformations))

  return transformations[key](data, instructions[key], scaleManager)
}
