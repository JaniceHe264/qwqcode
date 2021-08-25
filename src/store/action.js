/**
 * created by SunJun on 2022/03/11
 * Description: action
 */
import * as types from './type'
import {logout} from "@/api/auth";
import {ElNotification} from 'element-plus'

const actions = {
  setToken({commit}, token) {
    commit(types.setToken, token)
  },
  setUser({commit}, user) {
    commit(types.setUser, user)
  },
  setAuth({commit}, auth) {
    commit(types.setAuth, auth)
  },
  clearInfo({commit}, isHint) {
    const res = logout().then(res => {
      if (isHint) {
        ElNotification({
          type: 'success',
          title: '提示',
          message: res.message
        })
      }
      commit(types.clearInfo)
    })
  }
}

export default actions;
