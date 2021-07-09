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
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/category')
      },
      {
        path: '/tag',
        name: 'Tag',
        component: () => import('@/views/tag')
      },
      {
        path: '/question',
        name: 'Question',
        component: () => import('@/views/question')
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/views/personal')
      },
      {
        path: '/send-article',
        name: 'SendArticle',
        component: () => import('@/views/sendArticle')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
