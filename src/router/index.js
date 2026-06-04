import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Home.vue'
import ProblemDetails from '../ProblemDetails.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
  path:'/problem/:id',
  component:ProblemDetails
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router