// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/css/reset.css'
import './assets/css/main.css'

// import { Button, Select } from 'element-ui' 引入部分组件

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios // 全局注册 使用方法为:this.$axios
// Vue.use(VueAxios, axios)
/* eslint-disable no-new */
router.beforeEach((to, form, next) => {
  window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
  next()
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
