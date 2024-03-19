import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.scss'
import App from './App.vue'

const mountEl = document.querySelector('#app')

const app = createApp(App, { ...mountEl.dataset })

app.config.globalProperties.$filters = {
    formatCurrency(value) {
        return new Intl.NumberFormat('ru-RU').format(value)
    }
}

app.use(createPinia())
app.mount('#app')