<template>
  <div id="app">
      <router-view></router-view>
      <AppTabbar v-show='$route.meta.isShowTabbar'></AppTabbar>
  </div>
</template>

<script>
import AppTabbar from '@/components/AppTabbar.vue'
export default {
  data () {
    return {
      
    }
  },
  components: {
    AppTabbar
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  background: #efefef;
  min-height: 100%;
  font-size: .14rem;
}
body, html {
  height: 100%;
}
html {
  font-size: 100px!important;  // rem换算  设置字体16px ，写成多少rem?  此时1rem=100px,  .16rem
}

</style>
