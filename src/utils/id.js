import generate from 'nanoid/non-secure/generate'

const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstwxyz' // no lookalikes

export default function () {
  return generate(alphabet, 8)
}
