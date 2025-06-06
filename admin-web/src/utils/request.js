import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store'

let loading, loadCount = 0,
  loadingArray = [];

export function startLoading() {
  loading = Loading.service({
    target: ".app-main",
    fullscreen: false
  })
  loadingArray.push(loading)
}

export function closeLoading() {
  if (loadCount > 0) {
    loadCount--
  }
  loadingArray.forEach(item => item.close())
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    startLoading()
    return config
  },
  error => {
    closeLoading()
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    let time11 = setTimeout(() => {
      closeLoading()
    }, 200);
    return res
  },
  error => {
    closeLoading()
    return Promise.reject(error)
  }
)

export default service