/**
 * created by SunJun on 2022/02/22
 * 封装axios
 * */

import axios from 'axios'
import {baseApi} from '@/config'

const request = axios.create({
  baseURL: baseApi,
})

export default request
