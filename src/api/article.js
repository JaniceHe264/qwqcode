/**
 * created by SunJun on 2022/03/12
 * Description: 文章模块
 */
import request from "@/utils/request";

/**
 * 获取指定文章类型的最新列表
 * @param size
 * @param type
 */
export function getNewArticleList(current, size, type) {
  return request({
    url: `/article/new/list/${current}/${size}/${type}`,
    method: 'GET'
  })
}

/**
 * 获取指定文章类型的热门列表
 * @param size
 * @param type
 */
export function getHotArticleList(current, size, type) {
  return request({
    url: `/article/hot/list/${current}/${size}/${type}`,
    method: 'GET'
  })
}

/**
 * 获取指定类型的文章列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getFixArticleList(params) {
  return request({
    url: '/article/fix/type',
    method: 'GET',
    params
  })
}

/**
 * 添加浏览次数
 */
export function addBrowse(articleId) {
  return request({
    url: `/article/add/browse/${articleId}`,
    method: 'PUT'
  })
}

/**
 * 获取文章详情
 */
export function getArticleDetail(id) {
  return request({
    url: `/article/detail/${id}`,
    method: "GET"
  })
}

/**
 * 获取首页文章列表
 */
export function getHomeArticleList(type, page) {
  return request({
    url: `/article/list/${type}/${page.current}/${page.size}`,
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
