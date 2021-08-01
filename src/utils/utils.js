/**
 * created by SunJun on 2022/03/11
 * Description: 工具类
 */
import Cookie from 'js-cookie'


/**
 * token前缀
 */
export const TOKEN_PREFIX = "Bearer "

/**
 * 格式化日期
 * @param date
 * @param fmt
 * @returns {*}
 */
export function dateFormat(date, fmt) {
  const o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "H+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

/**
 * 判断是否登录
 * @returns {boolean}
 */
export function checkLogin() {
  return Boolean(Cookie.get("token") && Cookie.get("user"))
}

/**
 * 根据颜色获取id
 * @param id
 * @returns {string}
 */
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

