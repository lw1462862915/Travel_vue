<template>
  <ul class="list">
    <li class="item" 
      v-for="(item) of letters" 
      :key="item" 
      :ref="item"
      @click="handleLetterClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      >{{ item }}</li>
  </ul>
</template>

<script>
export default {
  name: "CityAlphabet",
  props: {
    cities: Object,
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  data () {
    return{
//默认只有触发touchstart才能进入touch其他事件
      touchStatus: false,  
      startY: 0,
//函数节流
      timer: null,  
    }
  },
  updated () {
    this.startY = this.$refs['A'][0].offsetTop
  },
//拖动字母表，地区也会跟着滚动功能
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart () {
      this.touchStatus = true
    },
    handleTouchMove (e) {
//手指滑动触发事件。字母距离顶部top的距离算出滑动的距离
      if(this.touchStatus){
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout( ()=> {
          const touchY = e.touches[0].clientY  - 79
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length){
            this.$emit('change', this.letters[index])
          }
        },8)     
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
};
</script>

<!-- scoped属性，使样式只对当前文件有效 -->
<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 1.58rem
  right: 0;
  bottom: 0;
  width: 0.4rem;

  .item {
    line-height: 0.4rem;
    text-align: center;
    color: $bgColor;
  }
}
</style>
