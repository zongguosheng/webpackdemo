import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import About from '@/views/About'
import Mypicture from '@/views/Mypicture'
import Leavemessage from '@/views/Leavemessage'
import unusegood from '@/views/unusegood'
import work from '@/views/work'
import demo from '@/views/demo'
import music from '@/views/music'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta:{ 
        title:'首页'
      },
      component: Home
    },
    {
      path: '/views/About',
      name: 'About',
      component: About
    },
    {
      path: '/views/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/views/Leavemessage',
      name: 'Leavemessage',
      component: Leavemessage
    },
    {
      path: '/views/music',
      name: 'music',
      component: music
    },
    {
      path: '/views/unusegood',
      name: 'unusegood',
      component: unusegood
    },
    {
      path: '/views/work',
      name: 'work',
      component: work,
      meta:{ 
        title:'工作台'
      }
    },
    {
      path: '/views/Mypicture',
      name: 'Mypicture',
      component: Mypicture,
      meta:{ 
        title:'照片'
      }
    }
  ]
})
