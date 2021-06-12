import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//======引入ElementUiPlus开始========
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//======引入ElementUiPlus结束========

//======引入阿里图标库开始======
import '@/assets/icon/iconfont.css'
//======引入阿里图标库结束======

//======引入全局css开始======
import '@/assets/css/global.css'
//======引入全局css结束======

//======引入注册的全局组件开始=======
import globalComponent from '@/components'
//======引入注册的全局组件结束=======

//======引入js-cookie工具包开始======
import Cookie from 'js-cookie'
//======引入js-cookie工具包结束======

const app = createApp(App);

app.config.globalProperties.$cookie = Cookie

app.use(store)
  .use(router)
  .use(ElementPlus)
  .use(globalComponent)
  .mount('#app');
