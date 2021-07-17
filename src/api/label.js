/**
 * created by SunJun on 2022/03/12
 * Description: 标签模块接口
 */
import request from "@/utils/request";


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
