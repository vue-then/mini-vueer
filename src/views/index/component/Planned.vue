<template>
    <div id="planned">
        <div class="planned" v-show="planShow">
            <swiper :options="swiperOption" ref="mySwiper" :class="{'unHavePagination':swiperSlides.length <= 1,'havePagination':swiperSlides.length > 1}">
                <swiper-slide @click.native="goDetail(item.bindid,item.isActiveStart)" class="plan-swiper" v-for="(item, index) in swiperSlides" :key="index">
                    <div class="betPlan-headImg">
                        <img :src="item.plannerPhoto ? item.plannerPhoto : headIcon">
                    </div>
                    <div  class="betPlan-content">
                        <div class="lotteryName">{{item.fcName}}<span>{{item.betNo}}期</span></div>
                        <div class="lotteryPlay">{{item.playName}}<span>{{item.betWay}}</span></div>
                        <div class="time" v-if="item.listIndex.start != 3">
                            {{item.timeTip}}
                            <span v-show="item.dd > 0">{{item.dd}} 天</span>  
                            {{item.hh}} : {{item.mm}} : {{item.ss}}
                        </div>
                        <div class="time" v-if="item.listIndex.start == 3">计划结束</div>
                    </div>
                    <div @click.stop="followBet(item)" class="betPlan-follow" :class="{'unTouch': item.start == 2}">跟投</div>
                    <div class="face-item" @click.stop="deleteFace()" :class="{'close':item.length<20}">
                        <img :src="closeIcon" />
                    </div>
                </swiper-slide>
                <div v-show="swiperSlides.length>1" class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="min-planned" v-show="!planShow" @click="showPlanned()">
            计划
        </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    name: "planned",
    props: ["planmessage"],
    components: {
		swiper,
		swiperSlide
    },
    watch: {
        message: {
            deep: true,
            handler(nv, ov) {
                this.messageList = nv.planmessage;
            }
        }
    },
    data () {
        return {
            headIcon: require("@/assets/img/chat-icon/avatar.png"),
            closeIcon: require("@/assets/img/icon_info_gtplan_close.png"),
            swiperOption: {
                // loop : true,
                autoplay: {
                    delay: 5000,
                },
				pagination: {
					el: ".swiper-pagination"
                }
			},
            msgObj: {},
            swiperSlides: [],
            planShow: true,
            messageList: [],
            timeTip: '',
        }
    },
    created(){
        if ( this.timeOut ) {
            clearTimeout(this.timeOut);
         }
    },
    mounted: function () {
        this.messageList = this.planmessage;
        this.countdown();
    },
    methods: {
        deleteFace() {
            this.planShow = false
        },
        showPlanned(){
            this.planShow = true
        },
        followBet(item){
            if(item.listIndex.start == 1){
                console.log("嘿嘿")
            }
        },
        countdown(){
            var start = parseInt(new Date() / 1000);
            var relArray = [];
            var myNewData = [];
            Array.prototype.indexOfCopy = function(value){
                var arr =  this;
                var data = {
                    index: 0,
                    start: 2//1开始 2未开始
                };
                for(var i=0;i<arr.length;i++){
                    if(arr[i].openTime > value){
                        data = {
                            index: i,
                            start: 2
                        }
                        return data
                    }else{
                        data = {
                            index: i,
                            start: 1
                        }
                        return data
                    }
                }
            }
            for(var i= 0; i < this.messageList.length;i++){
                var newList = this.messageList[i].message;
                for(var j=0;j < newList.length;j++){
                    relArray.push(newList[j]) 
                }
            }
            relArray.map((item,index)=>{
                var listIndex = item.betPlanSub.indexOfCopy(start);
                item.betWay = item.betPlanSub[listIndex.index].betWay;
                item.betNo = item.betPlanSub[listIndex.index].betNo; 
                item.listIndex = listIndex;
                myNewData.push(item)
                this.$set(item,"ss",this.getTimeList())
            })
            this.swiperSlides = myNewData;
        },
        goDetail(bindid){
            this.$router.push({
                path:'/Plandetails',
                query:{  //路由传参时push和query搭配使用 ，作用时传递参数
                  sid:this.$route.query.sid,
                  bindid:bindid
                }
            })            
        },
        getTimeList(){
            var planList = [];
            const that = this
            var thisTime = parseInt(new Date() / 1000);
            this.swiperSlides.map((item,index)=>{
                if(item.betPlanSub.length <= item.listIndex.index){
                    item.listIndex.start = 3;
                    return
                }
                if(item.listIndex.start == 1){
                    var end = item.betPlanSub[item.listIndex.index].closeTime;
                    var rightTime = end - thisTime;
                    item["timeTip"] = '距封盘';
                    item["start"] = 1;
                }else{
                    var start = item.betPlanSub[item.listIndex.index].openTime;
                    var rightTime = start - thisTime;
                    item["timeTip"] = '距开盘';
                    item["start"] = 2;
                }
                item["betNo"] = item.betPlanSub[item.listIndex.index].betNo;
                item["betWay"] = item.betPlanSub[item.listIndex.index].betWay;

                if (rightTime > 0) {
                    let dd = parseInt(rightTime / 60 / 60 / 24)
                    let hh = parseInt(rightTime / 60 / 60 % 24)
                    let mm = parseInt(rightTime / 60 % 60)
                    let ss = parseInt(rightTime % 60)
                    dd = dd > 9 ? dd : '0' + dd
                    hh = hh > 9 ? hh : '0' + hh
                    mm = mm > 9 ? mm : '0' + mm
                    ss = ss > 9 ? ss : '0' + ss  
                    item["dd"] = dd;
                    item["hh"] = hh;
                    item["mm"] = mm;
                    item["ss"] = ss;
                }else{
                    item["dd"] = 0;
                    item["hh"] = '00';
                    item["mm"] = '00';
                    item["ss"] = '00';
                    if(item.listIndex.start == 1){
                        item.listIndex.index++;
                        item.listIndex.start = 2;
                    }else{
                        item.listIndex.start = 1;
                    }
                }
            })
            setTimeout(function () {
                that.getTimeList()
            }, 1000)
        }
    }
}
</script>
<style lang="scss" scoped>
.planned{
    z-index: 9;
    position: fixed;
    left: 0;
    top: 1.17333rem;
    padding: px2rem(10);
    width: px2rem(730);
    background-color: $plane-bg;
    box-shadow: 0 px2rem(2) px2rem(5) 0
		rgba(0, 0, 0, 0.1);
    .swiper-container{
        .plan-swiper{
            display: -webkit-flex;
            display: flex;
            align-items: center;
            position: relative;
            height: px2rem(144);
            border-radius: px2rem(10);
            background-color: #fff;
            overflow: hidden;
            .betPlan-headImg{
                margin-left: px2rem(32);
                margin-right: px2rem(25);
                width: px2rem(96);
                height: px2rem(96);
                border-radius: 50%;
                background-color: #e0e0e0;
                img{
                    width: 100%;
                }
            }
            .betPlan-content{
                color: $tip-color;
                .lotteryName{
                    font-size: px2rem(28);
                    font-weight: bold;
                    span{
                        margin-left: px2rem(24);
                        font-size: px2rem(20);
                        font-weight: normal;
                        color: $label-color;
                    }
                }
                .lotteryPlay{
                    font-size: px2rem(24);
                    span{
                        margin-left: px2rem(10);
                        padding: 0 px2rem(5);
                        font-size: px2rem(16);
                        color: $default-color;
                        background-color: $primary-color;
                        border-radius: px2rem(6);
                    }
                }
                .time{
                    font-size: px2rem(20);
                    color: $color-w;
                }
            }
            .betPlan-follow{
                position: absolute;
                right: px2rem(32);
                width: px2rem(88);
                height: px2rem(66);
                text-align: center;
                line-height: px2rem(66);
                font-size: px2rem(28);
                color: $default-color;
                background-image: linear-gradient(-25deg, 
                    $color-w 0%, 
                    $planBtn-b 100%), 
                linear-gradient(
                    $default-color, 
                    $default-color);
                background-blend-mode: normal, 
                    normal;
                box-shadow: 0 px2rem(3) px2rem(6) 0
                    rgba(240, 110, 0, 0.3);
                border-radius: px2rem(10);
            }
            .unTouch{
                background: $backwater-no-btn;
                box-shadow: none;
            }
            .face-item{
                position: absolute;
                top:0;
                right: 0;
                width: px2rem(50);
                height: px2rem(50);
                img{
                    width: 100%;
                }
            }
        }
        /deep/ .swiper-pagination {
            bottom: 0;
            width: 100%;
            height: px2rem(20);
            line-height: px2rem(20);
            .swiper-pagination-bullet {
                display: inline-block;
                margin: 0 px2rem(8);
                width: px2rem(16);
                height: px2rem(16);
                background: $plane-bg;
                border: px2rem(2) solid $default-color;
                opacity: 1;
            }
            .swiper-pagination-bullet-active {
                background: $color-w;
            }
        }
    }
    .havePagination{
        height: px2rem(180);
    }
    .unHavePagination{
        height: px2rem(144);
    }
}
.min-planned{
    position: fixed;
    top: px2rem(128);
    right: 0;
    padding-left: px2rem(47);
    width: px2rem(56);
    height: px2rem(64);
    font-size: px2rem(20);
    font-weight: bold;
    line-height: px2rem(64);
    background-image: linear-gradient(-25deg, 
        $color-w 0%, 
        $planBtn-b 100%), 
    linear-gradient(
        $default-bg-color, 
        $default-bg-color);
    background-blend-mode: normal, 
        normal;
    box-shadow: 0 px2rem(3) px2rem(6) 0
        rgba(240, 110, 0, 0.3);
    border-radius: px2rem(8) 0 0 px2rem(8);
    color: $default-bg-color;
    &::before{
        position: absolute;
        left: px2rem(16);
        width: px2rem(24);
        height: px2rem(22);
        color: $default-color;
        content: '#';
    }
}
</style>


