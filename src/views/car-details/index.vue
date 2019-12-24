<template>
  <div>
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
        <div>
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
        height="280px"
        background-color="#fff"
        :settings="chartSettings"
      ></ve-gauge>
    </div>
    <div class="range-flex">
      <range v-model="chartData.rows[0].value" :range-bar-height="5" @on-touchend="rangePost"></range>
    </div>

    <div class="circle stop" @click="setTimeState">
      <img :src="timeIcon" alt srcset />
    </div>
  </div>
</template>

<script>
import Card from "vux/src/components/card";
import XHeader from "vux/src/components/x-header";
import Range from "vux/src/components/range";
import { dataLinkPostJson } from "@/network/dataLink";
// import { res } from "../mock/index";
export default {
  components: {
    Card,
    Range,
    // Divider,
    XHeader
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
      chartData: {
        columns: ["type", "value"],
        rows: [{ type: "速度", value: 20 }],
      },
      timeTask: "",
      timeIcon: require(`../images/start.png`),
      timeState:true,
      carInfo:{},
      carId:0,
      firstPage:true
    };
  },
  created() {
    clearInterval(this.timeTask);
    this.carId = this.$route.query.id
    this.getCarList();
  },
  methods: {
    setTimeState(){
      if (this.timeState) {
        this.clearStop();
      }else{
        this.postStart();
      }
    },
    rangePost: function() {
      let val = this.chartData["rows"][0].value;
      dataLinkPostJson(`post/part/cars/${this.carId}/speed/${val}`).then(res=>{
        this.setCarInfo(res)
      })
    },
    clickBack() {
      this.$router.push({ path: "/" });
    },
    getCarList() {
      dataLinkPostJson("/all",{}).then(res=>{
        this.setCarInfo(res);
        this.postStart()
      })
    },
    ecgPost() {
      this.timeTask = setInterval(() => {
        dataLinkPostJson("/null", {}).then(res => {
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
      if (this.firstPage===true) {
        this.chartData["rows"][0].value = carInfo["speed_sp"];
        this.firstPage = false
      }
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
    jumpDetails(car) {
      clearInterval(this.timeTask);
      this.$router.push({ path: "/carDetails", query: { id: car.id } });
    },
    postStart() {
      dataLinkPostJson(`/part/cars/${this.carId}/run/1`)
      this.timeState = true;
      this.timeIcon = require(`../images/stop1.png`);
      this.ecgPost();
    },
    clearStop() {
      this.firstPage=true
      dataLinkPostJson(`/part/cars/${this.carId}/run/0`)
      this.timeState = false;
      this.timeIcon = require(`../images/start.png`);
      clearInterval(this.timeTask);
    },
    beforeDestroy() {
      clearInterval(this.timeTask);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
.vux-1px-r{
  font-size: 28px !important;
}
.weui-panel__hd{
  font-size: 28px !important;
}
</style>