<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 08:36:40
 * @LastEditTime: 2019-10-09 08:36:40
 * @LastEditors: your name
 -->
<template>
	<div class="withdraw">
		<Header title="提现"></Header>
		<div class="content">
			<div class="person-info">
				<img src="../../assets/img/touxiangbg.png" />
				<div class="left">
					<p>系统余额</p>
					<h2>{{infoData.balance | currency("",2)}}</h2>
					<a @click="refush(1)">
						<i class="icon iconicon_mine_refresh"></i>
						<span>刷新余额</span>
					</a>
				</div>
			</div>

			<div class="widthdraw-top">
				<div class="title" @click="handleShowModal()">
					<span>收款账户</span>
					<i v-show="infoData.has" class="iconfont iconicon_mine_rmore"></i>
				</div>

				<router-link tag="div" :to="{name:'bankCard'}" v-show="!infoData.has" class="no-bankCard">
					<!-- <p>您还未添加银行卡</p> -->
					<div class="add-card">
						<i class="iconfont iconicon_info_chat_more"></i>
						<span>点击添加银行卡</span>
					</div>
				</router-link>

				<div v-show="infoData.has" class="has-bankCard">
					<div class="card-list clearfix">
						<div class="left">
							<h2 class="text-dots">
								<span>
									{{bankInfo.bankName}}
									<a v-show="bankInfo.isDefault === 1">默认</a>
								</span>
								<span>{{bankInfo.userName}}</span>
							</h2>
							<p>{{bankInfo.card | filterBankNum}}</p>
							<h3 class="text-dots">
								<span>{{bankInfo.addr}}</span>
								<span>{{bankInfo.subbranch}}</span>
							</h3>
						</div>
						<!-- <div class="right">
							<i class="iconfont icon-qb-bank-tongyong1"></i>
						</div>-->
					</div>
				</div>
			</div>

			<div class="width-form">
				<ul>
					<li class="pk-1px-t">
						<span>提现金额</span>
						<input
							type="number"
							@keyup="validateRegExp()"
							v-model="postData.outMoney"
							placeholder="请输入提现金额"
						/>
					</li>
					<div class="money-chinese">{{outMoneyChinese}}</div>
					<li class="pk-1px-t">
						<span>提现密码</span>
						<input type="password" v-model="postData.drawPassword" placeholder="请输入提现密码" />
					</li>
				</ul>
			</div>

			<div class="widthdraw-bottom">
				<h2 v-show="infoData.hasP">
					忘记提现密码请
					<router-link tag="a" :to="{name:'contactus'}">联系客服</router-link>
				</h2>
				<h2 v-show="!infoData.hasP">
					您还未设置提现密码请
					<router-link tag="a" :to="{name:'securitypwd'}">点击设置</router-link>
				</h2>
			</div>
			<div class="pk-submit-bottom">
				<div class="submit">
					<button @click="handleWithdraw" :disabled="!infoData.has">提现</button>
				</div>
			</div>
			<div class="hint">
				<h3>温馨提示:</h3>
				<p>
					1.单笔提现金额为
					<span>{{infoData.min}}~{{infoData.max}}</span>元
				</p>
				<p>2.提现金额需为整数，否则可能延长出款。</p>
				<p>3.有未完成的提现订单时，无法提交第二笔订单。</p>
				<p>4.出款出现以下情况将会扣除一定费用：</p>
				<p>
					1）未满足常态稽核 将扣除入款金额
					<span>{{infoData.lineAuditAdminRate}}%</span>行政费用与优惠金额。
				</p>
				<p>2) 未满足综合稽核 将扣除优惠金额。</p>
				<p>*常态稽核 = 会员入款金额 * 常态稽核倍数</p>
				<p>*综合(优惠)稽核 = (会员入款金额+优惠) *综合稽核倍数</p>
			</div>

			<!--选择银行卡弹框-->
			<nut-actionsheet :is-visible="isShowChooseBankModal" @close="isShowChooseBankModal = false;">
				<div slot="custom" class="custom-wrap">
					<div class="title">收款银行</div>
					<ul>
						<li
							class="pk-1px-t"
							v-for="(item, index) in swiperSlides"
							:key="index"
							@click="handleChooseBank(item,index)"
							:class="chooseBankIndex === index ?'active':''"
						>
							<div class="left">
								<p class="text-dots">{{item.bankName}}</p>
								<span>{{item.card | filterBankNum}}</span>
							</div>
							<div class="right">
								<i class="iconfont iconicon_bz"></i>
							</div>
						</li>
					</ul>
				</div>
			</nut-actionsheet>
		</div>
	</div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import func from "@/services/deposit";
