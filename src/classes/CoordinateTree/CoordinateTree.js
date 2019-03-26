export default class CoordinateTree {
  constructor () {
    this._coordinateTree = null
    this._branchPaths = {}
  }

  setRoot (coordinateTransformation) {
    this._coordinateTree = new Branch('root', null, coordinateTransformation)

    this._branchPaths['root'] = []
  }

  addBranch (id, parentID, coordinateTransformation) {
    let parent = this.getBranch(parentID)
    parent.children[id] = new Branch(id, parentID, coordinateTransformation)

    let parentBranchPath = this._branchPaths[parentID]
    this._branchPaths[id] = [...parentBranchPath, id]
  }

  getBranch (id) {
    let branchPath = this._branchPaths[id]
    let currentLocation = this._coordinateTree

    for (let branch of branchPath) {
      currentLocation = currentLocation.children[branch]
    }

    return currentLocation
  }

  updateBranch (id, coordinateTransformation) {
    let branch = this.getBranch(id)
    branch.update(coordinateTransformation)
  }

  removeBranch (id) {
    let branchPath = this._branchPaths[id]
    if (branchPath) {
      let currentLocation = this._coordinateTree

      for (let branchID of branchPath) {
        let childBranch = currentLocation.children[branchID]
        if (childBranch.id === id) {
          delete currentLocation.children[branchID]
          break
        } else {
          currentLocation = childBranch
        }
      }

      for (let branchPathID in this._branchPaths) {
        let path = this._branchPaths[branchPathID]
        if (path.includes(id)) {
          delete this._branchPaths[branchPathID]
        }
      }
    }
  }

  getTotalTransformation (id) {
    let transformation = function ([x, y]) {
      let currentLocation = this.getBranch(id)
      let result = currentLocation.transform([x, y])

      while (currentLocation.parentID) {
        currentLocation = this.getBranch(currentLocation.parentID)
        result = currentLocation.transform(result)
      }

      return result
    }

    return transformation.bind(this)
  }

  getInverseTransformation (id) {
    let transformation = function ([x, y]) {
      let branchPath = this._branchPaths[id]
      let branch = this.getBranch('root')
      let result

      if (branchPath[branchPath.length - 1] !== 'root') {
        result = branch.inverseTransform([x, y])
      } else {
        result = branch.actualInverseTransform([x, y])
      }

      for (let branchID of branchPath) {
        branch = this.getBranch(branchID)
        if (branchPath[branchPath.length - 1] !== branchID) {
          result = branch.inverseTransform([x, y])
        } else {
          result = branch.actualInverseTransform([x, y])
        }
      }

      return result
    }

    return transformation.bind(this)
  }
}

class Branch {
  constructor (id, parentID, coordinateTransformation) {
    this.id = id
    this.parentID = parentID
    this.updateCount = 0

    this.update(coordinateTransformation)

    this.children = {}
  }

  update (coordinateTransformation) {
    for (let key in coordinateTransformation) {
      this[key] = coordinateTransformation[key]
    }

    this.updateCount += 1
  }

  hasChildren () {
    return Object.keys(this.children).length > 0
  }
}
