import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import { install as MonacoEditorPlugin } from '@guolao/vue-monaco-editor'

const app = createApp(App)
app.use(router)

app.use(MonacoEditorPlugin, {
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs'
  }
})
app.mount('#app')