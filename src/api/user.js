/**
 * created by SunJun on 2022/03/17
 * Description: 用户模块
 */

import request from "@/utils/request";

/**
 * 获取用户文章数量信息
 */
export function getUserArticleNum() {
  return request({
    url: '/user/article/data',
    method: 'GET'
  })
}
