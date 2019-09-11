<template>
    <div class="login">
        <el-row :gutter="20">
          <el-col :span="12"  :offset='6'>{{notice_info }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"  :offset='6' class="algincentent"  ><div class="logo"><img src="../assets/logo.jpg"></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"  :offset='6'>
            <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form">
            <el-form-item label="账号" prop="username">
               <el-input type="text" prefix-icon="el-icon-user" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
                <el-input type="password" prefix-icon="el-icon-lock" v-model="ruleForm.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <div class="btn-group">
                <router-link to="/regist" class="regist" >注册</router-link>
                <el-button :plain="true" @click="checkUsers">登录</el-button>
            </div>
            </el-form>
          </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
import { Message } from 'element-ui'
import {mapState} from 'vuex'
import router from '../router'
import axios from 'axios'
export default {
  computed: mapState({
    user_name: state => state.user_name
  }),
  data () {
    // 验证用户名
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输用户名'))
        console.log('请输用户名')
      } else {
        console.log('用户名' + this.ruleForm.username)
        callback()
      }
    }
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.pwd !== '') {
          console.log('密码' + this.ruleForm.pwd)
        }
        callback()
      }
    }
    return {
      notice_info: '',
      ruleForm: {
        username: '',
        pwd: ''
      },
      rules: {
        username: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    checkUsers () {
      var name = this.ruleForm.username
      var pwd = this.ruleForm.pwd
      console.log(this.ruleForm.username)
      console.log(this.ruleForm.pwd)
      axios({
        method: 'get',
        url: 'api/user/searchUser',
        data: {
          user_name: name,
          user_pwd: pwd
        },
        timeout: 2000
      }).then(function (response) {
        console.log(response)
        console.log(response.status)
        var i, flag
        for (i in response.data) {
          if (name == response.data[i].user_name && pwd == response.data[i].user_pwd && name != '' && pwd != '') {
            flag = 'allright'
          }
        }
        if (flag == 'allright') {
          console.log()
          router.push('./index')
          Message({
            message: '登陆成功',
            duration: 2000,
            type: 'success',
            showClose: true
          })
          // setTimeout(window.location.href = './#/index', 2000)
        } else {
          Message({
            message: '用户名不存在或密码错误'
          })
        }
      }).catch(function (error) {
        console.log(error)
        Message({
          message: '服务器繁忙，请稍后重试!(Error code: 504)'
        })
      })
    }
  }
}
</script>
