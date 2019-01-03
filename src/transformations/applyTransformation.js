import transformations from './transformations.js'

export default function (dataContainer, instructions) {
  if (instructions.constructor !== Object) {
    throw new Error('Transformation(s) must be specified as objects')
  }

  let key = checkKey(instructions)

  return transformations[key](dataContainer, instructions[key])
}

// https://dplyr.tidyverse.org/articles/dplyr.html#single-table-verbs
const allowedKeys = [
  'filter', 'arrange', 'select',
  'rename', 'mutate', 'transmute',
  'summarise'
]

function checkKey (obj) {
  let keys = Object.keys(obj)
  if (keys.length !== 1) {
    throw new Error('Invalid transformation syntax')
  }

  let key = keys[0]

  if (!allowedKeys.includes(key)) {
    throw new Error(`Unknown transformation ${keys[0]}`)
  }

  return key
}
