import Vue from 'vue'
import VueRouter from 'vue-router'
//import Cookies from 'js-cookie'
import Admin from '../views/admin/Dashboard.vue'
import AdminTemplate from '../views/admin/AdminTemplate.vue'
import UserManagement from '../views/admin/UserManagement.vue'
import Register from '../views/admin/Register.vue'
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
    component: AdminTemplate,
    children: [
      {path: '',
      component: Admin,
      meta: {requiresAuth: true}},
      {path: 'usermanagement',
      component: UserManagement,
      meta: {requiresAuth: true}},
      {path: 'register',
      component: Register,
      meta: {requiresAuth: true}}
    ],
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
  //console.log(to)
  if(to.meta.requiresAuth){
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if(authUser && authUser.access_token){
      next()
    }else{
      (next({name: 'Login'}))}
  }
  next()
})
export default router
