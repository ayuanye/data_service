import axios from 'axios'
import config from '@/utils/config'
import { Message,Modal } from 'view-design'

axios.interceptors.request.use((config) => {
  const getToken = window.localStorage.getItem('userInfo')
  if(getToken){
    config.headers['token'] = JSON.parse(getToken).token
    // config.headers.Authorization = getToken.token
  }
  // 在发送请求之前做些什么
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  if (response.data.code !== 10000) {
    Message.error(response.data.message)
  }
  if (response.data.code == 20000 && response.data.message == '用户未登陆或登陆已失效') {
    Modal.error({
      title: '系统提示',
      content: '登录状态已过期，请重新登录',
      onOk: () => {
        window.location.href = '/#/login'
        localStorage.removeItem('appId')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userTempId_key')
        localStorage.removeItem('routesTagNames')
        localStorage.removeItem('__DC_STAT_UUID')
        localStorage.removeItem('loglevel:webpack-dev-server')
        localStorage.removeItem('userTempId')
      },
    });
    
  }
  return response
}, (error) => {
  // 对响应错误做点什么
  Message.error('Network Error')
  return Promise.reject(error)
})

export const serviceHandle = (method, path, param, headers) => {
  headers = headers|| {}
  method = method.toUpperCase()
  path = config.api + path
  // 对地址前缀与其他接口不同的进行区别对待
  if (method === 'GET') {
    return new Promise((resolve, reject) => {
      axios.get(path, { params: param }, { headers: headers }).then((response) => {
        resolve(response.data)
      })
    })
  } else if (method === 'POST') {
    return new Promise((resolve, reject) => {
      axios.post(path, param, { headers: headers }).then((response) => {
        resolve(response.data)
      })
    })
  }else if (method === 'DELETE') {
    return new Promise((resolve, reject) => {
      axios.delete(path, {data:param}, { headers: headers }).then((response) => {
        resolve(response.data)
      })
    })
  }
}
