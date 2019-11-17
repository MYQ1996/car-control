import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/page/home/index'),
    },
    {
      path: '/carDetails',
      name: 'carDetails',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/page/car-details/index'),
    }
  ]
})
