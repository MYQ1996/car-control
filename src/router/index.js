import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from '@/page/HelloWorld'
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () =>
        import( /* webpackChunkName: "page" */ '@/page/HelloWorld'),
    }
  ]
})
