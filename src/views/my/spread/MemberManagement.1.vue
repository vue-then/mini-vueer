<template>
	<div class="generalizeLink">
        <nut-navbar class="pk-title"  @on-click-back="$router.go(-1)">
            会员推广管理
            <a class="spans" slot="back-icon">
                <img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png"/>
            </a>
            <a class="backIdex" slot="more-icon" >
                <img class="imgsbank" src="../../../assets/img/my-icon/backIndex.png"/>
            </a>
        </nut-navbar>
		<div class="content" v-show="!showLoading">
			<div class="generalizeLink-top">
				<div class="generalizeLink-top-title pk-1px-b">当前级数：<span class="current">{{nextAccount.length+1}}</span></div>
				<div class="generalizeLink-top-current pk-1px-b clearfix">
					<div class="current-title">当前层级：</div>
					<div class="group-box">
						<p><span class="current">{{account}}</span></p>
						<p @click="resetAccount(item,index)" v-for="(item,index) in nextAccount" :key="index"><<span>{{item}}</span></p>
					</div>
				</div>
			</div>

			<!--列表数据展示 -start -->
			<!--paddingTop 用来动态计算上面层级高度，这里是可以动态改变滴-->
			<div class="generalizeLink-list" :style="{paddingTop:paddingTop+'rem'}">
                <div v-show="list.length>0" class="page-loadmore">
					<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
						<pk-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :top-all-loaded="topAllLoaded" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange" ref="loadmore" :stop-translate="stopTranslate">
							<ul>
								<li v-for="(item,index) in list" :key="index">
									<div class="left">
										<h1>会员账号：<span>{{item.account}}</span></h1>
										<h2>系统余额：<span>{{item.balance}}</span></h2>
										<p>最后登录时间：{{item.loginLastTime | filterDate}}</p>
									</div>
									<div class="right">
										<h1 @click="spreadNumHandle(item)">推广人数：<span>{{item.spreadAllMember}}人</span></h1>
										<h2>返佣总额：<span>{{item.spreadAllMoney}}</span></h2>
										<i class="iconfont icon-woyaotuiguang-fandianxiangqingbtn" @click="showDetailModal(item)"></i>
									</div>
								</li>
							</ul>
							<div class="nodata" v-show="hasData">我是有底线的</div>
						</pk-loadmore>
					</div>
				</div>
                <no-data v-show="list.length<=0" class="no-data-box"></no-data>
			</div>
			<!--列表数据展示 -end -->



			<!--返点详情弹框 -start -->
			<div v-show="isShowDetailMask" class="detail-modal">
				<div class="copy-writer-details-mask" @touchmove.self.prevent></div>
				<div class="copy-writer-details-box">
					<div class="details-title pk-1px-b">
						<span>返点详情</span>
						<span @click="isShowDetailMask = false;"><i class="iconfont icon-sykszz-close"></i> </span>
					</div>
					<div class="details-content">
						<div class="title">会员账号：<span>{{info.account}}</span></div>
						<ul class="clearfix">
							<li v-for="item in info.info" :key="item.id">
								<h2>{{item.typeName}}</h2>
								<span>{{item.retreatCode}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--返点详情弹框 -end -->

		</div>
        <div class="skeleton vue-skeleton-loading" v-show="showLoading">
            <div class="skeleton-bac-animation"></div>
            <div class="skeleton-bac-content">
                <row style="width:100%">
                    <skeleton-square style="width:100%;height:1.3333rem"></skeleton-square>
                </row>
                <row padding="0.2rem 0 0 0 " style="width:100%">
                    <skeleton-square style="width:100%;height:1.3333rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 " style="justify-content: center;">
                    <skeleton-square width="9rem" style="height:2.5rem;" margin="0 0.3rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 " style="justify-content: center;">
                    <skeleton-square width="9rem" style="height:2.5rem;" margin="0 0.3rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 " style="justify-content: center;">
                    <skeleton-square width="9rem" style="height:2.5rem;" margin="0 0.3rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 " style="justify-content: center;">
                    <skeleton-square width="9rem" style="height:2.5rem;" margin="0 0.3rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 " style="justify-content: center;">
                    <skeleton-square width="9rem" style="height:2.5rem;" margin="0 0.3rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 " style="justify-content: center;">
                    <skeleton-square width="9rem" style="height:2.4rem;" margin="0 0.3rem"></skeleton-square>
                </row>
            </div>
        </div>
	</div>
</template>

<script>
    import pkLoadmore from '@/components/Loadmore'
    import func from '@/services/spread'
    import noData from "@/components/NoData.vue"

    export default {
        name: "memberManagement",
        components: {
            pkLoadmore,
            noData
        },
		mounted(){
          	this.getList();
            this.paddingTop = this.getPaddingTop();
		},
		data(){
            return {
                level:1,//当前层级
                account:localStorage.getItem('name'),//当前账号
                nextAccount:[],//下级账号
                allLoaded: false,
                topAllLoaded: false,
                topStatus: '',
                bottomStatus: '',
                wrapperHeight: 0,
                stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
                page: 1, //当前页数
                pageSize: 10, //每页请求的条数
                totalNum: 0, //总页数
                list: [],//列表数据
				info:{},//返点详情
                hasData: false,//我是有底线的 是否显示
                paddingTop:this.getPaddingTop(),
                showLoading: true,
                isShowDetailMask:false,//是否显示返点详情
            }
		},
		methods:{
			//动态计算 层级哪里的高度
            getPaddingTop(){
                //92是header的固定高度
                return (this.$(".generalizeLink-top").height()+92)/75;
			},

			//重置账号 层级
            resetAccount(item,index){
                this.nextAccount = this.nextAccount.slice(index+1,);
                this.account = item;
                this.getList();
			},

			//展开 账号层级
            spreadNumHandle(item){
				if(item.spreadAllMember === 0) return;//推广人数为0不做操作

                this.nextAccount.unshift(this.account);
                this.account = item.account;
                this.getList();
			},

            //显示返点详情弹框 并从列表获取返点详情
            showDetailModal(item){
                this.isShowDetailMask = true;
				this.info = item;
            },

			//获取分页列表数据
            getList () {
                let postData = {
                    pageParams: {
                        page: this.page,
                        pageSize: this.pageSize,
                    },
                   	account:this.account
                }
                let loading = this.$toast.loading('加载中...');
                func.getMemberList(postData).then((res) => {
                    loading.hide();
                    if(res.success){
                        if(res.data){
                            let data = res.data;
                            let result = data.list?data.list:[];
                            this.totalNum = data.totalNum;
                            // this.level = data.level;
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
                            this.$nextTick(() => {
                                this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
                                this.paddingTop = this.getPaddingTop();
                            })
                        }
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                    this.showLoading=false;
                })
            },

            //下拉刷新
            handleTopChange (status) {
                this.topStatus = status;
            },

			//下拉刷新 状态改变
            loadTop () {
                this.page = 1;
                this.hasData = false;
                setTimeout(() => {
                    this.getList(1);
                    this.$refs.loadmore.onTopLoaded();
                    this.allLoaded = false;
                }, 1500);
            },

            //上拉加载 状态改变
            handleBottomChange (status) {
                this.bottomStatus = status;
            },

			// 上拉加载
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
		}
    }
</script>

<style scoped lang="scss">
    /deep/.skeleton{
            .skeleton-bac-content{
                .vue-skeleton-row{
                    .vue-skeleton-square-wrap{
                        .vue-skeleton-square{
                            height: 100%!important;
                        }
                    }
                }
            }
        }
	.content{
        background: $center-newbg;
		.generalizeLink-top{
			position: fixed;
            top: 1.1466666rem; /* 86/75 */;
            
			left: 0;
			width: 100%;
			z-index: 2;
			background: $default-color;
			.generalizeLink-top-title{
				padding:0.29rem 0.40rem;
				font-size: 0.43rem;
				color: $color-C;
				span{
					color: $color-C;
					text-decoration: underline;
					&.current{
						color: $primary-color;
						font-size: 0.48rem;
						text-decoration: none;
					}
				}
			}
			.generalizeLink-top-current{
				font-size: 0.43rem;
				color: $color-C;
				span{
					color: $color-C;
					text-decoration: underline;
					&.current{
						color: $primary-color;
						font-size: 0.48rem;
						text-decoration: none;
					}
				}
				padding:0 0.40rem 0.35rem;

				display: flex;
				.current-title{
					margin-top: 0.35rem;
				}
				.group-box{
					flex: 1;
					p{
						display: inline-block;
						font-size: 0.43rem;
						margin-top: 0.35rem;
						margin-right: 0.07rem;
						span{
							font-size: 0.43rem;
							&.current{
								color: $primary-color;
								font-size: 0.43rem;
								text-decoration: none;
							}
						}
					}
				}
			}
		}

		.generalizeLink-list{
			padding: 5.33rem 0.40rem 0.40rem;
			ul{
				li{
					background: $default-color;
					box-shadow: 0px 2px 5px 0px
					RGBA(0,196,255,0.4);
					border-radius: 0.13rem;
					padding: 0.32rem;
					display: flex;
                    margin: 0.27rem 0;
                    position: relative;
					.left{
						display: inline-block;
						h1{
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;
							span{
								font-size: 0.32rem;
								color: $color-p;
								font-weight: bold;
							}
						}
						h2{
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;

							span{
								font-size: 0.32rem;
								color: $color-C;
								font-weight: bold;
							}

						}
						p{
							font-size: 0.27rem;
							color: $color-J;
							line-height: 1.6;
						}
					}
					.right{
                        display: inline-block;
						h1{
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;
							span{
								font-size: 0.32rem;
								color: $color-p;
								font-weight: bold;
							}
						}
						h2{
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;

							span{
								font-size: 0.32rem;
								color: $color-C;
								font-weight: bold;
							}

						}
						p{
							font-size: 0.27rem;
							color: $color-J;
							line-height: 1.6;
						}
						
						h1{
							span{
								text-decoration: underline;
							}
						}
						i{
							font-size: 0.64rem;
							box-shadow: 0px 0px 5px 0px
							rgba(0, 0, 0, 0.2);
							border-radius: 0.13rem;
							color: $primary-color;
							position: absolute;
							right: .26667rem /* 20/75 */;
                            top: .26667rem /* 20/75 */;
							// margin-top: -0.32rem;
						}
                    }
				}
			}
		}

		//返点详情弹框
		.detail-modal{
			.copy-writer-details-box{
				.details-title{
					span{
						color: $color-C;
						i{
							color: $color-J;
						}
					}
				}
				.details-content{
					padding: 0;
					.title{
						color: $color-C;
						font-size: 0.37rem;
						padding: 0 0.4rem;
						height: 1.07rem;
						line-height: 1.07rem;
						border-bottom: 1px solid $color-P;

						span{
							color: $color-p;
							font-size: 0.43rem;
						}
					}
					ul{
						border-radius:  0 0 0.13rem 0.13rem;
						background: $default-color;
						max-height: 6.15rem;
						overflow: auto;
						li{
							display: flex;
							flex-direction: row;
							padding: 0.4rem;
							justify-content: space-between;
							border-bottom: 1px solid $color-P;
							h2{
								padding: 0;
								display: inline-block;
								width: auto;
								font-size: 0.37rem;
								font-weight: normal;
							}
							span{
								font-size: 0.37rem;
							}
						}
					}
				}
			}


		}
	}

		.no-data-box {
			margin-top: 3.13rem/* 235/75 */;
		}
</style>