<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {dataLinkPostJson} from './network/dataLink'
export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  data() {
    return {}
  },
  created() {
    this.post();
  },
  methods: {
    post(){
      let data = {
        ccc:1
      }
      dataLinkPostJson("/heihei/a",data).then(res=>{
       console.log('====================================');
       console.log(res);
       console.log('====================================');
      })
    },
  }
}
</script>

<style>
</style>
