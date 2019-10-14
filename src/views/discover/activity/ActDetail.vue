<template>
	<div>
		<Header :title="info.name"></Header>
		<div class="skeleton vue-skeleton-loading" v-show="loading">
			<div class="skeleton-bac-animation"></div>
			<div class="skeleton-bac-content">
				<skeleton-square width="9rem" height="3rem" margin="0.2rem 0.5rem"></skeleton-square>
				<column>
					<skeleton-square width="8rem" :count="2" margin="0.2rem 0.5rem"></skeleton-square>
					<skeleton-square width="5rem" margin="0.2rem 0.5rem"></skeleton-square>
				</column>
				<skeleton-square width="9rem" height="1rem" margin="0.2rem 0.5rem"></skeleton-square>
			</div>
		</div>
		<div v-show="!loading" class="act-detail">
			<div class="self-img">
				<img :src="info.photo" />
			</div>
			<div class="selfdetail-content" v-html="info.content"></div>
			<div class="self-btn" @click="receive">
				<div>
					<span>点击领取</span>
				</div>
			</div>
		</div>
		<!--弹窗-->
		<div class="actPop" v-show="actPop">
			<div class="actpopBox">
				<div class="btnpopContent" v-if="status ==1">
					<div class="giftPic" @click="actPop = false">
						<img src="@/assets/img/discover/activity/yhhd_lqcg@2x.png" alt />
					</div>
					<div class="giftbox">
						<div class="tit">
							<p>恭喜！成功领取奖励，</p>
							<h2>
								奖励金额
								<span>{{resData.rewardMoney}}</span>元。
							</h2>
						</div>
						<div class="close" @click="actPop = false">关闭</div>
					</div>
				</div>
				<div class="btnpopContent" v-if="status ==2">
					<div class="giftPic" @click="actPop = false">
						<img src="@/assets/img/discover/activity/yhhd_lqcg@2x.png" alt />
					</div>
					<div class="giftbox">
						<div class="tit">
							<p>恭喜！成功领取奖励，</p>
							<h2>
								奖励金额
								<span>{{resData.rewardMoney}}</span>元。
							</h2>
						</div>
						<div class="text">
							活动时间{{resData.beginTime |filterDate}}至{{resData.endTime | filterDate}}内,
							<h2>再次投注{{resData.againBet}}元即可领取{{resData.againMoney}}元奖励。</h2>
						</div>

						<div class="close" @click="$router.push('/')">去游戏</div>
					</div>
				</div>
				<div class="btnpopContent fail" v-if="status ==3">
					<div class="giftPic" @click="actPop = false">
						<img src="@/assets/img/discover/activity/yhhd_lqsb@2x.png" alt />
					</div>
					<div class="giftbox">
						<div class="text">
							活动时间{{resData.beginTime |filterDate}}至{{resData.endTime | filterDate}}内,
							<h2>投注{{resData.againBet}}元即可领取{{resData.againMoney}}元奖励。</h2>
						</div>
						<div class="close" @click="$router.push('/')">去游戏</div>
					</div>
				</div>
			</div>
			<div class="box-mask" @click="close"></div>
		</div>
	</div>
</template>

<script>
import { getActivity, receiveActivity } from "@/services/moneyRecord";
import Header from "@/components/Header";

