import { configure } from '@storybook/vue'
import Vue from 'vue'

// temp hack to register vgg components globally
import components from '../src/components'
for (let key in components) {
  Vue.component(`Vgg${key}`, components[key])
}

function loadStories() {
  // You can require as many stories as you need.
  require('../stories')
}

configure(loadStories, module)
