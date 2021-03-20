<template>
    <div>
        <div class="search">
            <input v-model="keyword" class="search-input" type="text" placeholder="输入城市名或拼音">
        </div>
        <div class="search-content" ref="search" v-show="keyword">
            <ul>
                <li class="search-item border-bottom" v-for="item of list" :key="item.id" @click="handleCityClick(item.name)">{{item.name}}</li>
                <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配数据</li>
            </ul>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
  name: "CitySearch",
  props:{
      cities: Object
  },
  data() {
      return{
          keyword: '',
          list: [],
          timer: null
      }
  }, 
  computed: {
      hasNoData () {
          return !this.list.length
      }
  },
//搜索功能逻辑
  watch: {
      keyword (){
          if (this.timer) {
              clearTimeout (this.timer)
          }
          if (!this.keyword) {
              this.list = []
              return
          }
          this.timer = setTimeout( () => {
              const result = []
              for ( let i in this.cities) {
                  this.cities[i].forEach((value) => {
                      if (value.spell.indexOf(this.keyword) > -1 ||
                           value.name.indexOf(this.keyword) > -1){
                                result.push(value)
                                
                            }
                  });
              }
              this.list = result
          },100)
      }
  },
  methods: {
    handleCityClick (city) {
// this.$store.commit('changeCity', city)  //点击城市city也相应改变
//简写上行代码
      this.changeCity(city)  
//跳转到首页
      this.$router.push('/')   
    },
//使用vuex自带的方法，达到简写代码的办法
    ...mapMutations(['changeCity'])  
  },
  mounted () {
      this.scroll = new Bscroll(this.$refs.search, {
          click: true
      })
  },
  updated() {
    this.scroll.refresh()
  },

  
};
</script>

<!-- scoped属性，使样式只对当前文件有效 -->
<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';
   .search
       height: .72rem;
       padding : 0 .1rem
       background : $bgColor
       .search-input //文字一行显示，不会自动换行
           box-sizing : border-box   //解决输入文字超出输入框后文字与边框的距离
           padding : 0 .1rem        
           width : 100%
           height : .62rem
           line-height : .62rem
           text-align : center
           border-radius : .06rem
           color: #666
    .search-content
        overflow hidden
        position absolute
        top 1.58rem
        left 0
        right 0
        bottom 0
        background #eee
        z-index 1
        .search-item
            line-height .62rem
            padding-left : .2rem
            color #666  
            background #fff


</style>
