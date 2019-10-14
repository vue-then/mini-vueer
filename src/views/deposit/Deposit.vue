<template>
	<div class="deposit">
		<Header title="充值"></Header>

		<div class="content">
			<!-- 线上充值 -->
			<div v-show="onlineList.length>0" class="pay-list">
				<div class="title">
					<h2>线上充值</h2>
				</div>
				<ul>
					<li v-for="(item,index) in onlineList" :key="index" @click="goOnlineDeposit(item)">
						<div class="li-box">
							<div class="left company-icon">
								<img :src="cdnUrl+'/online/'+item.payType+'.png'" alt />
							</div>
							<div class="right pk-1px-b">
								<div class="desc">
									<div>
										<h2>{{item.payName}}</h2>
										<p class="text-dots">存款区间{{item.depositMin}}~{{item.depositMax}}</p>
									</div>
									<a v-show="item.content" class="details-btn" @click.stop="deMore(item,1)">充值信息</a>
								</div>
								<i class="iconfont iconicon_mine_rmore"></i>
							</div>
						</div>
					</li>

					<div @click="speardMore()" v-show="isShowMoreWayBtn" class="more-payType">
						<span>{{more?'收起支付方式':'更多支付方式...'}}</span>
					</div>
				</ul>
			</div>

			<!-- 线下充值 -->
			<div v-show="companyList.length>0" class="pay-list">
				<div class="title">
					<h2>线下充值</h2>
				</div>
				<ul>
					<li v-for="(item,index) in companyList" :key="index" @click="goCompanyDeposit(item)">
						<div class="li-box">
							<div class="left company-icon">
								<img :src="cdnUrl+'/'+item.bankId+'.png'" alt />
							</div>
							<div class="right" :class="{'pk-1px-b':index != companyList.length-1}">
								<div class="desc">
									<div>
										<h2>
											{{item.bankName}}
											<img
												v-if="item.recommend === 1"
												src="../../assets/img/tuijian.png"
												class="tuijian"
											/>
										</h2>
										<h2 v-show="item.bankAddress!=''">开户行: {{item.bankAddress}}</h2>
										<p v-show="item.bankNum" class="text-dots">账号：{{item.bankNum}}</p>
									</div>
									<a v-show="item.content" class="details-btn" @click.stop="deMore(item,2)">充值信息</a>
								</div>
								<i class="iconfont iconicon_mine_rmore"></i>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="noContent" v-show="companyList.length<1 && onlineList.length<1" >
			<div class="noContent-box">
				<img src="../../assets/img/game-icon/none.png" alt="">
				<p>
					暂无支付方式选择，请
					<router-link :to="{name:'contactus'}">联系客服</router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "@/components/Header";
import func from "@/services/deposit";

