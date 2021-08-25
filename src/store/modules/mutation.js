import Cookie from "js-cookie";
import getters from "@/store/getters";
import {setUser, setToken, clearInfo, setAuth} from '@/store/type'
import {TOKEN_PREFIX} from "@/utils/utils";

/**
 * created by SunJun on 2022/03/11
 * Description: mutation
 */
const state = {
  token: Cookie.get("token") ? Cookie.get("token") : '',
  user: Cookie.get("user") ? JSON.parse(Cookie.get("user")) : '',
  auth: Cookie.get("auth") ? Cookie.get("auth") : ''
}

const mutations = {
  [setToken](state, token) {
    state.token = TOKEN_PREFIX + token;
    Cookie.set("token", state.token, {expires: 7}) // 七天后失效
  },
  [setUser](state, user) {
    state.user = user;
    // console.log(123)
    Cookie.set("user", JSON.stringify(state.user), {expires: 7})
  },
  [clearInfo](state) {
    state.token = '';
    state.user = '';
    state.auth = '';
    Cookie.set("token", '', {expires: -1})
    Cookie.set("user", '', {expires: -1})
    Cookie.set("auth", '', {expires: -1})
  },
  [setAuth](state, auth) {
    state.auth = auth;
    Cookie.set("auth", state.auth, {expires: 7})
  }
}

export default {
  state,
  mutations,
  getters
}
