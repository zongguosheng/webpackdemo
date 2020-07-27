// 列表
<template>
  <el-container>
  <baseheader></baseheader>
  <el-main>
    <div class="warp">
      <div id="newslist" class="newslist">
        <article v-for="item in articles" :key="item.index" class="articlelist" >
           <h2 class="newstitle">{{item.article_info}}</h2>
           <p>{{item.article_info}}</p>
           <article class="biaoqian">
              <span>作者：{{item.author}}</span><span>类别：{{item.article_type}}</span><span>日期: {{item.date}}</span>
           </article>
        </article>
      </div>
    </div>
  </el-main>
  <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import baseheader from './header'
import basefooter from './footer'
import {cookie} from '../js/cookie'
import axios from 'axios'
import router from '../router'
export default {
  data () {
    return {
      articles: []
    }
  },
  components: {
    baseheader,
    basefooter
  },
  created: function () {
    var that = this
    var type = this.$route.params.article_type
    console.log(type)
    axios({
      method: 'post',
      url: 'api/user/searchArticle',
      data: {
        article_type: type
      },
      timeout: 2000
    }).then(function (response) {
      console.log(response)
      console.log(response.data)
      that.articles = JSON.parse(JSON.stringify(response.data))
      console.log(response.data[0].article_title)
      // this.content = response.article_info
      // this.author = response.author
      // this.article_type = response.article_type
      // this.data = response.data
    }).catch(function (error) {
      console.log(error)
    })
  }
}
</script>
