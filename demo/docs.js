import { createApp } from 'vue'
import '@cranelad/ui/style.scss'
import CraneladUi from '@cranelad/ui'
import Docs from './Docs.vue'

createApp(Docs).use(CraneladUi).mount('#app')
