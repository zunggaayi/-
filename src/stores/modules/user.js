import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService, userSetInfoService } from '@/api/user.js'

// 用户模块 Token setToken removeToken
export const useUserStore = defineStore(
  'big-user', // 唯一标识，并且使用了持久化插件的话，默认使用这个名字作为本地存储的名字，因此不宜太简单
  () => {
    //-------用户标识token------//
    const token = ref('')
    const setToken = (newVal) => {
      token.value = newVal
    }
    const removeToken = () => {
      token.value = ''
    }
    //-------用户信息-------//
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const setUser = async (obj) => {
      await userSetInfoService(obj)
      user.value = obj
    }
    // 必须要return将方法和属性暴露出去，不然其他地方使用不了
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  // 在第三个参数的位置设置是否需要开启持久化
  {
    persist: true
  }
)
