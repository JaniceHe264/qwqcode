/**
 * created by SunJun on 2022/03/17
 * Description: 评论模块
 */

import request from "@/utils/request";

export function addComment(data) {
  return request({
    url: '/comment/add',
    method: 'PUT',
    data
  })
}

/**
 * 获取评论或回复列表
 */
export function getCommentList(params) {
  return request({
    url: '/comment/list',
    method: 'GET',
    params
  })
}
