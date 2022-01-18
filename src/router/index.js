import { createRouter, createWebHistory } from 'vue-router'
import isAuthenticatedGuard from "../auth-guard";
const routes = [

  {
    meta: {
      title: 'Login',
      requiresAuth: false,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/login/Login.vue')
  },

  {
    meta: {
      title: 'Inicio',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/home/Home.vue')
  },

  {
    meta: {
      title: 'Agenda',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/schedule',
    name: 'Schedule',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/schedule/Schedule.vue')
  },


  {
    meta: {
      title: 'Qr',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/qr',
    name: 'Qr',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/qr/Qr.vue')
  },

  {
    meta: {
      title: 'Networking',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/networking',
    name: 'Networking',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/networking/Networking.vue'),
  },
  {
    meta: {
      title: 'Contacts',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/networking-contacts',
    name: 'Contacts',
    component: () => import(/* webpackChunkName: "contact" */ '../modules/client/pages/networking/Contacts.vue'),
  },
  {
    meta: {
      title: 'Requestreceived',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/networking-request-received',
    name: 'Requestreceived',
    component: () => import(/* webpackChunkName: "requestreceived" */ '../modules/client/pages/networking/Requetsreceived.vue'),
  },
  {
    meta: {
      title: 'Requestsend',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/networking-request-send',
    name: 'Requestsend',
    component: () => import(/* webpackChunkName: "requestsend" */ '../modules/client/pages/networking/Requestsend.vue'),
  },
  {
    meta: {
      title: 'About',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    meta: {
      title: 'Speakers',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/speakers',
    name: 'ListSpeakers',
    component: () => import('../modules/client/pages/speakers/ListSpeakers')
  },
  {
    meta: {
      title: 'Event Live',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/event-live',
    name: 'eventLive',
    component: () => import(/* webpackChunkName: "about" */ '../modules/client/pages/eventLive/EventLIVE')
  },

  {
    meta: {
      title: 'Profile',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../modules/client/pages/profile/Profile.vue'),
  },

  {
    meta: {
      title: 'Landing',
      requiresAuth: false,
    },
    beforeEnter: [isAuthenticatedGuard],
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

