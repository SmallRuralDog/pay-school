import axios from 'axios'
let userAgentInfo = navigator.userAgent
let isiOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
let http = axios.create({
  baseURL: HOST + '/api/',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + TOKEN,
    'InUrl': INURL,
    'IsIos': isiOS
  }
})
export default {
  get (url) {
    return new Promise((resolve, reject) => {
      http.get(url).then(res => {
        resolve(res.data)
      }).catch(error => {
        if (error.response) {
          resolve(error.response.data)
        } else {
          reject(error)
        }
      })
    })
  },
  post (url, params) {
    return new Promise((resolve, reject) => {
      http.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        if (error.response) {
          resolve(error.response.data)
        } else {
          reject(error)
        }
      })
    })
  }
}
