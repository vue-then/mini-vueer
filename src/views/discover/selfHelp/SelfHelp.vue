<template>
	<div class="selfhelp">
		<Header title="自助优惠申请" :showRight="true">
			<span slot="right" class="r-text" @click="$router.push({name:'selfmore'})">申请记录</span>
		</Header>

		<div v-show="loading" class="skeleton">
			<div class="skeleton-bac-animation"></div>
			<column>
				<skeleton-square width="9rem" height="1rem" :count="9" margin="0.2rem 0.5rem"></skeleton-square>
			</column>
		</div>

		<div v-show="!loading">
			<ul>
				<li @click="toDetail(infoList)" v-for="(infoList,index) in list" :key="index">
					<div v-if="infoList.status === 3" @click="toDetail(infoList)" class="maxMask"></div>
					<div
						class="activity-status"
						:class="{'over':infoList.status === 3,'unbegin':infoList.status === 2}"
					>
						<span v-if="infoList.status === 1">进行中</span>
						<span v-else-if="infoList.status === 2">未开始</span>
						<span v-else-if="infoList.status === 3">已结束</span>
					</div>
					<img :src="infoList.wapImg" />
					<div class="title" :class="{'unbeginTxt':infoList.status === 2 || infoList.status === 3}">
						<span>{{infoList.proTitle}}</span>
						<span class="right">查看详情</span>
					</div>
					<div  v-if="infoList.status === 3" class="end-bg"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getSelflist } from "@/services/center";
import Header from "@/components/Header";
export default {
	name: "selfhelp",
	components: {
		Header
	},
	data() {
		return {
			loading: false,
			list: []
		};
	},
	mounted() {
		this.getlist();
	},
	methods: {
		getlist() {
			this.loading = true;
			getSelflist().then(res => {
				if (res.success) {
					this.loading = false;
					this.list = res.data;
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		toDetail(item) {
			if (item.status == 1) {
				this.$router.push({
					name: "selfDetail",
					query: {
						id: item.id
					}
				});
			} else if (item.status == 2) {
				this.$toast.text("活动未开始", {
					cover: true,
					duration: 1000
				});
			} else if (item.status == 3) {
				this.$toast.text("活动已结束", {
					cover: true,
					duration: 1000
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">

.r-text{
	font-size: px2rem(28);
	color: $tip-color;
}
.selfhelp {
	ul {
		padding: px2rem(32);
		background-color: $light-color;
		box-sizing: border-box;
		li {
			position: relative;
			margin-bottom: px2rem(32);
			border-radius: $tenrem;
			overflow: hidden;
			background-color: $default-color;
			.end-bg{
				position: absolute;
				width: 100%;
				background:rgba($color:$nondefault-color, $alpha: 0.5);
				top: 0;
				bottom: 0;
				z-index: 2;
			}
			.maxMask {
				z-index: 9;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background-color: rgba($color: $nondefault-color, $alpha: 0);
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
			img {
				display: block;
				width: 100%;
				min-height: px2rem(264);
				max-height: px2rem(285);
			}
			.title {
				padding-left: px2rem(32);
				line-height: px2rem(88);
				font-size: px2rem(28);
				color: $text-color;
				.right {
					float: right;
					padding: 0 px2rem(32);
					color: $primary-color;
				}
			}
			.unbeginTxt {
				.right {
					color: $label-color;
				}
			}
		}
	}
}
</style>