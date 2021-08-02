/**
 * created by SunJun on 2022/03/18
 * Description: 字典模块
 */

import request from "@/utils/request";

/**
 * 根据字典名字获取字典详情列表
 */
export function getDictDetailList(name) {
  return request({
    url: `/dictDetail/list/${name}`,
    method: 'GET'
  })
}
