/**
 * created by SunJun on 2022/03/12
 * Description: 文章模块
 */
import request from "@/utils/request";

export function saveArticle(data){
  return request({
    url: '/article/save',
    method: 'PUT',
    data
  })
}
