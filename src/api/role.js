/**
 * created by SunJun on 2022/03/24
 * Description: 角色模块
 */
import request from "@/utils/request";

/**
 * 删除角色
 * @param roleId
 */
export function delRole(roleId){
  return request({
    url: `/role/del/${roleId}`,
    method: 'DELETE',
  })
}

/**
 * 保存角色
 * @param data
 * @returns {AxiosPromise}
 */
export function saveRole(data) {
  return request({
    url: '/role/save',
    method: 'PUT',
    data
  })
}

/**
 * 根据角色id设置菜单列表
 * @param data
 */
export function setRoleMenu(data) {
  return request({
    url: '/role/set/menu',
    method: 'PUT',
    data
  })
}

/**
 * 获取角色列表
 * @param params
 * @returns {AxiosPromise}
 */
export function getRoleList(params) {
  return request({
    url: "/role/list",
    method: 'GET',
    params
  })
}
