import Vue from 'vue'
import App from './App.vue'
import store from "./store"

Vue.config.productionTip = false

Vue.filter('reverse', value => {
  return value.slice().reverse()
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')