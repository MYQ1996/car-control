<template>
  <div>
    <div class="body" v-if="page===1">
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
    <div v-if="page===2">
      <x-header
        :left-options="{backText: '',preventGoBack:true}"
        @on-click-back="clickBack"
      >{{carInfo.id}}</x-header>
      <div class="header">{{carInfo.status}}</div>
      <card class="vux-head" :header="{title:'车子信息'}" style="margin-top:-1px">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{carInfo.type}}</span>
            <br />类型
          </div>
          <div class="vux-1px-r">
            <span>{{carInfo.speed_now}}</span>
            <br />当前速度
          </div>
          
          <div class="vux-1px-r">
            <span>{{carInfo.money}}</span>
            <br />钱包金额
          </div>
        </div>
      </card>

      <card class="vux-head" :header="{title:'空气质量'}" style="margin-top:-1px">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{carInfo['PM10']}}</span>
            <br />PM10
          </div>
          <div class="vux-1px-r">
            <span>{{carInfo['PM2.5']}}</span>
            <br />PM2.5
          </div>
          <div class="vux-1px-r">
            <span>{{carInfo['PM1.0']}}</span>
            <br />PM1.0
          </div>
        </div>
      </card>

      <card class="vux-head" :header="{title:'环境情况'}" style="margin-top:-1px">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{carInfo['light_sencor']}}%</span>
            <br />路灯亮度
          </div>
          <div class="vux-1px-r">
            <span>{{carInfo['light']===1?'开启':'关闭'}}</span>
            <br />路灯的状态
          </div>
          <div class="vux-1px-r">
            <span>{{carInfo['noise']}}</span>
            <br />噪声
          </div>
        </div>
      </card>

      <div>
        <ve-gauge
          class="ve"
          :data="chartData"
          height="250px"
          background-color="#fff"
          :settings="chartSettings"
        ></ve-gauge>
      </div>
      <div class="range-flex">
        <Slider :value="chartData.rows[0].value" :max="100" @on-change="rangePost"></Slider>
      </div>

      <div class="circle stop" @click="setTimeState">
        <img :src="timeIcon" alt srcset />
      </div>
    </div>
  </div>
</template>

<script>
import { dataLinkGetJson } from "@/libs/jqHttp";
import Divider from "vux/src/components/divider";
import Confirm from "vux/src/components/confirm";
import Toast from "vux/src/components/toast";
import XHeader from "vux/src/components/x-header";
import Card from "vux/src/components/card";
// import { res } from "../mock/index";
export default {
  components: {
    Divider,
    Confirm,
    Toast,
    XHeader,
    Card
  },
  data() {
    this.chartSettings = {
      dataName: {
        "速度": ""
      },
      seriesMap: {
        "速度": {
          min: 0,
          max: 100,
          splitNumber: 10,
          radius: "80%",
          axisLine: {
            lineStyle: {
              color: [[0.09, "lime"], [0.82, "#1e90ff"], [1, "#ff4500"]],
              width: 3,
              shadowColor: "#fff",
              shadowBlur: 10
            }
          },
          axisLabel: {
            textStyle: {
              fontWeight: "bolder",
              color: "#000",
              shadowColor: "#000",
              shadowBlur: 10
            }
          },
          axisTick: {
            length: 15,
            lineStyle: {
              color: "auto",
              shadowColor: "#fff",
              shadowBlur: 10
            }
          },
          splitLine: {
            length: 25,
            lineStyle: {
              width: 3,
              color: "#fff",
              shadowColor: "#fff",
              shadowBlur: 10
            }
          },
          pointer: {
            shadowColor: "#fff",
            shadowBlur: 5
          },
          title: {
            textStyle: {
              fontWeight: "bolder",
              fontSize: 20,
              fontStyle: "italic",
              color: "#000",
              shadowColor: "#000",
              shadowBlur: 10
            }
          },
          detail: {
            backgroundColor: "rgba(30,144,255,0.8)",
            borderWidth: 1,
            borderColor: "#fff",
            shadowColor: "#fff",
            shadowBlur: 5,
            offsetCenter: [0, "50%"],
            textStyle: {
              fontWeight: "bolder",
              color: "#fff"
            }
          }
        }
      }
    };
    return {
      show5: false,
      showPositionValue: false,
      tip: "",
      carList: [],
      timeTask: "",
      timeIcon: require(`../images/start.png`),
      timeState:true,
      page:1,
      chartData: {
        columns: ["type", "value"],
        rows: [{ type: "速度", value: 20 }],
      },
      carInfo:{},
      carId:0,
      firstPage:true
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
      dataLinkGetJson("/all",{}).then(res=>{
        this.setCatList(res);
        this.postStart()
      })
    },
    ecgPost() {
      this.timeTask = setInterval(() => {
        dataLinkGetJson("/null", {}).then(res => {
          this.setCatList(res);
          this.setCarInfo(res)
        });
      }, 1000);
    },
    setCarInfo(res){
      let carInfo = {}
      res.cars.forEach(item=>{
        if (item.id === this.carId) {
          carInfo = item;
        }
      })
      // if (this.firstPage===true) {
        this.chartData["rows"][0].value = Number(carInfo["speed_sp"])
        this.firstPage = false
      // }
      this.carInfo = carInfo;
      this.carInfo = {
        "id":carInfo["id"],
        "type":carInfo["type"],
        "run":carInfo["run"],
        "speed_sp":carInfo["speed_sp"],
        "speed_now":carInfo["speed_now"],
        "status":carInfo["status"],
        "money":carInfo["money"],
        "light":res["light"],
        "light_sencor":res["light_sencor"],
        "noise":res["noise"],
        "PM10":res["PM10"],
        "PM1.0":res["PM1.0"],
        "PM2.5":res["PM2.5"]
      }
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
      // clearInterval(this.timeTask);
      this.carId = car.id;
      this.page=2;
      // this.$router.push({ path: "/carDetails",query:{id:car.id}});
    },
    postStart() {
     this.timeState = true;
     this.timeIcon=require(`../images/stop1.png`)
     this.ecgPost();
    },
    clearStop() {
      this.page = 1;
      this.timeState = false;
      this.timeIcon=require(`../images/start.png`)
      clearInterval(this.timeTask);
    },
    beforeDestroy() {
      clearInterval(this.timeTask);
    },
    clickBack() {
      this.page = 1;
    },
    rangePost: function(val) {
      dataLinkGetJson(`/post/part/cars/${this.carId}/speed/${val}`).then(res=>{
        this.setCarInfo(res)
      })
    },
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
  width: 43%;
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

.stop {
  bottom: 230px;
}
.header{
  display: flex;
  justify-content: center;
  font-size: 35px;
  padding: 20px;
}
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
  color: #f74c31;
}
.range-flex {
  width: 80%;
  margin: 0 auto;
}
.circle {
  position: absolute;
  bottom: 100px;
  right: 20px;
  z-index: 10;
  width: 100px;
  height: 100px;
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
    width: 60px;
    height: 60px;
  }
}

.stop {
  bottom: 230px;
}
.vux-1px-r{
  font-size: 28px !important;
}
.weui-panel__hd{
  font-size: 28px !important;
}
</style>