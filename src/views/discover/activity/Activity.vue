<template>
	<div class="activity">
		<Header title="优惠活动" :showRight="true">
			<span slot="right" class="r-text" @click="$router.push({name:'activityRecord'})">领取记录</span>
		</Header>
		<div v-show="loading" class="skeleton vue-skeleton-loading">
			<div class="skeleton-bac-animation"></div>
			<column>
				<skeleton-square width="9rem" height="3rem" :count="6" margin="0.2rem 0.5rem"></skeleton-square>
			</column>
		</div>
		<!-- swiper nav -->
		<swiper
			v-show="!loading && actType != null"
			:options="swiperOptionThumbs"
			class="acttype"
			ref="swiperThumbs"
		>
			<swiper-slide v-for="(type, index) in actType" :key="index">
				<span
					:class="{active:index===nowIndex}"
					@click="toggleTabs(index,type.id)"
				>{{type.activityTypeName}}</span>
			</swiper-slide>
		</swiper>
		<div v-show="!loading" class="content" :style="{'top':(actType == null ? 0:'1.173333rem')}">
			<!-- <div
				@click="toTurntable()"
				v-show="turntable && turnlist.id != 0"
				class="activity-list luckdraw"
			>
				<img src="@/assets/img/huodong-dzp.png" />
			</div> -->
			<div v-for="actLists in actList" :key="actLists.id" class="activity-list">
				<div  v-if="actLists.status === 3" class="end-bg"></div>
				<div v-if="actLists.status === 3" @click="details(actLists.status,actLists.id)" class="maxMask"></div>
				<img
					v-show="actLists.photo != ''"
					:src="actLists.photo"
					@click="details(actLists.status,actLists.id)"
				/>
				<img
					v-show="actLists.photo == ''"
					src="@/assets/img/errorimg.png"
					@click="details(actLists.status,actLists.id)"
				/>
				<div
					class="activity-status"
					:class="{'over':actLists.status === 3,'unbegin':actLists.status === 2}"
				>
					<span v-if="actLists.status === 1">进行中</span>
					<span v-else-if="actLists.status === 2">未开始</span>
					<span v-else-if="actLists.status === 3">已结束</span>
				</div>
				<div class="activity-list-fotter">
					<!-- <div v-if="actLists.status === 2" class="minMask"></div> -->
					<div class="title">
						<span>{{actLists.name}}</span>
					</div>
					<div
						class="button"
						@click="receive(actLists.id)"
						:class="{'unbeginTxt':actLists.status === 2 || actLists.status === 3}"
					>
						<div>
							<span v-show="actLists.status === 1">立即领取</span>
							<span v-show="actLists.status === 2">未开始</span>
							<span v-show="actLists.status === 3">已结束</span>
						</div>
					</div>
				</div>
			</div>
            <no-data v-show="actList == null" class="no-data-box"></no-data>
		</div>
		<!--弹窗-->
		<div class="actPop" v-show="actPop">
			<div class="actpopBox">
				<div class="btnpopContent" v-if="stusta ==1">
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
				<div class="btnpopContent" v-if="stusta ==2">
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
				<div class="btnpopContent fail" v-if="stusta ==3">
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
import "swiper/dist/css/swiper.css";
import {
	getActtype,
	geTurntable,
	getActivity,
	receiveActivity
} from "@/services/moneyRecord";
import Header from "@/components/Header";
import noData from "@/components/NoData";
export default {
	name: "activity",
	components: {
        Header,
        noData
	},
	data() {
		return {
			loading: false,
			isLogin: sessionStorage.getItem("token"),
			turntable: false,
			actPop: false,
			actList: [],
			turnlist: [],
			stusta: 0,
			resData: {},
			actType: [],
			nowIndex: 0,
			swiperOptionThumbs: {
				spaceBetween: 0,
				loop: true,
				slidesPerView: 4,
				loopedSlides: 4, //looped slides should be the same
				slideToClickedSlide: false
			}
		};
	},
	watch: {
		actPop(newVal, oldVal) {
			if (newVal) {
				this.ModalHelper.open();
			} else {
				this.ModalHelper.close();
			}
		}
	},
	mounted() {
		this.getType();
	},
	methods: {
		toggleTabs(index, id) {
			if (index === this.nowIndex) return;
			this.nowIndex = index;
			this.getList(id);
		},
		details(status, id) {
			if (status === 1) {
				//正
				this.$router.push({
					name: "actDetail",
					query: {
						id: id
					}
				});
			} else if (status === 2) {
				this.$toast.text("活动未开始", {
					cover: true,
					duration: 1000
				});
			} else if (status === 3) {
				//结束
				this.$toast.text("活动已结束", {
					cover: true,
					duration: 1000
				});
			}
		},
		quickApply(status) {
			if (status === 1) {
				//正
				this.actPop = true;
			} else if (status === 2) {
				//未开始
				this.$toast.text("活动未开始", {
					cover: true,
					duration: 1000
				});
			}
		},
		close() {
			this.actPop = false;
		},
		getType() {
			this.loading = true;
			getActtype().then(res => {
				if (res.success) {
					this.actType = res.data;
					if (this.actType != null) {
						this.actType.unshift({
							activityTypeName: "全部活动",
							id: 0
						});
					}
					this.getList(0);
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		getList(id) {
			let data = {
				activityId: id
			};
			getActivity(data).then(res => {
				if (res.success) {
					this.actList = res.data.list;
					// if (id === 0) {
					// 	this.turntable = true;
					// 	this.turnlist = {
					// 		title: "幸运大转盘"
					// 	};
					// 	this.getTurntable();
					// } else {
					// 	this.turntable = false;
					// }
					this.loading = false;
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		receive(id) {
			if (!this.isLogin) {
				this.$router.push("login");
				return;
			}
			let data = {
				id: id
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
						this.stusta = 3;
					} else if (
						resData.rewardMoney > 0 &&
						resData.againMoney != 0 &&
						resData.againBet != 0
					) {
						//满足1个梯度
						this.stusta = 2;
					} else if (
						resData.rewardMoney > 0 &&
						resData.againMoney == 0 &&
						resData.againBet == 0
					) {
						this.stusta = 1;
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
		getTurntable() {
			if (this.isLogin) {
				geTurntable().then(res => {
					if (res.success) {
						if (res.data.status === 1) {
							this.turntable = true;
							this.turnlist = res.data;
						} else {
							this.turntable = false;
						}
					} else {
						this.$toast.text(res.message, {
							cover: true,
							duration: 1000
						});
					}
				});
			}
		},
		toTurntable() {
			if (!this.isLogin) {
				this.$router.push({
					name: "login"
				});
				return;
			}
			if (this.turnlist.status === 1) {
				this.$router.push({
					name: "luckdraw",
					query: {
						id: this.turnlist.id
					}
				});
			} else {
				this.$toast.text("不在此层级，请联系客服", {
					cover: true,
					duration: 1000
				});
			}
		},
		toTab() {
			if (this.isLogin) {
				this.$router.push("activityRecord");
			} else {
				this.$router.push("login");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.r-text {
	color: $tip-color;
	font-size: px2rem(28);
}
.activity {
	position: relative;
	height: 100%;
	/deep/ .acttype {
		z-index: 99;
		position: fixed;
		top: px2rem(88);
		left: 0;
		width: 100%;
		height: px2rem(88);
		line-height: px2rem(88);
		text-align: center;
		font-size: px2rem(32);
		background-color: $default-color;
		.active {
			position: relative;
			color: $primary-color;
			&::before {
				position: absolute;
				left: 50%;
				bottom: px2rem(-10);
				content: "";
				width: 35%;
				transform: translateX(-50%);
				height: px2rem(8);
				border-radius: px2rem(4);
				background-color: $primary-color;
			}
			span {
				color: $primary-color;
				font-weight: bold;
			}
		}
		span {
			color: $label-color;
		}
	}
	/deep/ .pk-title {
		z-index: 10;
	}
	.content {
		position: absolute;
		top: px2rem(176);
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: scroll;
		/*解决ios上滑动不流畅*/
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar {
			display: none;
		}
		.activity-list {
			z-index: 1;
			margin: px2rem(32) auto px2rem(32);
			width: px2rem(690);
			height: px2rem(328);
			border-radius: px2rem(15);
			overflow: hidden;
			position: relative;
			.end-bg{
				position: absolute;
				width: 100%;
				background:rgba($color:$nondefault-color, $alpha: 0.5);
				top: 0;
				bottom: 0;
				z-index: 2;
			}
			img {
				width: 100%;
				height: px2rem(240);
				border-radius: px2rem(20) px2rem(20) 0 0;
				display: block;
			}
			.activity-status {
				position: absolute;
				top: px2rem(24);
				left: 0;
				z-index: 3;
				padding: 0 px2rem(15);
				height: px2rem(40);
				line-height: px2rem(40);
				background-color: $primary-color;
				border-radius: 0 px2rem(8) px2rem(8) 0;
				color: $default-color;
				text-align: center;
				box-shadow: 0px 3px 6px 0px rgba(240, 110, 0, 0.3);
				span {
					font-size: px2rem(24);
					line-height: px2rem(36);
				}
			}
			.over {
				background-color: $state-end;
			}
			.unbegin {
				background-color: $color-w;
			}
			.activity-list-fotter {
				position: absolute;
				width: 100%;
				height: px2rem(88);
				line-height: px2rem(88);
				background: $default-color;
				bottom: 0;
				display: flex;
				.minMask {
					position: absolute;
					bottom: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(
						$color: $nondefault-color,
						$alpha: 0.12
					);
				}
				.title {
					flex: 4;
					color: $text-color;
					padding-left: px2rem(22);
					font-size: px2rem(26);
				}
				.button {
					color: $primary-color;
					width: px2rem(140);
					text-align: center;
					font-size: px2rem(28);
					font-weight: bold;
				}
				.unbeginTxt {
					color: $label-color;
				}
			}
			.maxMask {
				z-index: 999;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background-color: rgba($color: $nondefault-color, $alpha: 0);
			}
		}
		.luckdraw {
			height: auto;
			img {
				height: auto;
			}
		}
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