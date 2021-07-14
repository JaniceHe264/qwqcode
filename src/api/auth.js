/**
 * created by SunJun on 2022/03/10
 * Description: 认证模块接口
 */
import request from '@/utils/request'

/**
 * 注册
 * @param data
 */
export function register(data) {
  return request({
    url: '/auth/register',
    method: 'POST',
    data
  })
}

/**
 * 发送数字验证码
 * @param data
 */
export function sendCode(data) {
  return request({
    url: '/auth/send-code',
    method: 'POST',
    data
  })
}

/**
 * 获取图片验证码
 * @returns {AxiosPromise}
 */
export function captcha() {
  return request({
    url: '/auth/captcha',
    method: 'GET'
  })
}

/**
 * 登录
 * @param data
 * @returns {AxiosPromise}
 */
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

/**
 * 退出登录
 * @returns {AxiosPromise}
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'GET'
  })
}
