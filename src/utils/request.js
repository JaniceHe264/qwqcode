/**
 * created by SunJun on 2022/02/22
 * 封装axios
 * */

import axios from 'axios'
import {baseApi} from '@/config'
import Cookie from "js-cookie";

import {ElNotification} from 'element-plus'

const request = axios.create({
  baseURL: baseApi,
})

request.interceptors.request.use(config => {
  if (Cookie.get("token")) {
    config.headers['Authorization'] = Cookie.get("token")
  }
  if (config.url.indexOf('/file/upload') != -1) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
})

request.interceptors.response.use(res => {
    const result = res.data;
    if (res.data.code != 200) {
      ElNotification({
        title: '提示',
        message: res.data.message,
        type: 'error'
      })
      return Promise.reject(result || 'error')
    }
    return Promise.resolve(result)
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error);
  })

export default request
