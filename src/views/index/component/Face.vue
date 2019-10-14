<template>
	<!-- 表情选择-组件 -->
	<div v-show="show" class="face-area">
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide class="pk-1px-t" v-for="(item, index) in swiperSlides" :key="index">
				<div class="face-item" @click="chooseFace(subItem)" v-for="subItem in item" :key="subItem.key">
					<img :src="subItem.value" />
				</div>
				<div class="face-item" @click="deleteFace()" :class="{'close':item.length<20}">
					<img :src="closeIcon" />
				</div>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import { FACE_IMG_ARR } from "@/services/im/constant";
export default {
	components: {
		swiper,
		swiperSlide
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			closeIcon: require("@/assets/img/im/guanbi@2x.png"),
			swiperOption: {
				pagination: {
					el: ".swiper-pagination"
				}
			},
			swiperSlides: FACE_IMG_ARR
		};
	},
	mounted() {},
	methods: {
		chooseFace(item) {
			this.$emit("on-choose-face", item);
		},
		deleteFace() {
			this.$emit("on-delete-face");
		}
	}
};
</script>
<style lang="scss" scoped>
.face-area {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: px2rem(333);
	background: $default-color;
	/deep/ .swiper-slide {
		padding: px2rem(40) px2rem(33) 0;
		box-sizing: border-box;
	}
	.face-item {
		width: 14%;
		float: left;
		margin-bottom: px2rem(40);
		text-align: center;
		img {
			width: px2rem(48);
			height: px2rem(44);
		}
		&.close {
			position: absolute;
			right: 6%;
			bottom: px2rem(-44);
			margin-bottom: 0;
		}
	}
	/deep/ .swiper-pagination {
		bottom: 0;
		.swiper-pagination-bullet {
			background: $label-color;
			opacity: 0.3;
		}
		.swiper-pagination-bullet-active {
			opacity: 1;
		}
	}
}
</style>