
<template>
    <div class="generalizeLink">
        <nut-navbar class="pk-title"  @on-click-back="$router.go(-1)" @on-click-more="$router.push({name:'index'})">
            推广链接
            <a class="spans" slot="back-icon">
                <img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png"/>
            </a>
            <a class="backIdex" slot="more-icon" >
                <img class="imgsbank" src="../../../assets/img/my-icon/backIndex.png"/>
            </a>
        </nut-navbar>
		<div class="content" v-show="!showLoading">
			<div class="generalizeLink-add" @click="addModal" >添加推广链接</div>
            
            <!--推广链接列表 -start -->
            <div class="link-list">
                <swipe-list
                    ref="list"
                    class="card"
                    :disabled="!enabled"
                    :items="list"
                    item-key="id"
                    @swipeout:click="itemClick()"
                    @rightRevealed="slideRight($event)"
                >
                    <template v-slot="{ item, index, close }">
                        <div class="card-content">
                            <div class="left">
                                    <span @click.stop="previewQrCode(item)">
                                        <qriously :value="item.spreadUrl" :size="size"/>
                                    </span>
                                <a @click.stop="showDetailModal(item)">返点详情</a>
                            </div>
                            <div class="center">
                                <p>推广码：<span>{{item.spreadCode}}</span></p>
                                <p><label>推广链接：</label>
                                    <span class="link">{{item.spreadUrl}}</span>
                                </p>
                                <p class="time">生成时间：{{item.createTime | filterDate}}</p>
                            </div>
                            <div class="right">
                                <span @click.stop="copyLink(item.spreadUrl)">
                                    <i class="iconfont icon-qb-copy"></i>
                                </span>
                            </div>
                        </div>
                    </template>

                    <template v-slot:right="{ item,threshold }">
                        <div class="swipeout-action red" title="remove" @click="remove(item)">
                            <span>删除</span>
                        </div>
                    </template>

                    <template v-slot:empty>
                        <no-data class="no-data-box"></no-data>
                    </template>
                </swipe-list>
            </div>
            <!--推广链接列表 -end -->
            
	        <!--添加推广链接弹框 -start -->
			<div v-show="isShowAddMask" v-if="showFlag">
				<div class="copy-writer-details-mask" @touchmove.self.prevent></div>
				<div class="copy-writer-details-box">
					<div class="details-title pk-1px-b">
						<span>添加推广链接</span>
						<span @click="isShowAddMask = false;"><i class="iconfont icon-sykszz-close"></i> </span>
					</div>
					<div class="details-content">
						<ul class="clearfix">
							<div v-for="item in postData" :key="item.typeId">
								<li v-show="item.typeId === 1" v-for="(childItem,index) in item.data" :key="index">
									<Counter
										v-if="childItem"
										:childItem="childItem"
										:index="index"
										@addAndReduce="addAndReduce"
									/>

								</li>
							</div>
						</ul>
						<div class="add-btn">
							<button class="reset" @click="getAddData()">重置</button>
							<button v-show="!isSubmit" @click="submitLink()">生成链接</button>
							<button v-show="isSubmit">生成链接</button>
						</div>
					</div>
				</div>
			</div>
            <!--添加推广链接弹框 -end -->
            

            <!--二维码预览弹框 -start -->
			<div v-show="isShowQrCodeMask" @click="isShowQrCodeMask = false;" class="qrcode-preview">
				<div class="copy-writer-details-mask" @touchmove.self.prevent></div>
				<div class="copy-writer-details-box">
					<qriously v-if="info.spreadUrl" :value="info.spreadUrl" :size="sizeBig"/>
				</div>
			</div>
			<!--二维码预览弹框 -end -->


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
							<li v-for="(item,index) in info.data" :key="index">
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
                    <skeleton-square style="width:100%;height:2.25rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="3.1667rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="6rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="3.1667rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="6rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="3.1667rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="6rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="3.1667rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="6rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
            </div>
        </div>
    </div>
</template>
<script>
    import modal from "../../../components/modal.vue";
    import Counter from '@/components/Counter';
    import {SwipeList, SwipeOut} from '@/components/vue-swipe-actions';
    // import {SwipeList, SwipeOut} from 'vue-swipe-actions';
    // import '@/components/vue-swipe-actions/dist/vue-swipe-actions.css';
    import func from '@/services/spread'
    import noData from "@/components/NoData.vue"

