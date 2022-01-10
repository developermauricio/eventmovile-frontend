import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/home/Home.vue')
  },

  {
    path: '/qr',
    name: 'Qr',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/qr/Qr.vue')
  },

  {
    path: '/networking',
    name: 'Networking',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/networking/Networking.vue')
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/event-live',
    name: 'eventLive',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/eventLive/EventLIVE')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

