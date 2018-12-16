import components from './components'

export default {
  install (Vue, options) {
    let prefix = 'Vgg'

    if (options) {
      if (options.prefix) {
        prefix = options.prefix
      }
    }

    for (let key in components) {
      let componentName = prefix + key

      Vue.component(componentName, components[key])
    }
  }
}
