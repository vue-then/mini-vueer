<template>
	<div class="activityRecord">
		<Header title="领取记录"></Header>
		<div class="skeleton vue-skeleton-loading" v-show="loading">
			<div class="skeleton-bac-animation"></div>
			<div class="skeleton-bac-content">
				<skeleton-square width="9rem" height="1rem" margin="0.2rem 0.5rem"></skeleton-square>
				<column>
					<skeleton-square width="9rem" :count="9" margin="0.2rem 0.5rem"></skeleton-square>
				</column>
			</div>
		</div>
		<div v-show="!loading" class="content">
			<div v-show="list.length > 0" class="content-fixed">
				<div class="title">
					<p>最近一个月累计领取</p>
					<h2 class="money">{{totalMoney | currency('￥',2)}}</h2>
				</div>
			</div>
			<!--列表数据展示 -start -->
			<div class="generalizeLink-list">
				<div v-show="list.length > 0" class="page-loadmore">
					<!-- :style="{ height: wrapperHeight + 'px' }" -->
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
										<p class="text-dots">{{item.activityName}}</p>
										<span>{{item.applyTime | filterDate}}</span>
									</div>
									<div class="money">
										领取金额：
										<span>{{item.preferentialValue}}</span>
									</div>
								</li>
							</ul>
							<div class="noMoredata" v-show="hasData">我是有底线的</div>
						</pk-loadmore>
					</div>
				</div>
				<no-data v-show="list.length == 0" class="no-data-box"></no-data>
			</div>
			<!--列表数据展示 -end -->
		</div>
	</div>
</template>

<script>
import { getActivityInfo } from "@/services/moneyRecord.js";
import pkLoadmore from "@/components/Loadmore";
import noData from "@/components/NoData";
import Header from "@/components/Header";

export default {
	name: "activityRecord",
	components: {
		pkLoadmore,
		noData,
		Header
	},
	data() {
		return {
			loading: false,
			stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
			allLoaded: false,
			topAllLoaded: false,
			topStatus: "",
			bottomStatus: "",
			wrapperHeight: 0,
			page: 1, //当前页数
			pageSize: 10, //每页请求的条数
			totalNum: 0, //总页数
			list: [],
			hasData: false,
			totalMoney: 0
		};
	},
	mounted() {
		this.getList();
	},
	methods: {
		getList(t) {
			this.loading = true;
			let postData = {
				page: this.page,
				pageSize: this.pageSize
			};
			getActivityInfo(postData).then(res => {
				if (res.success) {
					let result = [];
					this.totalNum = res.data.totalCount;
					this.totalMoney = res.data.totalMoney;
					result = res.data.list || [];
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
					if (t === 1) {
						this.$toast.text("刷新成功");
					}
					this.$nextTick(() => {
						this.wrapperHeight =
							document.documentElement.clientHeight -
							this.$refs.wrapper.getBoundingClientRect().top;
					});
					this.loading = false;
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		//下拉刷新
		handleTopChange(status) {
			this.topStatus = status;
		},
		loadTop() {
			this.page = 1;
			this.hasData = false;
			setTimeout(() => {
				this.getList(1);
				this.$refs.loadmore.onTopLoaded();
				this.allLoaded = false;
			}, 1500);
		},
		//mint-ui 上拉加载
		handleBottomChange(status) {
			this.bottomStatus = status;
		},
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


<style lang="scss" scoped>
.content {
	.content-fixed {
		position: fixed;
		width: 100%;
		top: auto;
		left: 0;
		right: 0;
		z-index: 1;
		padding: px2rem(32);
		box-sizing: border-box;
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

	.page-loadmore {
		position: fixed;
		top: px2rem(297);
		left: 0;
		right: 0;
		.page-loadmore-wrapper {
			overflow-y: scroll;
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
					span {
						font-size: px2rem(28);
						font-weight: bold;
						color: #f73939;
					}
				}
			}
		}
	}
}
</style>
