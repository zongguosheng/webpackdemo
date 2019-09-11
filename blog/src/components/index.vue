<template>
  <el-container>
  <el-header>
    <div class="logo"></div>
    <ul class="headerlist">
      <li><a href="">关于Me</a></li>
      <li><a href="">我的位置</a></li>
      <li><a href="">日志分类</a></li>
      <li><a href="">日历</a></li>
    </ul>
  </el-header>
  <el-main>
    <div class="warp">
      <ul id="list" class="class-list">
        <li v-for="item in items" :key="item.index" >
            <a href="#" class="pic">
            <picture>
              <img v-bind:src="item.imgname" alt="" >
            </picture>
          </a>
          <h2>[{{item.category}}]</h2>
          <p>
            阅读与写作总能让人身心愉悦，思维涌动<br>
            我爱小说，或只是不带任何立场的纯粹的故事<br>
            踏入时光河流，漫无目的地沉浮<br>
            这里有我畅游书海的感悟<br>
            和屈指可数几篇原创小说<br>
          </p>
        </li>
      </ul>
    </div>
  </el-main>
  <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
export default {
  // mounted () {
  //   this.getArticle()
  // },
  data () {
    return {
      items: [
        { imgname: 'static/images/media.jpg', category: '电影' },
        { imgname: 'static/images/dream.jpg', category: '生活' },
        { imgname: 'static/images/book.jpg', category: '阅读' },
        { imgname: 'static/images/food.jpg', category: '美食' },
        { imgname: 'static/images/photo.jpg', category: '摄影' },
        { imgname: 'static/images/humor.jpg', category: '动漫' }
      ]
    }
  }
  // methods: {
  //   getArticle: function () {
  //   }
  // }
}
</script>
