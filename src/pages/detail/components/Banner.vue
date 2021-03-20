<template>
    <div>
        <div class="banner" @click="handleBannerClick">
            <img  class="banner-img" :src="bannerImg" />
            <div class="banner-info">
                <div class="banner-tittle">{{this.sightName}}</div>
                <div class="banner-number"><span class="iconfont banner-icon">&#xe6ae;</span>
                {{this.gallaryImgs.length}}
                </div>
            </div>
        </div>
        <fade-animation>
            <common-gallary
            :imgs="gallaryImgs"
            v-show="showGallary" 
            @close="handleGallaryClose"
            >
            </common-gallary>
        </fade-animation>
    </div>
    
</template>

<script>
import CommonGallary from 'common/gallary/Gallary'
import FadeAnimation from 'common/fade/FadeAnimation'
export default {
    name: 'DetailBanner',
    props: {
        sightName: String,
        bannerImg: String,
        gallaryImgs: Array
    },
    data () {
        return {
            showGallary: false,
            
        }
    },
    methods: {
        handleBannerClick () {
            this.showGallary = true
        },
        handleGallaryClose () {
            this.showGallary = false
        }
    },
//注册组件
    components: {
        CommonGallary,
        FadeAnimation
    }
}
 
</script>

<style lang="stylus" scoped>
    .banner
        position relative
        overflow hidden
        height 0
        padding-bottom  55%
        .banner-img
            width 100%
        .banner-info
            display flex
            position:absolute
            left:0
            right 0
            bottom 0
            line-height .6rem
            color #fff
            background-image: linear-gradient(to top,  rgba(0,0,0, 0), rgba(0,0,0, 0.8))
            .banner-tittle
                font-size .32rem
                padding: 0 .2rem
                flex: 1
            .banner-number
                width 20%
                line-height .32rem
                height .32rem
                podding 0 .4rem
                margin-top .14rem
                border-radius .2rem
                background: rgba(0,0,0, .8)
                font-size .24rem
                text-align center
                .banner-icon
                    font-size .24rem


</style>