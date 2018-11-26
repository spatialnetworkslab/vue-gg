export default class CoordinateSystemManager {
  constructor () {
    this._coordinateSystemTree = null
    this._branchPaths = {}
    this._update = 1
  }

  setRoot (coordinateSystem) {
    this._coordinateSystemTree = new Branch('root', null, coordinateSystem)

    this._branchPaths['root'] = []
  }

  addBranch (id, parentID, coordinateSystem) {
    let parent = this.getBranch(parentID)
    parent.children[id] = new Branch(id, parentID, coordinateSystem)

    let parentBranchPath = this._branchPaths[parentID]
    this._branchPaths[id] = [...parentBranchPath, id]

    this._update++
  }

  getBranch (id) {
    let branchPath = this._branchPaths[id]
    let currentLocation = this._coordinateSystemTree

    for (let branch of branchPath) {
      currentLocation = currentLocation.children[branch]
    }

    return currentLocation
  }

  updateBranch (id, coordinateSystem) {
    let branch = this.getBranch(id)
    branch.update(coordinateSystem)

    this._update++
  }

  removeBranch (id) {
    let branchPath = this._branchPaths[id]
    if (branchPath) {
      let currentLocation = this._coordinateSystemTree

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

  getTransformer (id) {
    let transformer = function ([x, y]) {
      let currentLocation = this.getBranch(id)
      let result = currentLocation.transform([x, y])

      while (currentLocation.parentID) {
        currentLocation = this.getBranch(currentLocation.parentID)
        result = currentLocation.transform(result)
      }

      return result
    }

    return transformer.bind(this)
  }
}

class Branch {
  constructor (id, parentID, { system, domains, ranges, transform }) {
    this.id = id
    this.parentID = parentID

    this.system = system
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
