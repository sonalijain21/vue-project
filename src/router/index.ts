import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../Components/Home.vue'
import ProblemDetails from '../Components/ProblemDetails.vue'
import QuestionCreate from '../Components/features/QuestionCreate.vue'

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
   {
    path: '/teacher/question/new',
    name: 'question-create',
    component: QuestionCreate,
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
