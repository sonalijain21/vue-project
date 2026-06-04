import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import MonacoEditor from '@guolao/vue-monaco-editor'

const app = createApp(App)
app.use(router)

app.use(MonacoEditor, {
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
  }
})
app.mount('#app')