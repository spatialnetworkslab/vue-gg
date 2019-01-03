export default function (data, renameObj) {
  if (renameObj.constructor !== Object) {
    throw new Error('Rename only accepts an object')
  }

  for (let key in renameObj) {
    if (data.hasOwnProperty(key)) {
      let newName = renameObj[key]
      data[newName] = data[key]
      delete data[key]
    } else {
      console.warn(`Rename: column '${key}' not found`)
    }
  }

  return data
}
