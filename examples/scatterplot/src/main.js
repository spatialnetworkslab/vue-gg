import Vue from 'vue'
import VueGG from 'vue-gg'
Vue.use(VueGG)

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
