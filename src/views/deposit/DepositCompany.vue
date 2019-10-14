<template>
	<div class="company-alipay">
		<Header title="线下充值"></Header>
		<!-- <nut-datepicker class="begin-time"
                :is-visible="isShowTime"
                type="datetime"
                title="请选择充值时间" 
                :is-show-chinese="false"
                :defaultValue="dataVal"
                @close="beginPicker('isShowTime')"
                @choose="beginChoose"
            >
		</nut-datepicker>-->

		<div class="content">
			<div class="deposit-account">
				<h2 class="title">充值账户</h2>
				<div class="deposit-account-box">
					<!-- 有二维码 展示的内容-->
					<div v-show="baseInfoData.payType === 2" class="left">
						<h2 class="pk-1px-b" v-show="baseInfoData.bankNum">
							<p>充值账号</p>
							<span @click="copy(baseInfoData.bankNum)">
								{{baseInfoData.bankNum}}
								<i class="iconfont icon-qb-copy"></i>
							</span>
						</h2>
						<h2 class="pk-1px-b" v-show="baseInfoData.bankUser">
							<p>收款人</p>
							<span>{{baseInfoData.bankUser}}</span>
						</h2>
						<h2 class="pk-1px-b remark">
							<p>
								备注码
								<span>您在转账时填写备注码，会提高您充值到账速度</span>
							</p>
							<span>{{randomNum}}</span>
						</h2>
					</div>

					<!-- 无二维码 展示的内容-->
					<div v-show="baseInfoData.payType === 1" class="left">
						<h2 class="pk-1px-b">
							<p>充值银行</p>
							<span>{{baseInfoData.bankName}}</span>
						</h2>
						<h2 class="pk-1px-b">
							<p>户主</p>
							<span>{{baseInfoData.bankUser}}</span>
						</h2>
						<h2 class="pk-1px-b">
							<p>账号</p>
							<span @click="copy(baseInfoData.bankNum)">
								{{baseInfoData.bankNum}}
								<i class="iconfont icon-qb-copy"></i>
							</span>
						</h2>
						<h2 class="remark">
							<p>
								备注码
								<span>您在转账时填写备注码，会提高您充值到账速度</span>
							</p>
							<span>{{randomNum}}</span>
						</h2>
					</div>

					<!-- payType 1=无二维码 2=有二维码 -->
					<div v-show="baseInfoData.payType === 2" class="right">
						<h3>
							<p>
								<span>二维码</span>（点击右侧二维码下载图片）
							</p>
							<span>下载后请勿私自保存二维码以防过期</span>
						</h3>
						<img :src="baseInfoData.payImg" alt />
						<!-- <a>下载二维码</a> -->
					</div>
				</div>
			</div>
			<div class="deposit-info">
				<h2 class="title">填写充值信息</h2>
				<ul>
					<li>
						<span>充值金额</span>
						<input
							name="money"
							type="tel"
							@keyup="validateRegExp()"
							v-model="postData.depositMoney"
							placeholder="请输入充值金额"
						/><b class="color-red">.00</b>
					</li>
					<div class="money-chinese">{{depositMoneyChinese}}</div>

					<li class="pk-1px-tb">
						<span>充值人姓名</span>
						<input name="inAccount" type="text" v-model="postData.realName" placeholder="请输入充值人姓名" />
					</li>
					<li class="pk-1px-b">
						<span>充值时间</span>
						<input
							name="inTime"
							@click="showDateTimePicker"
							type="text"
							v-model="postData.depositTime"
							readonly
							placeholder="请选择时间"
						/>
						<i class="iconfont icon-qb-time"></i>
					</li>

					<li>
						<span>备注</span>
						<input type="number" v-model.number="postData.remark" placeholder="可输入订单号后四位" />
					</li>
				</ul>
			</div>
			<div class="pk-submit-bottom">
				<div class="submit">
					<button @click="handleDeposit">立即充值</button>
				</div>
			</div>
			<div class="tip">
				<div class="hint">
					<p>温馨提示：</p>
					<p>1、公司银行账号不定期更换。请每次充值前，务必先至[线下充值]查看账号。</p>
					<p>2、在金额转出之后请务必准确填写充值信息，以便财务能够及时确认并添加金额到您的会员帐户中。</p>
					<p>
						3、单笔充值金额为
						<span>{{baseInfoData.lineDepositMin}}~{{baseInfoData.lineDepositMax}}</span>元
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { LOCAL_TODAY } from "@/filter";
import func from "@/services/deposit";
import Header from "@/components/Header";
export default {
	components: {
		Header
	},
	name: "company",
	mounted() {
		this.getBaseInfo();
		while (true) {
			this.randomNum = parseInt(Math.random() * 10000);
			if (this.randomNum <= 9999 && this.randomNum >= 1111) {
				return;
			}
		}
	},
	computed: {
		//金额大写要用
		depositMoney() {
			return this.postData.depositMoney;
		}
	},
	data() {
		return {
			// dataVal: this.filterDate(new Date()),
			// isShowTime:false,
			baseInfoData: {},
			postData: {
				depositMoney: "",
				realName: "",
				depositTime: this.filterTimeStamp(new Date()),
				remark: "",
				orderNum: ""
			},
			depositMoneyChinese: "", //充值金额中文大写
			randomNum: ""
		};
	},
	methods: {
		showDateTimePicker() {
			if (!this.dateTimePicker) {
				this.dateTimePicker = this.$createDatePicker({
					title: "请选择充值时间",
					min: LOCAL_TODAY(-1),
					max: LOCAL_TODAY(),
					value: new Date(
						this.postData.depositTime.replace(/-/g, "/")
					),
					columnCount: 6,
					onSelect: this.selectHandle,
					onCancel: this.cancelHandle
				});
			}
			this.dateTimePicker.show();
		},
		selectHandle(date, selectedVal, selectedText) {
			this.postData.depositTime = this.filterTimeStamp(date);
		},
		cancelHandle() {
			console.log("cancel time");
		},
		beginPicker(param) {
			this[`${param}`] = !this[`${param}`];
		},
		beginChoose(param) {
			this.postData.depositTime = param[5];
		},
		copy(msg) {
			this.$copyText(msg).then(
				e => {
					this.$toast.text("复制成功", { cover: true });
				},
				e => {
					this.$toast.text("复制失败", { cover: true });
				}
			);
		},
		getBaseInfo() {
			let loading = this.$toast.loading("加载中...");
			func.getCompanyInfo({ id: this.$route.query.id * 1 }).then(res => {
				loading.hide();
				if (res.success) {
					this.baseInfoData = res.data;
					this.postData.realName = res.data.realName;
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},
		handleDeposit() {
			let postData = {
				setId: parseInt(this.baseInfoData.id),
				depositAccount: this.postData.realName,
				depositMoney: parseFloat(this.postData.depositMoney),
				depositTime: this.filterTimeStamp(this.postData.depositTime, 2),
				remark: this.postData.remark.toString(),
				orderCode: this.randomNum
			};
			console.log(postData.depositTime, "postData");
			if (!this.validate(postData)) return;

			let loading = this.$toast.loading("提交中...");
			func.postCompany(postData).then(res => {
				loading.hide();
				if (res.success) {
					this.$router.push({
						name: "paySuccess",
						query: {
							fromType: 2,
							order: res.data.order
						}
					});
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},

		validateRegExp() {
			if (this.baseInfoData.isInteger === 1) {
				//只能输入整数
				this.postData.depositMoney = this.postData.depositMoney.replace(
					/[^\d]/,
					""
				);
			} else {
				this.postData.depositMoney = this.postData.depositMoney.replace(
					/^(\-)*(\d+)\.(\d\d).*$/,
					"$1$2.$3"
				); //只能输入两个小数
			}
		},

		validate(postData) {
			if (!postData.depositMoney) {
				this.$toast.text("请输入充值金额", { cover: true });
				return false;
			} else if (
				postData.depositMoney * 1 > this.baseInfoData.lineDepositMax ||
				postData.depositMoney * 1 < this.baseInfoData.lineDepositMin
			) {
				this.$toast.text(
					`充值金额为${this.baseInfoData.lineDepositMin}-${this.baseInfoData.lineDepositMax}`,
					{ cover: true }
				);
				return false;
			} else if (!postData.depositAccount) {
				this.$toast.text("请输入充值人姓名", { cover: true });
				return false;
			} else if (!postData.depositTime) {
				this.$toast.text("请选择充值时间", { cover: true });
				return false;
			}
			// else if(postData.depositTime > this.dataVal){
			//     this.$toast.text('充值时间不能大于当前时间',{cover:true});
			//     return false;
			// }
			else if (postData.remark) {
				if (!/^\d{4}$/.test(postData.remark)) {
					this.$toast.text("备注请输入4位数字", { cover: true });
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		}
	},
	watch: {
		depositMoney(newVal, oldVal) {
			this.depositMoneyChinese = this.filterAmount(newVal * 1);
		}
	}
};
</script>

<style lang="scss" scoped>
.color-red{
    color: $color-w;
}
.company-alipay {
	.content {
		.deposit-account {
			.title {
				height: px2rem(80);
				line-height: px2rem(80);
				padding-left: px2rem(30);
				font-size: px2rem(26);
				color: $label-color;
				font-weight: 400;
			}
			.deposit-account-box {
				padding: px2rem(24) px2rem(30);
				background: $default-color;
				.left {
					h2 {
						line-height: 2;
						font-weight: 400;
						height: px2rem(88);
                        line-height: px2rem(88);
                        font-size: px2rem(28);
                        color: $tip-color;
						display: flex;
						justify-content: space-between;
						p {
							font-size: px2rem(32);
							color: $tip-color;
							display: inline-block;
							span {
								display: block;
								line-height: 1.5;
								font-size: px2rem(22);
								color: $label-color;
							}
						}
						span {
							display: inline-block;
							font-size: px2rem(32);
							color: $label-color;
							i {
								font-size: px2rem(32);
								margin-left: px2rem(10);
							}
						}
						&.remark {
							line-height: 2;
							padding: px2rem(26) 0;
						}
					}
					h3 {
						line-height: 1.5;
						color: $label-color;
						font-size: px2rem(24);
						font-weight: 400;
					}
				}
				.right {
					display: flex;
					justify-content: space-between;
					padding-top: px2rem(20);
					h3 {
						font-size: px2rem(26);
						color: $text-color;
						text-align: left;
						font-weight: 400;
						display: flex;
						flex-direction: column;
						justify-content: center;
						p {
							color: $label-color;
							font-size: px2rem(26);
							span {
								font-size: px2rem(32);
								color: $tip-color;
							}
						}
						span {
							color: $label-color;
							font-size: px2rem(22);
						}
					}
					img {
						width: px2rem(112);
						height: px2rem(112);
						display: block;
					}
					a {
						font-size: px2rem(24);
						color: $color-x;
						text-decoration: underline;
						text-align: center;
					}
				}
			}
		}
		.deposit-info {
			.title {
				height: px2rem(80);
				line-height: px2rem(80);
				padding-left: px2rem(30);
				font-size: px2rem(26);
				color: $label-color;
				font-weight: 400;
			}
			ul {
				padding: 0 px2rem(30);
				.money-chinese {
					text-align: right;
					height: px2rem(70);
					line-height: px2rem(70);
					font-size: px2rem(26);
					color: $text-color;
					background: $default-color;
				}
				li {
					background: $default-color;
					margin-left: 0;
					height: px2rem(88);
					line-height: px2rem(88);
					display: flex;
					justify-content: space-between;
					font-size: px2rem(32);
					color: $tip-color;
					span {
						flex: 3;
					}
					i {
						font-size: px2rem(38);
						color: $color-P;
						vertical-align: middle;
					}
					input {
						flex: 7;
						text-align: right;
						border: none;
						color: $text-color;
						font-size: px2rem(32);
					}
					input::-webkit-input-placeholder {
						color: $color-P;
						font-size: px2rem(32);
					}
				}
			}
		}
	}
	.deposit-info {
		.title {
			height: px2rem(80);
			line-height: px2rem(80);
			padding-left: px2rem(30);
			font-size: px2rem(32);
			color: $text-color;
		}
		ul {
			background: $default-color;
			li {
				margin-left: px2rem(30);
				padding-right: px2rem(30);
				height: px2rem(80);
				line-height: px2rem(80);
				display: flex;
				justify-content: space-between;
				font-size: px2rem(28);
				position: relative;
				span {
					flex: 3;
					font-weight: 400;
				}
				i {
					font-size: px2rem(28);
					color: $color-P;
					vertical-align: middle;
				}
				input {
					flex: 7;
					text-align: right;
					border: none;
					color: $text-color;
				}
				input::-webkit-input-placeholder {
					color: $color-P;
					font-size: px2rem(24);
					font-weight: 400;
				}
				i.error-icon {
					position: absolute;
					right: 0;
					font-size: px2rem(30);
					color: $color-a;
				}
			}
		}
	}
	.error-hint {
		font-size: px2rem(24);
		color: $color-a;
		padding-left: px2rem(30);
		height: px2rem(60);
		line-height: px2rem(60);
	}
	.tip {
		padding: px2rem(30);
		background: $default-bg-color;
		.hint {
			margin-top: px2rem(20);
			p {
				font-size: px2rem(26);
				color: $label-color;
				line-height: px2rem(36);
				span {
					color: $primary-color;
				}
			}
		}
	}
}
</style>


