import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/home',
    component: () => import('@/views/Index'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home')
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/views/detail')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
