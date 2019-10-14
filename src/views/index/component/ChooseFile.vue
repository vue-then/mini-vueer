<template>
<!-- 选择文件-组件 -->
	<div v-show="show" class="file-area">
		<ul class="pk-1px-t">
			<li>
				<a>
					<i class="iconfont iconicon_info_chat_moreimg"></i>
					<input type="file" @change="handleSendFile" />
				</a>
				<p>相册</p>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		handleSendFile(event) {
			let _this = this.$(event.target);
			if (_this[0].files.length === 0) return;
			let file = _this[0].files[0];
            let localPath = this.getObjectURL(file); //本地图片，视频地址
            let image_reg = /(gif|jpg|jpeg|png|swf)$/;
			let video_reg = /(mp4)$/;

			let isImage = image_reg.test(file.type);
			let isVideo = video_reg.test(file.type);

			if (isImage || isVideo) {
				if (isImage && parseFloat(file.size / 1024 / 1024) > 5) {
					//图片最大5M
					this.$toast.text("图片最大5M");
					return;
				}
				if (isVideo && parseFloat(file.size / 1024 / 1024) > 20) {
					//视频最大20M
					this.$toast.text("视频最大20M");
					return;
				}
			} else {
				this.$toast.text("图片/视频格式不正确");
				return;
            }
			this.$emit("choose-file", file, localPath);
		},
		//建立一個可存取到該file的url 获取本地图片/视频url
		getObjectURL(file) {
			var url = null;
			// 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
			if (window.createObjectURL != undefined) {
				// basic
				url = window.createObjectURL(file);
			} else if (window.URL != undefined) {
				// mozilla(firefox)
				url = window.URL.createObjectURL(file);
			} else if (window.webkitURL != undefined) {
				// webkit or chrome
				url = window.webkitURL.createObjectURL(file);
			}
			return url;
		}
	}
};
</script>
<style lang="scss" scoped>
.file-area {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: px2rem(224);
	background: #fff;
	box-sizing: border-box;
	ul {
		padding-top: px2rem(32);
		li {
			text-align: center;
			width: 33%;
			a {
				width: px2rem(122);
				line-height: px2rem(122);
				background-color: #f8f8f8;
				text-align: center;
				display: inline-block;
				border-radius: px2rem(10);
				position: relative;
				i {
					font-size: px2rem(56);
				}
				input {
					width: 100%;
					position: absolute;
					top: 0;
					left: 0;
					height: px2rem(122);
					opacity: 0;
				}
			}
			p {
				font-size: px2rem(24);
				color: $label-color;
			}
		}
	}
}
</style>