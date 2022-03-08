import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/css/reset.css'
import './assets/js/iconfont.js'
import './mock/index.ts'
import '@arco-design/web-vue/dist/arco.css'
import 'virtual:windi.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
