<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
//接收父组件传递的数据，选择数据类型
    list: Array,
  },
  data() {
    return {
      swiperOption: {
//轮播图的页码按钮
        pagination: ".swiper-pagination",  
        loop: true
      },
    };
  }, 
//计算属性，解决默认显示第一章轮播图
  computed: {
    showSwiper() {
      return this.list.length;
    },
  },
};
</script>

<style lang="stylus" scoped>.wrapper >>> .swiper-pagination-bullet-active {
  background: #fff !important;
}
// 撑开轮播图片加载时的高度
.wrapper { 
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 31.25%;
}

.swiper-img {
  width: 100%;
  height: 100%;
}
</style>