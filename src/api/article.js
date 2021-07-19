/**
 * created by SunJun on 2022/03/12
 * Description: 文章模块
 */
import request from "@/utils/request";

/**
 * 获取文章详情
 */
export function getArticleDetail(id){
  return request({
    url: `/article/detail/${id}`,
    method: "GET"
  })
}

/**
 * 获取首页文章列表
 */
export function getHomeArticleList(page) {
  return request({
    url: `/article/list/${page.current}/${page.size}`,
    method: 'GET'
  })
}

/**
 * 保存文章
 * @param data
 * @returns {AxiosPromise}
 */
export function saveArticle(data) {
  return request({
    url: '/article/save',
    method: 'PUT',
    data
  })
}
