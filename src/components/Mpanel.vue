<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-28 17:08:06
 * @LastEditTime: 2019-09-30 17:36:10
 * @LastEditors: Please set LastEditors
 -->
<template>
	<transition name="fade">
		<div class="modal-box">
			<div class="modal-content">
				<div class="modal-header">
					<span>滑块验证</span>
					<span @click="onCancel" class="close-mask">
						<i data-v-1a504564 class="iconfont icon-sykszz-close"></i>
					</span>
				</div>
				<!--内容区域-->
				<div class="modal-body">
					<div id="mpanel" ref="mpanel"></div>
				</div>
				<div class="modal-bottom">
					<!-- <i class="red">*</i>请完成上方的验证
					<i class="red">*</i> -->
				</div>
			</div>
		</div>
	</transition>
</template>
 
<script>
import { getCodeImg } from "../services/auth.js";
export default {
	props: ["type"],
	name: "mpanel",
	watch: {
		state(newVal, oldVal) {
			if (newVal) {
				this.ModalHelper.open();
			} else {
				this.ModalHelper.close();
			}
		}
	},
	data() {
		return {
			path: null,
			refresh: false
		};
	},
	mounted() {
		this.slideVerify();
	},
	methods: {
		onCancel() {
			this.$emit("close");
		},
		// 提示框
		showToolTip(text, timeout = 2000) {
			this.$toast.text(text, {
				cover: true,
				duration: 1000
			});

			// this.$toast({
			//     message: text,
			//     duration: 2000
			// })
		},
		// 验证
		slideVerify() {
			let _this = this;

			getCodeImg()
				.then(resq => {
					let res = resq.data;
					// console.log(res, 123456543);
					// console.log("this.type", _this.$("#mpanel").slideVerify());
					_this.$emit("codeId", res.id);
					_this.$("#mpanel").slideVerify({
						type: 2,
						mode: "pop",
						vOffset: _this.type,
						vSpace: 5,
						codeId: res.id,
						explain: "按住左边滑块，拖动完成上方拼图",
						imgUrl: "data:image/png;base64," + res.normal,
						smallImg: "data:image/png;base64," + res.small,
						imgSize: {
							width: res.imgx * window.dpr + "px",
							height: res.imgy * window.dpr + "px"
						},
						blockSize: {
							width: res.sImgx * window.dpr + "px",
							height: res.sImgy * window.dpr + "px"
						},
						barSize: {
							width: res.imgx * window.dpr + "px",
							height: res.sImgy * window.dpr + "px"
						},
						rand2: res.y * window.dpr,
						ready: function(v) {
							if (v) {
								_this.slideVerify();
							}
						},
						success: function(data) {
							console.log(data);
							// _this.showToolTip("验证成功")
							//  _this.$toast.success('验证成功', {
							//     cover: true,
							//     duration: 1000
							// });
							// 向父组件传值
							_this.$emit("success", data, res.id);
						},
						error: function() {
							_this.$toast.text("验证失败", {
								cover: true,
								duration: 1000
							});
							_this.slideVerify();
							// _this.showToolTip("验证失败");
						}
					});
				})
				.catch(res => {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
					// this.$toast({
					//     message: res,
					//     duration: 2000
					// });
				});
		}
	}
};
</script>

<style scoped>
/* @import  url('./less/skin.less'); */

@import url("../styles/verify.scss");
.modal-box {
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	left: 0;
	top: 0;
	z-index: 100;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
}

.modal-content {
	position: relative;
	width: 90%;
	background: #fff;
	border-radius: 0.267rem;
	box-sizing: border-box;
	font-size: 0.32rem;
}

.modal-header {
	padding: 0 0.4rem;
	height: 1.067rem;
	line-height: 1.067rem;
	font-size: 0.427rem;
    color: #1a1a1a;
    text-align: center;
    font-weight: bold;
}
.modal-bottom {
	height: 0.587rem;
}

.modal-bottom .red {
	color: #e60012;
}

.close-mask {
	float: right;
	color: #646466;
}

.close-mask .iconfont {
	font-size: 0.42rem;
}

#mpanel {
	background-color: #fff;
}

.fade-enter-active {
	animation: fade-in 0.5s;
}

.fade-leave-active {
	animation: fade-in 0.5s reverse;
}

@keyframes fade-in {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.5);
	}
	100% {
		transform: scale(1);
	}
}
</style>