export default {
    name:'generalizeLink',
    components: {
        noData,
		    modal,
            SwipeList,
            SwipeOut,
            Counter
        },
	data() {
		return {
			    size: this.HTML_FONT_SIZE *2,//列表二维码大小
                sizeBig: this.HTML_FONT_SIZE * 8,//二维码预览大小

                isShowAddMask: false,//是否显示添加弹框
                isShowQrCodeMask: false,//是否显示二维码预览弹框
                isShowDetailMask: false,//是否显示返点详情弹框
                isSubmit:false,//阻止提交多次点击
                showLoading: true,
                list: [],//列表数据
                postData: [],//添加的数据
                info: {},//返点详情
                enabled: true,
                showFlag: false
		};
	},
	mounted() {
        this.getList();
	},
	methods: {

        //二维码预览
        previewQrCode (item) {
            this.isShowQrCodeMask = true;
            this.info = item;
        },

        //打开添加弹框
        addModal () {
            // 获取添加链接彩票列表数据
            this.getAddData();
        },
        //复制链接
        copyLink (msg) {
            this.$copyText(msg).then((e) => {
                this.$toast.success('复制成功',{cover:true});
            }, (e) => {
                this.$toast.fail('复制失败',{cover:true});
            })
        },
         //显示返点详情弹框
        showDetailModal (item) {
            this.isShowDetailMask = true;
            //获取返点详情
            this.info = item;
        },
        getList () {
            let loading = this.$toast.loading('加载中...');
            func.getSpreadList().then(res => {
                loading.hide();
                console.log('推广链接列表', res);
                if(res.success){
                    if (res.data) {
                        this.list = res.data.data;
                    }
                }else {
                    this.$toast.fail(res.message,{cover:true,duration:4000});
                }
                this.showLoading = false;
            })
           
        },

        //获取添加链接需要填写的数据
        getAddData () {
            this.showFlag = false
            func.getAddSpreadData().then(res => {
                if(res.success){
                    if (res.data) {
                    //只展示彩票的数据 在页面里做了判断的
                        this.postData = res.data.data;
                        this.isShowAddMask = true;//数据获取成功才打开添加弹框
                        this.showFlag = true;
                    }
                }else {
                    this.$toast.fail(res.message,{cover:true,duration:4000});
                }
            })
        },

        //生成链接
            submitLink () {
                let postData = [];
                this.postData.forEach((item) => {
                    postData = postData.concat(item.data);
                })
                let loading = this.$toast.loading('提交中...');
                func.setSpreadAdd({data: postData}).then((res) => {
                    loading.hide();
                    if(res.success){
                        this.isShowAddMask = false;
                        this.getList();
                        this.postData=[];//重置是为了将填写的数据重新初始化
                        this.$toast.success('链接生成成功',{cover:true});
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                })
                
            },

            //删除-右滑动 打开当前，关闭其他
            slideRight (e) {
                let max = this.list.length;
                for (let i = 0; i < max; i++) {
                    if (i !== e.index) {
                        this.$refs.list.closeActions(i);
                    }
                }
            },

            //点击关闭
            itemClick () {
                this.$refs.list.closeActions();
            },


            //删除
            remove (item) {
                let loading = this.$toast.loading('提交中...');
                func.deleteSpread({
                    id: item.id
                }).then((res) => {
                    loading.hide();
                    if(res.success){
                        this.$toast.success('删除成功',{cover:true});
                        this.getList();
                    }else {
                        this.$toast.fail(res.message,{cover:true,duration:4000});
                    }
                   
                })
            },

             //加 / 减 彩票的数据
            addAndReduce (value, index) {
                let data = [];
                this.postData.map((item) => {
                    if(item.typeId === 1){ //typeId === 1 是彩票
                        data = item.data;
					}
				})
                data[index].retreatCode = value;
            },
       
	}
};
</script>

<style lang="scss" scoped>
// @import url('vue-swipe-actions/dist/vue-swipe-actions.css');
    /*!
    * vue-swipe-actions v2.0.0-beta.18
    * (c) 2016-present eCollect
    * Released under the MIT License.
    */
    .swipeout {
        position: relative;
        overflow: hidden;
        display: flex;
    }

    .swipeout .swipeout-left, .swipeout .swipeout-right {
        position: absolute;
        height: 100%;
        display: flex;
        z-index: 1;
    }

    .swipeout .swipeout-left {
        left: 0;
        transform: translateX(-100%);
    }

    .swipeout .swipeout-right {
        right: 0;
        transform: translateX(100%);
    }

    .swipeout .swipeout-content,
    .swipeout .swipeout-action {
        transition: transform .2s;
        will-change: transform;
    }

    .swipeout.swipeout--no-transition .swipeout-content,
    .swipeout.swipeout--no-transition .swipeout-action {
    transition: none !important;
    }

    .swipeout .swipeout-content {
        width: 100%;
    }

    .swipeout-non-selectable {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
            -ms-user-select: none !important;
                user-select: none !important;
    }

    .swipeout-no-pointer-events {
        pointer-events: none !important;
    }

    /* SwipeList */

    .swipeout-list {
        display: flex;
        flex-direction: column;
    }

    .swipeout-list-item {
        flex: 1;
    }


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
    
    .content {
        padding: 0 0.40rem 0.40rem;
        .generalizeLink-add {
			margin-top: 0.40rem;
			height: 1.07rem;
			line-height: 1.07rem;
			text-align: center;
			color: $default-color;
			background-color: $primary-color;
			box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
			border-radius: 0.13rem;
			font-weight: 400;
			font-size: 0.37rem;
		}
		.link-list {
			/deep/ .swipeout-list-item {
				margin-top: 0.40rem;
				background-color: $default-color;
				box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
				border-radius: 0.13rem;
				display: flex;
				.left {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					span {
						display: block;
						border: 1px solid $nondefault-color;
						img {
							width: 1.33rem;
							height: 1.33rem;
							display: block;
						}
					}

					a {
						margin-top: 0.07rem;
						color: $color-C;
						font-size: 0.27rem;
						text-decoration: underline;
					}
				}
				.center {
					flex: 1;
					padding-left: 0.40rem;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					p {
						color: $color-C;
						font-size: 0.32rem;
						label {
							float: left;
						}
						span {
							color: $color-p;
							&.link {
								float: left;
								width: 65%;
								display: block;
								word-break: break-all;
								word-wrap: break-word;
							}
						}
						&.time {
							color: $color-J;
							font-size: 0.27rem;
						}
					}
				}
				.right {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					span {
						background: $primary-color;
						border-radius: 0.13rem;
						width: 0.64rem;
						height: 0.64rem;
						line-height: 0.64rem;
						display: block;
						text-align: center;
						box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
						i {
							font-size: 0.40rem;
							color: $default-color;
							border-radius: 0.13rem;
						}
					}

				}
			}
		}
		.copy-writer-details-box {
			padding: 0;
			top: 6%;
			z-index: 100;
			transform: none;

			.details-title span {
				color: $color-C;
				i {
					color: $color-J;
				}
			}
			.details-content {
				padding: 0;

				ul {
					max-height: 10.15rem;
					overflow: auto;
					background: $color-Q;
					li {
						float: left;
						width: 50%;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						text-align: center;
						align-items: center;
						padding: 0.40rem 0;
						border-bottom: 1px solid $color-P;
						background: $default-color;
						&:nth-child(2n+1) {
							border-right: 1px solid $color-P;

						}
					}
				}
				.add-btn {
					background: $color-Q;
					padding: 0.40rem;
					display: flex;
					justify-content: space-around;
					box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
					border-radius: 0 0 0.13rem 0.13rem;

					button {
						width: 3.20rem;
						height: 1.07rem;
						line-height: 1.07rem;
						text-align: center;
						color: $default-color;
						background: $primary-color;
						box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
						border-radius: 0.13rem;
						border: solid 1px $primary-color;
						font-size: 0.37rem;
						&.reset {
							background: $default-color;
							color: $primary-color;
						}
					}
				}
			}
		}

	}

	//二维码预览
	.qrcode-preview {
		.copy-writer-details-mask {
			opacity: 1;
			z-index: 100;
		}
		.copy-writer-details-box {
			top: 50%;
			margin-top: -50%;
			border: 1px solid $default-color;
			padding: 0.13rem;
			width: 80%;
			margin-left: -42%;
			left: 50%;
			background: #fff;
		}
	}

	//返点详情弹框
	.detail-modal {
		.copy-writer-details-box {
			top: 20%;
			.details-content {

				.title {
					color: $color-C;
					height: 1.07rem;
					line-height: 1.07rem;
					padding: 0 0.40rem;
					border-bottom: 1px solid $color-P;
					span {
						color: $color-p;
						font-size: 0.43rem;
					}
				}
				ul {
					border-radius: 0 0 0.13rem 0.13rem;
					background: $default-color;
					li {
						width: 100%;
						flex-direction: row;
						padding: 0.4rem;
						justify-content: space-between;
						h2 {
							padding: 0;
							display: inline-block;
							width: auto;
							font-size: 0.37rem;
						}
						span {
							font-size: 0.37rem;
						}
					}
				}
			}
		}

	}

	/* app specific styles */
	.swipeout-action {
		display: flex;
		align-items: center;
		padding: 0 .5rem;
		cursor: pointer;
		left: 0;
	}

	.swipeout-action.red {
		color: $default-color;
		background-color: rgb(255, 59, 48);
	}

	.card {
		width: 100%;
		border-radius: 3px;
		box-shadow: none;
	}

	.card-content {
		padding: 0.32rem;
		display: flex;
	}

	.no-data-box {
		margin-top: 2.13333rem /* 160/75 */;
	}
</style>


