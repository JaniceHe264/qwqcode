/**
 * created by SunJun on 2022/03/15
 * Description: 足迹模块
 */
import request from "@/utils/request";

export function addFootprint(data){
  return request({
    url: '/footprint/add',
    method: 'PUT',
    data
  })
}
