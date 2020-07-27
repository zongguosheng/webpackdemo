<template>
  <el-container>
    <baseheader></baseheader>
    <el-main>
      <div class="warp">
        <ul id="list" class="class-list">
          <li v-for="item in items" :key="item.index" >
              <a href="#" class="pic">
              <picture>
                <img v-bind:src="item.imgname" :type="item.category" @click="goInfo(item.category)" alt="" >
              </picture>
            </a>
            <h2>[{{item.category}}]</h2>
            <p v-html="item.notice" >
            </p>
          </li>
        </ul>
      </div>
    </el-main>
    <basefooter></basefooter>
  </el-container>
</template>
<script>
import axios from 'axios'
import baseheader from './header'
import basefooter from './footer'
import router from '../router'
import {cookie} from '../js/cookie'
export default {
  data () {
    return {
      cookiename: '123',
      items: [
        { imgname: 'static/images/media.jpg',
          category: '电影',
          notice: `阅读与写作总能让人身心愉悦，思维涌动<br>
            我爱小说，或只是不带任何立场的纯粹的故事<br>
            踏入时光河流，漫无目的地沉浮<br>
            这里有我畅游书海的感悟<br>
            和屈指可数几篇原创小说<br>` },
        { imgname: 'static/images/dream.jpg',
          category: '生活',
          notice: `阅读与写作总能让人身心愉悦，思维涌动<br>
            我爱小说，或只是不带任何立场的纯粹的故事<br>
            踏入时光河流，漫无目的地沉浮<br>
            这里有我畅游书海的感悟<br>
            和屈指可数几篇原创小说<br>` },
        { imgname: 'static/images/book.jpg',
          category: '阅读',
          notice: `阅读与写作总能让人身心愉悦，思维涌动<br>
            我爱小说，或只是不带任何立场的纯粹的故事<br>
            踏入时光河流，漫无目的地沉浮<br>
            这里有我畅游书海的感悟<br>
            和屈指可数几篇原创小说<br>` },
        { imgname: 'static/images/food.jpg',
          category: '美食',
          notice: `阅读与写作总能让人身心愉悦，思维涌动<br>
            我爱小说，或只是不带任何立场的纯粹的故事<br>
            踏入时光河流，漫无目的地沉浮<br>
            这里有我畅游书海的感悟<br>
            和屈指可数几篇原创小说<br>` },
        { imgname: 'static/images/photo.jpg',
          category: '摄影',
          notice: `阅读与写作总能让人身心愉悦，思维涌动<br>
            我爱小说，或只是不带任何立场的纯粹的故事<br>
            踏入时光河流，漫无目的地沉浮<br>
            这里有我畅游书海的感悟<br>
            和屈指可数几篇原创小说<br>` },
        { imgname: 'static/images/humor.jpg',
          category: '动漫',
          notice: `阅读与写作总能让人身心愉悦，思维涌动<br>
            我爱小说，或只是不带任何立场的纯粹的故事<br>
            踏入时光河流，漫无目的地沉浮<br>
            这里有我畅游书海的感悟<br>
            和屈指可数几篇原创小说<br>`
        }
      ]
    }
  },
  components: {
    baseheader,
    basefooter
  },
  methods: {
    goInfo: function (type) {
      console.log('点击')
      console.log(type)
      this.$router.push({name: 'postarticle', params: {article_type: type}});
    }
  }
}
</script>
