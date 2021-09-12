
/* jslint esversion:6 */
import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'

import {get,post} from './utils/http'

import 'vant/lib/index.css'
// import { from } from 'core-js/core/array'

const app = createApp(App)
app.use(router)
app.use(Vant);
app.mount('#app')

app.config.globalProperties.$get=get
app.config.globalProperties.$post=post