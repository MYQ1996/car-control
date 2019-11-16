import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import router from './router/index'
Vue.config.productionTip = false
import VCharts from 'v-charts'
Vue.use(VCharts)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
