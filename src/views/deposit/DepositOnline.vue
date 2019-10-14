<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 08:36:40
 * @LastEditTime: 2019-10-09 08:36:40
 * @LastEditors: your name
 -->
<template>
	<div class="alipay">
		<Header title="线上充值"></Header>
		<div v-html="html"></div>
		<div class="content">
			<nut-actionsheet
				class="isShowChooseBank"
				:is-visible="isShowChooseBank"
				@close="switchActionSheet('isShowChooseBank')"
				:menu-items="bankList"
				:optionTag="`bankName`"
				cancelTxt="取消"
				:chooseTagValue="chooseCard.bankName"
				@choose="chooseItem"
			></nut-actionsheet>

			<div class="title clearfix">
				<span>支付方式</span>
				<span>{{baseInfoData.payName}}</span>
			</div>
			<div class="choose-depositMoney">
				<div v-show="baseInfoData.payType !== 1" class="sys-depositMoney pk-1px-b">
					<span>系统余额</span>
					<span>{{baseInfoData.balance}}</span>
				</div>

				<!-- payType  1=网银 2=微信 3=支付宝   -->
				<div v-show="baseInfoData.payType === 1" class="in-money pk-1px-b">
					<h2>
						<span>请选择银行</span>
						<input
							@click="isShowChooseBank = true"
							readonly
							required
							type="text"
							v-model="chooseCard.bankName"
							placeholder="请选择银行卡"
						/>
						<i class="iconfont iconicon_mine_rmore"></i>
					</h2>
				</div>

				<div class="in-depositMoney">
					<h2>
						<span>充值金额</span>
						<input
							type="number"
							@focus="iNow = -1"
							@keyup="validateRegExp()"
							v-model="depositMoney"
							placeholder="请输入充值金额"
						/>
						<b v-show="baseInfoData.isRandom == 1">.{{pointNum}}</b><b>.00</b>
					</h2>
					<div class="in-money-chinese">{{depositMoneyChinese}}</div>

					<ul>
						<li
							:class="{'active':iNow === index}"
							v-for="(item,index) in fastMoneyArr"
							:key="index"
							@click="handleFast(index)"
						>{{item}}元</li>
					</ul>
				</div>
				<div class="remark pk-1px-t">
					<span>备注</span>
					<input type="text" v-model="remark" placeholder="请输入其他备注信息" />
				</div>
			</div>
			<div class="pk-submit-bottom">
				<div class="submit">
					<button @click="handleDeposit">立即充值</button>
				</div>
			</div>
			<div class="tip">
				<p class="text-dots">
					温馨提示：单笔充值金额为
					<span>{{baseInfoData.depositMin}}~{{baseInfoData.depositMax}}</span>元
				</p>
				<p>充值金额里的小数点数字是系统自动生成，方便快速存款。</p>
			</div>
		</div>
	</div>
</template>

