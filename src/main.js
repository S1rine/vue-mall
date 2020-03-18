import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'common/toast'

Vue.config.productionTip = false

// 安装 toast 插件 => 调用 toast.install
Vue.use(toast)
Vue.use(VueLazyLoad)

// 给 Vue 的原型挂载 $bus
Vue.prototype.$bus = new Vue()

// 解决移动端 300ms 延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
