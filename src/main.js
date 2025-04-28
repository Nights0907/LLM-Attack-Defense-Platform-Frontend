import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import './assets/main.css'  // 导入全局样式表

Vue.use(ElementUI)
Vue.config.productionTip = false

// 创建事件总线
Vue.prototype.$bus = new Vue()

// 配置axios
axios.defaults.baseURL = 'http://127.0.0.1:5000'  // 使用127.0.0.1代替localhost
// axios.defaults.withCredentials = true  // 允许跨域请求携带cookie（可能导致CORS问题）
axios.defaults.headers.common['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    console.log('发送请求:', config.url)
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    console.log('接收响应:', response.config.url, response.status)
    return response
  },
  error => {
    if (error.response) {
      // 服务器返回了错误状态码
      console.error('响应错误:', error.response.status, error.response.data)
    } else if (error.request) {
      // 请求已发送但没有收到响应
      console.error('无响应错误:', error.request)
    } else {
      // 请求设置时出现错误
      console.error('请求错误:', error.message)
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 