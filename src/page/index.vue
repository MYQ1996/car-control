<template>
  <div>
   <card :header="{title: $t('My wallet')}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          {{ $t('Point') }}
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          {{ $t('Coupon') }}
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          {{ $t('Gift card') }}
        </div>
        <div>
          <span>88</span>
          <br/>
          {{ $t('Cash') }}
        </div>
      </div>
    </card>
  </div>
</template>

<script>
import { Card } from 'vux'
export default {
  components: {
    Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color