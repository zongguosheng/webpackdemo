<template>
  <div class="navMenu">
      <template v-for="navMenu in navMenus">
           <el-menu-item v-if="!navMenu.children&&!navMenu.hidden" :key="navMenu.path">
             
           </el-menu-item>
      </template>
  </div>
</template>

<script>
export default {
  name: 'navMenu',
  props: ['navMenus'],
  data() {
    return {
      
    }
  },
}
</script>