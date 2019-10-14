<template>
	<!-- 红包领取-弹框 -->
	<div class="red-modal">
		<div class="mask"></div>
		<div class="red-content">
			<!-- 1=进行中 2=抢完了  3=已过期  4=已领过-->
			<div class="bg" @click="$emit('get-red-bag',redInfo)" v-show="redInfo.status === 1">
				<img class="bg-img" src="@/assets/img/im/icon_info_chat_redbagO@2x.png" alt />
				<div class="red-body">
					<h2>
						<img class="avatar" :src="redInfo.createPhoto?redInfo.createPhoto:MSG_TYPE.DEFAULT_AVATAR" />
						<span>{{redInfo.createNick}}的红包</span>
					</h2>
					<h1>{{redInfo.remark}}</h1>
				</div>
			</div>

			<div class="bg" v-show="redInfo.status === 2 || redInfo.status === 3 || redInfo.status === 4">
				<img class="bg-img" src="@/assets/img/im/icon_info_chat_redbagOno@2x.png" alt />
				<div class="red-body">
					<h2>
						<img class="avatar" :src="redInfo.createPhoto?redInfo.createPhoto:MSG_TYPE.DEFAULT_AVATAR" />
						<span>{{redInfo.createNick}}的红包</span>
					</h2>
					<h1 v-show="redInfo.status === 2">手慢了，红包抢完了</h1>
					<h1 v-show="redInfo.status === 3">该红包已过期</h1>
					<h1 v-show="redInfo.status === 4">您已领取该红包</h1>

					<router-link
						:to="{name:'redList',query:{
                            id: redInfo.id,
                            roomId: redInfo.roomId,
                            redType: redInfo.redType,
                            siteIndexId:redInfo.siteIndexId
                        }}"
						class="look-info"
					>查看领取详情</router-link>
				</div>
			</div>

			<div class="close-red">
				<i @click="$emit('close-red-modal')" class="iconfont iconicon_info_chat_redbagO_close"></i>
			</div>
		</div>
	</div>
</template>
<script>
import MSG_TYPE from "@/services/im/constant";

export default {
	props: ["redInfo"],
	data() {
		return {
			MSG_TYPE,
			BASE_URL: MSG_TYPE.BASE_URL
		};
	}
};
</script>
<style lang="scss" scoped>
.red-modal {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: $default-color;
		z-index: 99;
		opacity: 0.7;
	}
}
.red-content {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99;
	.bg {
		width: px2rem(580);
		margin: px2rem(112) auto 0;
		position: relative;
		.bg-img {
			width: 100%;
			vertical-align: middle;
		}
		.red-body {
			position: absolute;
			padding-top: px2rem(244);
			left: 0;
			text-align: center;
			width: 100%;
			font-size: 0;
			height: 100%;
			top: 0;
			box-sizing: border-box;
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
				font-size: px2rem(40);
				text-align: center;
				margin-top: px2rem(54);
			}
			.look-info {
				font-size: px2rem(24);
				color: #fae3b7;
				text-decoration: underline;
				position: absolute;
				bottom: px2rem(32);
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
}
.close-red {
	text-align: center;
	margin-top: px2rem(80);
	i {
		font-size: px2rem(70);
		color: #fae3b7;
		font-weight: bold;
	}
}
</style>