export default {
	components: {
		Header
	},
	name: "deposit",
	data() {
		return {
			cdnUrl: "",
			isShowMoreWayBtn: false,
			more: false,
			onlineList: [],
			onlineListMore: [],
			companyList: [],
			imgUrlArr: [
				{
					payType: 1,
					payName: "网银",
					icon: "icon-qb-wangyin",
					color: "#4cd964"
				},
				{
					payType: 2,
					payName: "微信",
					icon: "icon-qb-weixin",
					color: "#62b900"
				},
				{
					payType: 3,
					payName: "支付宝",
					icon: "icon-qb-zhifubao",
					color: "#00b7ee"
				},
				{
					payType: 10,
					payName: "点卡支付",
					icon: "icon-qb-dianka",
					color: "#ff6057"
				}
			]
		};
	},
	mounted() {
		this.getOnlineCompanyList();
	},
	methods: {
		getOnlineCompanyList() {
			let loading = this.$toast.loading();
			func.getOnlineCompanyList().then(res => {
				loading.hide();
				if (res.success) {
					this.cdnUrl = res.data.cdnUrl;
					this.companyList = res.data.companyBankList;
					this.onlineListMore = res.data.onlinePayItemList;
					this.onlineListMore.map((v, i) => {
						this.imgUrlArr.map(v2 => {
							if (v.payType === v2.payType) {
								this.onlineListMore[i]["icon"] = v2.icon;
								this.onlineListMore[i]["color"] = v2.color;
							}
						});
					});
					this.isShowMoreWayBtn = this.onlineListMore.length > 5;
					this.onlineList = this.onlineListMore.slice(0, 5);
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},
		//展开收起-线上充值更多支付方式
		speardMore() {
			this.more = !this.more;
			if (this.more) {
				this.onlineList = this.onlineListMore;
			} else {
				this.onlineList = this.onlineListMore.slice(0, 5);
			}
		},

		//存款文案详情
		deMore(item, type) {
			let content = "";
			let title = "";
			if (type === 1) {
				//线上充值
				content = item.content;
				title = item.payIdName + "-" + item.payName;
			} else {
				//线下充值
				content = item.content;
				title = item.bankName + "-" + item.bankAddress;
			}
			this.$dialog({
				id: "dialog_info",
				lockBgScroll: true,
				closeOnClickModal: false,
				textAlign: "center",
				title,
				content,
				customClass: "pk-dialog-single",
				noCancelBtn: true,
				onOkBtn() {
					this.close(); //关闭对话框
				}
            });
            this.$(".pk-dialog-single .nut-dialog-footer").css({
                "height": "1.06667rem",
                "background-color": "#ffffff",
                "border-top": "1px solid #e7e7e7"
            });
            this.$(".pk-dialog-single .nut-dialog-footer").children("button").css({
                "color": "#17c492",
                "border": 'none',
                "background-color": "#fff",
                "font-size": ".37333rem"
            })
		},

		goOnlineDeposit(item) {
			let name = "";
			switch (item.payType) {
				case 1: //网银
				case 2: //微信
				case 3: //支付宝
					name = "online";
					break;
			}
			this.$router.push({ name: name, query: { id: item.id } });
		},

		goCompanyDeposit(item) {
			// item.payType 1=无二维码 2=有二维码
			this.$router.push({ name: "company", query: { id: item.id } });
		}
	}
};
</script>

<style lang="scss" scoped>
// 无内容样式
.noContent {
	.noContent-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: px2rem(160);
		text-align: center;
		img {
			display: block;
			width: px2rem(460);
			height: px2rem(320);
		}
		
		p {
			font-size: px2rem(30);
			color: $color-M;
			margin-top: px2rem(40);
			a {
				text-decoration: underline;
				color: $primary-color;
			}
		}
	}
}

.content {
	.pay-list {
		.title {
			font-size: 0;
			height: px2rem(90);
			line-height: px2rem(90);
			padding-left: px2rem(30);
			background: $default-bg-color;
			h2 {
				font-size: px2rem(26);
				color: $label-color;
				font-weight: normal;
			}
			p {
				font-size: px2rem(24);
				color: $label-color;
				margin-top: px2rem(15);
				width: px2rem(594);
				display: inline-block;
			}
			a {
				font-size: px2rem(24);
				color: $color-w;
				text-decoration: underline;
				vertical-align: bottom;
			}
		}
		ul {
			.more-payType {
				padding-top: px2rem(20);
				background-color: $default-color;
				text-align: center;
				position: relative;
				height: px2rem(80);
				span {
					display: block;
					font-size: px2rem(24);
					color: $color-w;
					margin-top: px2rem(10);
				}
			}
			li {
				background-color: $default-color;

				&:active {
					background: $color-rgab-b2;
				}
				.li-box {
					display: flex;
					margin-left: px2rem(30);
					.left {
						flex: 1;
						padding: px2rem(20) px2rem(30) px2rem(20) 0;
						display: flex;
						justify-content: center;
						align-self: center;
						i {
							font-size: px2rem(60);
							color: $color-a;
						}
						&.company-icon {
							img {
								width: px2rem(60);
								height: px2rem(60);
								display: block;
							}
						}
					}
					.right {
						flex: 10;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: px2rem(20) px2rem(30) px2rem(20) 0;
						.desc {
							display: flex;
							align-items: center;
							width: 100%;
							padding-right: px2rem(20);
							justify-content: space-between;
							.tuijian {
								width: px2rem(32);
								height: px2rem(32);
								vertical-align: middle;
								margin-right: px2rem(15);
							}
							.details-btn {
								width: px2rem(135);
								height: px2rem(50);
								line-height: px2rem(50);
								background-image: linear-gradient(
									90deg,
									$primary-color 100%
								);
								border-radius: px2rem(25);
								font-size: px2rem(22);
								color: $default-color;
								text-align: center;
							}
							h2 {
								font-size: px2rem(32);
								line-height: px2rem(32);
								color: $tip-color;
								font-weight: normal;
							}
							p {
								font-size: px2rem(26);
								color: $label-color;
								margin-top: px2rem(10);
								display: inline-block;
								a {
									font-size: px2rem(28);
									text-decoration: none;
									color: $label-color;
									margin-right: px2rem(30);
									b {
										letter-spacing: 1em;
										font-weight: normal;
									}
								}
								span {
									font-size: px2rem(28);
									color: $label-color;
									a {
										color: $label-color;
									}
								}
							}
						}
						.iconfont {
							font-size: px2rem(32);
							color: $label-color;
						}
					}
					&:last-child {
						.right {
							border-bottom: none;
						}
					}
				}
			}
		}
	}
}
.details-content-html {
	img {
        max-width: 100%;
	}
}

    


</style>
