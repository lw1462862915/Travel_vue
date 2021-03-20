<template>
    <div>
        <router-link 
            tag="div" 
            to="/" 
            v-show="showAbs"
            class="header-abs" >
            <div class="iconfont header-back-icon">&#xe663;</div>
        </router-link>
        <div  class="header-fixed" v-show="!showAbs" :style="opacityStyle">
            <router-link to="/">
                <div class="iconfont header-fixed-back">&#xe663;</div>
            </router-link>
            景点详情
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailHeader',
    data () {
        return {
            showAbs: true,
            opacityStyle: {
                opacity: 0
            }

        }
    },
    methods: {
//动画渐隐渐显逻辑
        handleScoll () {
//做兼容处理有些手机是支持scrollTop语法
            const top = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            if (top > 60 ) {
                let opacity = top / 140
                opacity = opacity > 1 ? 1:opacity
                this.opacityStyle = { opacity }
                this.showAbs = false
            } else {
                this.showAbs = true
            }
        }
    },
    mounted () {
        window.addEventListener('scroll', this.handleScoll)
    },
//对window全局解绑
    destroyed () {
        window.removeEventListener('scroll', this.handleScoll)
    }
    

}
 
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl';
@import '~styles/mixins.styl';
    .header-abs
        position:absolute
        left .2rem
        top .2rem
        width .8rem
        height .8rem
        line-height .8rem
        text-align center
        border-radius: .4rem
        background : rgba(0,0,0, .8)
        .header-back-icon
            color #fff
            font-size .4rem
    .header-fixed 
        z-index: 2
        position: fixed;
        top 0
        left 0
        right 0
        height: $headerHeight;
        line-height: $headerHeight;
        text-align: center;
        color: #fff;
        background: $bgColor;
        font-size: 0.32rem;
        .header-fixed-back
            position: absolute;
            top: 0;
            width: 0.64rem;
            text-align: center;
            font-size: 0.4rem;
            color: #fff;


            
            
 
</style>