/**
 * created by SunJun on 2022/03/10
 * Description: 认证模块接口
 */
import request from '@/utils/request'

export function captcha() {
  return request({
    url: '/auth/captcha',
    method: 'GET'
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret.substring(0, ret.length - 1)
    }],
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'GET'
  })
}
