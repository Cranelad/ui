import { createApp } from 'vue'
import '@cranelad/ui/bootstrap.scss'
import '@cranelad/ui/theme.scss'
import '@cranelad/ui/demo.css'
import CraneladUi from '@cranelad/ui'
import App from './App.vue'

createApp(App).use(CraneladUi).mount('#app')
