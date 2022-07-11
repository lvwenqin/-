// @ts-nocheck
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

//在新版本的vue-router中，重复点击同一个路由会出现报错:改写push
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(() => {})
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      activeNum: 0,
      isShowTabbar: true
    },
    children: [
      {
        path: 'searchPopup',
        name: 'SearchPopup',
        component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/SearchPopup.vue')
      },
    ]
  },
  {
    path: '/',
    redirect:'/home'
  },
  // 其它四个页面路由
  {
    path: '/topic',
    name: 'Topic',
    meta: {
      activeNum: 1,
      isShowTabbar: true
    },
    component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/Topic.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta: {
      activeNum: 2,
      isShowTabbar: true
    },
    component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/Category.vue'),
    children: [
      {
        path: 'searchPopup',
        name: 'SearchPopup2',
        component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/SearchPopup.vue')
      },
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      activeNum: 3,
      isShowTabbar: true
    },
    component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/Cart.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      activeNum: 4,
      isShowTabbar: true
    },
    component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/User.vue')
  },
  // 产品详情页路由
  {
    path: '/productDetail',
    name: 'ProductDetail',
    meta: {
      activeNum: 4
    },
    component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/ProductDetail.vue'),
    children: [
      {
        path: 'searchPopup',
        name: 'SearchPopup1',
        component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/SearchPopup.vue')
      },
    ]
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 前置路由守卫
router.beforeEach ((to, from, next) => {
  let token = localStorage.getItem ('token')
  if (to.path == '/cart') {
    // 判断是否登录，是否有token
    if (token) {
      next ()
    } else {
      Vue.prototype.$toast ('请先登录')
      setTimeout (() => {
        next ('/user')
      }, 1000)
    }
  }
  next ()
})

export default router
