import Vue from 'vue'

export function createPropCache (instance, propKeys) {
  let propVals = instance.$options.propsData

  let props = {}
  for (let key of propKeys) {
    props[key] = propVals[key] || undefined
  }

  return Vue.observable(props)
}

export function createWatchers (instance, propCache) {
  for (let key in propCache) {
    instance.$watch(key, function (newVal, oldVal) {
      let cachedVal = propCache[key]
      if (JSON.stringify(cachedVal) !== JSON.stringify(newVal)) {
        Vue.set(propCache, key, newVal)
      }
    })
  }
}
