<template>
	<!-- 通知列表-item -->
	<div class="notice-item">
		<!-- 进入聊天室房间 上线通知 2-->
		<div class="notice-msg" v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_ONLINE">
			<p>
				会员
				<span>{{noticeMsg.senderName}}</span>进入房间
			</p>
		</div>

		<!-- 退出聊天室房间 下线通知 3-->
		<div class="notice-msg" v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_OFFLINE">
			<p>
				会员
				<span>{{noticeMsg.senderName}}</span>退出房间
			</p>
		</div>

		<!-- 禁言 4-->
		<div class="notice-msg" v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_FORBIDDEN">
			<p>
				会员
				<span>{{noticeMsg.redReceiver}}</span>
				被管理员禁言{{noticeMsg.times}}分钟
			</p>
		</div>

		<!-- 解除禁言 6-->
		<div class="notice-msg" v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_RELEASE">
			<p>
				会员
				<span>{{noticeMsg.redReceiver}}</span>已解除禁言
			</p>
		</div>

		<!-- 领取红包 7-->
		<div class="notice-msg" v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_RED">
			<p v-if="noticeMsg.isMine === MSG_TYPE.IS_MINE">
				<img src="@/assets/img/im/icon_info_chat_redbagsmall_small@2x.png" alt />
				<span>你</span>领取了
				<span>{{noticeMsg.redSender}}</span>的红包
			</p>
			<p v-else>
				<img src="@/assets/img/im/icon_info_chat_redbagsmall_small@2x.png" alt />
				会员
				<span>{{noticeMsg.redReceiver}}</span>领取了
				<span>{{noticeMsg.redSender}}</span>的红包
			</p>
		</div>

		<!-- [我爱学习，我高兴]被管理员移出了群聊 9-->
		<div v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_KICK" class="notice-msg">
			<p>{{noticeMsg.content}}</p>
		</div>

		<!-- 全体取消，发起禁言 10-->
		<div
			class="notice-msg"
			v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_FORBIDDEN_GROUP"
		>
			<p>
				管理员
				<!-- isForbidden 1=解除禁言 2=发起禁言 -->
				<span>{{noticeMsg.senderName}}</span>
				{{noticeMsg.isForbidden === 2?'发起':'取消'}}全体禁言
			</p>
		</div>

		<!-- 你已被管理员移出分分中赚一百万群 11-->
		<div v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_HAS_BEEN_KICK" class="notice-msg">
			<p>{{noticeMsg.content}}</p>
		</div>

		<!-- 退出群聊 12-->
		<div v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_OUT_GROUP" class="notice-msg">
			<p>
				会员
				<span>{{noticeMsg.senderName}}</span> 退出了群聊
			</p>
		</div>

		<!-- 其他会员入群通知 17 -->
		<div
			v-if="noticeMsg.noticeType === MSG_TYPE.IM_NOTICE_MESS_TYPE_JOIN_CROUP_NOTICE"
			class="notice-msg"
		>
			<p>
				{{noticeMsg.remark}}
				<!-- js114邀请 js127 入群 -->
			</p>
		</div>

		<!-- 
         <div class="notice-msg">
			<p>
				管理员<span>王德发爱吃菠菜</span>将会员<span>abc</span>踢出该群
			</p>
		</div>

       

       

        <div class="notice-msg">
			<p>
				会员<span>abc</span>退出该群
			</p>
		</div>-->
	</div>
</template>
<script>
import MSG_TYPE from "@/services/im/constant";
export default {
	props: ["item"],
	data() {
		return {
			MSG_TYPE,
			noticeMsg: {}
		};
	},
	mounted() {
		if (this.item.msg && this.item.msg.noticeType) {
			this.noticeMsg = {
				...this.item,
				...this.item.msg
			};
			console.log("NoticeItem--", this.noticeMsg);
		}
	}
};
</script>
<style lang="scss" scoped>
.notice-item {
	.notice-msg {
		display: flex;
		justify-content: center;
		margin: px2rem(24) 0;

		p {
			padding: px2rem(6) px2rem(18);
			color: $tip-color;
			background: $default-color;
			display: inline;
			font-size: px2rem(24);
			display: inline;
			border-radius: px2rem(8);
			img {
				width: px2rem(26);
				height: px2rem(30);
				vertical-align: middle;
				margin-right: px2rem(16);
			}
			span {
				color: #ffb726;
				font-size: px2rem(24);
			}
		}
	}
}
</style>