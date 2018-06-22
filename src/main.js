import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLayLoad from "vue-lazyload"
import http from './utils/request.js'
import store from '@/store/store.js'
import Vuelidate from 'vuelidate'
import './assets/fonts/iconfont.css'
import './assets/fonts/demo.css'
import '../node_modules/swiper/dist/css/swiper.css'

Vue.use(http)
Vue.use(Vuelidate)
Vue.use(VueLayLoad,{
  error:'/src/assets/images/err.jpg',//加载出错时的图片
  loading:'/src/assets/images/logo.gif'//家在过程中过渡的图片
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
