export default class CoordinateTree {
  constructor () {
    this._coordinateTree = null
    this._branchPaths = {}
    this._update = 1
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

    this._update++
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

    this._update++
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

    this._update++
  }

  getTransformation (id) {
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
}

class Branch {
  constructor (id, parentID, { type, domains, ranges, transform }) {
    this.id = id
    this.parentID = parentID

    this.type = type
    this.domains = domains
    this.ranges = ranges
    this.transform = transform

    this.children = {}
  }

  update (coordinateSystem) {
    for (let key in coordinateSystem) {
      this[key] = coordinateSystem[key]
    }
  }
}
