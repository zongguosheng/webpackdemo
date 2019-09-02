<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <router-view class="aaa"> </router-view>
    </div>
</template>

<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: '第一个Hi页面'
    }
  }
}
</script>
