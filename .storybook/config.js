import { configure } from '@storybook/vue'
import Vue from 'vue'
import VueGG from '@'

Vue.use(VueGG)

function loadStories() {
  // You can require as many stories as you need.
  require('../stories')
}

configure(loadStories, module)
