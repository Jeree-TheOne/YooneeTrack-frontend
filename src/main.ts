import { createApp, VueElement } from 'vue'
import router from '@/pluguins/router'
import '@/interceptors/axios'
import App from './App.vue'

createApp(App).use(router).mount('#app')