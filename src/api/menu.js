/**
 * created by SunJun on 2022/03/23
 * Description: 菜单模块
 */
import request from "@/utils/request";

/**
 * 根据角色id查询菜单列表
 * @param roleId
 * @returns {AxiosPromise}
 */

/**
 * 获取用户菜单列表
 * @returns {AxiosPromise}
 */
export function getUserMenuList() {
  return request({
    url: '/sysMenu/user/list',
    method: 'GET'
  })
}

/**
 * 获取角色菜单列表
 * @param roleId
 * @returns {AxiosPromise}
 */
export function getMenuListByRoleId(roleId) {
  return request({
    url: `/sysMenu/list/${roleId}`,
    method: 'GET'
  })
}

/**
 * 获取菜单列表
 * @param type all 获取所有
 * @param showIsForBidden 是否显示禁用
 * @returns {AxiosPromise}
 */
export function getMenuList(type, showIsForBidden) {
  return request({
    url: `/sysMenu/list/${type}/${showIsForBidden}`,
    method: 'GET'
  })
}

/**
 * 保存菜单
 * @param data
 * @returns {AxiosPromise}
 */
export function saveMenu(data) {
  return request({
    url: '/sysMenu/save',
    method: 'PUT',
    data
  })
}
