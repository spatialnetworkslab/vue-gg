import components from './components'

export default {
  install (Vue, options) {
    let prefix = 'Vgg'

    if (options) {
      if (options.prefix) {
        prefix = options.prefix
      }
    }

    let uuid = 0
    Vue.mixin({
      beforeCreate () {
        this.uuid = uuid.toString()
        uuid += 1
      }
    })

    for (let key in components) {
      let componentName = prefix + key

      Vue.component(componentName, components[key])
    }
  }
}
