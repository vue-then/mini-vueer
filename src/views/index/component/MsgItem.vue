<template>
	<!-- 消息列表-item -->
	<div>
		<div v-if="isMsg" class="msg-item" :class="{'mine':msgObj.isMine === MSG_TYPE.IS_MINE}">
			<div class="avatar">
				<img :src="msgObj.avatar?msgObj.avatar:MSG_TYPE.DEFAULT_AVATAR" alt />
			</div>
			<div class="msg-item-body">
				<div v-if="msgObj.isMine === MSG_TYPE.NO_MINE" class="nickname">
					<i v-show="msgObj.isAdmin === MSG_TYPE.IS_ADMIN" class="manager">管理员</i>
					<span>{{msgObj.nickName}}</span>
					<i v-show="msgObj.isAdmin === MSG_TYPE.NO_ADMIN" class="vip">
						<img :src="msgObj.senderLevelPhoto?msgObj.senderLevelPhoto:msgObj.senderLevelTag" />
					</i>
				</div>

				<!-- 文本 + 表情 -->
				<div v-if="msgObj.msgType === MSG_TYPE.IM_MSG_TYPE_TEXT" class="msg-text">
					<div class="status" v-show="msgObj.status === MSG_TYPE.SEND_MSG_STATUS_LOADING">
						<div class="ball-clip-rotate">
							<div></div>
						</div>
					</div>
					<div class="status fail" v-show="msgObj.status === MSG_TYPE.SEND_MSG_STATUS_FAIL">
						<i class="iconfont iconicon_infofailed"></i>
					</div>
					<span v-html="msgObj.message"></span>
				</div>

				<!-- 图片 -->
				<div
					@click="onClickMsg(msgObj.msgType)"
					v-if="msgObj.msgType === MSG_TYPE.IM_MSG_TYPE_PICTURE"
					class="msg-picture"
				>
					<div class="status" v-show="msgObj.status === MSG_TYPE.SEND_MSG_STATUS_LOADING">
						<div class="k-ring-1 k-loadingF-1"></div>
					</div>
					<div class="status fail" v-show="msgObj.status === MSG_TYPE.SEND_MSG_STATUS_FAIL">
						<i class="iconfont iconicon_infofailed"></i>
					</div>
					<img
						v-if="!isUpdate"
						:style="{
                        width:msgObj.msg.littlePicSizeWidth+'px',
                        height:msgObj.msg.littlePicSizeHeight+'px'
                    }"
						:src="msgObj.isLocal?msgObj.msg.littlePicUrl:BASE_URL + msgObj.msg.littlePicUrl"
					/>
					<img
						v-if="isUpdate"
						:style="{
                        width:msgObj.msg.littlePicSizeWidth+'px',
                        height:msgObj.msg.littlePicSizeHeight+'px'
                    }"
						v-gallery:group1
						:src="msgObj.isLocal?msgObj.msg.littlePicUrl:BASE_URL + msgObj.msg.littlePicUrl"
						:data-large="msgObj.isLocal?msgObj.msg.picUrl:BASE_URL + msgObj.msg.picUrl"
					/>
				</div>

				<!-- 视频 -->
				<div v-if="msgObj.msgType === MSG_TYPE.IM_MSG_TYPE_VIDEO" class="msg-video">
					<div class="status" v-show="msgObj.status === MSG_TYPE.SEND_MSG_STATUS_LOADING">
						<div class="k-ring-1 k-loadingF-1"></div>
					</div>
					<div class="status fail" v-show="msgObj.status === MSG_TYPE.SEND_MSG_STATUS_FAIL">
						<i class="iconfont iconicon_infofailed"></i>
					</div>
					<img
						:style="{
                        width:msgObj.msg.littlePicSizeWidth+'px',
                        height:msgObj.msg.littlePicSizeHeight+'px'
                    }"
						:src="msgObj.isLocal?msgObj.msg.littlePicUrl:BASE_URL + msgObj.msg.littlePicUrl"
					/>
					<span
						@click="onClickMsg(msgObj.msgType)"
						v-show="msgObj.status !== MSG_TYPE.SEND_MSG_STATUS_LOADING "
						class="iconfont iconicon_play"
					></span>
					<div class="duration">{{msgObj.msg.size}}</div>
				</div>

				<!-- 红包 isGet-已经领取了就加class 给msg-redBag 目前后端没给状态加以区分-->
				<div
					v-if="msgObj.msgType === MSG_TYPE.IM_MSG_TYPE_RED"
					class="msg-redBag"
					:class="{isGet:msgObj.isGet}"
					@click="onClickMsg(msgObj.msgType)"
				>
					<div class="msg-red-top">
						<img class="yes" src="@/assets/img/im/icon_info_chat_redbagsmall@2x.png" alt />
						<img class="no" src="@/assets/img/im/icon_info_chat_redbagsmallO@2x.png" alt />
						<span class="text-dots">{{msgObj.msg.remark}}</span>
					</div>
					<div class="msg-red-bottom">IM红包</div>
				</div>

				<!-- 跟投 -->
				<div v-if="msgObj.msgType === MSG_TYPE.IM_MSG_TYPE_BET" class="msg-flow">
					<h1>
						<span>{{msgObj.msg.fcName}}</span>
					</h1>
					<h2>
						{{msgObj.msg.playName}}
						<span>{{msgObj.msg.contentName}}</span>
					</h2>
					<p>期号：{{msgObj.msg.period}}</p>
					<button @click="onClickMsg(msgObj.msgType)" class="btn">跟投</button>
				</div>

				<!-- 跟单 -->
				<div v-if="msgObj.msgType === MSG_TYPE.IM_MSG_TYPE_FOLLOW" class="msg-flow">
					<h1>
						投注内容：
						<span>{{msgObj.msg.contentName}}</span>
					</h1>
					<h1>
						投注金额：
						<span>{{msgObj.msg.bet | currency('',2)}}</span>
					</h1>

					<p>期号：{{msgObj.msg.period}}</p>
					<button @click="onClickMsg(msgObj.msgType)" class="btn">跟单</button>
				</div>
			</div>
		</div>
		<NoticeItem v-if="msgObj && !isMsg" :item="msgObj" />
	</div>
