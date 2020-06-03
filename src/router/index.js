import Vue from 'vue'
import VueRouter from 'vue-router'
//import Cookies from 'js-cookie'
import Admin from '../views/admin/Dashboard.vue'
import Peneliti from '../views/peneliti/Dashboard.vue'
import Operator from '../views/operator/Dashboard.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {requiresAuth: true}
  },
  {
    path: '/peneliti',
    name: 'Peneliti',
    component: Peneliti,
    meta: {requiresAuth: true}
  },
  {
    path: '/operator',
    name: 'Operator',
    component: Operator,
    meta: {requiresAuth: true}
  }
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue'),
    meta: { requiresAuth: true}
  }*/
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if(authUser && authUser.access_token){
      next()
    }else(next({name: 'Login'}))
  }
  next()
})
export default router
