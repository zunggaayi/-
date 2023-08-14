import request from '@/utils/request.js'
//注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}
//登录接口
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', {
    username,
    password
  })
}

//获取用户信息
export const userGetInfoService = () => {
  return request.get('/my/userinfo')
}

//更新用户个人资料
export const userSetInfoService = (data) => {
  return request.put('/my/userinfo', data)
}
//更换头像
//格式base64字符串
export const userSetAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}

//重置密码
export const userSetPasswordService = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
}
