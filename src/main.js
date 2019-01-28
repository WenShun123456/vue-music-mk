import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
// import Console from 'vconsole'

import 'common/stylus/index.styl'
// new Console();

document.addEventListener('click', function () {
  document.getElementsByTagName('audio')[0].play()
}, false)

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(vueLazyLoad, {
  loading: require('common/images/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
