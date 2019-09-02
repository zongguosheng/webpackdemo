import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/scss/global.scss'
import '@/assets/scss/iconfont/iconfont.css'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component(VueCountdown.name, VueCountdown)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, /* 使用路由 */
  components: { App }, /* 告知当前页面想使用App这个组件 */
  template: '<App/>' /* 告知页面这个组件用这样的标签来包裹着,并且使用它 */
})
