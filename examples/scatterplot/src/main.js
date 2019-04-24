import Vue from 'vue'
import VueGG from 'vue-gg'

import App from './App.vue'

Vue.use(VueGG)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
