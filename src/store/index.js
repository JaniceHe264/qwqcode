import {createStore} from 'vuex'
import mutation from "@/store/modules/mutation";
import actions from "@/store/action";

export default createStore({
  modules: {
    mutation
  },
  actions
})
