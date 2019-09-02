import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/page/index'
import Hi from '@/components/Hi'
import news from '@/components/news'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/hi',
      component: Hi,
      children: [
        {path: '/', component: Hi},
        {path: 'news', component: news}
      ]
    }
  ]
})
