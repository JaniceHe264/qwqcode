/**
 * created by SunJun on 2022/03/15
 * Description: 收藏关注模块
 */

import request from "@/utils/request";

/**
 * 添加收藏或关注
 * @param data
 */
export function addCollect(data){
  return request({
    url: '/collect/add',
    method: 'PUT',
    data
  })
}
