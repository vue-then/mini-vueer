<template>
	<div>
		<Header title=" " headerClass="black"></Header>
		<div class="video">
			<div class="video-player">
				<d-player v-if="videoOptions.video" ref="player" :options="videoOptions" @play="play"></d-player>
			</div>
		</div>
	</div>
</template>
<script>
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";
import MSG_TYPE from "@/services/im/constant";
import Header from "@/components/Header";

export default {
	name: "videoPlay",
	components: {
		"d-player": VueDPlayer,
		Header
	},
	data() {
		return {
			BASE_URL: MSG_TYPE.BASE_URL,
			videoInfo: this.$route.query,
			videoOptions: {}
		};
	},
	computed: {
		player() {
			return this.$refs.player.dp;
		}
	},
	mounted() {
		console.log(this.videoInfo);
		this.videoOptions = {
			video: {
				url: this.BASE_URL + this.videoInfo.url,
				pic: this.BASE_URL + this.videoInfo.littlePicUrl,
				thumbnails: this.BASE_URL + this.videoInfo.littlePicUrl
			}
		};
		console.log(this.videoOptions);
	},
	methods: {
		play() {
			this.player.play();
		}
	}
};
</script>
<style lang="scss" scoped>
.video-player {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	background: #000;
	/deep/ .dplayer {
		top: 50%;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: px2rem(800);
		transform: translateY(-50%);
	}
}
</style>