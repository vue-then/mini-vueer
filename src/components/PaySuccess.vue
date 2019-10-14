<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 08:36:40
 * @LastEditTime: 2019-10-09 08:36:40
 * @LastEditors: your name
 -->
<template>
	<div class="pay-success">
		<div class="pay-success-box">
			<i class="iconfont iconicon_bz"></i>
			<p class="desc">{{dataObj.desc}}</p>
			<div v-show="dataObj.details && dataObj.details.length>0" class="order-details">
				<ul>
					<li v-for="(item,index) in dataObj.details" :key="index">
						<span>{{item.name}} ：</span>
						<p>{{item.value}}</p>
					</li>
				</ul>
			</div>
			<button @click="ok()">确认</button>
		</div>
	</div>
</template>
<script>
export default {
	props: ["dataObj"],
	methods: {
		ok() {
			this.$emit("ok");
		}
	}
};
</script>
<style lang="scss" scoped>
.pay-success {
	.pay-success-box {
		margin-top: px2rem(40);
		margin-bottom: 1rem;
		padding: 0 px2rem(30);
		display: flex;
		flex-direction: column;
		i {
			font-size: px2rem(180);
			color: $primary-color;
			margin: 0 auto;
		}
		p.desc {
			font-size: px2rem(32);
			color: $tip-color;
			margin-top: px2rem(16);
			margin-bottom: px2rem(20);
			line-height: 1.5;
		}
		.order-details {
			background: $default-color;
			border-radius: px2rem(10);
			padding: px2rem(20);
			margin-bottom: px2rem(32);
			ul {
				li {
					display: flex;
					justify-content: space-between;
					font-size: px2rem(28);
					color: $text-color;
					margin-bottom: px2rem(20);
					&:last-child {
						margin-bottom: 0;
					}
					span {
						flex: 2.5;
						text-align: right;
					}
					p {
						flex: 7.5;
					}
				}
			}
		}
		button {
			width: 100%;
			height: px2rem(88);
			line-height: px2rem(88);
			text-align: center;
			color: $default-color;
			background: $primary-color;
			border: none;
			border-radius: px2rem(10);
			font-size: px2rem(28);
			&:active {
				background: $primary-color;
			}
		}
	}
}
</style>


