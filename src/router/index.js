import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: () =>
    //     import( /* webpackChunkName: "page" */ '@/page/index'),
    // },
    {
      path: '/',
      name: 'carDetails',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/page/car-details'),
    }
  ]
})
