<template>
    <div id="backwater">
        <Header title="自助返水"></Header>
        <div class="content">
            <div class="backwater-top">
                <ul >
                    <li>
                        <h2>有效打码</h2>
                        <p>{{infoData.betall}}</p>
                    </li>
                    <li>
                        <h2>返水金额</h2>
                        <p>{{infoData.allMoney}}</p>
                    </li>
                    <button :disabled="infoData.status === 2"
                        @click="handleBackWater">领取返水</button>
                </ul>
            </div>
            <div class="backwater-list">
                <div class="title">自助返水历史</div>
                <div class="total">
                    <!-- <p>当日已返水：<span>{{today}}</span></p>
                    <p>本周返水额：<span>{{week}}</span></p> -->
                    <div class="part">
                        <p>当日已返水</p>
                        <span class="green">¥{{today}}</span>
                    </div>
                    <div class="part">
                        <p>本周返水额</p>
                        <span class="red">¥{{week}}</span>
                    </div>
                </div>
                <!-- <dl v-show="list.length > 0">
                    <dt>
                        <span>有效打码</span>
                        <span>返水金额</span>
                    </dt>
                </dl> -->
            </div>
            <!--列表数据展示 -start -->
			<!--paddingTop 用来动态计算上面层级高度，这里是可以动态改变滴-->
			<div class="generalizeLink-list">
				<div class="page-loadmore">
				<!-- :style="{ height: wrapperHeight + 'px' }" -->
					<div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px'}" ref="wrapper">
						<pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
						:bottom-all-loaded="allLoaded" :top-all-loaded="topAllLoaded" 
						@top-status-change="handleTopChange" 
						@bottom-status-change="handleBottomChange" ref="loadmore" 
						:stop-translate="stopTranslate">
							<dl>
                            <dt v-if="infoDataList.length>0">
                                <span class="left">游戏名称</span>
                                <span class="cent">有效打码</span>
                                <span class="right">返水金额</span>
                            </dt>
                                <dd v-for="(item, index) in infoDataList" :key="index">
                                    <span class="left">{{item.platformName}}</span>
                                    <span class="cent">{{item.betall}}</span>
                                    <span class="right">{{item.money}}</span>
                                </dd>
                                <div v-show="!isShowBackwaterMask" class="noData">
                                    
                                    <p>暂无数据</p>
                                </div>
                        </dl>
							<div class="noMoredata" v-show="hasData">我是有底线的</div>
						</pk-loadmore>
					</div>
				</div>
                <!--列表数据展示 -end -->
                <noData v-show="infoDataList.length == 0" :dataText="dataText" class="no-data-box"></noData>  
                <router-link class="goBetting" v-show="infoDataList.length == 0" tag="button" :to="{name:'index'}">去投注，获得返水！</router-link>
			</div>
        </div>
    </div>
</template>

<script>
import {
    getBackwaterInfo,
    getBackwaterReceive,
    getBackwaterList,
} from "@/services/center.js"
import pkLoadmore from '@/components/Loadmore';	
import Header from "@/components/Header";
import noData from "@/components/NoData.vue";
export default {
    name: "backwater",
    components: {
        pkLoadmore,
        noData,
        Header,
    },
    mounted() {
        this.getBackWaterInfo();
        this.getList();
    },
    data() {
        return {
            isShowBackwaterMask: false,
            stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
            allLoaded: false,
            topAllLoaded: false,
            topStatus: '',
            bottomStatus: '',
            wrapperHeight: 0,
            // paddingTop:this.getPaddingTop(),
            page: 1, //当前页数
            pageSize: 10, //每页请求的条数
            totalNum: 0, //总页数
            list: [],
            hasData: false,
            dataText: '您暂时还未获得返水哦~~',
            infoData: {},
            infoDataList:[],
            today: 0,
            week: 0
        };
    },
    methods: {
        // //动态计算 层级哪里的高度
        // getPaddingTop(){
        //     //92是header的固定高度
        //     return (this.$(".content").height()+92) / 75;
        // },
        //获取返水列表
        getList(t) {
            let postData = {
                    page: this.page,
                    pageSize: this.pageSize
                };
            getBackwaterList(postData).then(res => {
                if (res.success) {
                    this.today = res.data.today;
                    this.week = res.data.week;
                    this.totalNum = res.data.totalNum;
                    let result = res.data.list || [];
                    if (this.page === 1) {
                        this.list = result;
                        if (this.totalNum < this.page * this.pageSize) {
                        this.allLoaded = true;
                        this.topAllLoaded = true;
                        } else {
                        this.allLoaded = false;
                        this.topAllLoaded = false;
                        }
                    } else {
                        this.list = this.list.concat(result);
                        this.topAllLoaded = false;
                    }
                    if (t === 1) {
                        this.$toast.text("刷新成功")
                    }
                    this.$nextTick(() => {
                        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
                    })
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 2000
                    });
                }
            })
        },
        //获取返水金额以及是否能返水
        getBackWaterInfo(t) {
            getBackwaterInfo().then(res => {
                let list = [];
                if (res.success) {
                    this.infoData = res.data;
                    list = res.data.list;
                    list.map(v=>{
                        if(v.money>0){
                        this.infoDataList.push(v);
                        }
                    });

                    console.log( this.infoData, ' this.infoData')
                    if (t != 1) {
                        this.isShowBackwaterMask = true;
                    }
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 2000
                    });
                }
            });
        },
        //领取返水
        handleBackWater() {
            getBackwaterReceive().then(res => {
                if (res.success) {
                    this.$toast.text("领取成功", {
                        cover: true,
                        duration: 2000
                    });
                    this.getBackWaterInfo();
                } else {
                    this.$toast.text(res.message, {
                        cover: true,
                        duration: 2000
                    });
                }
            })
        },
        //下拉刷新
        handleTopChange (status) {
            this.topStatus = status;
        },
        loadTop () {
            this.page = 1;
            this.hasData = false;
            setTimeout(() => {
                this.getList(1);
                this.$refs.loadmore.onTopLoaded();
                this.allLoaded = false;
            }, 1500);
        },
        //mint-ui 上拉加载
        handleBottomChange (status) {
            this.bottomStatus = status;
        },
        loadBottom () {
            this.page += 1;
            this.hasData = false;
            setTimeout(() => {
                this.getList();
                this.$refs.loadmore.onBottomLoaded();
                if (this.page * this.pageSize >= this.totalNum) {
                    this.allLoaded = true; //所有数据加载完成
                    this.hasData = true;
                    this.topAllLoaded = false;
                }
            }, 1500);
        },
        back(path) {
			this.$router.push({
				name: path
			});
		},
    }
};
</script>

