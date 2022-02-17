import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'virtual:windi.css'

import './assets/css/reset.css'
import './assets/js/iconfont.js'
import './mock/index.ts'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
