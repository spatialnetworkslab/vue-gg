export default class ItemCache {
  constructor () {
    this.cache = {}
  }

  hasItem (uid) {
    return this.cache.hasOwnProperty(uid)
  }

  itemIsIdentical (uid, newArgs) {
    let oldArgs = this.cache[uid].args
    for (let i = 0; i < oldArgs.length; i++) {
      if (oldArgs[i] !== JSON.stringify(newArgs[i])) {
        return false
      }
    }

    return true
  }

  addItem (uid, args, item) {
    let strArgs = args.map(arg => JSON.stringify(arg))
    this.cache[uid] = { args: strArgs, item }
  }

  getItem (uid) {
    return this.cache[uid].item
  }

  deleteItem (uid) {
    delete this.cache[uid]
  }

  updateItem (uid, args, item) {
    this.removeItem(uid)
    this.addItem(uid, args, item)
  }
}