<style lang="scss" scoped>
button.goBetting {
    position: fixed;
    bottom: px2rem(75);;
    left: 4%;
    width: 92%;
    height:px2rem(110);
    line-height: px2rem(110);
    color: $default-color;
    text-align: center;
    border: none;
    border-radius: px2rem(10);
    font-size: px2rem(28);
    background: $primary-color;
    box-shadow: 0px 2px 5px 0px rgba($color: $nondefault-color, $alpha: 0.12);
    margin-top: px2rem(40);
    &:active {
        background: $tabtit-color;
    }
}

.content {
    .generalizeLink-list{
        .page-loadmore-wrapper{
            overflow-y: scroll;
            /*解决ios上滑动不流畅*/
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
    .backwater-top {
        ul {
            display: -webkit-flex;
            display: flex;
            flex-wrap: wrap ;
            position: relative;
            justify-content: space-evenly;
            text-align: center;
            margin:px2rem(32) auto 0;
            width: px2rem(687);
            height: px2rem(228);
            background-image: linear-gradient(103deg, #03c880 0%, #4dc7a9 100%), 
	        linear-gradient($default-color, $default-color);
        	background-blend-mode: normal, normal;
        	box-shadow: 0px 6px 16px 0px rgba(80, 168, 182, 0.31);
	        border-radius: px2rem(10);;
            li {
                position: relative;
                width: 50%;
                border-radius: px2rem(20);
                overflow: hidden;
                color: $default-color;
                h2 {
                    margin-top:px2rem(32);
                    font-size:px2rem(28);
                    font-weight: normal;
                }
                p {
                    font-family: PingFangSC-Semibold;
                    font-size: px2rem(36);
                }
                
            }
            button{
                width: px2rem(301);
                height: px2rem(66);
                border-radius: px2rem(33);
                background: $default-color;
                border: none;
                color: #03c880;
                color: $backwater-redtext;
                &:disabled{
                    color: $label-color;
                    background-color: $backwater-no-btn;
                }
                    }
        }
        ul:before{
            content: "";
            position: absolute;
            top: px2rem(55);
            left: 50%;
            margin-left: px2rem(-1);
            background: $default-color;
            height: px2rem(30);
            width: px2rem(2);
            
        }
    }
    .backwater-list {
        margin-top: px2rem(35);
        .title {
            line-height: px2rem(90);
            padding-left:px2rem(34);
            font-size: px2rem(28);
            color: $tip-color;
        }
        .total {

            background: $default-color;
            height:px2rem(156);
            display: flex;
            // justify-content: space-between;
            // align-items: center;
            .part{
                flex: 1;
                text-align: center;
                
            }
            p {
                font-size:px2rem(26);
                padding: px2rem(26) 0;
                color: $tip-color;
            }
            span {
                    font-weight: bold;
                    font-size: px2rem(35);
                    &.green{
                    color: $primary-color;
                    }
                    &.red{
                    color: $color-w;
                    }
                }
        }
    }
    .page-loadmore {
        position: fixed;
        left: 0;
        right: 0;
        dl {
            dt{
                 padding: 0 px2rem(30);
                height: px2rem(78);
                line-height: px2rem(78);
                background: $default-bg-color;
            }
            dd {
                 padding: 0 px2rem(30);
                background: $default-color;
                line-height: px2rem(88);
                border-bottom: $onerem solid $border-light;
               
            }
            span{
                   display: inline-block;
                   width: 33%;

               }
            .left{
                text-align: left;
            }
            .cent{
                text-align: center;
            }
            .right{
                text-align: right;
            }
        }
    }
}
</style>