<template>
  <div class="body">
    <div class="head">
      <img src="./images/logo.png" alt srcset class="logo" />
    </div>

    <divider style="font-size:20px;margin-boto">当前您拥有{{carList.length}}辆车</divider>

    <div class="sixth-face">
      <span class="pip" @click="jumpDetails(item)" v-for="(item,index) in carList" :key="index">
        <img class="car-style" :src="item.img" alt srcset />
        <div class="car-code">车牌号{{item.id}}</div>
        <div class="state">{{item.run===1?"启动中":"停止"}}</div>
      </span>

      <div class="circle stop" @click="setTimeState">
        <img :src="timeIcon" alt srcset />
      </div>

      <div class="circle" @click="setUp">
        <img src="./images/setUp.png" alt srcset />
      </div>
    </div>

    <div>
      <confirm
        v-model="show5"
        show-input
        ref="confirm5"
        title="请输入ip地址:端口地址"
        @on-confirm="onConfirm5"
      ></confirm>
    </div>
    <toast
      v-model="showPositionValue"
      type="text"
      :time="800"
      is-show-mask
      :text="tip"
      position="middle"
    ></toast>
  </div>
</template>

<script>
import { dataLinkPostJson } from "@/network/dataLink";
// import {Divider,Confirm,Toast} from 'vux'
import Divider from "vux/src/components/divider";
import Confirm from "vux/src/components/confirm";
import Toast from "vux/src/components/toast";
// import { res } from "../mock/index";
export default {
  components: {
    Divider,
    Confirm,
    Toast
  },
  data() {
    return {
      show5: false,
      showPositionValue: false,
      tip: "",
      carList: [],
      timeTask: "",
      timeIcon: require(`../images/start.png`),
      timeState:true
    };
  },
  created() {
    clearInterval(this.timeTask);
    this.getCarList();
  },
  methods: {
    onConfirm5(value) {
      /* eslint-disable */
      var pattIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
      if (pattIp.test(value) == false) {
        this.tip = "请输入正确的ip地址";
        this.showPositionValue = true;
        return;
      }
      this.tip = "设置成功";
      this.showPositionValue = true;
      localStorage.setItem("httpUrl", value);
    },
    setUp() {
      this.show5 = true;
    },
    setTimeState(){
      if (this.timeState) {
        this.clearStop();
      }else{
        this.postStart();
      }
    },
    getCarList() {
      let that = this;
      dataLinkPostJson("/all",{}).then(res=>{
        this.setCatList(res);
        this.postStart()
      })
    },
    ecgPost() {
      this.timeTask = setInterval(() => {
        dataLinkPostJson("/null", {}).then(res => {
          this.setCatList(res);
        });
      }, 1000);
    },
    setCatList(res) {
      res.cars.forEach((item, index) => {
        let imgImg = index;
        if (index > 5) {
          imgImg = index / 5;
        }
        return (item.img = require(`./carList/car-${imgImg}.png`));
      });
      this.carList = res.cars;
    },
    jumpDetails(car) {
      clearInterval(this.timeTask);
      this.$router.push({ path: "/carDetails",query:{id:car.id}});
    },
    postStart() {
     this.timeState = true;
     this.timeIcon=require(`../images/stop1.png`)
     this.ecgPost();
    },
    clearStop() {
      this.timeState = false;
      this.timeIcon=require(`../images/start.png`)
      clearInterval(this.timeTask);
    },
    beforeDestroy() {
      clearInterval(this.timeTask);
    }
  }
};
</script>

<style scoped lang="less">
.head {
  background: white;
  height: 100px;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-shadow: 0.013333rem 0.013333rem 0.026667rem #f4f4f4;
  box-shadow: 0.013333rem 0.013333rem 0.026667rem #f4f4f4;
}

.logo {
  height: 100px;
}

.pip {
  display: block;
  width: 32%;
  box-shadow: 10px 10px 10px #f1f2f4;
  display: flex;
  flex-direction: column;
  padding: 5% 8%;
  margin-bottom: 10px;
  font-size: 30px;
  border-radius: 10%;
}

.sixth-face {
  display: flex;
  flex-flow: wrap;
  align-content: space-between;
  justify-content: space-between;
  padding: 20px;
  color: #35495e;
}

.state {
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
}

.car-style {
  width: 90px;
  height: 90px;
}
.car-code {
  margin: 20px 0px;
}

.circle {
  position: absolute;
  bottom: 100px;
  right: 20px;
  z-index: 10;
  width: 1.333333rem;
  height: 1.333333rem;
  background: #fff;
  border-radius: 0.8rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-shadow: 0.013333rem 0.013333rem 0.026667rem #f4f4f4;
  box-shadow: 0.133333rem 0.133333rem 0.066667rem #eeeeee;
  img {
    width: 0.666667rem;
    height: 0.666667rem;
  }
}

.stop {
  bottom: 230px;
}
</style>