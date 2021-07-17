/**
 * created by SunJun on 2022/03/11
 * Description: 工具类
 */
import Cookie from 'js-cookie'

// token前缀
export const TOKEN_PREFIX = "Bearer "

export function checkLogin(){
  return Boolean(Cookie.get("token") && Cookie.get("user"))
}

export function getColor(id) {
  if (id % 7 == 1) {
    return "#e27d7d"
  }
  if (id % 7 == 2) {
    return "#d6cc09"
  }
  if (id % 7 == 3) {
    return "#24bef8";
  }
  if (id % 7 == 4) {
    return "#92ab92";
  }
  if (id % 7 == 5) {
    return "#57c374";
  }
  if (id % 7 == 6) {
    return "#d070f5";
  }
  if (id % 7 == 0) {
    return "#e055a3";
  }
  return "#58bc85";
}

