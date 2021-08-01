/**
 * created by SunJun on 2022/03/17
 * Description: 用户模块
 */

import request from "@/utils/request";

/**
 * 修改密码
 * @param data
 * @returns {AxiosPromise}
 */
export function updateUserPass(data) {
  return request({
    url: '/user/update/pass',
    method: 'POST',
    data
  })
}

/**
 * 根据生日获取 生肖和属相
 * @param data
 */
export function getDateZodiac(dateStr) {
  return request({
    url: `/user/calc/zodiac/${dateStr}`,
    method: 'GET'
  })
}

/**
 * 修改用户信息
 */
export function updateUserInfo(data) {
  return request({
    url: '/user/update',
    method: 'POST',
    data
  })
}

/**
 * 获取用户文章数量信息
 */
export function getUserArticleNum() {
  return request({
    url: '/user/article/data',
    method: 'GET'
  })
}
