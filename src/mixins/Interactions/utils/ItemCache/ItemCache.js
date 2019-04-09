export default class ItemCache {
  constructor () {
    this.cache = {}
  }

  hasItem (uid) {
    return this.cache.hasOwnProperty(uid)
  }

  itemIsIdentical (uid, newArgs) {
    if (!this.cache[uid]) { return false }

    let oldArgs = this.cache[uid].args
    for (let i = 0; i < oldArgs.length; i++) {
      if (oldArgs[i] !== JSON.stringify(newArgs[i])) {
        return false
      }
    }

    return true
  }

  addItem (uid, args, item, listeners) {
    let strArgs = args.map(arg => JSON.stringify(arg))
    this.cache[uid] = { args: strArgs, item, listeners }
  }

  getItem (uid) {
    return this.cache[uid].item
  }

  getListeners (uid) {
    return this.cache[uid].listeners
  }

  deleteItem (uid) {
    delete this.cache[uid]
  }

  updateItem (uid, args, item, listeners, selectable) {
    this.deleteItem(uid)
    this.addItem(uid, args, item, listeners)
  }

  updateListeners (uid, listeners) {
    this.cache[uid].listeners = listeners
  }
}
