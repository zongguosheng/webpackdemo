<template>
  <div class="home">
    <div class="header">
    <baseheder></baseheder>
    <router-link to="/views/demo" class="demo">DEMO</router-link>
    </div>
    <!-- {{ $store.state.name }} -->
    <div class="wrap">
      <el-row type="flex" class="listimg" justify="center">
        <el-col :span="6"  v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" class="listimg" justify="center">
        <el-col :span="6"  v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <basefooter></basefooter>
  </div>
</template>

<script>
import baseheder from '../components/header'
import basefooter from '../components/footer'
// import router from '../router'
export default {
  name: 'home',
  components: {
    baseheder,
    basefooter
  },
  data () {
    return {
      currentDate: new Date(),
      msg: ''
    }
  }
}
</script>

<style scoped>
   .header{ display: flex; flex-direction: row; justify-content: space-between; align-items: center; background-color: rgb(84, 92, 100);}
   .demo{ color: #fff;}
</style>

