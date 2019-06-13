import axios from 'axios'


axios.defaults.baseURL = process.env.REACT_APP_SECRET_API === 'test' ? 'https://xxx.dev.com':`${process.env.REACT_APP_API_HOST}`
axios.defaults.timeout = 100000 // 超时时间
axios.defaults.withCredentials = true // 允许跨域携带cookie
axios.defaults.headers = {
  Language:'zh_CN'
}

// const initCaptcha = (data) => axios({ method: 'post', url: '/file/upload', data: data })
// 文件获取
const initCaptcha = (data) => axios({ method: 'get', url: `/accounts/init-captcha`, params: data })
// 发送验证码
const sendVcode = (data) => axios({ method: 'post', url: '/accounts/send-verification-code', data: data })
// register
const register = (data) => axios({ method: 'post', url: '/accounts/register', data: data })


export {
  initCaptcha,
  sendVcode,
  register
}