import { checkColName } from '../../classes/Data/DataContainer.js'

export default function (data, renameObj) {
  if (renameObj.constructor !== Object) {
    throw new Error('Rename only accepts an object')
  }

  for (let oldName in renameObj) {
    if (data.hasOwnProperty(oldName)) {
      let newName = renameObj[oldName]
      checkColName(newName)
      data[newName] = data[oldName]
      delete data[oldName]
    } else {
      console.warn(`Rename: column '${oldName}' not found`)
    }
  }

  return data
}
