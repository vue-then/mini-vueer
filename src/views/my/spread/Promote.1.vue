<template>
	<div class="promote">
		<Header title="推广说明"></Header>
		<div class="instruct">
			<p>
				欢迎加入无限级的推广返佣模式！ <br>
				通过分享推广，您可以获得下级会员投注之后的佣金返
				点，分享推广的会员越多，佣金越多！<br>
				下级会员再次推广的下级会员，一样可以为您贡献佣金，
				无限级推广！
			</p>
		</div>
		<div class="imgs">
			<img src="../../../assets/img/image-tgsm-banner2.png" alt>
		</div>
	</div>
</template>
<script>
import Header from '@/components/Header';
export default {
    components: {
        Header
    },
	methods: {
		back(path) {
			this.$router.push({
				name: path
			});
		},
	}
};
</script>
<style lang="scss" scoped>
@import "../../../styles/pk-pwd.scss";
.promote {
	background-color: $prompt-bg;

	.spansright {
		.imgsbank {
			position: absolute;
			width: 0.58667rem /* 44/75 */;
			top: 0.24rem /* 18/75 */;
			right: 0.2rem /* 15/75 */;
		}
	}
	.imgs {
		height: 12.8rem /* 250/75 */;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.instruct {
		background: #fff;
		padding: .4rem /* 15/75 */;
		p {
			color: $tip-color;
			line-height: 2;
			font-size: 0.346667rem /* 26/75 */;
			letter-spacing: .026667rem;
		}

	}
}
</style>
