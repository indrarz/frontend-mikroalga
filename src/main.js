import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import Chart from 'chart.js'
import Chartkick from 'vue-chartkick'


import LoadScript from 'vue-plugin-load-script';

Vue.use(Chartkick.use(Chart)) 
Vue.use(LoadScript);  
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')