export default {
	name: "actDetail",
	components: {
		Header
	},
	data() {
		return {
			loading: false,
			id: this.$route.query.id,
			isLogin: sessionStorage.getItem("token"),
			info: {},
			status: 1,
			actPop: false,
			resData: {}
		};
	},
	mounted() {
		this.getInfo();
	},
	methods: {
		getInfo() {
			this.loading = true;
			let data = {
				activityId: 0
			};
			getActivity(data).then(res => {
				if (res.success) {
					res.data.list.map(v => {
						if (this.id == v.id) {
							this.info = v;
						}
					});
					this.loading = false;
				} else {
					this.$toast.text(res.message,{
						cover: true,
						duration: 1000
					});
				}
			});
		},
		receive() {
			if (!this.isLogin) {
				this.$router.push({
					name: "login"
				});
				return;
			}
			if (this.info.status == 2) {
				this.$toast({
					message: "活动未开始",
					duration: 1000
				});
				return;
			}
			let data = {
				id: Number(this.id)
			};
			receiveActivity(data).then(res => {
				let resData = res.data;
				if (res.success) {
					if (
						resData.rewardMoney <= 0 &&
						resData.againMoney != 0 &&
						resData.againBet != 0
					) {
						//未满足
						this.status = 3;
					} else if (
						resData.rewardMoney > 0 &&
						resData.againMoney != 0 &&
						resData.againBet != 0
					) {
						//满足1个梯度
						this.status = 2;
					} else if (
						resData.rewardMoney > 0 &&
						resData.againMoney == 0 &&
						resData.againBet == 0
					) {
						this.status = 1;
					}
					this.resData = resData;
                    this.actPop = true;
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		close() {
			this.actPop = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.act-detail {
	z-index: 1;
	position: relative;
	padding-bottom: px2rem(40);
	.self-img {
		width: 100%;
		height: px2rem(300);
		img {
			width: 100%;
			height: 100%;
		}
	}

	.selfdetail-content {
		background: $default-color;
		padding: px2rem(90) px2rem(30) px2rem(30);
		font-size: px2rem(26);
		color: $tip-color;
		overflow: hidden;
		/deep/img {
			width: auto !important;
			max-width: 100% !important;
		}
	}
	.self-btn {
		margin: px2rem(50) auto 0;
		width: px2rem(690);
		height: px2rem(80);
		line-height: px2rem(80);
		text-align: center;
		font-size: px2rem(28);
		color: $default-color;
		background-color: $primary-color;
		border-radius: px2rem(8);
	}
}
.actPop {
	.actpopBox {
		z-index: 1000;
		position: fixed;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		width: px2rem(556);
		.btnpopContent {
			text-align: center;
			position: relative;
			.giftPic {
				img {
					position: absolute;
					left: px2rem(-60);
					top: px2rem(-190);
					width: 120%;
					height: px2rem(294);
				}
			}
			.giftbox {
				padding: px2rem(100) 0 px2rem(45) 0;
				border-radius: px2rem(20);
				color: $default-color;
				background: $gift-bgtop;
				background: -webkit-gradient(
					linear,
					left top,
					left bottom,
					color-stop(0%, $gift-bgbottom),
					color-stop(100%, $gift-bgtop)
				);
				background: -webkit-linear-gradient(
					top,
					$gift-bgbottom 0%,
					$gift-bgtop 100%
				);
				background: linear-gradient(
					to bottom,
					$gift-bgbottom 0%,
					$gift-bgtop 100%
				);

				.tit {
					font-size: px2rem(34);
					color: $default-color;
					margin: px2rem(50) 0;
					span {
						font-size: px2rem(48);
						color: #fff000;
					}
				}
				.text {
					padding: 0 px2rem(45);
					margin-bottom: px2rem(20);
					text-align: center;
					font-size: px2rem(24);
					line-height: px2rem(46);
					font-weight: 300;
					p {
						margin-bottom: px2rem(15);
						font-size: px2rem(34);
						font-weight: bold;
						text-align: center;
					}
					h2 {
						font-size: px2rem(34);
					}
				}
				.close {
					background: url("../../../assets/img/discover/activity/yhhd_gb@2x.png")
						no-repeat;
					margin: 0 auto;
					width: px2rem(400);
					height: px2rem(90);
					font-size: px2rem(32);
					line-height: px2rem(80);
					background-size: cover;
					font-weight: bold;
					color: $gift-close;
				}
			}
		}
		.fail {
			&.btnpopContent {
				.tit {
					line-height: px2rem(45);
					padding: px2rem(75) 0 px2rem(38);
				}
				.text {
					margin-top: px2rem(60);
					margin-bottom: px2rem(50);
				}
			}
		}
	}
	.box-mask {
		z-index: 999;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba($color: $nondefault-color, $alpha: 0.4);
	}
}
</style>