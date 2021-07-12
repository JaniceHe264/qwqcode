/**
 * created by SunJun on 2022/02/22
 * 封装axios
 * */

import axios from 'axios'
import {baseApi} from '@/config'
import Cookie from "js-cookie";

const request = axios.create({
  baseURL: baseApi,
})

request.interceptors.request.use(config => {
  if (Cookie.get("token")) {
    config.headers['Authorization'] = Cookie.get("token")
  }
  return config;
})

request.interceptors.response.use(res => {
  const result = res.data;
  return Promise.resolve(result)
})

export default request
