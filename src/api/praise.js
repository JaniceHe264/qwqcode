/**
 * created by SunJun on 2022/03/15
 * Description: 点赞模块
 */
import request from "@/utils/request";

/**
 * 点赞
 * @param data
 * @returns {AxiosPromise}
 */
export function addPraise(data) {
  return request({
    url: '/praise/add',
    method: 'PUT',
    data
  })
}
