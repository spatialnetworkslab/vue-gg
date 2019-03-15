import Vue from 'vue'
import VueGG from '../../../src/index.js'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueGG)

new Vue({
  render: h => h(App),
}).$mount('#app')
