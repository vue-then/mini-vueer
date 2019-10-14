<template>
	<div class="selfDetail">
		<Header title="自助优惠申请"></Header>

		<div v-show="loading" class="skeleton">
			<div class="skeleton-bac-animation"></div>
			<skeleton-square width="9rem" height="3rem" margin="0.2rem 0.5rem"></skeleton-square>
			<column>
				<skeleton-square width="9rem" :count="3" margin="0.2rem 0.5rem"></skeleton-square>
			</column>
			<skeleton-square width="2rem" margin="0.4rem 0.5rem 0.2rem"></skeleton-square>
			<skeleton-square width="9rem" height="0.8rem" margin="0.2rem 0.5rem"></skeleton-square>
			<skeleton-square width="2rem" margin="0.4rem 0.5rem 0.2rem"></skeleton-square>
			<skeleton-square width="9rem" height="1.8rem" margin="0.2rem 0.5rem"></skeleton-square>
			<skeleton-square width="2rem" margin="0.4rem 0.5rem 0.2rem"></skeleton-square>
			<row padding="0.4rem 0.5rem 0.2rem">
				<skeleton-square width="7rem" height="0.5rem" margin="0 0.5rem 0 0"></skeleton-square>
				<skeleton-square width="1.5rem" height="0.5rem"></skeleton-square>
			</row>
			<skeleton-square width="8rem" height="0.8rem" margin="0.4rem 1rem 0"></skeleton-square>
			<skeleton-square width="8rem" height="0.8rem" margin="0.3rem 1rem"></skeleton-square>
		</div>

		<div class="self-content" v-show="!loading">
			<div class="self-img">
				<img :src="info.wapImg" />
			</div>
			<div class="self-info">
				<div class="self-title">
					<h2 @click="showProContent = !showProContent">
						<span>{{info.proTitle}}</span>
						<i class="iconfont iconicon_mine_rmore" :class="{'show':showProContent}" v-if="info.proContent"></i>
					</h2>
				</div>
				<div class="selfdetail-content" v-html="info.proContent" v-show="showProContent"></div>
			</div>

			<div class="apply-from">
				<div class="apply-input pk-1px-b">
					<div class="title must">申请金额</div>
					<div class="input">
						<input
							onkeypress="if((event.keyCode&lt;48 || event.keyCode&gt;57) &amp;&amp; event.keyCode!=46 || /\.\d\d$/.test(value))event.returnValue=false"
							name="money"
							autocomplete="off"
							v-model="depositMoney"
							type="tel"
							placeholder="请输入申请金额"
						/>
					</div>
					<div>元</div>
				</div>
				<div class="apply-input apply-because">
					<div class="title must">申请理由</div>
					<div class="input">
						<textarea
							name="reason"
							rows="5"
							@input="inputReason"
							:maxlength="max"
							placeholder="请输入申请理由"
							v-model="reason"
						></textarea>
					</div>
				</div>
				<div class="apply-input pk-1px-t">
					<div class="title must">验证码</div>
					<div class="apply-code">
						<div class="input-code">
							<input
								onkeyup="value=value.replace(/\D/g,'')"
								name="captcha"
								autocomplete="off"
								v-model="code"
								maxlength="4"
								type="tel"
								placeholder="请输入验证码"
							/>
						</div>
						<div class="input-code-img">
							<img :src="codeImg" @click="getCode" />
						</div>
					</div>
				</div>
			</div>
			<div class="self-btn">
				<div class="input" @click="apply">
					<span>点击申请</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getSelflist, getSelfCode, getSelfApply } from "@/services/center";
import Header from "@/components/Header";

