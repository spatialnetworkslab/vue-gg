export default function (data, transformFunc) {
  if (transformFunc.constructor !== Function) {
    throw new Error(`Invalid 'transform' transformation: must be a Function`)
  }

  return transformFunc(data)
}
