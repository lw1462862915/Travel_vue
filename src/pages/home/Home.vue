<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-Icons :list="iconList"></home-Icons>
    <home-Recommend :list="recommendList"></home-Recommend>
    <home-Weekend :list="weekendList"></home-Weekend>
   

  </div>
</template>

<script>
import HomeHeader from "./components/Header";
import HomeSwiper from "./components/Swiper";
import HomeIcons from "./components/Icons";
import HomeRecommend from "./components/Recommend";
import HomeWeekend from "./components/Weekend";
import axios from 'axios'  
import { mapState } from 'vuex'

export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
//获取json里的数据
  data () {
    return {
      lastCity: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    }
  },
  computed: {
    ...mapState(['city'])
  },
  methods: {
    getHomeInfo() {
      axios.get('/mock/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if(res.ret && res.data){
        const data = res.data
//json数据赋值

        this.swiperList = data.swiperList
        this.iconList = data.iconList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
     
    }
  },
  mounted () {
    this.lastCity = this.city
    this.getHomeInfo()
  },
//新增生命周期函数，来临时缓冲变量，实现首页代码性能优化，减少重复访问json文件请求
  activated () {
    if (this.lastCity != this.city) {
        this.lastCity = this.city
        this.getHomeInfo()
    }
  }
};
</script>

<style>
</style>