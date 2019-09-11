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
                <el-button type="primary" @click="regist" class="btn-long">注册</el-button>
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
      ruleForm: {
        username: '',
        pwd: ''
      },
      notice_info: '',
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
    // 注册用户
    regist: function () {
      var username = this.ruleForm.username
      var pwd = this.ruleForm.pwd
      var self = this
      console.log(username + pwd)
      axios({
        method: 'get',
        url: 'api/user/searchUser',
        data: {
          user_name: username,
          user_pwd: pwd
        },
        timeout: 2000
      }).then(function (res) {
        var i;
        var flag = 'noExist';
        for (i in res.data) {
          if (username == res.data[i].user_name) {
            flag = 'Exist'
          }
        }
        if (flag == 'Exist') {
          self.notice_info = '用户名已存在'
        } else if (flag == 'noExist') {
          axios({
            method: 'post',
            url: 'api/user/addUser',
            data: {
              user_name: username,
              user_pwd: pwd
            },
            timeout: 3000
          }).then(function (res) {
            console.log(res)
            if (res.status == 200) {
              self.notice_info = '注册成功'
            }
          })
        }
      }).catch(function (err) {
        console.log(err.data)
      })
    }
  }
}
</script>
