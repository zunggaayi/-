import { defineStore } from 'pinia'
import { ref } from 'vue'

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
    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true
  }
)
