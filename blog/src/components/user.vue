<template>
  <el-container>
    <baseheader></baseheader>
      <div class="warp">
        <section class="userinfo">
              <div class="userimg"><img src="../assets/logo.jpg"></div>
              <p>ID:888</p>
              <p>生如夏花之绚烂，死如秋叶之静美</p>
        </section>
        <div class="container">
          <el-row :gutter="20">
            <el-col :span="6"><el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>我的资产</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的文章</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-document"></i>
                  <span slot="title">我喜欢的</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu>
              </el-col>
            <el-col :span="18">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                  <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                  <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                  <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </div>
      </div>
    <basefooter></basefooter>
  </el-container>
</template>

<script>
import { Message } from 'element-ui'
import {cookie} from '../js/cookie'
import baseheader from '../components/header'
import basefooter from '../components/footer'
import router from '../router'
import {formatTime} from '../../static/js/datetime'
import axios from 'axios'
export default {
  data () {
    return {
      activeName: 'second',
      form: {
        name: '',
        type: '',
        date: '',
        article_info: ''
      }
    }
  },
  components: {
    baseheader,
    basefooter
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    onSubmit () {
      var title = this.form.name
      var type = this.form.type
      var articleinfo = this.form.article_info
      var creattime = formatTime.gettime()
      var user = unescape(cookie.setInfo().name)
      console.log(creattime)
      axios({
        method: 'post',
        url: 'api/user/pushArticle',
        data: {
          article_title: title,
          author: user,
          article_info: articleinfo,
          date: creattime,
          article_type: type
        },
        timeout: 2000
      }).then(function (response) {
        console.log('response')
        console.log(response)
        if (response.status == 200) {
          router.push('./index')
          Message({
            message: '发布成功',
            duration: 2000,
            type: 'success',
            showClose: true
          })
        }
      }).catch(function (error) {
        console.log('error')
        console.log(error)
      })
    }
  }
}
</script>
