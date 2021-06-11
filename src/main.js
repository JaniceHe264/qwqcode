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

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
