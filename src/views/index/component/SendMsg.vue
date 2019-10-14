<template>
	<!-- 发送消息-组件 -->
	<div>
		<div v-if="isForbids" class="disabled-input">
			<p>禁言中</p>
		</div>
		<div class="send-area" :class="{'faceShow':isShowFace,'fileShow':isShowFile}">
			<div class="input">
				<div v-show="chatInput" @click="keyBoard">
					<input class="editor" disabled ref="expression" v-model="content" placeholder="表情" type="text" />
				</div>
				<input
					class="editor"
					v-show="!chatInput"
					ref="editor"
					@click="keyBoardInput"
					v-model="content"
					placeholder="请输入..."
					type="text"
				/>
			</div>
			<div @click="toggleFace" class="face">
				<i class="iconfont iconicon_info_chat_face"></i>
			</div>
			<div class="btn">
				<button v-show="isShowSendBtn" @click="send">发送</button>
				<i v-show="!isShowSendBtn" @click="toggleFile" class="iconfont iconicon_info_chat_more"></i>
			</div>
		</div>
		<Face :show="isShowFace" @on-choose-face="onChooseFace" @on-delete-face="onDelete" />
		<choose-file :show="isShowFile" @choose-file="chooseFile" />
	</div>
</template>
<script>
import Face from "@/views/index/component/Face";
import ChooseFile from "@/views/index/component/ChooseFile";
export default {
	components: {
		Face,
		ChooseFile
	},
	props: {
		sendType: {
			type: String
		},
		isForbid: {
			type: Boolean
		}
	},
	data() {
		return {
			isForbids: false,
			isShowSendBtn: false,
			isShowFace: false,
			isShowFile: false,
			content: "",
			prevFace: [],
			sendTypeArr: [],
			hidshow : true,
			chatInput:true,
			domHeight: document.documentElement.clientHeight,  //默认屏幕高度
            showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            touchFlag: false,//是否需要展开聊天输入框
		};
	},
	computed: {},
	watch: {
        isShowFace(val){
            if(!val&&this.touchFlag){
                this.$emit("set-height", 1.44);
            }
        },
        isShowFile(val){
            if(!val&&this.touchFlag){
                this.$emit("set-height", 1.44);
            }
        },
		isForbid(newVal, oldVal) {
			this.isForbids = newVal;
			console.log("newVal", newVal);
		},
		sendType(newVal, oldVal) {
			//默认1，2即文本和表情
			let sendTypeArr = newVal.split(",").map(item => item * 1);
			this.sendTypeArr = sendTypeArr.length > 2 ? sendTypeArr : [1, 2];
			if (this.sendTypeArr.includes(4) || this.sendTypeArr.includes(5)) {
				this.isShowSendBtn = false;
			}
			if (
				!this.sendTypeArr.includes(4) &&
				!this.sendTypeArr.includes(5)
			) {
				this.isShowSendBtn = true;
			}
		},
		showHeight() {
			if (this.domHeight > this.showHeight) {
				this.isShowSendBtn = false;
			} else {
				this.isShowSendBtn = true;
			}
		}
	},
	mounted() {
        this.$("#msg_list").on('touchmove',()=>{
            console.log('scrolling')
            this.isShowFace=false;
            this.isShowFile=false;
            this.isShowSendBtn=false;
            this.isShowBtn();
            this.$(".editor").blur();
        })
        this.isShowBtn()
		// this.isShowFile =
		// android
		// var originalHeight =
		// 	document.documentElement.clientHeight || document.body.clientHeight;
		// window.οnresize = () => {
		// 	//键盘弹起与隐藏都会引起窗口的高度发生变化
		// 	var resizeHeight =
		// 		document.documentElement.clientHeight ||
		// 		document.body.clientHeight;
		// 	if (resizeHeight - 0 < originalHeight - 0) {
		// 		//当软键盘弹起，在此处操作
		// 		this.isShowFace = false;
		// 	alert(3)
		// 	} else {
		// 		//当软键盘收起，在此处操作
		// 	alert(4)
		// 	}
		// };
		// // ios
		// document.body.addEventListener("focusin", () => {
		// 	//软键盘弹出的事件处理
		// 	this.isShowFace = false;
		// 	alert(1)
		// });
		// document.body.addEventListener("focusout", () => {
		// 	//软键盘收起的事件处理
		// 	alert(2)
		// });
		// this.$nextTick(() => {
		// 	this.$refs.editor.focus();//输入框默认获取焦点
		// });
		// const ua = window.navigator.userAgent;
		// console.log(ua)
		// if (ua.indexOf("Android") > -1 || ua.indexOf("iPhone") > -1) {
		// 	const docmHeight = document.body.clientHeight;// 默认屏幕高度
		// 		window.onresize = () => {
		// 			var nowHeight = document.body.clientHeight;// 实时屏幕高度
		// 			if (docmHeight !== nowHeight) {
		// 				this.hidshow = false;
		// 			}else {
		// 				this.hidshow = true;
		// 		}
		// 	};
		// }
	},
	methods: {
        isShowBtn(){
            if (this.sendTypeArr.includes(4) || this.sendTypeArr.includes(5)) {
				if (this.isShowFace === true) {
					this.isShowSendBtn = true;
					this.chatInput = true;
				} else {
					this.isShowSendBtn = false;
					this.chatInput = false;
				}
			} else {
				this.isShowSendBtn = true;
				this.isShowSendBtn = true;
				this.chatInput = true;
			}
        },
		//是否弹出表情选择组件
		toggleFace() {
			this.isShowFace = !this.isShowFace;
            this.touchFlag = true;
			//修改聊天区域距离底部高度
			if (this.isShowFace === true) {
				this.$emit("set-height", 1.44 + 4.44);
			}else {
				this.$emit("set-height", 1.44);
			}
			console.log(this.isShowFile);
			
            this.isShowBtn()
			if (this.isShowFile === true) {
				this.isShowFile = false;
			}
			if (!this.isShowFace) {
				this.movePointToRight(this.$refs.editor);
			}
		},

		toggleFile() {
            // this.$refs.editor.trigger("focus");
            this.touchFlag = true;
			this.isShowFile = !this.isShowFile;
			//修改聊天区域距离底部高度
			if (this.isShowFile === true) {
				this.$emit("set-height", 1.44 + 2.98667);
			}else {
				this.$emit("set-height", 1.44);
			}
		},

		//选择表情
		onChooseFace(item) {
			this.prevFace.push(item.key);
			this.content += item.key;
			this.movePointToRight(this.$refs.editor);
		},

		//删除表情
		onDelete() {
			console.log(123);
			if (this.prevFace.length > 0) {
				this.content = this.content.replace(
					this.prevFace[this.prevFace.length - 1],
					""
				);
				this.prevFace.splice(-1, 1);
				this.movePointToRight(this.$refs.editor);
			}
		},

		send() {
			if (this.content) {
				this.$emit("send", this.content);
				this.content = "";
			}
			if (this.isShowFace == false) {
				this.$nextTick(() => {
					this.$refs.editor.focus(); //输入框默认获取焦点
				});
			}
		},

		chooseFile(file, localPath) {
			this.$emit("choose-file", file, localPath);
		},

		//移动光标到输入框末尾
		movePointToRight(obj) {
			if (window.getSelection) {
				//ie11 10 9 ff safari
				obj.focus(); //解决ff不获取焦点无法定位问题
				var range = window.getSelection(); //创建range
				range.selectAllChildren(obj); //range 选择obj下所有子内容
				range.collapseToEnd(); //光标移至最后
			} else if (document.selection) {
				//ie10 9 8 7 6 5
				var range = document.selection.createRange(); //创建选择对象
				//var range = document.body.createTextRange();
				range.moveToElementText(obj); //range定位到obj
				range.collapse(false); //光标移至最后
				range.select();
			}
		},
		keyBoard() {
			this.chatInput = false;
			this.isShowFile = false;
			this.isShowFace = false;
			this.$nextTick(() => {
				this.$refs.editor.focus(); //输入框默认获取焦点
				this.isShowSendBtn = true;
			});
		},
		keyBoardInput() {
			this.isShowFace = false;
			if (this.isShowSendBtn == false) {
				this.isShowSendBtn = true;
				console.log(this.isShowSendBtn);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.disabled-input {
	position: fixed;
	min-height: 1.30667rem;
	width: 100%;
	bottom: 0;
	z-index: 2;
	display: flex;
	align-items: center;

	p {
		font-size: px2rem(26);
		padding-left: px2rem(250);
		color: $label-color;
		margin-bottom: px2rem(8);
	}
}
.send-area {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	min-height: px2rem(98);
	background: $default-color;
	display: flex;
	padding: 0 px2rem(32);
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	&.faceShow {
		bottom: px2rem(333);
	}
	&.fileShow {
		bottom: px2rem(224);
	}
	.input {
		width: px2rem(510);
		min-height: px2rem(66);
		max-height: px2rem(200);
		overflow-y: auto;
		border-radius: px2rem(10);
		background: $default-bg-color;
		margin: px2rem(20) 0;
	}
	.face {
		flex: 1;
		text-align: center;
		i {
			font-size: px2rem(48);
			color: $text-color;
		}
	}
	.btn {
		flex: 1;
		text-align: center;
		button {
			width: px2rem(80);
			height: px2rem(60);
			line-height: px2rem(60);
			background: $primary-color;
			color: $default-color;
			font-size: px2rem(28);
			border-radius: px2rem(10);
			border: none;
			outline: none;
		}
		i {
			font-size: px2rem(48);
			color: $text-color;
		}
	}
}

.editor {
	width: 100%;
	border: none;
	background: $default-bg-color;
	padding: px2rem(20) px2rem(25);
	border-radius: px2rem(10);
	box-sizing: border-box;
}
</style>