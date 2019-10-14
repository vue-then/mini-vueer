<template>
	<div id="selfmore">
		<Header title="申请记录"></Header>

		<div v-show="loading" class="skeleton">
			<div class="skeleton-bac-animation"></div>
			<column>
				<skeleton-square width="9rem" height="1rem" :count="9" margin="0.2rem 0.5rem"></skeleton-square>
			</column>
		</div>

		<div v-show="!loading" class="content">
			<div class="content-total">
				<div class="title">
					<p>最近一个月累计领取</p>
					<h2 class="money">{{info.money | currency('￥',2)}}</h2>
				</div>
			</div>
			<ul class="tab-nav pk-1px-b">
				<li v-for="(item, index) in tabTitleData" :key="index">
					<span :class="{active:index===nowIndex}" @click="toggleTabs(index,item.value)">{{item.title}}</span>
				</li>
			</ul>
			<!--列表数据展示 -start -->
			<div v-show="list.length > 0" class="page-loadmore">
				<div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px'}" ref="wrapper">
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
						<ul>
							<li :class="{'pk-1px-b':index!=list.length-1}" v-for="(item,index) in list" :key="index">
								<div class="title">
									<p class="text-dots">{{item.activityTitle}}</p>
									<span>{{item.createTime | filterDate}}</span>
								</div>
								<div class="money">
									<p>
										申请金额：
										<span class="deposit">{{item.depositMoney}}</span>
									</p>
									<p v-show="item.status === 1">
										<span class="gary">审核中</span>
									</p>
									<p v-show="item.status === 2">
										领取金额：
										<span class="get">{{item.actualMoney}}</span>
									</p>
									<p v-show="item.status === 3">
										<span class="deposit">已拒绝</span>
									</p>
								</div>
							</li>
						</ul>
						<div class="noMoredata" v-show="hasData">我是有底线的</div>
					</pk-loadmore>
				</div>
			</div>
			<no-data v-show="list.length == 0" class="no-data-box"></no-data>
			<!--列表数据展示 -end -->
		</div>
	</div>
</template>

<script>
import { getSelfInfo } from "@/services/center";
import noData from "@/components/NoData";
import pkLoadmore from "@/components/Loadmore";
import Header from "@/components/Header";

export default {
	name: "selfmore",
	components: {
		noData,
		pkLoadmore,
		Header
	},
	data() {
		return {
			loading: true,
			info: {},
			list: [],
			tabTitleData: [
				{ value: 0, title: "全部优惠" },
				{ value: 1, title: "审核中" },
				{ value: 2, title: "已通过" },
				{ value: 3, title: "已拒绝" }
			],
			hasData: false,
			allLoaded: false,
			topAllLoaded: false,
			topStatus: "",
			bottomStatus: "",
			wrapperHeight: 0,
			stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
			page: 1, //当前页数
			pageSize: 10, //每页请求的条数
			totalNum: 0, //总页数
			status: 0,
			nowIndex: 0
		};
	},
	mounted() {
		this.getList();
	},
	methods: {
		getList() {
			let data = {
				status: this.status,
				page: this.page,
				pageSize: this.pageSize
			};
			getSelfInfo(data).then(res => {
				if (res.success) {
					this.info = res.data;
					let result = this.info.promotionRecord || [];
					this.totalNum = res.data.pageTotal;
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
					this.loading = false;
					this.$nextTick(() => {
						this.wrapperHeight =
							document.documentElement.clientHeight -
							this.$refs.wrapper.getBoundingClientRect().top;
					});
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		toggleTabs(index, value) {
			if (index === this.nowIndex) return;
			this.nowIndex = index;
			this.status = value;
			this.list = [];
			this.getList();
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
				this.getList();
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
		}
	}
};
</script>

<style scoped lang="scss">
.page-loadmore {
	position: fixed;
	top: px2rem(386);
	left: 0;
	right: 0;
	.page-loadmore-wrapper {
		overflow-y: auto;
		/*解决ios上滑动不流畅*/
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar {
			display: none;
		}
	}
	ul {
		background: $default-color;
		padding-left: px2rem(30);
		li {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: px2rem(140);
			padding-right: px2rem(30);
			.title {
				display: flex;
				justify-content: space-between;
				font-size: px2rem(28);
				color: $tip-color;
				p {
					flex: 2;
				}
				span {
					flex: 1;
					font-size: px2rem(24);
					color: $label-color;
					text-align: right;
				}
			}
			.money {
				font-size: px2rem(24);
				color: $label-color;
				display: flex;
				justify-content: space-between;
				span {
					font-size: px2rem(28);
					font-weight: bold;

					&.deposit {
						color: #f73939;
					}
					&.get {
						color: $primary-color;
					}
					.gary {
						color: $label-color;
					}
				}
			}
		}
	}
}

.content-total {
	padding: px2rem(32);
	.title {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: px2rem(145);
		text-align: center;
		color: $default-color;
		background-image: linear-gradient(270deg, #17c492 0%, #4fd5ae 100%),
			linear-gradient(#17c492, #17c492);
		background-blend-mode: normal, normal;
		border-radius: px2rem(15);
		p {
			font-weight: 300;
			font-size: px2rem(24);
			margin-top: px2rem(20);
		}
		.money {
			font-size: px2rem(36);
			color: $default-color;
			margin-bottom: px2rem(10);
		}
	}
}

.tab-nav {
	width: 100%;
	height: px2rem(88);
	line-height: px2rem(88);
	text-align: center;
	font-size: px2rem(32);
	background-color: $default-color;
	display: flex;
	justify-content: space-around;
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
</style>