import Header from "@/components/Header";

export default {
	name: "withdraw",
	components: {
		swiper,
		swiperSlide,
		Header
	},
	data() {
		return {
			swiperSlides: [], //银行卡列表
			infoData: {},
			postData: {
				outMoney: "",
				drawPassword: "",
				bankId: ""
			},
			outMoneyChinese: "零", //出款金额中文大写
			isShowChooseBankModal: false, //是否显示选择银行弹框
			chooseBankIndex: 0, //控制选择的银行卡图标样式
			bankInfo: {} //选择的银行卡详情
		};
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		},
		outMoney() {
			return this.postData.outMoney;
		}
	},
	mounted() {
		this.refush();
	},
	methods: {
		//获取提现信息
		refush(t) {
			let loading = t
				? this.$toast.loading("刷新中...")
				: this.$toast.loading("加载中...");
			func.getWithdrawInfo().then(res => {
				loading.hide();
				if (res.success) {
					this.infoData = res.data;
					if (this.infoData.bankList) {
						this.swiperSlides = this.infoData.bankList;
						this.swiperSlides.map((v, i) => {
							if (v.isDefault == 1) {
								this.chooseBankIndex = i;
								this.bankInfo = this.swiperSlides[
									this.chooseBankIndex
								];
							}
						});
					}
					if (t) {
						this.$toast.text("刷新成功", { cover: true });
					} else {
						if (!this.infoData.has) {
							//是否有银行卡 false=没有 true=有
							this.isBankList();
						} else if (!this.infoData.isOrder) {
							//是否有完成的订单 true=没有 false=有
							this.isFinishOrder();
						} else if (!this.infoData.hasP) {
							//去设置提现密码hasP true=有设置密码 false=没有设置密码
							this.isSetOutMoneyPassword();
						}
					}
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},
		handleShowModal() {
			if (this.infoData.has) {
				this.isShowChooseBankModal = true;
			}
		},
		//点击选择银行卡
		handleChooseBank(item, index) {
			this.chooseBankIndex = index;
			this.bankInfo = item;
			this.isShowChooseBankModal = false;
		},

		//是否有银行卡
		isBankList() {
			let self = this;
			this.$dialog({
				id: "dialog_bank",
				lockBgScroll: true,
				closeOnClickModal: false,
				textAlign: "center",
				cancelBtnTxt: "暂不提现",
				okBtnTxt: "去设置",
				title: "温馨提示",
				content: "抱歉，您还未添加银行卡，无法出款！",
				customClass: "pk-dialogs",
				onOkBtn() {
					this.close();
					self.$router.push({ name: "bankcardList" }); //添加银行卡
				}
            });
            this.makeDialog()
		},

		//是否有未完成的订单
		isFinishOrder() {
			this.$dialog({
				id: "dialog_order",
				lockBgScroll: true,
				closeOnClickModal: false,
				textAlign: "left",
				noCancelBtn: true,
				okBtnTxt: "关闭",
				title: "温馨提示",
				content: "您有尚未完成的提现订单，订单完成后才能再次提现！",
				customClass: "pk-dialog-single",
				onOkBtn() {
					this.close();
				}
			});
		},
		//是否设置了提现密码
		isSetOutMoneyPassword() {
			let self = this;
			this.$dialog({
				id: "dialog_pwd",
				lockBgScroll: true,
				closeOnClickModal: false,
				textAlign: "left",
				cancelBtnTxt: "暂不提现",
				okBtnTxt: "设置提现密码",
				title: "温馨提示",
				content: "抱歉，您还未设置提现密码，无法出款！",
				customClass: "pk-dialogs",
				onOkBtn() {
					self.$router.push({ name: "securitypwd" }); //设置提现密码
					this.close();
				}
            });
            this.makeDialog()
		},
		//是否设置了个人资料
		isSetUserInfo(info) {
			if (
				!info ||
				(info.isQq === 2 &&
					info.isWechat === 2 &&
					info.isEmail === 2 &&
					info.isPhone === 2 &&
					info.isIdCard === 2)
			) {
				this.$router.push({
					name: "withdrawAudit"
				});
				return;
			}
			let arr = [];
			if (info.isQq === 1) {
				arr.push("QQ");
			}
			if (info.isWechat === 1) {
				arr.push("微信");
			}
			if (info.isEmail === 1) {
				arr.push("邮箱");
			}
			if (info.isPhone === 1) {
				arr.push("手机号");
			}
			if (info.isIdCard === 1) {
				arr.push("身份证");
			}
			let self = this;
			this.$dialog({
				id: "dialog_info",
				lockBgScroll: true,
				closeOnClickModal: false,
				textAlign: "left",
				okBtnTxt: "去完善资料",
				cancelBtnTxt: "暂不提现",
				title: "温馨提示",
				content: `抱歉，您还未完善个人资料(${arr.join(
					"、"
				)}），无法提现！`,
				customClass: "pk-dialogs",
				onOkBtn() {
					self.$router.push({ name: "about" }); //设置个人资料
					this.close();
				}
            });
            this.makeDialog()
		},

		validateRegExp() {
			this.postData.outMoney = this.postData.outMoney.replace(
				/[^\d]/,
				""
			);
		},

		//提现提交
		handleWithdraw() {
			if (!this.infoData.isOrder) {
				//是否有完成的订单 true=没有 false=有
				this.isFinishOrder();
				return;
			} else if (!this.infoData.hasP) {
				//去设置提现密码hasP true=有设置密码 false=没有设置密码
				this.isSetOutMoneyPassword();
				return;
			} else if (!this.postData.outMoney) {
				this.$toast.text("请输入提现金额", { cover: true });
				return;
			}

			if (!/^[1-9]\d*$/.test(this.postData.outMoney)) {
				this.$toast.text("提现金额为正整数", { cover: true });
				return;
			}
			if (
				this.postData.outMoney > this.infoData.max ||
				this.postData.outMoney < this.infoData.min
			) {
				this.$toast.text(
					`提现金额为${this.infoData.min}-${this.infoData.max}`,
					{ cover: true }
				);
				return;
			}
			if (!/^\d{6}$/.test(this.postData.drawPassword)) {
				this.$toast.text("提现密码为6位数字", { cover: true });
				return;
			}
			let postData = {
				outMoney: this.postData.outMoney * 1,
				drawPassword: this.postData.drawPassword,
				bankId: this.bankInfo.id
			};
			let loading = this.$toast.loading("提交中...");
			func.postWithdraw(postData).then(res => {
				loading.hide();
				if (res.success) {
					this.isSetUserInfo(res.data.imi);
					let data = encodeURIComponent(JSON.stringify(res.data));
					sessionStorage.setItem("withdrawAudit", data);
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
        },
        makeDialog(){
            this.$(".pk-dialogs .nut-dialog-body").css({
                "padding-top": ".26667rem"
            })
            this.$(".pk-dialogs .nut-dialog-content").css({
                "padding-top": ".36555rem",
                "color": "#1a1a1a"
            })
            this.$(".pk-dialogs .nut-dialog-ok").css({
                "background": "#fff",
                "color":"#17c492",
                "border-top":"1px solid #F6F6F6",
                "border-left":"1px solid #F6F6F6"
            })
        }
	},
	watch: {
		outMoney(newVal, oldVal) {
            newVal = (newVal==''||newVal==0)?'零':this.filterAmount(newVal * 1);
		},
		isShowChooseBankModal(newVal, oldVal) {
			if (newVal) {
				this.ModalHelper.open();
			} else {
				this.ModalHelper.close();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.person-info {
	padding: px2rem(32);
	border-radius: px2rem(10);
	position: relative;
	background: $default-color;
	img {
		width: 100%;
		display: block;
	}
	.left {
		position: absolute;
		top: px2rem(64);
		left: px2rem(64);
		font-size: px2rem(130);
		color: $default-color;
		font-size: 0;
		p {
			font-size: px2rem(28);
			font-weight: 300;
		}
		h2 {
			font-size: px2rem(36);
			margin: px2rem(20) 0;
		}
		a {
			color: $color-w;
			border-radius: px2rem(30);
			width: px2rem(178);
			height: px2rem(50);
			padding: px2rem(4) px2rem(20);
			line-height: px2rem(50);
			box-sizing: border-box;
			text-decoration: none;
			font-size: px2rem(24);
			text-align: center;
			background-color: $default-color;
			span {
				color: $color-w;
				font-size: px2rem(24);
			}
			.iconfont {
				font-size: px2rem(28);
				margin-right: px2rem(6);
				font-weight: bold;
			}
		}
	}
}

/deep/ .nut-actionsheet-panel {
	border-radius: px2rem(10) px2rem(10) 0 0;
}

.custom-wrap {
	background: $default-color;
	border-radius: px2rem(10) px2rem(10) 0 0;
	.title {
		height: px2rem(110);
		line-height: px2rem(110);
		text-align: center;
		background: $primary-color;
		color: $default-color;
		font-size: px2rem(34);
		letter-spacing: px2rem(6);
		border-radius: px2rem(10) px2rem(10) 0 0;
	}
	ul {
		li {
			height: px2rem(150);
			padding: 0 px2rem(30);
			display: flex;
			justify-content: space-between;
			.left {
				display: flex;
				justify-content: center;
				flex-direction: column;
				p {
					font-size: px2rem(34);
					color: $text-color;
				}
				span {
					font-size: px2rem(28);
					color: $tip-color;
				}
			}
			.right {
				@extend .left;
				i {
					font-size: px2rem(34);
					color: $label-color;
				}
			}
			&.active {
				.right {
					i {
						color: $primary-color;
					}
				}
			}
		}
	}
}

.widthdraw-top {
	background: $default-color;
	padding: px2rem(30);
	margin-top: px2rem(30);
	.title {
		font-size: px2rem(34);
		color: $tip-color;
		margin-bottom: px2rem(20);
		display: flex;
		justify-content: space-between;
	}
	.no-bankCard {
		p {
			text-align: center;
			font-size: px2rem(24);
			color: $label-color;
		}
		.add-card {
			width: 100%;
			border: 1px dashed $color-P;
			border-radius: px2rem(10);
			margin: px2rem(30) 0;
			height: px2rem(280);
			font-size: px2rem(28);
			color: $label-color;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			i {
				font-size: px2rem(60);
				color: $label-color;
			}
		}
	}
	.has-bankCard {
		position: relative;
		.card-list {
			width: 100%;
			height: px2rem(230);
			padding: px2rem(30);
			border-radius: px2rem(10);
			box-sizing: border-box;
			font-size: 0px2rem (28);
			background: url("../../assets/img/icon_mine_bank_card1.png") no-repeat;
			background-size: cover;
			color: $default-color;

			.left {
				font-weight: 200;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 100%;
				h2 {
					font-size: px2rem(28);
					font-weight: 500;
					display: flex;
					justify-content: space-between;
					a {
						color: #9845fd;
						font-size: px2rem(20);
						width: px2rem(60);
						height: px2rem(30);
						line-height: px2rem(30);
						padding: px2rem(2) px2rem(4);
						background: $default-color;
						border-radius: px2rem(30);
						font-weight: normal;
						display: inline-block;
						text-align: center;
					}
				}
				h3 {
					font-size: px2rem(28);
					font-weight: 200;
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
}

.width-form {
	background: $default-color;
	ul {
		li {
			padding: 0 px2rem(30);
			height: px2rem(88);
			line-height: px2rem(88);
			display: flex;
			justify-content: space-between;
			span {
				flex: 3;
				font-size: px2rem(28);
				color: $tip-color;
			}
			input {
				flex: 8;
				border: none;
				text-align: right;
				font-size: px2rem(34);
				color: $color-C;
				&::-webkit-input-placeholder {
					color: $label-color;
					font-size: px2rem(28);
				}
			}
		}
	}
}

.widthdraw-bottom {
	h2 {
		padding-right: px2rem(30);
		height: px2rem(60);
		line-height: px2rem(60);
		font-size: px2rem(24);
		text-align: right;
		color: $label-color;
		background: $default-color;
		font-weight: 400;
		a {
			color: $color-w;
			text-decoration: underline;
		}
	}
}

.hint {
	padding: px2rem(30);
	font-size: px2rem(26);
	color: $label-color;
	background: $default-bg-color;
	p {
		line-height: 1.5;
		color: $label-color;
		span {
			color: $color-w;
		}
	}
	h3 {
		line-height: 1.5;
		font-size: px2rem(26);
		font-weight: 400;
		color: $label-color;
	}
}

.money-chinese {
	text-align: right;
	background: $default-color;
	line-height: px2rem(70);
	height: px2rem(70);
	font-size: px2rem(28);
	color: $text-color;
	padding-right: px2rem(30);
}
</style>


