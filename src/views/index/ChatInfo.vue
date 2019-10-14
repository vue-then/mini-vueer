<!--
 * @Description: 添加群聊
 * @Author: your name
 * @Date: 2019-10-01 13:12:21
 * @LastEditTime: 2019-10-07 12:48:47
 * @LastEditors: Please set LastEditors
 -->
<template>
	<div>
		<Header :title="type == 2?'群信息':'聊天室信息'"></Header>
		<div class="pk-chat-info">
			<div class="pk-chat-info-box">
				<div class="pk-chat-img">
					<img :src="info.logo" alt />
				</div>
				<div class="pk-chat-desc">
					<h4>
						{{info.name}}
						<span>({{info.memberNum}}人)</span>
					</h4>
					<p v-if="info.gameName">所属游戏：{{info.gameName}}</p>
					<p v-if="info.platformName">所属厂商：{{info.platformName}}</p>
					<p v-if="type == 2">ID：{{info.groupChatId}}</p>
					<p v-if="type == 1">等级限制：{{info.lowestLevelName}}级以上进入</p>
				</div>
			</div>
			<div class="pk-chat-member" v-show="memberList.length > 0">
				<ul>
					<li v-for="(item,index) in memberList" :key="index" @click="toUserInfo(item)">
						<img
							src="@/assets/img/game-icon/yxdt_lts.png"
							alt
							v-if="item.adminWordsPerm == 1 || item.adminWordsPerm == 3"
							class="pk-chat-icon"
						/>
						<img :src="item.memberLogo" alt class="pk-info-img" v-if="item.memberLogo" />
						<img src="@/assets/img/chat-icon/avatar.png" alt class="pk-info-img" v-if="!item.memberLogo" />
						<p class="pk-info-nickname">{{item.nickName}}</p>
						<div
							class="pk-member-online"
							v-if="item.is_online"
							:class="item.is_online == 1 ?'pk-online':''"
						></div>
						<div>
							<p v-if="item.accountType == 1" class="pk-info-administrator">管理员</p>
							<img :src="item.memberLevelLogo" alt v-if="item.accountType == 2" class="level-img" />
						</div>
					</li>
				</ul>
				<div
					class="pk-member-more"
					v-if="allMemberLen.length > 15"
					@click="isShowMore = !isShowMore"
				>{{isShowMore?"收起":"查看全部玩家"}}</div>
			</div>
			<div class="pk-chat-announcement">
				<h3>群公告</h3>
				<p>{{info.groupNotice}}</p>
			</div>
			<div class="pk-chat-btns" v-if="isExisted == 1">
				<div class="pk-chat-jion">进入群聊</div>
			</div>
			<div class="pk-chat-btns" v-if="isExisted == 2">
				<div class="pk-chat-jion" @click.stop="addChat()">加入群聊</div>
			</div>
			<!-- <div class="pk-chat-btns pk-chat-btns-in" v-if="!isExisted">
                <div class="pk-chat-jion" @click.stop="addChat()">删除聊天消息</div>
			</div>-->
			<div class="pk-chat-btns pk-chat-btns-in" v-if="!isExisted && type != 1">
				<div class="pk-chat-jion" @click.stop="outChatFunc()">退出群聊</div>
			</div>
		</div>
	</div>
</template>
<script>
import Header from "@/components/Header";
import MSG_TYPE from "@/services/im/constant";

import {
	getChatInfo,
	getMemberList,
	getApplication,
	outGroup
} from "@/services/im/chat";
import Bus from "@/services/im/bus";
import IM from "@/services/im/connect";

