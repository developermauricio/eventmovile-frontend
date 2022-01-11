import { createRouter, createWebHistory } from 'vue-router'
import isAuthenticatedGuard from "../auth-guard";
const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/login/Login.vue')
  },

  {
    beforeEnter: [isAuthenticatedGuard],
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/home/Home.vue')
  },

  {
    beforeEnter: [isAuthenticatedGuard],
    path: '/qr',
    name: 'Qr',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/qr/Qr.vue')
  },

  {
    beforeEnter: [isAuthenticatedGuard],
    path: '/networking',
    name: 'Networking',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/networking/Networking.vue')
  },

  {
    beforeEnter: [isAuthenticatedGuard],
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    beforeEnter: [isAuthenticatedGuard],
    path: '/event-live',
    name: 'eventLive',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/eventLive/EventLIVE')
  },

  {
    path:"/:webAppPath?",
    name: 'Landing',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/landing/Landing.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router

