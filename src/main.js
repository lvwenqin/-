import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/vantUI/index.js' // 按需使用的vantz组件
import 'reset-css'  // 重置样式

Vue.config.productionTip = false

// 过滤器
Vue.filter("RMBformat",val=>{
  return "￥ "+val.toFixed(2)+" 元"
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
