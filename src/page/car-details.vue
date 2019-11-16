<template>
  <div>
    <x-header 
    :left-options="{backText: '',preventGoBack:true}"
    @on-click-back="clickBack">
    2001909090</x-header>
    <card :header="{title:'车子信息'}" style="margin-top:-1px">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>小车</span>
            <br/>
            类型
          </div>
          <div class="vux-1px-r">
            <span>0</span>
            <br/>
            钱包金额
          </div>
        </div>
    </card>

    <card :header="{title:'空气质量'}" style="margin-top:-1px">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>15</span>
            <br/>
            PM10
          </div>
          <div class="vux-1px-r">
            <span>0</span>
            <br/>
            PM2.5
          </div>
          <div>
            <span>88</span>
            <br/>
          PM1.0
          </div>
        </div>
    </card>

    <card :header="{title:'环境情况'}" style="margin-top:-1px">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>15%</span>
          <br/>
          路灯亮度
        </div>
        <div class="vux-1px-r">
          <span>开启</span>
          <br/>
          路灯的状态
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          噪声
        </div>
      </div>
    </card>


    <div>
      <ve-gauge
        class="ve"
        :data="chartData"
        height="280px"
        background-color="#fff"
        :settings="chartSettings">
      </ve-gauge>
    </div>
    <div class="range-flex">
       <range v-model="chartData.rows[0].value" 
       :range-bar-height="5" 
       @on-touchend="rangePost"></range>
    </div>
  </div>
</template>

<script>
import {Card,Range,XHeader} from 'vux'
export default {
  components: {
    Card,
    Range,
    // Divider,
    XHeader
  },
  data () {
    this.chartSettings = {
      dataName: {
        '速度': '',
      },
      seriesMap: {
        '速度': {
          min:0,
          max:100,
          splitNumber:10,
          radius: '80%',
          axisLine: {
            lineStyle: {
              color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
              width: 3,
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          axisLabel: {
            textStyle: {
              fontWeight: 'bolder',
              color: '#000',
              shadowColor: '#000',
              shadowBlur: 10
            }
          },
          axisTick: {
            length:15,
            lineStyle: {
              color: 'auto',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          splitLine: {
            length:25,
            lineStyle: {
              width:3,
              color: '#fff',
              shadowColor: '#fff',
              shadowBlur: 10
            }
          },
          pointer: {
            shadowColor: '#fff',
            shadowBlur: 5
          },
          title: {
            textStyle: {
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic',
              color: '#000',
              shadowColor: '#000',
              shadowBlur: 10
            }
          },
          detail: {
            backgroundColor: 'rgba(30,144,255,0.8)',
            borderWidth: 1,
            borderColor: '#fff',
            shadowColor: '#fff',
            shadowBlur: 5,
            offsetCenter: [0, '50%'],
            textStyle: {
              fontWeight: 'bolder',
              color: '#fff'
            }
          }
        },
      }
    }
    return {
      chartData: {
        columns: ['type', 'value'],
        rows: [
          { type: '速度', value: 20 },
        ]
      },
    }
  },
  created () {
    setTimeout(() => {
      this.chartData["rows"][0].value = 20;
    }, 0);
  },
  methods: {
    rangePost: function () {
      console.log('====================================');
      console.log(this.chartData["rows"][0].value);
      console.log('====================================');
    },
    clickBack(){
      console.log('====================================');
      console.log(1);
      console.log('====================================');
      // this.$route.path({name: '/'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
.range-flex{
}
</style>