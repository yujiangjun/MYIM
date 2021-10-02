
/* jslint esversion:6 */
import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'

import {get,post} from './utils/http'

// import{init,webscoket} from './utils/ws'

import 'vant/lib/index.css'
// import { from } from 'core-js/core/array'

// import { from } from 'core-js/core/array'

//时间组件
import moment from 'moment'

const app = createApp(App)
app.use(router)
app.use(Vant);
app.mount('#app')
// init()

app.config.globalProperties.$get=get
app.config.globalProperties.$post=post
app.config.globalProperties.$moment=moment
// app.config.globalProperties.$websocket=webscoket