export default {
	name: "selfDetail",
	components: {
		Header
	},
	data() {
		return {
			loading: true,
			id: this.$route.query.id,
			info: {},
			codeImg: "",
			codeId: "",
			depositMoney: "",
			code: "",
			reason: "",
			max: 255,
			current: 0,
			showProContent: false
		};
	},
	mounted() {
		this.getInfo();
		this.getCode();
	},
	methods: {
		getInfo() {
			getSelflist().then(res => {
				if (res.success) {
					this.loading = false;
					res.data.map(v => {
						if (this.id == v.id) {
							this.info = v;
						}
					});
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		getCode() {
			getSelfCode().then(res => {
				if (res.success) {
					this.codeImg = "data:image/png;base64," + res.data.code;
					this.codeId = res.data.id;
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		apply() {
			let _this = this;
			let data = {
				activityId: parseInt(this.id),
				depositMoney: parseFloat(this.depositMoney),
				remark: this.reason,
				code: this.code,
				codeId: this.codeId
			};
			//验证空
			if (data.depositMoney == "") {
				this.$toast.text("申请金额不能为空", {
					cover: true,
					duration: 1000
				});
				return false;
			}
			if (data.remark == "") {
				this.$toast.text("申请理由不能为空", {
					cover: true,
					duration: 1000
				});
				return false;
			}
			if (data.code == "") {
				this.$toast.text("验证码不能为空", {
					cover: true,
					duration: 1000
				});
				return false;
			}
			//
			if (!/^\d{1,8}(\.\d{1,2})?$/.test(data.depositMoney)) {
				this.$toast.text("金额为0.00-99999999.99", {
					cover: true,
					duration: 1000
				});
				return false;
			} else if (!/^\d+$/.test(data.code)) {
				this.$toast.text("验证码输入有误", {
					cover: true,
					duration: 1000
				});
				return false;
			}
			getSelfApply(data).then(res => {
				if (res.success) {
					if (res.data.apply === 2 && res.data.undone === 1) {
						this.$dialog({
							id: "dialog_back", //如果希望同时弹出多个Dialog，请给不同的Dialog设置不同的id。
							lockBgScroll: true,
							closeOnClickModal: false, //点击蒙层是否关闭对话框 默认true
							closeBtn: true, //是否显示右上角关闭按钮 默认 false
							textAlign: "left", //content 对齐方式，默认'center',这里根据新版设计稿需要给'left'
							title: "申请失败",
							content: "您已申请过该活动，是否查看您的申请记录？",
							customClass: "pk-dialog",
							onOkBtn() {
								this.close(); //关闭对话框
								_this.$router.push({
									name: "selfmore"
								});
							}
						});
						return false;
					} else if (res.data.apply === 2 && res.data.undone === 2) {
						this.$dialog({
							id: "dialog_back", //如果希望同时弹出多个Dialog，请给不同的Dialog设置不同的id。
							lockBgScroll: true,
							closeOnClickModal: false, //点击蒙层是否关闭对话框 默认true
							closeBtn: true, //是否显示右上角关闭按钮 默认 false
							textAlign: "left", //content 对齐方式，默认'center',这里根据新版设计稿需要给'left'
							title: "申请失败",
							content: "是否查看您的申请记录？",
							customClass: "pk-dialog",
							onOkBtn() {
								this.close(); //关闭对话框
								_this.$router.push({
									name: "selfmore"
								});
							}
						});
						return false;
					}
					this.$toast.text("申请成功", {
						cover: true,
						duration: 1000
					});
					this.$router.push({
						name: "selfmore"
					});
				} else {
					this.$toast.text(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
		},
		inputReason() {
			this.current = this.max - this.reason.length;
		}
	}
};
</script>

<style lang="scss" scoped>
.selfDetail {
	.skeleton {
		background-color: $default-color;
	}
	.self-content {
		.self-img {
			width: 100%;
			height: px2rem(300);
			img {
				width: 100%;
				height: 100%;
			}
		}
		.self-info {
			padding-top: px2rem(30);
			padding-bottom: px2rem(30);
			background: $default-color;
			.self-title {
				h2 {
					position: relative;
					padding-left: px2rem(54);
					font-size: px2rem(34);
					color: $text-color !important;
					i {
						font-size: px2rem(24);
						float: right;
						margin-right: px2rem(30);
						transform: rotate(90deg);
						transition: all 0.2s;
						&.show {
							transform: rotate(270deg);
						}
					}
					&:before {
						position: absolute;
						top: 50%;
						left: px2rem(30);
						transform: translateY(-50%);
						content: "";
						width: px2rem(5);
						height: px2rem(30);
						background-color: $primary-color;
						border-radius: px2rem(4);
					}
				}
			}
			.selfdetail-content {
				padding: px2rem(15);
				margin: 0 px2rem(30);
				font-size: px2rem(26);
				color: $tip-color;
				word-wrap: break-word;
			}
		}
		.self-btn {
			margin-top: px2rem(32);
			padding: 0 px2rem(32);
			font-size: px2rem(28);
			text-align: center;
			line-height: px2rem(80);
			color: $default-color;
			.input {
				height: px2rem(80);
				background-color: $primary-color;
				border-radius: px2rem(8);
			}
		}
		.apply-from {
			padding-top: px2rem(20);
			margin-top: px2rem(20);
			background: $default-color;
			.apply-input {
				margin-left: px2rem(30);
				padding-right: px2rem(30);
				font-size: px2rem(28);
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title {
					span {
						color: $must-color;
					}
				}
				.input {
					flex: 1;
					padding-right: px2rem(10);
					input {
						height: px2rem(60);
						width: 100%;
						text-align: right;
						padding-right: px2rem(8);
						border: none;
					}
					textarea {
						border: solid $onerem $state-border;
						width: 100%;
						padding-left: px2rem(15);
						padding-top: px2rem(15);
						border-radius: px2rem(10);
						box-sizing: border-box;
					}
				}
				.apply-code {
					flex: 1;
					padding-top: px2rem(15);
					padding-bottom: px2rem(15);
					display: -webkit-box;
					/* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
					display: -moz-box;
					/* 老版本语法: Firefox (buggy) */
					display: -ms-flexbox;
					/* 混合版本语法: IE 10 */
					display: -webkit-flex;
					display: flex;
					.input-code {
						flex: 7;
						width: 100%;
						margin-right: px2rem(15);
						line-height: px2rem(60);
						input {
							height: px2rem(60);
							width: 100%;
							text-align: right;
							padding-right: px2rem(8);
							border:none;
						}
					}
					.input-code-img {
						margin-left: px2rem(22);
						flex: 2;
						border-radius: px2rem(10);
						border: solid px2rem(1) $border-color;
						img {
							width: 100%;
							height: px2rem(56);
						}
					}
				}
			}
			.apply-because {
				display: block;
				margin-bottom: px2rem(32);
				.title {
					line-height: px2rem(74);
				}
				.input {
					textarea {
						border: none;
						background-color: #f8f8f8;
						border-radius: px2rem(15);
						resize: none;
					}
				}
			}
		}
	}
}
</style>