import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'


import LoadScript from 'vue-plugin-load-script';

  
Vue.use(LoadScript);  
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')