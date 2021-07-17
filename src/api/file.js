/**
 * created by SunJun on 2022/03/12
 * Description: 文件模块
 */
import request from "@/utils/request";

/**
 * 上传文件
 * @param data
 */
export function uploadImg(data) {
  return request({
    url: '/file/upload',
    method: 'POST',
    data
  })
}
