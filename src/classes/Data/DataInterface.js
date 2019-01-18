const slashRegex = /\//g

export default class DataInterface {
  // Used by DataManager
  constructor (manager) {
    this._manager = manager
  }

  setScope (id) {
    this._scope = id
  }

  // Interface functions to DataContainer
  getDataset (id) {
    let containerID = id || this._scope
    return this._manager.getContainer(containerID).getDataset()
  }

  getDomain (str) {
    let { containerID, colName } = this._parseGetterString(str)
    return this._manager.getContainer(containerID).getDomain(colName)
  }

  getDomains (id) {
    let containerID = id || this._scope
    return this._manager.getContainer(containerID).getDomains()
  }

  getType (str) {
    let { containerID, colName } = this._parseGetterString(str)
    return this._manager.getContainer(containerID).getType(colName)
  }

  getTypes (id) {
    let containerID = id || this._scope
    return this._manager.getContainer(containerID).getTypes()
  }

  hasColumn (str) {
    let { containerID, colName } = this._parseGetterString(str)
    return this._manager.getContainer(containerID).hasColumn(colName)
  }

  getColumn (variable) {
    return this._dataset[variable]
  }

  forEachRow (fn) {
    let data = this._dataset

    for (let i = 0; i < this._length; i++) {
      let row = {}
      let prevRow = {}
      let nextRow = {}
      for (let colName in data) {
        row[colName] = data[colName][i]
        prevRow[colName] = data[colName][i - 1]
        nextRow[colName] = data[colName][i + 1]
      }
      if (i === 0) prevRow = undefined
      if (i === this._length - 1) nextRow = undefined
      fn(row, i, prevRow, nextRow)
    }
  }

  // Internal helpers
  _parseGetterString (str) {
    let containerID
    let colName

    let numberOfSlashes = str.match(slashRegex).length

    if (numberOfSlashes === 1) {
      [containerID, colName] = str.split('/')
    } else if (numberOfSlashes === 0) {
      containerID = this._scope
      colName = str
    } else {
      throw new Error(`Invalid getter '${colName}'`)
    }

    if (!this._manager.hasContainer(containerID)) {
      throw new Error(`Invalid container id '${str}'`)
    }

    if (!this._manager.hasColumn(colName)) {
      throw new Error(`Invalid column name '${str}'`)
    }

    return { containerID, colName }
  }
}
