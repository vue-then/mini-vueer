
<template>
	<div class="no-data">
		<div class="contentp">
			<img :src="noDataimg" />
			<p>{{text}}~</p>
		</div>
	</div>
</template>
<script>
import noDataimg from "@/assets/img/game-icon/none.png";
export default {
	props: {
		dataText: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			noDataimg: noDataimg,
			text: "暂无数据~"
		};
	},
	mounted() {
		if (this.dataText) {
			this.text = this.dataText;
		}
	}
};
</script>
<style lang="scss" scoped>
.no-data {
	height: px2rem(400);
	padding-top: px2rem(80);
	width: 100%;
	.contentp {
		font-size: px2rem(28);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		p {
			margin-top: px2rem(40);
			font-size: px2rem(26);
			color: $label-color;
		}

		img {
			display: block;
			width: px2rem(460);
			height: px2rem(320);
		}
	}
}
</style>



