<template>
  <div style="">
    <!-- 本页仅供新手练习使用，并未用作商业用途，如有侵权，请联系QQ：2803989258 -->
    <!-- 本页仅供新手练习使用，并未用作商业用途，如有侵权，请联系QQ：2803989258 -->
    <!-- 本页仅供新手练习使用，并未用作商业用途，如有侵权，请联系QQ：2803989258 -->
    <!-- 顶部导航栏 -->
    <van-nav-bar
      :title="city"
      @click-right="onClickRight"
    >
      <van-icon name="plus" slot="right" />
    </van-nav-bar>

    <!-- 点击右侧按钮添加城市 -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '40%' }"
      @close="close"
    />
    <!-- 此处为底部弹出层 -->
    <van-popup v-model="show" style="top:80%;width:100%;border-radius:12px">
      <van-area :area-list="areaList" :columns-num="2" @confirm="conFirm" />
    </van-popup>

    <!-- 此处为顶部通知栏 -->
    <van-notice-bar style="height:25px;font-size:12px" color="#1989fa" background="#ecf9ff">
      {{list[0].air_tips}}
    </van-notice-bar>
    
    <van-row>
      <!-- 此处为左侧天气展示 -->
      <van-col span="1"></van-col>
      <van-col span="16">
        <!-- 温度 -->
        <span style="font-size:60px">
          {{parseInt(list[0].tem)}}
        </span>
        <span style="position: relative;top:-30px;">
          ℃
        </span>
        <span style="position: relative;left:-20px;">
          {{list[0].air_level}}
        </span>
        <br>
        <!-- 小雨 -->
        {{list[0].wea}}
        <br>
        湿度：{{list[0].humidity}}%
        <br>
        <!-- 风向： -->
        {{list[0].win[1]}}转{{list[0].win[0]}} {{list[0].win_speed}}
      </van-col>
      <van-col span="7">
        <!-- 此处为占位 -->
      </van-col>
    </van-row>
    <p></p>

    <!-- 此处为底部展示列表 -->
    <div id="bottomTop" style="position:absolute;top:46%;width:100%;">
     
      <van-row v-for="(item,i) in list" :key="i" style="width:95%;height:40px;line-height:40px;border:1px solid #ccc;border-radius:10px;margin:8px auto;">
        <van-col span="7">
          {{item.day}}
        </van-col>
        <van-col span="10">
          {{item.wea}}
          <span class="bg" :style="item.wea|info"></span>
        </van-col>
        <van-col span="7" style="text-align:center;">
          {{parseInt(item.tem1)}}/{{item.tem2}}
        </van-col>
      </van-row>

      
        <!-- 插槽占位待解决
        <div :slot="aaa">
          <van-row @click="top()" style="width:95%;height:40px;line-height:40px;border:1px solid #ccc;border-radius:10px;margin:8px auto;text-align:center;">
            点击获取更多天气情况         
          </van-row>
        </div>
       -->


    </div>

  </div>
</template>

<script>
import axios from "axios";
import area from "../router/area.js";
import Slot from './Slot.vue';
export default {
  components: {
    //"v-com": Test
  },
  name: "Index",
  
  data() {
    return {
      show: false,
      aaa:"",
      areaList:area,
      city:"北京",
      slice:"3",
      list:[{
        air:47,
        air_level:"优",
        air_tips:"今天天气不错呦！今天天气不错呦！今天天气不错呦！今天天气不错呦！",
        date:"2010-01-01",
        day:"01日（今天）",
        humidity:50,
        tem:"27℃",
        tem1:"",
        tem2:"",
        wea:"",
        wea_img:"",
        week:"星期六",
        win_speed:"<3级",
        win:{
          0:"",
          1:""
        }
      }]
    };
  },
  methods: {
    onClickRight() {
      //点击这里弹出窗口，添加城市
      this.show = true;
    },
    close() {
      //关闭弹出层，调用数据更新视图，展示新地区天气
      var _this = this;
      axios({
        url: "https://www.tianqiapi.com/api/?version=v1",
        params: {
          city: _this.city,
        }
      })
        .then((data) => {
          //localStorage.setItem(_this.city,_this.city)
          _this.list = data.data.data;
          //console.log(_this.list.slice(0,_this.slice))
        })
        // .catch((err)=> {
        //   alert("请输入正确的城市")
        // });
    },
    conFirm(content){
      this.city=content[content.length-1].name
    },
    top(){
      //点击底部天气，弹出剩余四天天气情况
      this.slice = 7;
    }
  },
  mounted() {
    //页面首次加载，展示北京，或者从本地存储中取值
    var _this = this;
    axios({
      url: "https://www.tianqiapi.com/api/?version=v1",
      params: {
        city: _this.city,
      }
    })
      .then((data) => {
        //console.log(data.data.data);
        _this.list = data.data.data;
      })
      // .catch((err)=> {
      //   alert("请输入正确的城市")
      // });
  },
  watch: {
    "city":function(a){
      this.city = a;
    }
  },
  filters:{
    "info":function(data){
      switch (data) {
        // 35 70 105 140 175 210 245 280 315 350
          case "晴":
          case "多云转晴":
              return "background-position-y:0px;";
          case "晴转小雨":
          case "小雨转晴":
          case "小雪转多云":
              return "background-position-y:-35px;";
          case "小雨转多云":
          case "晴转小雨":
          case "多云转小雨":
              return "background-position-y:-70px;";
          case "多云":
          case "晴转多云":
          case "阵雨转多云":
          case "雷阵雨转多云":
          case "阴转多云":
          case "小雪转多云":
              return "background-position-y:-105px;";
          case "小雨":
          case "晴转小雨":
          case "小雨转中雨":
          case "中雨转小雨":
          case "中雨转小雨":
              return "background-position-y:-140px;";
          case "中雨":
          case "雷阵雨":
          case "多云转雷阵雨":
          case "小雨转雷阵雨":
              return "background-position-y:-175px;";
          case "中雪":
          case "多云转中雪":
              return "background-position-y:-210px;";
          case "小雪":
          case "多云转小雪":
              return "background-position:3px -245px;";
          case "阴":
          case "多云转阴":
          case "小雪转阴":
              return "background-position-y:-280px;";
          case "暴雨":
          case "阵雨":
          case "多云转阵雨":
          case "多云转雷阵雨":
          case "多云转暴雨":
          case "雷阵雨转阵雨":
              return "background-position-y:-315px;";
          case "阵雨转晴":
          case "雷阵雨转晴":
              return "background-position-y:-350px;";
      }
    }
  }
};
</script>

<style scoped>
  .bg{
    background-image:url(../assets/bg.png);
    display:block;
    width:35px;height:35px;
    float:right;
    margin-top: 5px;
  }
</style>
