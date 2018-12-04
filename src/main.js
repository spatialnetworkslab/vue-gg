import Vue from 'vue'
import App from './App.vue'
import components from './components'

Vue.config.productionTip = false

// Register components globally
for (let key in components) {
  console.log(`Vgg${key}`)
  Vue.component(`Vgg${key}`, components[key])
}

new Vue({
  render: h => h(App)
}).$mount('#app')
