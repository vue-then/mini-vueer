<template>
    <div>
        <nut-navbar class="pk-title" 
            @on-click-back="backfn" 
            @on-click-more="morefn"
            :showR="showR"
            :morePath="morePath"
            :backPath="backPath"
            :callback="callback"
            :dofunc="dofunc"
            :style="{'background-color':titlebg}"
            >
            <a slot="back-icon">
                <i :class="LClass" :style="{'font-size':(LFontsize)}"></i>
            </a>
            <a slot="more-icon">
                <!-- <i :class="RClass" :style="{'font-size':(RFontsize)}"></i> -->
                <i class="RClass"><img src="../assets/img/my-icon/icons/icon_mine_setting.png" alt=""></i>
            </a>
			<p class="tits" :style="{'color':titsbg}">{{title}}</p>
        </nut-navbar>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: "头部标题"
            },
            // 展示左侧图标
            showBack: {
                type: Boolean,
                default: true
            },
            // 展示右侧图标
            showR: {
                type: Boolean,
                default: false
            },
            // 左图标类名
            LClass:{
                type: String,
                default: "iconfont icon-nav-back color1a"
            },
            // 右图标类名
            RClass:{
                type: String,
                default: "iconfont icon-nav-back color1a"
            },
            // 左图标大小
            LFontsize: {
                // tubiao大小
                type: String,
                default: ".53333rem"
            },
            // 右图标大小
            RFontsize: {
                // tubiao大小
                type: String,
                default: ".53333rem"
            },
            // 背景颜色
            titlebg: {
                type: String,
                // default: "#488bfe"
                default: "#fff"
            },
            // 标题颜色
            titsbg: {
                type: String,
                default: "#1a1a1a"
            },
            // 右侧点击跳转路径
            morePath: {
                type: String,
                default: ""
            },
            // 左侧点击跳转路径
            backPath: {
                type: String,
                default: ""
            },
            // 是否导入返回额外方法
            dofunc:{
                type: Boolean,
                default: false
            },
            // 导入返回额外方法
            callback: {
                type: Function
            }
        },
        watch:{
            showBack(val){
                this.showBackme()
            },
            showR(val){
                this.showRme()
            }

        },
        mounted() {
            this.showBackme()
            this.showRme()
            
        },
        methods: {
            showBackme(){
                if(!this.showBack){
                    this.$(".back a").hide()
                    this.$(".tits").css({"margin-left":"0"})
                }else{
                    this.$(".back a").show()
                    this.$(".tits").css({"margin-left":".53333rem"})
                }
            },
            showRme(){
                if(!this.showR){
                    this.$(".more a").hide()
                }else{
                    this.$(".more a").show()
                }
            },
            morefn(){
                if(!this.morePath){
                    this.$router.go(-1)
                }else{
                    this.$router.push(this.morePath)
                }
            },
            backfn(){
                if(!this.backPath){
                    this.$router.go(-1)
                }else{
                    this.$router.push(this.backPath)
                }
                if(this.dofunc){
                    return this.callback()
                }
            }
        },
    }
</script>
<style scoped lang="scss">
.mgl20 {
	margin-left: px2rem(40);;
}
.color1a{
    color: #1a1a1a;
}
.tits{
    font-weight: bold;
}
//标题
.nut-navbar.pk-title{
    height:px2rem(88);
    line-height:px2rem(88);
    color: $default-color;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    a{
        i{
            display: block;
            
            img{
                width: px2rem(40);
                height: px2rem(40);
                
            }
        }
    }
    /deep/.nav-center {
        position: relative;
        .nav-title {
            font-size: px2rem(36);
            font-weight: 400;
            position: absolute;
            left: px2rem(-106);
            display: flex;
            height:px2rem(88);
            line-height:px2rem(88);
        }
    }
    /deep/.nav-left{
        width:px2rem(100);
        left:0;
        display:flex;
        justify-content:center;
        align-items:center;
        .back,.more{
            text-align:center;
            float:none;
            margin-right:0;
        }
    }
    /deep/.nav-right {
        right: px2rem(50);
        a{
            display: block;
            img{
                vertical-align: middle;
            }
        }
    }
}
</style>