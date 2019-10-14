<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 08:36:40
 * @LastEditTime: 2019-10-09 10:10:18
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div class="pay-return-result">
		<div class="return-result-box">
			<!-- <img src="../assets/img/icon_wallet_qs.png" alt=""> -->
			<i class="iconfont iconicon_bz"></i>
			<h2>请在新开页面完成存款</h2>
			<button @click="okPay()">我已完成存款</button>
			<button @click="continuePay()" class="continue">重新选择支付方式</button>
			<p>
				存款遇到问题请
				<router-link :to="{name:'contactus'}">联系客服</router-link>
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ["fromType"],
	methods: {
		okPay() {
			this.$router.replace({
				name: "depositRecord"
			});
		},
		continuePay() {
			this.$router.go(-2);
		}
	}
};
</script>
<style lang="scss" scoped>
.pay-return-result {
	.return-result-box {
		margin-top: px2rem(40);
		margin-bottom: 1rem;
		padding: 0 px2rem(30);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		i {
			font-size: px2rem(180);
			color: $primary-color;
		}
		h2 {
			color: $text-color;
			font-size: px2rem(32);
			margin-top: px2rem(20);
			margin-bottom: px2rem(30);
			font-weight: 400;
		}
		button {
			width: 100%;
			height: px2rem(80);
			line-height: px2rem(80);
			text-align: center;
			border-radius: px2rem(10);
			border: none;
			color: $default-color;
			background: $primary-color;
			font-size: px2rem(28);
			margin-bottom: px2rem(30);
			&:active {
				background: $primary-color;
			}
		}
		button.continue {
			background: $color-w;
			color: $default-color;
		}
		p {
			width: 100%;
			text-align: right;
			color: $color-M;
			font-size: px2rem(24);
			a {
				color: $primary-color;
				text-decoration: underline;
			}
		}
	}
}
</style>


