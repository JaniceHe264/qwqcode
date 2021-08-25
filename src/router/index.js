import {createRouter, createWebHashHistory} from 'vue-router'
import {checkLogin} from "@/utils/utils";
import {ElNotification} from "element-plus";
import Cookie from 'js-cookie'
import {getUserMenuList} from "@/api/menu";

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
          requireAuth: true
        }
      }, {
        path: '/admin',
        name: 'AdminIndex',
        component: () => import('@/views/admin'),
        redirect: '/admin/article',
        children: [{
          path: '/admin/article',
          name: 'AdminArticle',
          component: () => import('@/views/admin/article'),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/admin/comment',
          name: 'AdminComment',
          component: () => import('@/views/admin/comment'),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/admin/menu',
          name: 'AdminMenuList',
          component: () => import('@/views/admin/menu'),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/admin/user',
          name: 'AdminUserList',
          component: () => import('@/views/admin/user'),
          meta: {
            requireAuth: true
          }
        }, {
          path: '/admin/role',
          name: 'AdminRole',
          component: () => import('@/views/admin/role'),
          meta: {
            requireAuth: true
          }
        }]
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// let flag = false;

router.beforeEach((to, from, next) => {
  // TMD 就是不行，等我以后在优化的！！！！！！
  // if (to.path.indexOf('admin') != -1 && Cookie.get("auth") && Cookie.get("auth").indexOf('sys:menu') != -1) {
  //   getUserMenuList().then(res => {
  //     const menuList = res.data;
  //     const tempRouter = menuList.filter(temp => temp.type == 1)
  //     let parentRouter = {
  //       path: '/admin',
  //       name: 'AdminIndex',
  //       component: () => import('@/views/admin'),
  //       redirect: '/admin/article',
  //       children: []
  //     }
  //     tempRouter.forEach(item => {
  //       let r = {
  //         path: item.path,
  //         component: () => import(item.componentPath),
  //         meta: {
  //           requireAuth: true
  //         }
  //       };
  //       parentRouter.children.push(r)
  //     })
  //     let newRouter = router.options.routes;
  //     newRouter[0].children.push(parentRouter)
  //     router.addRoute(newRouter)
  //   })
  // }

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