</template>
<script>
import MSG_TYPE, { translateHTML } from "@/services/im/constant";
import NoticeItem from "@/views/index/component/NoticeItem";

export default {
	props: ["item"],
	components: {
		NoticeItem
	},
	data() {
		return {
			MSG_TYPE,
			BASE_URL: MSG_TYPE.BASE_URL,
			msgObj: {},
			isUpdate: false,
			isMsg: true //true = 消息 false=通知
		};
	},
	watch: {
		item: {
			handler(newVal, oldVal) {
				//非删除消息-才变化
				if (
					newVal.msg.noticeType !=
					this.MSG_TYPE.IM_NOTICE_MESS_TYPE_DEL
				) {
					this.setItem(newVal);
				}

				// let msg_json = JSON.parse(newVal.msg);
				// this.msgObj = {
				// 	...newVal,
				// 	msg: msg_json,
				// 	isMine:
				// 		localStorage.getItem("userId") == newVal.mid
				// 			? MSG_TYPE.IS_MINE
				// 			: MSG_TYPE.NO_MINE,
				// 	nickName: newVal.senderName,
				// 	message: translateHTML(msg_json.message),
				// 	avatar: newVal.senderHead
				// };
			},
			deep: true
		}
	},
	mounted() {
		console.log("MsgItem", this.item);
		this.setItem(this.item);
		//是否是消息类型
		this.isMsg = this.MSG_TYPE.SEND_MSG_TYPE_ARRAY.includes(
			this.item.msgType
		);
	},
	beforeUpdate() {
		//用于触发-上传图片后替换图片地址时预览不更新问题
		if (
			!this.item.status ||
			this.item.status === this.MSG_TYPE.SEND_MSG_STATUS_SUCCESS
		) {
			this.isUpdate = true;
		}
	},
	methods: {
		onClickMsg(msgType) {
			//播放视频-新开页面
			if (msgType === this.MSG_TYPE.IM_MSG_TYPE_VIDEO) {
				this.$router.push({
					name: "videoPlay",
					query: {
						...this.msgObj.msg
					}
				});
			} else {
				this.$emit("handle-click", msgType, this.msgObj);
			}
		},
		setItem(item) {
			let msg_json = JSON.parse(item.msg);
			// msgType 已有了
			// isAdmin 已有了
			this.msgObj = {
				...item,
				msg: msg_json,
				isMine:
					localStorage.getItem("userId") == item.mid
						? MSG_TYPE.IS_MINE
						: MSG_TYPE.NO_MINE,
				nickName: item.senderName,
				message: translateHTML(msg_json.message),
				avatar: item.senderHead
			};
		}
	}
};
</script>
<style lang="scss" scoped>
.msg-item {
	display: flex;
	padding-top: px2rem(24);
	margin-bottom: px2rem(40);
	.status {
		display: none;
	}
	.avatar {
		width: px2rem(80);
		height: px2rem(124);
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: px2rem(80);
			height: px2rem(80);
			display: block;
			border-radius: 50%;
		}
	}
	.msg-item-body {
		margin-left: px2rem(16);
		.nickname {
			font-size: px2rem(24);
			color: $label-color;
			margin-bottom: px2rem(8);
			.manager {
				font-size: px2rem(18);
				color: $default-color;
				background: $primary-color;
				font-style: normal;
				padding: 0 px2rem(4);
				border-radius: px2rem(4);
				margin-right: px2rem(10);
			}
			span {
				font-size: px2rem(24);
				color: $label-color;
			}
			.vip {
				margin-left: px2rem(8);
				vertical-align: middle;
				img {
					width: px2rem(60);
					height: px2rem(24);
				}
			}
		}
		// 文本+表情
		.msg-text {
			background: $default-color;
			padding: px2rem(24) px2rem(42) px2rem(24) px2rem(24);
			margin-top: px2rem(8);
			border-radius: px2rem(20);
			position: relative;
			display: inline-block;
			&::before {
				position: absolute;
				left: px2rem(-10);
				top: px2rem(36);
				content: "";
				width: px2rem(20);
				height: px2rem(20);
				background: $default-color;
				border-radius: px2rem(4);
				display: block;
				transform: rotate(45deg);
			}
			span {
				font-size: px2rem(28);
				color: $text-color;
				word-break: break-all;
				word-wrap: break-word;
				white-space: pre-wrap;
				/deep/ img {
					width: px2rem(44);
					vertical-align: middle;
				}
			}
		}
		// 图片
		.msg-picture {
			margin-top: px2rem(20);
			max-width: px2rem(320);
			max-height: px2rem(400);
			position: relative;
			img {
				max-width: px2rem(320);
				max-height: px2rem(400);
				vertical-align: middle;
				border-radius: px2rem(10);
			}
		}
		// 视频
		.msg-video {
			margin-top: px2rem(20);
			max-width: px2rem(320);
			max-height: px2rem(400);
			position: relative;
			img {
				max-width: px2rem(320);
				max-height: px2rem(400);
				vertical-align: middle;
				border-radius: px2rem(10);
			}
			.iconicon_play {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: $default-color;
				font-size: px2rem(40);
				border-radius: 50%;
				padding: px2rem(20) px2rem(20) px2rem(20) px2rem(24);
				background: rgba(0, 0, 0, 0.4);
				box-sizing: border-box;
			}
			.duration {
				font-style: px2rem(24);
				color: $default-color;
				position: absolute;
				bottom: px2rem(8);
				text-align: right;
				width: 100%;
				right: px2rem(8);
			}
		}

		// 红包
		.msg-redBag {
			width: px2rem(450);
			position: relative;
			&.isGet {
				opacity: 0.3;
				.msg-red-top {
					img.no {
						display: block;
					}
					img.yes {
						display: none;
					}
				}
			}
			&::before {
				position: absolute;
				left: px2rem(-10);
				top: px2rem(36);
				content: "";
				width: px2rem(20);
				height: px2rem(20);
				background: #eda150;
				border-radius: px2rem(4);
				display: block;
				transform: rotate(45deg);
			}
			.msg-red-top {
				border-radius: px2rem(10) px2rem(10) 0 0;
				background-color: #eda150;
				padding: px2rem(22) px2rem(22) px2rem(22) px2rem(25);
				display: flex;
				align-items: center;
				img {
					width: px2rem(60);
					height: px2rem(72);
					vertical-align: middle;
					margin-right: px2rem(25);
					&.no {
						display: none;
					}
					u.yes {
						display: block;
					}
				}
				span {
					color: $default-color;
					font-size: px2rem(28);
					display: inline-block;
					flex: 1;
				}
			}
			.msg-red-bottom {
				line-height: px2rem(44);
				background: $default-color;
				padding-left: px2rem(22);
				color: $label-color;
				border-radius: 0 0 px2rem(10) px2rem(10);
			}
		}

		//跟投
		.msg-flow {
			padding: px2rem(24) px2rem(24) px2rem(24) px2rem(35);
			background: $default-color;
			border-radius: px2rem(10);
			position: relative;
			width: px2rem(450);
			box-sizing: border-box;
			&::before {
				position: absolute;
				left: px2rem(-10);
				top: px2rem(36);
				content: "";
				width: px2rem(20);
				height: px2rem(20);
				background: $default-color;
				border-radius: px2rem(4);
				display: block;
				transform: rotate(45deg);
			}
			h1 {
				font-size: px2rem(24);
				span {
					color: $color-w;
					font-size: px2rem(24);
				}
				margin-bottom: px2rem(16);
			}
			h2 {
				font-size: px2rem(24);
				color: $tip-color;
				margin: px2rem(16) 0;
				span {
					display: inline-block;
					padding: 0 px2rem(5);
					background: $primary-color;
					color: $default-color;
					border-radius: px2rem(6);
				}
			}
			p {
				font-size: px2rem(20);
				color: $label-color;
			}
			.btn {
				position: absolute;
				top: px2rem(24);
				right: px2rem(24);
				width: px2rem(88);
				height: px2rem(48);
				line-height: px2rem(48);
				text-align: center;
				background-image: linear-gradient(
						-25deg,
						#ff5500 0%,
						#ffb726 100%
					),
					linear-gradient(#e2e2e2, #e2e2e2);
				background-blend-mode: normal, normal;
				box-shadow: 0px 3px 6px 0px rgba(240, 110, 0, 0.3);
				border-radius: px2rem(8);
				color: $default-color;
				border: none;
				outline: none;
			}
		}
	}
}
.mine {
	flex-direction: row-reverse;
	// align-items: center;
	.status {
		display: block;
	}
	.msg-item-body {
		margin-left: 0;
		margin-right: px2rem(24);
		max-width: px2rem(500);
		.nickname {
			display: none;
		}
		.msg-text {
			background: $primary-color;
			margin-top: px2rem(20);
			position: relative;
			p {
				color: $default-color;
			}
			span {
				color: $default-color;
			}
			&::before {
				left: auto;
				right: px2rem(-10);
				background: $primary-color;
			}
		}
	}
}

.status {
	position: absolute;
	left: px2rem(-56);
	top: 50%;
	transform: translateY(-50%);
}
.fail {
	i {
		color: #ffb445;
		font-size: px2rem(30);
	}
	left: px2rem(-40);
}

.ball-clip-rotate > div {
	background-color: #fff;
	border-radius: 100%;
	margin: px2rem(4);
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
	border: px2rem(4) solid $label-color;
	border-bottom-color: transparent;
	height: px2rem(24);
	width: px2rem(24);
	background: transparent !important;
	display: inline-block;
	-webkit-animation: rotate 0.75s 0s linear infinite;
	animation: rotate 0.75s 0s linear infinite;
}
</style>