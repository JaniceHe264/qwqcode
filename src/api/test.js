/**
 * created by SunJun on 2022/02/22
 * api 测试接口
 * */
import request from '@/utils/request'

export function testSendRequest() {
  return request({
    url: '/mcp/pc/pcsearch',
    method: 'POST'
  })
}
