<template name="base-header">
    <!-- <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff"  active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
          </el-menu> -->
    <el-menu  :default-active="this.$route.path"  class="el-menu-demo" router  mode="horizontal"   @select="handleSelect"   background-color="#545c64"   text-color="#fff"   active-text-color="#ffd04b">
      <template v-for="navMenu in navList">
           <el-menu-item v-if="!navMenu.children&&!navMenu.hidden" :key="navMenu.path" :index='navMenu.name'>
             {{navMenu.navitem}}
           </el-menu-item>
           <el-submenu  v-if="navMenu.children && !navMenu.hidden"  :key="navMenu.path" :index='navMenu.name' >
              <template slot="title">
                {{navMenu.navitem}}
              </template>
              <el-menu-item v-for="subitem in navMenu.children" :key="subitem.path" :index='subitem.path'>{{subitem.subname}}</el-menu-item>
            </el-submenu>
      </template>
      <!-- <el-menu-item index="1" >个人中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">我的照片</el-menu-item>
        <el-menu-item index="2-2">我的音乐</el-menu-item>
        <el-menu-item index="2-3">我的游戏</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">我的绿植</template>
          <el-menu-item index="2-4-1">多肉</el-menu-item>
          <el-menu-item index="2-4-2">藤爬</el-menu-item>
          <el-menu-item index="2-4-3">盆栽</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" >我的留言</el-menu-item>
      <el-menu-item index="4"><a href="#e" target="_blank">闲置物品</a></el-menu-item> -->
    </el-menu>
</template>

<script>
// import {cookie} from '../js/cookie'
export default {
  data () {
    return {
      navList:[
        {name: '/' , navitem: '个人中心'},
        {name: '/views/work' , navitem: '我的工作台',
         children: [
          {path: '/views/mypicture', subname : '我的照片'},
          {path: '/views/music', subname : '我的音乐'},
          {path: '/views/game', subname : '我的游戏'}
        ]},
        {name: '/views/Leavemessage' , navitem: '我的留言'},
        {name: '/views/unusegood' , navitem: '闲置物品'},
        {name: '/views/botany' , navitem: '我的绿植',
         children: [
          {path: '/views/duorou', subname : '多肉'},
          {path: '/views/tengpa', subname : '藤爬'},
          {path: '/views/penzai', subname : '盆栽'}
        ]}    
       ]
    }
  },
  name: 'base-header',
  props: [''],
  created: function () {
    // var cookiename = unescape(cookie.setInfo().name)
    // this.cookiename = cookiename
    console.log('==')
    console.log('')

  },
  methods: {
    clickName: function () {
      console.log('点击')
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        console.log(this.$route.path);
      }
  }
}
</script>