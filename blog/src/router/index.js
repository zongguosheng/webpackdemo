import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld from '@/components/HelloWorld'
import regist from '@/components/regist'
import index from '@/components/index'
import postarticle from '@/components/postarticle'
import pushArticle from '@/pages//pushArticle'
import user from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {title: '登录'},
      component: Home
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/regist',
      name: 'regist',
      meta: {title: '注册'},
      component: regist
    },
    {
      path: '/index',
      name: 'index',
      meta: {title: '日志分类'},
      component: index
    },
    {
      path: '/postarticle',
      name: 'postarticle',
      meta: {title: '文章列表'},
      component: postarticle
    },
    {
      path: '/user/pushArticle',
      name: 'pushArticle',
      meta: {title: '发表文章'},
      component: pushArticle
    },
    {
      path: '/user/user',
      name: 'user',
      meta: {title: '个人中心'},
      component: user
    }
  ]
})
