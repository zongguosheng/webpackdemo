<template>
  <el-container>
    <baseheader></baseheader>
    <el-main>
      <div class="warp">
        <section>
           <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文章标题">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="文章类型">
              <el-select v-model="form.type" placeholder="请选择文章类型">
                <el-option label="生活" value="生活"></el-option>
                <el-option label="电影" value="电影"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="文章内容">
              <el-input type="textarea" v-model="form.article_info"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </section>
      </div>
    </el-main>
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
