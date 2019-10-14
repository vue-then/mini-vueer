<template>
	<!-- 红包领取记录 -->
	<div>
		<Header class="chat-header" title=" " headerClass="transparent"></Header>
		<div class="red-body">
			<div class="red-top">
				<img src="@/assets/img/im/icon_info_chat_redbagopenallbg@2x.png" alt />
				<div class="red-top-text">
					<h2>
						<img
							class="avatar"
							:src="redDetail.createPhoto?redDetail.createPhoto:MSG_TYPE.DEFAULT_AVATAR"
						/>
						<span>{{redDetail.createNick}}的红包</span>
					</h2>
					<h1>{{redDetail.remark}}</h1>
				</div>
			</div>
			<div class="red-title pk-1px-b">
				<span v-show="redDetail.noRobbedNum === 0">{{redDetail.amount}}个红包，已被抢光</span>
				<span
					v-show="redDetail.noRobbedNum > 0"
				>{{redDetail.amount - redDetail.noRobbedNum}}/{{redDetail.amount}}个</span>
				<span>红包金额：{{redDetail.money}}元</span>
			</div>
			<div class="red-list">
				<ul>
					<li v-for="item in redDetail.redLog" :key="item.id">
						<div class="avatar">
							<img :src="item.mPhoto?item.mPhoto:MSG_TYPE.DEFAULT_AVATAR" alt />
						</div>
						<div class="item-body pk-1px-b">
							<div class="item-body-one">
								<span class="top text-dots">{{item.mAccount}}</span>
								<span class="right">{{item.money}}元</span>
							</div>
							<div class="item-body-one">
								<span class="left text-dots">{{item.updateTime | filterDate}}</span>
								<!-- <span class="bt">手气最佳</span> -->
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import Header from "@/components/Header";

import { getRedbagList } from "@/services/im/chat";
import MSG_TYPE from "@/services/im/constant";

export default {
	components: {
		Header
	},
	name: "redList",
	data() {
		return {
			MSG_TYPE,
			postData: this.$route.query, //从路由里面取出需要传递给后端的参数
			redDetail: {} //红包领取信息
		};
	},
	mounted() {
		this.getRedList();
	},
	methods: {
		async getRedList() {
			this.postData.redId = this.postData.id * 1;
			this.postData.redType *= 1;
			let res = await getRedbagList(this.postData);
			if (res.success) {
				this.redDetail = res.data.data;
			} else {
				this.$toast.text(res.message);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.red-body {
	padding-top: px2rem(196);
	.red-top {
		position: absolute;
		top: px2rem(-88);
		height: px2rem(374);
		img {
			width: 100%;
			height: px2rem(374);
		}
		.red-top-text {
			position: absolute;
			top: px2rem(88);
			width: 100%;
			padding-top: px2rem(66);
			h2 {
				color: #fae3b7;
				font-size: px2rem(36);
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				.avatar {
					width: px2rem(44);
					height: px2rem(44);
					vertical-align: middle;
					margin-right: px2rem(18);
					border-radius: 50%;
				}
			}
			h1 {
				color: #fae3b7;
				font-size: px2rem(28);
				text-align: center;
				margin-top: px2rem(38);
			}
		}
	}
}
.red-title {
	height: px2rem(88);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: px2rem(32);
	margin-left: px2rem(32);

	span {
		color: $label-color;
		font-size: px2rem(28);
	}
}
.red-list {
	ul {
		li {
			padding: 0 px2rem(32);
			height: px2rem(120);
			display: flex;
			justify-content: space-between;
			align-items: center;
			.avatar {
				margin-right: px2rem(34);
				img {
					width: px2rem(80);
					height: px2rem(80);
					border-radius: 50%;
				}
			}
		}
	}
}
.item-body {
	flex: 1;
	padding: px2rem(20) px2rem(32) px2rem(20) 0;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.item-body-one {
		display: flex;
		justify-content: space-between;
		.top {
			font-size: px2rem(28);
			color: $tip-color;
			max-width: px2rem(370);
		}
		.right {
			font-size: px2rem(28);
			color: $tip-color;
			font-weight: bold;
		}
		.left {
			font-size: px2rem(24);
			color: $label-color;
			max-width: px2rem(546);
		}
		.bt {
			font-size: px2rem(24);
			color: $label-color;
		}
		.cp {
			background: $primary-color;
			color: $default-color;
			border-radius: px2rem(12);
			display: inline-block;
			padding: 0 px2rem(16);
			font-size: px2rem(18);
		}
	}
}
</style>