import { createRouter, createWebHistory } from 'vue-router';
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
      title: 'Chat',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/chat',
    name: 'Chat',
    component: () => import(
      /* webpackChunkName: "ChatNetworking" */ '../modules/client/pages/networking/ChatNetworking.vue'
    )
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
      title: 'Photo',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/photos',
    name: 'Photo',
    component: () => import(/* webpackChunkName: "contact" */ '../modules/client/pages/photo/Photo.vue'),
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
      title: 'Resources',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: '/resources',
    name: 'Resources',
    component: () => import(/* webpackChunkName: "requestsend" */ '../modules/client/pages/resources/Rosources.vue'),
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
      title: 'Mapa',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: "/mapa",
    name: 'Map',
    props: true,
    component: () => import('../modules/client/pages/map/Map')
  },
  {
    meta: {
      title: 'Certificados',
      requiresAuth: true,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: "/certificados",
    name: 'Certificate',
    props: true,
    component: () => import('../modules/client/pages/certificates/Certificate')
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

  { //TODO: pendiente por revisar
    meta: {
      title: 'Not Found',
      requiresAuth: false,
    },
    beforeEnter: [isAuthenticatedGuard],
    //path: '/:catchAll(.*)',
    path: '/error404',
    name: 'Error404',
    component: () => import('../modules/client/pages/Page404/NoFound'),
  },

  {
    meta: {
      title: 'Landing',
      requiresAuth: false,
    },
    beforeEnter: [isAuthenticatedGuard],
    path: "/:webAppPath?",
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

