/**
 * created by SunJun on 2022/02/22
 * 封装axios
 * */

import axios from 'axios'
import {baseApi} from '@/config'

const request = axios.create({
  baseURL: baseApi,
})

request.interceptors.response.use(res => {
  const result = res.data;
  return Promise.resolve(result)
})

export default request
