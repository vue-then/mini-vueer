<template>
	<div class="generalizeLink">
        <Header title="推广记录"></Header>
		<div class="content" v-show="!showLoading">
			<div class="generalizeLink-top">
				<!-- <div class="link-box">
					<div class="links">
						<p class="linkp">
							推广链接
							<span @click.stop="copyLink(imgUrl)" v-show="showDetail">
								<i class="iconfont icon-qb-copy"></i>
							</span>
							<span class="clearboth"></span>
						</p>
						<p class="linkurl">{{ imgUrl }}</p>
					</div>
					<div class="qrcode" v-show="showDetail">
						<div class="left">
							<span @click.stop="previewQrCode()">
								<qriously
									v-if="imgUrl"
									:value="imgUrl"
									:size="size"
								/>
							</span>
							<a id="down_btn_a" @click="downLoadImg()"
								>点击下载</a
							>
						</div>
					</div>
				</div> -->
				<div class="generalizeLink-top-title">
					我的推广：<span class="current"
						>(当前层级{{ nextAccount.length + 1 }})</span
					>
				</div>
				<div class="generalizeLink-top-current pk-1px-b clearfix">
					<div class="current-title" v-show="nextAccount.length != 0">当前层级：</div>
					<div class="group-box">
						<p>
							<span class="current">{{ account }}</span>
						</p>
						<p
							@click="resetAccount(item, index)"
							v-for="(item, index) in nextAccount"
							:key="index"
						>
							<<span>{{ item }}</span>
						</p>
					</div>
				</div>
			</div>

			<div class="table">
				<nut-row
					class="thead reheads"
					type="flex"
					justify="space-between"
					flexWrap="nowrap"
				>
					<nut-col class="md-3">
						<div class="flex-content">会员账号</div>
					</nut-col>
					<nut-col class="md-3">
						<div class="flex-content">推广人数</div>
					</nut-col>
					<nut-col class="md-3">
						<div class="flex-content">系统余额</div>
					</nut-col>
					<nut-col class="md-3">
						<div class="flex-content">返佣总额</div>
					</nut-col>
					<nut-col class="md-3">
						<div class="flex-content">最后登录时间</div>
					</nut-col>
				</nut-row>
				<div class="betList">
					<div v-show="list.length > 0" class="page-loadmore">
						<div
							class="page-loadmore-wrapper"
							ref="wrapper"
							:style="{ height: wrapperHeight + 'px' }"
						>
							<pk-loadmore
								:top-method="loadTop"
								:bottom-method="loadBottom"
								:bottom-all-loaded="allLoaded"
								:top-all-loaded="topAllLoaded"
								@top-status-change="handleTopChange"
								@bottom-status-change="handleBottomChange"
								ref="loadmore"
								:stop-translate="stopTranslate"
							>
								<div
									v-for="(item, index) of list"
									:key="index"
									class="nut-row nut-vert-list-panel thead tbody tableList nut-row-flex nut-row-justify-space-between"
								>
									<div
										class="nut-col md-3 cols nut-col-24 nut-col-offset-0"
									>
										<div class="flex-content">
											<p class="ptype">
												{{ item.account }}
											</p>
										</div>
									</div>
									<div
										class="nut-col md-3 cols nut-col-24 nut-col-offset-0"
									>
                                        <div class="flex-content blue hasline" @click="spreadNumHandle(item)">
											{{ item.spreadAllMember }}
										</div>
										
									</div>
									<div
										class="nut-col md-3 cols nut-col-24 nut-col-offset-0"
									>
                                        <div class="flex-content">
                                            {{item.balance | currency('',2)}}
                                        </div>
									</div>
                                    <div
										class="nut-col md-3 cols nut-col-24 nut-col-offset-0"
									>
                                        <div class="flex-content">
                                            {{item.spreadAllMoney | currency('',2)}}
                                        </div>
									</div>
									<div
										class="nut-col md-3 cols nut-col-24 nut-col-offset-0"
									>
										<div class="flex-content ptime">
											{{item.loginLastTime | filterDate}}
										</div>
									</div>
									
								</div>
								<div class="nodata" v-show="hasData">
									我是有底线的
								</div>
							</pk-loadmore>
						</div>
					</div>
					<no-data
						v-show="list == null || list.length <= 0"
						class="no-data-box"
					></no-data>
				</div>
			</div>

			

			<!--二维码预览弹框 -start -->
			<div
				v-show="isShowQrCodeMask"
				@click="isShowQrCodeMask = false"
				class="qrcode-preview"
			>
				<div
					class="copy-writer-details-mask"
					@touchmove.self.prevent
				></div>
				<div class="copy-writer-details-box" id="imgbox">
					<qriously v-if="imgUrl" :value="imgUrl" :size="sizeBig" />
				</div>
			</div>
			<!--二维码预览弹框 -end -->
		</div>
		<div class="skeleton vue-skeleton-loading" v-show="showLoading">
			<div class="skeleton-bac-animation"></div>
			<div class="skeleton-bac-content">
				<row style="width:100%">
					<skeleton-square
						style="width:100%;height:1.3333rem"
					></skeleton-square>
				</row>
				<row padding="0.2rem 0 0 0 " style="width:100%">
					<skeleton-square
						style="width:100%;height:1.3333rem"
					></skeleton-square>
				</row>
				<row padding="0.2rem  0 0 0 " style="justify-content: center;">
					<skeleton-square
						width="9rem"
						style="height:2.5rem;"
						margin="0 0.3rem"
					></skeleton-square>
				</row>
				<row padding="0.2rem  0 0 0 " style="justify-content: center;">
					<skeleton-square
						width="9rem"
						style="height:2.5rem;"
						margin="0 0.3rem"
					></skeleton-square>
				</row>
				<row padding="0.2rem  0 0 0 " style="justify-content: center;">
					<skeleton-square
						width="9rem"
						style="height:2.5rem;"
						margin="0 0.3rem"
					></skeleton-square>
				</row>
				<row padding="0.2rem  0 0 0 " style="justify-content: center;">
					<skeleton-square
						width="9rem"
						style="height:2.5rem;"
						margin="0 0.3rem"
					></skeleton-square>
				</row>
				<row padding="0.2rem  0 0 0 " style="justify-content: center;">
					<skeleton-square
						width="9rem"
						style="height:2.5rem;"
						margin="0 0.3rem"
					></skeleton-square>
				</row>
				<row padding="0.2rem  0 0 0 " style="justify-content: center;">
					<skeleton-square
						width="9rem"
						style="height:2.4rem;"
						margin="0 0.3rem"
					></skeleton-square>
				</row>
			</div>
		</div>
	</div>
