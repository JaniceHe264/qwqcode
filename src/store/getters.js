/**
 * created by SunJun on 2022/03/11
 * Description: getters
 */

const getters = {
  getToken: (state) => {
    return state.token;
  },
  getUser: (state) => {
    return state.user;
  }
}

export default getters;
