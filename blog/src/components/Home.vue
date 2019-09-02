<template>
    <div class="login">
        <el-row :gutter="20">
          <el-col :span="12"  :offset='6'>{{notice_info }}
          </el-col>
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
                <el-button @click="checkUsers">登录</el-button>
            </div>
            </el-form>
          </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
import axios from 'axios'
export default {
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
      var self = this // 很关键
      console.log(this.ruleForm.username)
      console.log('===')
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
        var i, flag
        for (i in response.data) {
          if (name == response.data[i].user_name && pwd == response.data[i].user_pwd && name != '' && pwd != '') {
            flag = 'allright'
          } else {
            self.notice_info = '用户名不存在或密码错误'
          }
        }
        if (flag == 'allright') {
          self.notice_info = '登陆成功'
        }
      }).catch(function (error) {
        console.log(error)
        self.notice_info = '服务器繁忙，请稍后重试!(Error code: 504)'
      })
    }
  }
}
</script>
<style  src="../assets/css/main.css"></style>
