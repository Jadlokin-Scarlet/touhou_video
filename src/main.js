import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import './plugins/cookie'
import App from './App.vue'
import 'bootstrap';
import store from './store'
import router from './router'

Vue.config.productionTip = false
document.title = "TILITILI";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