export default {
	components: {
		Header
	},
	name: "index",
	data() {
		return {
			id: this.$route.query.id * 1,
			isExisted: this.$route.query.isExisted * 1,
			type: this.$route.query.type * 1, //1 聊天室 2 群聊
			info: {},
			allMemberLen: [],
			isShowMore: false,
			memberList: []
		};
	},
	mounted() {
		if (this.type == 1) {
			this.getChatMemberInfo();
			this.info =
				JSON.parse(
					decodeURIComponent(sessionStorage.getItem("chatInfo"))
				) || {};
		} else {
			this.getInfo();
		}

		IM();
		Bus.$on("IM", data => {
			console.log("chatInfo-接受消息", data);
			//通知类型
			if (data.msgType === MSG_TYPE.IM_MSG_TYPE_NOTIFICSTION) {
				this.dealWithNoticeMsg(data);
			}
		});
	},
	watch: {
		isShowMore(newVal) {
			this.memberList = newVal
				? this.allMemberLen
				: this.allMemberLen.slice(0, 15);
		}
	},
	methods: {
		//通知类型
		dealWithNoticeMsg(data) {
			let msg = JSON.parse(data.msg);
			switch (msg.noticeType) {
				case MSG_TYPE.IM_NOTICE_MESS_TYPE_CROUP_UPDATE_INFO: // 群信息修改
					if (this.id === data.roomId) {
						this.title = msg.groupName;
						this.info.name = msg.groupName;
						this.info.groupNotice = msg.notice;
					}
					break;
			}
		},
		/**
		 * @description: 获取群聊详情
		 * @param {type}
		 * @return:
		 */
		async getInfo() {
			let data = {
				roomId: this.id * 1
			};
			let res = await getChatInfo(data);
			if (res.success) {
				this.info = res.data;
				if (this.type != 1) {
					this.allMemberLen = res.data.memberInfo;
					if (res.data.memberInfo.length > 15) {
						this.memberList = res.data.memberInfo.slice(0, 15);
					} else {
						this.memberList = res.data.memberInfo;
					}
					console.log(this.info.memberInfo, this.memberList);
				}
			}
		},
		/**
		 * @description: 获取聊天室详情
		 * @param {type}
		 * @return:
		 */
		async getChatMemberInfo() {
			let data = {
				id: this.id * 1
			};
			let res = await getMemberList(data);
			if (res.success) {
				let administratorArr = res.data.administrator || [];
				let activeMembers = res.data.activeMembers || [];
				administratorArr.map(item => {
					item.adminWordsPerm = 1;
					item.memberId = item.id;
					item.accountType = 1;
					item.memberLogo = item.photo;
				});
				activeMembers.map(item => {
					item.accountType = 2;
					item.memberLevelLogo = item.levelLogo;
				});
				let arr = administratorArr.concat(activeMembers);
				this.allMemberLen = arr;
				if (arr.length > 15) {
					this.memberList = arr.slice(0, 15);
				} else {
					this.memberList = arr;
				}
				console.log(this.info.memberInfo, this.memberList);
			}
		},
		/**
		 * @description: 查看用户详情
		 * @param {obj}  item: 当前选择用户对象
		 * @return:
		 */
		async toUserInfo(item) {
			let type = item.accountType == 1 ? 2 : 1;
			this.$router.push({
				name: "focusInfo",
				query: { focusMemberId: item.memberId, focusType: type }
			});
		},
		/**
		 * @description:
		 * @param {obj} 想要加入的群聊
		 * @return:
		 */
		async addChat() {
			let data = {
				roomId: this.id * 1
			};

			let res = await getApplication(data);
			if (res.success) {
				this.$dialog({
					title: "温馨提示",
					content: "您的申请已发出，请耐心等待。",
					noCancelBtn: true,
					onOkBtn(event) {
						this.close(); //关闭对话框
					}
				});
				this.$(".nut-dialog-btn").removeClass("nut-dialog-ok");
			} else {
				this.$dialog({
					title: "温馨提示",
					content: res.message,
					noCancelBtn: true,
					onOkBtn(event) {
						this.close(); //关闭对话框
					}
				});
				this.$(".nut-dialog-btn").removeClass("nut-dialog-ok");
			}
		},
		/**
		 * @description: 退出群聊
		 * @return:
		 */

		outChatFunc() {
			let _this = this;
			this.$dialog({
				id: "open_cleancache",
				title: "温馨提示",
				content: "确定要退出当前群聊？",
				onOkBtn() {
					let data = {
						roomId: _this.id * 1
					};
					outGroup(data).then(res => {
						if (res.success) {
							_this.$router.push({
								name: "index"
							});
							this.close(); //关闭对话框
						} else {
							_this.$dialog({
								title: "温馨提示",
								content: res.message,
								noCancelBtn: true,
								onOkBtn(event) {
									this.close(); //关闭对话框
								}
							});
						}
					});
				}
			});
			this.$(".nut-dialog-btn").removeClass("nut-dialog-ok");
			this.$("#open_cleancache .nut-dialog-btn")
				.eq(0)
				.css({
					color: "#999"
				});
			this.$("#open_cleancache .nut-dialog-btn")
				.eq(1)
				.css({
					"border-top": "1px solid #F6F6F6",
					"border-left": "1px solid #F6F6F6",
					color: "#17c492"
				});
		}
	}
};
</script>
<style scoped lang="scss">
.pk-chat-info {
	.pk-chat-info-box {
		padding: px2rem(22) px2rem(32);
		box-sizing: border-box;
		background: $default-color;
		display: flex;
		.pk-chat-img {
			width: px2rem(96);
			height: px2rem(96);
			img {
				width: 100%;
				height: 100%;
			}
		}
		.pk-chat-desc {
			margin-left: px2rem(25);
			line-height: 1;
			h4 {
				margin-bottom: px2rem(25);
				font-size: px2rem(28);
				color: $tip-color;
				span {
					font-size: px2rem(24);
					color: $label-color;
				}
			}
			p {
				margin-bottom: px2rem(23);
				font-size: px2rem(24);
				color: $label-color;
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}
	.pk-chat-member {
		border-top: px2rem(24) solid $forminput-color;
		padding: px2rem(20) px2rem(15);
		box-sizing: border-box;
		background: $default-color;
		ul {
			li {
				position: relative;
				margin-bottom: px2rem(32);
				padding: 0 px2rem(18);
				display: inline-block;
				vertical-align: middle;
				width: px2rem(105);
				text-align: center;
				line-height: 1;
				.pk-info-img {
					width: px2rem(80);
					height: px2rem(80);
					border-radius: 50%;
				}
				.pk-info-nickname {
					margin-top: px2rem(16);
					width: 100%;
					height: px2rem(24);
					overflow: hidden;
					word-break: keep-all;
					text-overflow: ellipsis;
				}
				.level-img {
					margin-top: px2rem(10);
					width: px2rem(60);
					height: px2rem(24);
				}
				.pk-info-administrator {
					padding: px2rem(4) 0;
					margin-top: px2rem(10);
					background-color: $primary-color;
					border-radius: px2rem(4);
					font-size: px2rem(18);
					color: $default-color;
				}
				.pk-chat-icon {
					position: absolute;
					right: px2rem(10);
					top: 0;
					width: px2rem(24);
					height: px2rem(24);
				}
				.pk-member-online {
					position: absolute;
					right: px2rem(24);
					bottom: px2rem(84);
					width: px2rem(24);
					height: px2rem(24);
					border: solid px2rem(4) $default-color;
					background-color: $label-color;
					border-radius: 50%;
					&.pk-online {
						background-color: $pk-online;
					}
				}
			}
		}
		.pk-member-more {
			text-align: center;
			font-size: px2rem(28);
			color: $label-color;
		}
	}
	.pk-chat-announcement {
		border-top: px2rem(24) solid $forminput-color;
		padding: px2rem(32);
		box-sizing: border-box;
		background: $default-color;
		h3 {
			margin-bottom: px2rem(23);
			font-size: px2rem(28);
			color: $tip-color;
			line-height: 1;
		}
		p {
			font-size: px2rem(24);
			color: $label-color;
		}
	}
	.pk-chat-btns {
		.pk-chat-jion {
			width: 100%;
			height: px2rem(88);
			text-align: center;
			line-height: px2rem(88);
			font-size: px2rem(28);
			font-weight: bold;
			color: $primary-color;
			background: $default-color;
			border-top: px2rem(24) solid $forminput-color;
		}
	}
	.pk-chat-btns-in {
		.pk-chat-jion {
			color: $chat-admin-name;
		}
		&:last-child {
			border-bottom: px2rem(24) solid $forminput-color;
		}
	}
}
</style>