import Vue from 'vue';
import iView from 'iview';
import App from './App.vue';
import router from './router';
import store from './store';
import rootFont from './libs/rootFont.js';
import 'iview/dist/styles/iview.css';
import './themes/index.less';
import 'lib-flexible';
import VCharts from 'v-charts'
rootFont();
Vue.use(iView);
Vue.use(VCharts)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');