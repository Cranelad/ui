import { createApp } from 'vue'
import '@cranelad/ui/style.scss'
import CraneladUi from '@cranelad/ui'
import Docs from './Docs.vue'

// The theme's mobile navbar styles apply inside .sidebar-collapse (see README).
document.body.classList.add('sidebar-collapse')

createApp(Docs).use(CraneladUi).mount('#app')
