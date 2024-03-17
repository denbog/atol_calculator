import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.scss'
import App from './App.vue'

const mountEl = document.querySelector('#app')

createApp(App, { ...mountEl.dataset }).use(createPinia()).mount('#app')
