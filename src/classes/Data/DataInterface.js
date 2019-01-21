const slashRegex = /\//g

export default class DataInterface {
  // Used by DataManager
  constructor (manager) {
    this._manager = manager
  }

  setScope (id) {
    this._scope = id
  }

  ready (id) {
    let containerID = id || this._scope
    return this._manager.hasContainer(containerID) &&
           this._manager.getContainer(containerID) !== undefined
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

  getColumn (str) {
    let { containerID, colName } = this._parseGetterString(str)
    return this._manager.getContainer(containerID).getColumn(colName)
  }

  forEachRow (fn, id) {
    let containerID = id || this._scope
    this._manager.getContainer(containerID).forEachRow(fn)
  }

  // Internal helpers
  _parseGetterString (str) {
    let containerID
    let colName

    let match = str.match(slashRegex)
    let numberOfSlashes = match ? match.length : 0
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

    if (!this._manager.getContainer(containerID).hasColumn(colName)) {
      throw new Error(`Invalid column name '${str}'`)
    }

    return { containerID, colName }
  }
}