<script>
import func from "@/services/deposit";
import Header from "@/components/Header";
export default {
	components: {
		Header
	},
	name: "online",
	mounted() {
		this.getBaseInfo();
	},
	data() {
		return {
			iNow: -1, //快捷金额样式
			fastMoneyArr: [1000, 500, 200, 100],
			depositMoney: "", //充值金额
			depositMoneyChinese: "", //充值金额-中文大写
			remark: "", //备注
			html: "", //form表单提交
			baseInfoData: {
				balance: 0
			},
			pointNum: "00", //随机小数
			isShowChooseBank: false, //是否显示选择银行卡
			bankList: [], //银行卡列表
			chooseCard: {} //选择的银行卡
		};
	},
	methods: {
		getBaseInfo() {
			let loading = this.$toast.loading("加载中...");
			func.getOnlineInfo({
				id: this.$route.query.id * 1
			}).then(res => {
				loading.hide();
				if (res.success) {
					this.baseInfoData = res.data;
					this.baseInfoData.depositMax += 0.99;
					if (this.baseInfoData.payType === 1) {
						this.getBankSelect(this.baseInfoData.payId);
					}
					this.setPointNum();
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},

		switchActionSheet(param) {
			this[`${param}`] = !this[`${param}`];
		},
		chooseItem(itemParams) {
			this.chooseCard = itemParams;
		},
		//获取银行卡列表
		getBankSelect(payId) {
			func.getBankSelect({
				payId: payId.toString()
			}).then(res => {
				if (res.success) {
					this.bankList = res.data;
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},

		validateRegExp() {
			if (this.baseInfoData.isRandom === 1) {
				//随机生成小数
				this.depositMoney = this.depositMoney.replace(/[^\d]/, ""); //只能输入整数
			} else {
				//不随机生成小数
				if (this.baseInfoData.isWhole === 1) {
					//只能输入整数
					this.depositMoney = this.depositMoney.replace(/[^\d]/, "");
				} else {
					this.depositMoney = this.depositMoney.replace(
						/^(\-)*(\d+)\.(\d\d).*$/,
						"$1$2.$3"
					); //只能输入两个小数
				}
			}
		},

		setPointNum() {
			//随机生成2位数点
			if (this.baseInfoData.isRandom === 1) {
				while (true) {
					this.pointNum = parseInt(Math.random() * 100);
					if (this.pointNum <= 99 && this.pointNum >= 11) {
						return;
					}
				}
			} else {
				this.pointNum = "00";
			}
		},

		//快捷选择充值金额
		handleFast(index) {
			//系统余额小于所选的快捷金额
			if (
				this.fastMoneyArr[index] + this.pointNum / 100 >
				this.baseInfoData.depositMax
			) {
				this.$toast.text(
					`充值金额不得高于${this.baseInfoData.depositMax}元`,
					{ cover: true }
				);
				return;
			}
			if (
				this.fastMoneyArr[index] + this.pointNum / 100 <
				this.baseInfoData.depositMin
			) {
				this.$toast.text(
					`充值金额不得低于${this.baseInfoData.depositMin}元`,
					{ cover: true }
				);
				return;
			}
			this.iNow = index;
			this.depositMoney = this.fastMoneyArr[index];
		},

		//立即存款
		handleDeposit() {
			if (!this.validate()) return;
			let postData = {
				setId: this.baseInfoData.setId * 1,
				depositMoney: this.depositMoney * 1 + this.pointNum / 100,
				remark: this.remark,
				payType: this.baseInfoData.payType * 1
			};

			let loading = this.$toast.loading("提交中...");
			func.postOnline(postData).then(res => {
				loading.hide();
				if (res.success) {
					this.goThree(res.data);
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},

		validate() {
			//网银
			if (this.baseInfoData.payType === 1) {
				if (!this.chooseCard.bankName) {
					this.$toast.text("请选择银行卡", { cover: true });
					return false;
				}
			}
			//网银 支付宝 微信
			if (!this.depositMoney) {
				this.$toast.text("请输入充值金额", { cover: true });
				return false;
			} else if (
				this.depositMoney * 1 + this.pointNum / 100 >
					this.baseInfoData.depositMax ||
				this.depositMoney * 1 + this.pointNum / 100 <
					this.baseInfoData.depositMin
			) {
				this.$toast.text(
					`充值金额为${this.baseInfoData.depositMin}-${this.baseInfoData.depositMax}`,
					{ cover: true }
				);
				return false;
			} else {
				return true;
			}
		},
		//跳转第三方
		goThree(item) {
			let postData = {
				order: item.order,
				amount: (
					this.depositMoney * 1 +
					this.pointNum / 100
				).toString(),
				payType: this.baseInfoData.payType * 1,
				merId: this.baseInfoData.merId * 1,
				businessnum: this.baseInfoData.businessNum,
				bank: this.chooseCard.bankcode
			};
			func.goThreeWay(postData).then(res => {
				if (res.success) {
					this.html = res.data.page;
					this.$nextTick(() => {
						document.getElementById("form1").submit();
						this.$router.push({
							name: "payResult"
						});
					});
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		}
	},
	watch: {
		depositMoney(newVal, oldVal) {
			let money = newVal * 1 + this.pointNum / 100;
			this.depositMoneyChinese = this.filterAmount(money);
		}
	}
};
</script>

<style lang="scss" scoped>
.alipay {
	.content {
		.title {
			padding: px2rem(24) px2rem(30);
			font-size: px2rem(32);
			color: $label-color;
			span {
				font-size: px2rem(26);
				float: left;
				&:last-child {
					float: right;
					color: $label-color;
					font-size: px2rem(32);
				}
			}
		}

		.choose-depositMoney {
			background: $default-color;

			/*选择银行*/
			.in-money {
				h2 {
					margin-left: px2rem(30);
					padding-right: px2rem(30);
					line-height: px2rem(112);
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-weight: 400;
					span {
						font-size: px2rem(32);
						color: $tip-color;
						flex: 4;
						&:last-child {
							color: $color-P;
							i {
								font-size: px2rem(24);
								color: $color-K;
							}
						}
					}

					input {
						flex: 10;
						text-align: right;
						border: none;
						color: $text-color;
						font-size: px2rem(32);
					}
					input::-webkit-input-placeholder {
						color: $label-color;
						font-size: px2rem(32);
					}
					i {
						font-size: px2rem(32);
						vertical-align: middle;
						color: $color-K;
					}
					b {
						font-size: px2rem(24);
						font-weight: 400;
					}
				}
			}

			/*充值金额*/
			.in-depositMoney {
				h2 {
					padding: 0 px2rem(30);
					line-height: px2rem(112);
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-weight: 400;
					span {
						font-size: px2rem(32);
						color: $tip-color;
						flex: 3;
						&:last-child {
							color: $primary-color;
						}
					}

					input {
						flex: 10;
						text-align: right;
						border: none;
						color: $text-color;
						font-size: px2rem(32);
					}
					input::-webkit-input-placeholder {
						color: $label-color;
						font-size: px2rem(32);
					}
					b {
						font-size: px2rem(32);
						font-weight: 400;
						color: $color-w;
					}
				}
				ul {
					padding: 0 px2rem(30) px2rem(26);
					display: flex;
					justify-content: space-between;
					li {
						font-size: px2rem(28);
						color: $primary-color;
						width: px2rem(150);
						height: px2rem(80);
						text-align: center;
						line-height: px2rem(80);
						border: 1px solid $primary-color;
						border-radius: px2rem(10);
						box-sizing: border-box;
						&.active {
							color: $default-color;
							background: $primary-color;
						}
					}
				}
			}

			/*系统余额*/
			.sys-depositMoney {
				padding: px2rem(26) px2rem(30) px2rem(10) 0;
				margin-left: px2rem(30);
				display: flex;
				justify-content: space-between;
				span {
					font-size: px2rem(32);
					color: $tip-color;
					&:last-child {
						color: $label-color;
					}
				}
			}
			.remark {
				padding: px2rem(26) px2rem(30) px2rem(26) 0;
				margin-left: px2rem(30);
				display: flex;
				justify-content: space-between;
				span {
					font-size: px2rem(32);
					color: $tip-color;
					&:last-child {
						color: $primary-color;
					}
					flex: 2;
				}
				input {
					flex: 10;
					text-align: right;
					border: none;
					color: $text-color;
					font-size: px2rem(32);
				}
				input::-webkit-input-placeholder {
					color: $label-color;
					font-size: px2rem(32);
				}
			}
		}

		/*提示区域*/
		.tip {
			padding: px2rem(30);
			p {
				font-size: px2rem(26);
				color: $label-color;
				line-height: px2rem(36);
				span {
					color: $color-w;
				}
			}
		}
	}
}

.in-money-chinese {
	text-align: right;
	padding-right: px2rem(30);
	line-height: px2rem(70);
	height: px2rem(70);
	font-size: px2rem(27);
	color: $tip-color;
}
</style>


