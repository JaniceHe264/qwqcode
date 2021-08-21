/**
 * created by SunJun on 2022/03/17
 * Description: 评论模块
 */

import request from "@/utils/request";

/**
 * 管理端删除评论
 * @param id
 */
export function delCommentAdmin(id) {
  return request({
    url: `/comment/admin/del/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取管理端评论列表
 * @param data
 */
export function getAdminCommentList(data) {
  return request({
    url: '/comment/admin/list',
    method: 'POST',
    data
  })
}

/**
 * 删除回答 或 评论
 * @param id
 */
export function removeComment(id) {
  return request({
    url: `/comment/del/${id}`,
    method: 'DELETE'
  })
}

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
