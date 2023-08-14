import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  // TODO1: 配置基地址以及超时时间
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // TODO2：携带token等用户信息
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 返回成功
    // TODO3：业务处理成功，摘取核心响应数据
    if (response.data.code === 0) {
      return response
    }
    // TODO4：业务处理失败
    //失败，错误提示，抛出错误
    ElMessage.error(response.data.message || '服务异常')
    return Promise.reject(response.data)
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // TODO5：处理特殊情况
    //错误的特殊情况
    if (error.response?.status === 401) {
      router.push('/login')
    }

    //错误的默认情况
    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
