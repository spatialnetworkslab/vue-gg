export default function (value) {
  switch (value.constructor) {
    case Number:
      return 'numeric'
    case String:
      return 'categorical'
    case Date:
      return 'temporal'
    case Array:
      return 'nested'
    default: throw new Error('Invalid data')
  }
}
