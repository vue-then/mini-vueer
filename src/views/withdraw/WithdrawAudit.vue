<template>
	<div class="widthdraw-audit">
		<Header title="提现"></Header>
		<div class="content" v-if="queryData">
			<div class="audit-details">
				<ul>
					<li>
						<span>提现金额</span>
						<span class="out-money">{{queryData.money || 0}}</span>
					</li>
					<li class="pk-1px-tb">
						<span>
							<span v-if="adminMoneyNum > 0">
								<span class="red num">未满足</span>
								<span>常态性稽核</span>
							</span>
							<span v-if="adminMoneyNum<=0" class="green num">
								已满足
								<span>常态性稽核</span>
							</span>
						</span>
						<span class="num red" v-if="adminMoneyNum>0">
							<span style="color:#333;">扣除行政费</span>
							{{adminMoneyNum}}
						</span>
						<span class="num green" v-if="adminMoneyNum<=0">
							<span style="color:#333;">扣除行政费</span>
							{{adminMoneyNum}}
						</span>
					</li>
					<li class="pk-1px-tb">
						<span>
							<span v-if="depositMoney>0">
								<span class="red num">未满足</span>
								<span>综合稽核</span>
							</span>
							<span v-if="depositMoney<=0" class="green num">
								已满足
								<span>综合稽核</span>
							</span>
						</span>
						<span class="num red" v-if="depositMoney>0">
							<span style="color:#333;">扣除优惠</span>
							{{depositMoney}}
						</span>
						<span class="num green" v-if="depositMoney<=0">
							<span style="color:#333;">扣除优惠</span>
							{{depositMoney}}
						</span>
					</li>
					<li class="pk-1px-tb">
						<span>扣除手续费</span>
						<span class="num red" v-if="outCharge>0">{{outCharge}}</span>
						<span class="num green" v-if="outCharge<=0">{{outCharge}}</span>
					</li>
				</ul>
			</div>

			<div class="audit-details">
				<ul>
					<li>
						<span class="num red">总扣除费用</span>
						<span class="num red" v-if="queryData.totalAllFree>0">{{queryData.totalAllFree}}</span>
						<span class="num green" v-if="queryData.totalAllFree<=0">{{queryData.totalAllFree}}</span>
					</li>
					<li class="pk-1px-t">
						<span class="num">最终提现金额</span>
						<span
							class="out-money actual-money green"
							v-if="queryData.actualMoney >= 0"
						>{{queryData.actualMoney}}</span>
						<span class="actual-money red" v-if="queryData.actualMoney < 0">{{queryData.actualMoney}}</span>
					</li>
				</ul>
			</div>

			<div class="audit-details" v-if="queryData.actualMoney< 0">
				<ul>
					<li>
						<span class="text red">提现金额小于费用，无法提现。</span>
					</li>
				</ul>
			</div>

			<div class="widthdraw-bottom">
				<div class="submit-btn">
					<button class="close" v-show="queryData.actualMoney <=0" @click="$router.go(-2)">关闭</button>
					<p>
						<button class="continue" v-show="queryData.actualMoney >0" @click="handleContinue">继续提现</button>
					</p>
					<p>
						<button class="cancel" v-show="queryData.actualMoney >0" @click="$router.go(-1)">取消</button>
					</p>
				</div>
				<div class="audit-details table-desc">
					<ul>
						<li class="pk-1px-tb">
							<span>稽核时间</span>
							<span>{{queryData.startTime * 1 | filterDate('YYYY-MM-DD')}} ~ {{queryData.endTime * 1| filterDate('YYYY-MM-DD')}}</span>
						</li>
						<li class="pk-1px-tb">
							<span>存款金额</span>
							<span>{{queryData.totalMoney || 0}}</span>
						</li>
						<li class="pk-1px-tb">
							<span>存款优惠</span>
							<span>{{queryData.depositPreSave || 0}}</span>
						</li>
						<li class="pk-1px-tb">
							<span>总实际有效投注</span>
							<span>{{totalBetMoney}}</span>
						</li>
						<div class="auditQuery-item-tab">
							<table class="auditQuery-item-table">
								<thead>
									<tr>
										<th>存款时间</th>
										<th>存款金额</th>
										<th>存款优惠</th>
										<th>投注额</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in queryData.allData" :key="item.id">
										<td>{{item.startTime*1 | filterDate('YYYY-MM-DD')}}</td>
										<td>{{item.preSave}}</td>
										<td>{{item.depositMoney}}</td>
										<td @click="showPop(item)">{{item.betValid}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</ul>
				</div>
				<div class="hint">
					<h3>温馨提示：</h3>
					<p>常态稽核=会员入款金额*常态稽核倍数</p>
					<p>综合(优惠)稽核 = (会员入款金额+优惠) *综合稽核倍数</p>
					<p>出款出现以下情况将会扣除一定费用：</p>
					<p>
						1.未满足常态稽核将扣除入款金额
						<span>{{queryData.adminMoneyRate || 0}}%</span>的行政费用。
					</p>
					<p>2.未满足综合稽核将会扣除优惠金额。</p>
				</div>
			</div>
			<!--弹窗-->
			<div class="moreTextpop" v-show="moreTextpop">
				<div class="morepopBox">
					<div class="poptit">投注明细</div>
					<div class="close" @click="hidePop()">
						<i class="iconfont icon-sykszz-close"></i>
					</div>
					<div class="audit-details ma-0">
						<ul>
							<li>
								<span>彩票游戏</span>
								<span>{{showPopData.gameLottery || 0}}</span>
							</li>
							<li>
								<span>棋牌游戏</span>
								<span>{{showPopData.gameChess || 0}}</span>
							</li>
							<li>
								<span>视讯直播</span>
								<span>{{showPopData.gameVideo || 0}}</span>
							</li>
							<li>
								<span>电子游艺</span>
								<span>{{showPopData.gameElectronics || 0}}</span>
							</li>
							<li>
								<span>体育赛事</span>
								<span>{{showPopData.gameSports || 0}}</span>
							</li>
							<li>
								<span>捕鱼游戏</span>
								<span>{{showPopData.gameFish || 0}}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="box-mask" @click="hidePop()"></div>
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
	name: "withdrawAudit",
	mounted() {
		this.getWithdrawFee();
	},
	data() {
		return {
			isShowDetails: false,
			queryData: "",
			totalBetMoney: 0,
			adminMoneyNum: 0,
			depositMoney: 0,
			outCharge: 0,
			moreTextpop: false,
			showPopData: {}
		};
	},

	methods: {
		//获取提现稽核信息
		getWithdrawFee() {
			this.queryData = JSON.parse(
				decodeURIComponent(sessionStorage.getItem("withdrawAudit"))
			); //从提现页面传过来的数据
			console.log(this.queryData);
			this.queryData.allData = this.queryData.allData || [];
			this.queryData.totalAllFree = this.queryData.totalAllFree || 0;
			this.outCharge = this.queryData.outCharge || 0;
			if (this.queryData.allData.length > 0) {
				this.queryData.allData.map(v => {
					v.betValid = v.betValid || 0;
					v.adminMoney = v.adminMoney || 0;
					v.depositMoney = v.depositMoney || 0;
					this.totalBetMoney += v.betValid * 1;
					if (v.normal == 2) {
						this.adminMoneyNum += v.adminMoney * 1;
					}
					if (v.multiple == 2) {
						this.depositMoney += v.depositMoney * 1;
					}
				});
			}
		},
		//继续出款
		handleContinue() {
			var data = {
				key: this.queryData.key
			};
			let loading = this.$toast.loading("提交中...");
			func.postWithdrawContinue(data).then(res => {
				loading.hide();
				if (res.success) {
					this.$router.push({
						name: "withdrawSuccess",
						query: res.data
					});
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},
		showPop(item) {
			this.moreTextpop = true;
			this.showPopData = item;
			console.log("this.showPopData", this.showPopData);
		},
		hidePop() {
			this.moreTextpop = false;
		}
	},
	watch: {
		moreTextpop(newVal, oldVal) {
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
.content {
	.title {
		height: px2rem(80);
		line-height: px2rem(80);
		padding-left: px2rem(30);
		font-size: px2rem(32);
		color: $color-C;
	}
	.audit-details {
		margin-top: px2rem(20);
		ul {
			background: $default-color;
			padding: 0 px2rem(30);
			li {
				font-size: px2rem(32);
				height: px2rem(110);
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: $tip-color;
				span {
					&.red {
						color: $state-red !important;
					}
					&.green {
						color: #43d291 !important;
					}
					&.num {
						font-size: px2rem(32);
					}
					&.max-num {
						font-size: px2rem(36);
					}
					&.text {
						font-size: px2rem(32);
					}
				}
				.details {
					display: flex;
					flex-direction: column;
					font-size: px2rem(28);
					text-align: right;
					b {
						font-size: px2rem(28);
						font-weight: normal;
						color: $color-C;
					}
					a {
						color: $color-w;
						text-decoration: underline;
						font-size: px2rem(24);
						margin-top: px2rem(20);
					}
				}
				&.h114 {
					height: px2rem(114);
				}
				span.out-money {
					color: $tip-color;
				}
				span:last-child {
					font-weight: 400;
					color: $tip-color;
				}
				.actual-money {
					font-size: px2rem(36);
				}
			}
			.details-content {
				overflow: hidden;
				ol {
					margin-bottom: px2rem(20);
					border-radius: px2rem(10);
					display: flex;
					justify-content: space-between;
					background: $tab-bord;
					li {
						height: px2rem(160);
						flex: 1;
						display: flex;
						flex-direction: column;
						span {
							flex: 1;
							width: 100%;
							text-align: center;
							line-height: px2rem(80);
							font-size: px2rem(28);
							color: $color-J;
						}
					}
				}
			}
		}
	}
	.isConditions {
		background: $default-color;
		margin-top: px2rem(20);
		padding: 0 px2rem(30);
		p {
			padding: px2rem(25) 0;
			font-size: px2rem(24);
			line-height: 1.5;
			span {
				font-size: px2rem(24);
				color: $color-C;
				&.red {
					color: $color-a;
				}
				&.green {
					color: $primary-color;
				}
				&.num {
					font-size: px2rem(32);
				}
				.max-num {
					font-size: px2rem(36);
				}
				&.text {
					font-size: px2rem(28);
				}
			}
		}
	}

	.table-desc {
		border: 1px solid $tab-bord;
		border-radius: px2rem(10);
		ul {
			border-radius: px2rem(10);
			padding: 0;
			background: $default-bg-color;
			li {
				padding: 0 px2rem(30);
				font-size: px2rem(28);
			}
		}
	}
}

.widthdraw-bottom {
	padding: 0 px2rem(30) px2rem(40);
	background: $default-bg-color;
	.submit-btn {
		margin-top: px2rem(30);
		button {
			height: px2rem(88);
			line-height: px2rem(88);
			border-radius: px2rem(10);
			background: $primary-color;
			color: $default-color;
			border: none;
			text-align: center;
			font-size: px2rem(28);
			&:active {
				background: $primary-color;
			}
		}
		button.close {
			width: 100%;
		}
		button.continue {
			width: 100%;
		}
		button.cancel {
			margin-top: px2rem(30);
			width: 100%;
			color: $default-color;
			background-color: $color-w;
		}
	}
	.hint {
		margin-top: px2rem(30);
		font-size: px2rem(26);
		color: $label-color;
		font-weight: 400;
		p {
			font-weight: 400;
			line-height: 1.5;
			font-size: px2rem(26);
			span {
				color: $color-w;
			}
		}
		h3 {
			line-height: 1.5;
			font-size: px2rem(26);
			color: $label-color;
			font-weight: 400;
		}
	}
}

.auditQuery-item-table {
	width: 100%;
	font-size: px2rem(24);
	color: $color-C;
	border-radius: px2rem(10);
	border-collapse: separate;
}

.auditQuery-item-table tr th,
.auditQuery-item-table tr td {
	text-align: center;
	padding: px2rem(30) 0;
	box-sizing: border-box;
	background: $default-bg-color;
	border-bottom: 1px solid $tab-bord;
	border-right: 1px solid $tab-bord;
	width: 25%;
	color: $tip-color;
	font-size: px2rem(22);
	font-weight: 400;
}

.auditQuery-item-table tr th:last-child,
.auditQuery-item-table tr td:last-child {
	border-right: 0;
}

.auditQuery-item-table tr:last-child td {
	border-bottom: 0;
}

.auditQuery-item-table tr th:first-child {
	border-top-left-radius: px2rem(10);
}

.auditQuery-item-table tr th:last-child {
	border-top-right-radius: px2rem(10);
}

.auditQuery-item-table tr:last-child td:first-child {
	border-bottom-left-radius: px2rem(10);
}

.auditQuery-item-table tr:last-child td:last-child {
	border-bottom-right-radius: px2rem(10);
}

.auditQuery-item-table tr td:last-child {
	text-decoration: underline;
	font-weight: 500;
}

/*------弹窗样式------*/

.moreTextpop {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 100%;
}

.morepopBox {
	z-index: 299;
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	overflow: visible;
	width: 90%;
	margin: 0 auto;
	max-width: px2rem(690);
	height: auto;
	border-radius: px2rem(10);
	background-color: $default-color;
	color: $primary-color;
}

.morepopBox .poptit {
	padding: 0 px2rem(30);
	height: px2rem(80);
	line-height: px2rem(80);
	font-size: px2rem(28);
	font-weight: 500;
	color: $tip-color;
	text-align: center;
}

.morepopBox .close {
	z-index: 9;
	position: absolute;
	top: 0;
	right: 0;
	width: px2rem(80);
	height: px2rem(80);
	text-align: center;
	line-height: px2rem(80);
	font-size: px2rem(24);
}

.box-mask {
	z-index: 199;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: $color-rgab-black4;
}

.moreTextpop .audit-details ul {
	li {
		border-top: px2rem(1) solid $color-W;
		border-bottom: 0;
		color: $color-C;
		span:last-child {
			color: $label-color;
		}
	}
	border-bottom-left-radius: px2rem(10);
	border-bottom-right-radius: px2rem(10);
}

.ma-0 {
	margin: 0 !important;
}
</style>


