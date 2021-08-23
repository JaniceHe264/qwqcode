/**
 * created by SunJun on 2022/03/24
 * Description: 角色模块
 */
import request from "@/utils/request";

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