</template>

<script>
import pkLoadmore from "@/components/Loadmore";
import func from "@/services/spread";
import noData from "@/components/NoData.vue";
import Header from '@/components/Header';

export default {
	name: "memberManagement",
	components: {
		pkLoadmore,
        noData,
        Header
	},
	mounted() {
		this.getList();
		this.paddingTop = this.getPaddingTop();
	},
	data() {
		return {
			level: 1, //当前层级
			account: localStorage.getItem("account"), //当前账号
			nextAccount: [], //下级账号
			allLoaded: false,
			topAllLoaded: false,
			topStatus: "",
			bottomStatus: "",
			wrapperHeight: 0,
			stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
			page: 1, //当前页数
			pageSize: 10, //每页请求的条数
			totalNum: 0, //总页数
			list: [], //列表数据
			info: {}, //返点详情
			hasData: false, //我是有底线的 是否显示
			paddingTop: this.getPaddingTop(),
			showLoading: true,
			imgUrl: "",
			isShowDetailMask: false, //是否显示返点详情
			isShowQrCodeMask: false, //二维码预览 模态框打开
			size: this.HTML_FONT_SIZE * 2, //列表二维码大小
            sizeBig: this.HTML_FONT_SIZE * 8, //二维码预览大小
            showDetail: false
		};
	},
	methods: {
		downLoadImg() {
			// var img = this.$jq("#imgbox")
			// 	.children("div")
            //     .children("canvas")[0];
                // console.log(img.width,'img')
                // console.log(img.height,'img')
            // this.$jq(img).css({"backgroundColor":"#fff"})

            var img = this.$jq(".qrcode .left")
				.children("span")
				.children("div")
                .children("canvas")[0];
                // console.log(img,'img')

            // 构建画布
			var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d")
            // var imgs=new Image();
            // imgs.onload=function(){
            //     canvas.width=400;
            //     canvas.height=300;
            //     ctx.drawImage(imgs,0,0,imgs.width,imgs.height,0,0,400,300);
            // }
            ctx.width = img.width;
            ctx.height = img.height;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, ctx.width, ctx.height);
            ctx.drawImage(img, 0, 0, ctx.width, ctx.height);
            
			// 构造url
            var url = canvas.toDataURL("image/png");
			// // 构造a标签并模拟点击
			var downloadLink = document.createElement("a");
			downloadLink.setAttribute("href", url);
			downloadLink.setAttribute("download", "推广二维码.png");
			downloadLink.click();
		},
		//二维码预览
		previewQrCode() {
			this.isShowQrCodeMask = true;
		},
		//动态计算 层级哪里的高度
		getPaddingTop() {
			//92是header的固定高度
			return (this.$(".generalizeLink-top").height() + 92) / 75;
		},

		//重置账号 层级
		resetAccount(item, index) {
			this.nextAccount = this.nextAccount.slice(index + 1);
			this.account = item;
			this.getList();
		},

		//展开 账号层级
		spreadNumHandle(item) {
			if (item.spreadAllMember === 0) return; //推广人数为0不做操作
			this.nextAccount.unshift(this.account);
			this.account = item.account;
			this.getList();
		},

		//显示返点详情弹框 并从列表获取返点详情
		showDetailModal(item) {
			this.isShowDetailMask = true;
			this.info = item;
		},

		//获取分页列表数据
		getList() {
			let postData = {
				pageParams: {
					page: this.page,
					pageSize: this.pageSize
				},
				account: this.account
			};
			let loading = this.$toast.loading("加载中...");
			func.getMemberList(postData).then(res => {
				loading.hide();
				if (res.success) {
					if (res.data) {
						let data = res.data;
						this.imgUrl = data.url;
						let result = data.list ? data.list : [];
                        this.totalNum = data.totalNum;
                        this.showDetail = true;
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
				} else {
                    this.showDetail = false
					this.$toast.fail(res.message, {
						cover: true,
						duration: 4000
					});
				}
				this.showLoading = false;
			});
		},

		//下拉刷新
		handleTopChange(status) {
			this.topStatus = status;
		},

		//下拉刷新 状态改变
		loadTop() {
			this.page = 1;
			this.hasData = false;
			setTimeout(() => {
				this.getList(1);
				this.$refs.loadmore.onTopLoaded();
				this.allLoaded = false;
			}, 1500);
		},

		//上拉加载 状态改变
		handleBottomChange(status) {
			this.bottomStatus = status;
		},

		// 上拉加载
		loadBottom() {
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

		//复制链接
		copyLink(msg) {
			this.$copyText(msg).then(
				e => {
					this.$toast.success("复制成功", { cover: true });
				},
				e => {
					this.$toast.fail("复制失败", { cover: true });
				}
			);
		}
	}
};
</script>

<style scoped lang="scss">
	/deep/.skeleton {
		.skeleton-bac-content {
			.vue-skeleton-row {
				.vue-skeleton-square-wrap {
					.vue-skeleton-square {
						height: 100% !important;
					}
				}
			}
		}
    }
    

	.content {
		background: $center-newbg;

		.generalizeLink-top {
			// position: fixed;
			// top: 1.1466666rem; /* 86/75 */;
			left: 0;
			width: 100%;
			z-index: 2;
			// background: $default-color;
			.link-box {
				display: flex;
				padding: 0.46667rem /* 35/75 */ 0.4rem /* 30/75 */;
				padding-bottom: 0.13333rem /* 10/75 */;
                margin-bottom: 0.46667rem /* 35/75 */;
                padding-right: 0;
				background: $default-color;
				.links {
					width: 70%;
					.linkp {
						font-size: 0.42667rem /* 32/75 */;
						color: $title-color;
						margin-bottom: 0.13333rem /* 10/75 */;
						span {
							float: right;
						}
						.clearboth {
							clear: both;
						}
					}
					.linkurl {
						font-size: 0.34667rem /* 26/75 */;
						color: $text-color;
					}
				}
				.qrcode {
					flex: 1;
					margin-right: 0.13333rem /* 10/75 */;
					.left {
						text-align: center;
						width: 100%;
						span {
							width: 100%;
							display: block;
						}
						a {
							font-size: 0.29333rem /* 22/75 */;
							color: $primary-color;
							text-decoration: underline;
						}
					}
				}
			}
			.generalizeLink-top-title {
				background: #f2f2f2;
				padding: 0.29rem 0.4rem;
                font-size: px2rem(24);
                color: #999;
				span {
					color: #999;
					text-decoration: underline;
					&.current {
						color: #1a1a1a;
                        font-size: px2rem(24);
						text-decoration: none;
					}
				}
			}
			.generalizeLink-top-current {
				font-size: px2rem(28);
				background: $default-color;
				span {
					color: #333333;
					// text-decoration: underline;
					&.current {
						color: $tip-color;
						font-size: 0.34667rem /* 26/75 */;
						text-decoration: none;
					}
				}
				padding: 0.35rem 0.4rem;

				display: flex;
				.current-title {
					//margin-top: 0.35rem;
				}
				.group-box {
					flex: 1;
					p {
						display: inline-block;
						font-size: px2rem(28);
						//margin-top: 0.35rem;
						margin-right: 0.07rem;
                        color: #17c492;
						span {
                            font-size: px2rem(28);
                            color: #999;
                            text-decoration: underline;
							&.current {
								color: $title-color;
								font-size: px2rem(28);
								text-decoration: none;
							}
						}
					}
				}
			}
		}

		.generalizeLink-list {
			padding: 5.33rem 0.4rem 0.4rem;
			ul {
				li {
					background: $default-color;
					box-shadow: 0px 2px 5px 0px RGBA(0, 196, 255, 0.4);
					border-radius: 0.13rem;
					padding: 0.32rem;
					display: flex;
					margin: 0.27rem 0;
					position: relative;
					.left {
						display: inline-block;
						h1 {
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;
							span {
								font-size: 0.32rem;
								color: $color-p;
								font-weight: bold;
							}
						}
						h2 {
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;

							span {
								font-size: 0.32rem;
								color: $color-C;
								font-weight: bold;
							}
						}
						p {
							font-size: 0.27rem;
							color: $color-J;
							line-height: 1.6;
						}
					}
					.right {
						display: inline-block;
						h1 {
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;
							span {
								font-size: 0.32rem;
								color: $color-p;
								font-weight: bold;
							}
						}
						h2 {
							font-size: 0.32rem;
							color: $color-C;
							font-weight: 400;
							line-height: 1.6;

							span {
								font-size: 0.32rem;
								color: $color-C;
								font-weight: bold;
							}
						}
						p {
							font-size: 0.27rem;
							color: $color-J;
							line-height: 1.6;
						}

						h1 {
							span {
								text-decoration: underline;
							}
						}
						i {
							font-size: 0.64rem;
							box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
							border-radius: 0.13rem;
							color: $primary-color;
							position: absolute;
							right: 0.26667rem /* 20/75 */;
							top: 0.26667rem /* 20/75 */;
							// margin-top: -0.32rem;
						}
					}
				}
			}
		}

		//返点详情弹框
		.detail-modal {
			.copy-writer-details-box {
				.details-title {
					span {
						color: $color-C;
						i {
							color: $color-J;
						}
					}
				}
				.details-content {
					padding: 0;
					.title {
						color: $color-C;
						font-size: 0.37rem;
						padding: 0 0.4rem;
						height: 1.07rem;
						line-height: 1.07rem;
						border-bottom: 1px solid $color-P;

						span {
							color: $color-p;
							font-size: 0.43rem;
						}
					}
					ul {
						border-radius: 0 0 0.13rem 0.13rem;
						background: $default-color;
						max-height: 6.15rem;
						overflow: auto;
						li {
							display: flex;
							flex-direction: row;
							padding: 0.4rem;
							justify-content: space-between;
							border-bottom: 1px solid $color-P;
							h2 {
								padding: 0;
								display: inline-block;
								width: auto;
								font-size: 0.37rem;
								font-weight: normal;
							}
							span {
								font-size: 0.37rem;
							}
						}
					}
				}
			}
		}
	}
	//二维码预览
	.qrcode-preview {
		position: relative;
		.copy-writer-details-mask {
			opacity: 1;
			z-index: 10;
		}
		.copy-writer-details-box {
            position: fixed;
			top: 50%;
			// margin-top: -50%;
			border: 1px solid $default-color;
			padding: 0.13rem;
			width: 80%;
			margin-left: -42%;
			left: 50%;
			background: #fff;
			z-index: 100;
		}
	}
	.table {
        // padding: 0 .13333rem /* 10/75 */;
        .reheads{
            padding: 0 .13333rem /* 10/75 */;
            background: #f3f3f3;
        }
		.green {
			color: #43d291;
		}
		.red {
			color: #ef0505;
        }
        .blue {
            color: $primary-color!important;
        }
        .hasline{
            text-decoration: underline;
        }
		z-index: 3;
		padding-bottom: 1.6rem;
		overflow: hidden;
		.nut-scroller {
			height: calc(100% - 0.8rem) !important;
		}
		.thead {
			color: $label-color;
			// border-left: $onerem solid $default-color;
			height: 1.06667rem /* 80/75 */;
			/deep/ .nut-col {
				padding: $tenrem 0;
				text-align: center;
				font-size: 0.29333rem;
				font-weight: normal;
				// background: $rec-border-color;
				// border-right: $onerem solid $default-color;
			}
			.md-3 {
				width: 20%;
			}
		}
		.tbody {
			height: auto;
			background: $default-color;
			.ptime {
				font-size: 0.26667rem /* 20/75 */;
			}
			.flex-content {
				font-size: 0.29333rem /* 22/75 */;
				color: #333;
				border-right: $onerem solid $bet-record-bdr;
				.ptype {
					color: #333;
					font-size: 0.29333rem /* 22/75 */;
					&:nth-child(2) {
						color: #666;
						font-size: 0.26667rem /* 20/75 */;
					}
				}
				&.green {
					color: #43d291;
				}
				&.red {
					color: #ef0505;
				}
			}
			margin-bottom: 0.32rem /* 24/75 */;
			&:last-child {
				margin-bottom: 0;
			}
		}

		.tableList {
			.nut-col {
				background: $default-color;
			}
			// &:nth-child(2n + 1) {
			// 	.nut-col {
			// 		background-color: $light-color;
			// 	}
			// }
		}

		.processing {
			color: $yellow-color;
		}
	}
</style>