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

export function login() {
  return request({
    url: '/login',
    method: 'POST',
    headers: {
      contentType: 'application/x-www-form-urlencoded'
    }
  })
}
