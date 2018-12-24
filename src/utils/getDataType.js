export default function (value) {
  switch (value.constructor) {
    case Number:
      return 'quantitative'
    case String:
      return 'categorical'
    case Date:
      return 'temporal'
    case Array:
      return 'nested'
    default: throw new Error('Invalid data')
  }
}
