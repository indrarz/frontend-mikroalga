import Vue from 'vue'
import VueRouter from 'vue-router'
//import Cookies from 'js-cookie'
import Admin from '../views/admin/Dashboard.vue'
import AdminTemplate from '../views/admin/AdminTemplate.vue'
import UserManagement from '../views/admin/UserManagement.vue'
import Register from '../views/admin/Register.vue'
import Mikroalga from '../views/admin/Mikroalga.vue'
import Kolam from '../views/admin/Kolam.vue'
import AkunAdmin from '../views/admin/Akun.vue'
import PenelitiTemplate from '../views/peneliti/PenelitiTemplate.vue'
import Peneliti from '../views/peneliti/Dashboard.vue'
import LogDataPeneliti from '../views/peneliti/LogData.vue'
import Perizinan from '../views/peneliti/Perizinan.vue'
import Produksi from '../views/peneliti/Produksi.vue'
import AkunPeneliti from '../views/peneliti/Akun.vue'
import OperatorTemplate from '../views/operator/OperatorTemplate.vue'
import Operator from '../views/operator/Dashboard.vue'
import LogDataOperator from '../views/operator/LogData.vue'
import ProduksiOperator from '../views/operator/Produksi.vue'
import AkunOperator from '../views/operator/Akun.vue'
import IzinOperator from '../views/operator/Perizinan.vue'
import Login from '../views/Login.vue'
import Errorpage from '../views/Error.vue'

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
      meta: {requiresAuth: true, isAdmin: true}},
      {path: 'usermanagement',
      component: UserManagement,
      meta: {requiresAuth: true, isAdmin: true}},
      {path: 'register',
      component: Register,
      meta: {requiresAuth: true, isAdmin: true}},
      {path: 'mikroalga',
      component: Mikroalga,
      meta: {requiresAuth: true, isAdmin: true}},
      {path: 'kolam',
      component: Kolam,
      meta: {requiresAuth: true, isAdmin: true}},
      {path: 'akun',
      component: AkunAdmin,
      meta: {requiresAuth: true, isAdmin: true}}
      
    ],
    meta: {requiresAuth: true, isAdmin: true}
  },
  {
    path: '/peneliti',
    component: PenelitiTemplate,
    children: [
      {path: '',
      component: Peneliti,
      meta: {requiresAuth: true, isPeneliti: true}},
      {path: 'logdata',
      component: LogDataPeneliti,
      meta: {requiresAuth: true, isPeneliti: true}},
      {path: 'perizinan',
      component: Perizinan,
      meta: {requiresAuth: true, isPeneliti: true}},
      {path: 'produksi',
      component: Produksi,
      meta: {requiresAuth: true, isPeneliti: true}},
      {path: 'akun',
      component: AkunPeneliti,
      meta: {requiresAuth: true, isPeneliti: true}}
    ],
    meta: {requiresAuth: true, isPeneliti: true}
  },
  {
    path: '/operator',
    component: OperatorTemplate,
    children: [
      {path: '',
      component: Operator,
      meta: {requiresAuth: true, isOperator: true}},
      {path: 'logdata',
      component: LogDataOperator,
      meta: {requiresAuth: true, isOperator: true}},
      {path: 'produksi',
      component: ProduksiOperator,
      meta: {requiresAuth: true, isOperator: true}},
      {path: 'akun',
      component: AkunOperator,
      meta: {requiresAuth: true, isOperator: true}},
      {path: 'perizinan',
      component: IzinOperator,
      meta: {requiresAuth: true, isOperator: true}}
    ],
    meta: {requiresAuth: true, isOperator: true}
  },
  {
    path: '/error',
    name: 'Error',
    component: Errorpage,
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
  //console.log(from)
  if(to.meta.requiresAuth){
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    const role = JSON.parse(window.localStorage.getItem('role'))
    if(authUser && authUser.access_token){
      if((to.meta.isAdmin && role != 1) || (to.meta.isPeneliti && role != 2) || (to.meta.isOperator && role != 3)){
        (next({name: 'Error'}))
      }
      else{
        next()
      }
    }else{
      (next({name: 'Login'}))}
  }
  next()
})
export default router
