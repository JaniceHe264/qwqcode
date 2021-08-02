import {createRouter, createWebHashHistory} from 'vue-router'
import {checkLogin} from "@/utils/utils";
import {ElNotification} from "element-plus";

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
        component: () => import('@/views/home'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/views/detail'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/category'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/tag',
        name: 'Tag',
        component: () => import('@/views/tag'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/question',
        name: 'Question',
        component: () => import('@/views/question'),
        meta: {
          requireAuth: false
        }
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('@/views/personal'),
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/send-article',
        name: 'SendArticle',
        component: () => import('@/views/sendArticle'),
        meta: {
          requireAuth: false
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!checkLogin()) {
      ElNotification({
        type: 'error',
        title: '提示',
        message: '请先登录'
      })
      next({
        path: '/home',
        name: 'Home'
      })
    }
  }
  next();
})

export default router
