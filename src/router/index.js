import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Components/Home.vue'
import ProblemDetails from '../Components/ProblemDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/problem/:id',
    name: 'ProblemDetails',
    component: ProblemDetails,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router