<template>
  <div>
    <x-header></x-header>
    <div class="header">123</div>
  </div>
</template>

<script>
import {XHeader} from 'vux'
export default {
  name: 'HelloWorld',
  components: {
    XHeader
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header{
  font-size:10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>