import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService, userSetInfoService } from '../../api/user'

// 用户模块 Token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newVal) => {
      token.value = newVal
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const setUser = async (obj) => {
      await userSetInfoService(obj)
      user.value = obj
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
