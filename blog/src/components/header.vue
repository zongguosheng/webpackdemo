<template name="base-header">
  <el-header>
    <div class="logo"></div>
    <ul class="headerlist">
      <li><router-link to="/postarticle">文章列表</router-link></li>
      <li><router-link to="/">我的位置</router-link></li>
      <li><router-link to="/index">日志分类</router-link></li>
      <li><router-link to="">日历</router-link></li>
      <li><router-link to="/user/pushArticle">发表文章</router-link></li>
      <li><router-link to="/user/user">用户{{cookiename}}您好</router-link></li>
    </ul>
  </el-header>
</template>

<script>
import {cookie} from '../js/cookie'
export default {
  data () {
    return {
      cookiename: ''
    }
  },
  name: 'base-header',
  props: [''],
  created: function () {
    var cookiename = unescape(cookie.setInfo().name)
    this.cookiename = cookiename
  },
  methods: {
    clickName: function () {
      console.log('点击')
    }
  }
}
</script>
