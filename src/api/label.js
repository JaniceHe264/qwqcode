/**
 * created by SunJun on 2022/03/12
 * Description: 标签模块接口
 */
import request from "@/utils/request";

/**
 * 强制删除
 * @param id
 */
export function forceDelLabel(id){
  return request({
    url: `/label/admin/forceDel/${id}`,
    method: 'DELETE'
  })
}

/**
 * 管理端删除标签
 * @param id
 * @param userId
 * @returns {AxiosPromise}
 */
export function delLabel(id, userId) {
  return request({
    url: `/label/admin/del/${id}/${userId}`,
    method: 'DELETE'
  })
}

/**
 * 管理端获取标签列表
 * @param name
 * @param current
 * @param size
 * @returns {AxiosPromise}
 */
export function getAdminLabelList(name, current, size) {
  return request({
    url: `/label/admin/list`,
    params: {
      name, current, size
    },
    method: 'GET'
  })
}

/**
 * 获取标签名字
 */
export function getAllLabelName() {
  return request({
    url: '/label/all/name',
    method: 'GET'
  })
}

/**
 * 获取标签列表
 * @returns {AxiosPromise}
 */
export function getLabelList() {
  return request({
    url: '/label/list',
    method: "GET",
  })
}
