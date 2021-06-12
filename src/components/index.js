/**
 * created by SunJun on 2022/02/23
 * 注册全局组件
 */

import Header from './header'

const globalComponent = {
  install(vue) {
    vue.component('Header', Header)
  }
}

export default globalComponent
