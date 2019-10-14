<template>
	<div class="videopwd" ref="videopwd">
        <Header title="修改视讯密码"
            backPath='/securityCenter'
        ></Header>
		<div class="pk-form-content mgt24">
			<div class="pk-input not-line">
				<label>登录密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input v-model="password" type="password" class="inputs" placeholder="请输入您的登录密码">
					</div>
				</nut-col>
			</div>
		</div>
		<div class="pk-form-content">
			<div class="pk-input pad0 ">
				<nut-cell
					class="pk-bankcard"
					:class="{'pk-bankcard-active':bankcardActive}"
					:showIcon="true"
					:isLink="true"
					@click.native="switchPicker('isVisible1')"
				>
					<span slot="title">
						<label class="noline">&nbsp;&nbsp;&nbsp;视讯</label>
					</span>
					<div slot="desc" class="selected-option">
						<span class="show-value">{{year ? year : '请选择视讯'}}</span>
					</div>
				</nut-cell>
				<nut-picker
					title="请选择视讯"
					:is-visible="isVisible1"
					:default-value-data="defaultValueData1"
					:list-data="listData1"
					@close="switchPicker('isVisible1')"
					@confirm="setYearValue"
				></nut-picker>
			</div>
			<div class="pk-input yes-botline">
				<label>视讯密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input
							v-model="newPassword"
							class="inputs"
							type="password"
							placeholder="请输入您的视讯密码"
						>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label>确认密码</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input v-model="confirmPassword" class="inputs" type="password" placeholder="请再次输入您的视讯密码">
					</div>
				</nut-col>
			</div>
		</div>
		<div class="has-btn">
            <div class="btns">
                <nut-button class="btnsf" block shape="circle" @click="submit()">保存设置</nut-button>
            </div>
        </div>
	</div>
</template>
<script>
import {
  videoPwd,
	videoList
} from "../../../services/securityCenter.js";
import Header from '@/components/Header';
export default {
    components: {
        Header
    },
	data() {
		return {
			password: null,
			newPassword:null,
			confirmPassword:null,
			platform:null,
			
			typed: false,
			year: null,
			isVisible1: false,
			bankcardActive: false,
			defaultValueData1: null,
			videoObj:{},
			listData1: [],
		};
	},
	created() {},
	mounted() {
		this.$refs.videopwd.style.height = window.innerHeight + "px";
		this.getVideoList();
	},
	methods: {
		back(path) {
			this.$router.push({
				name: path
			});
		},
		//获取视讯列表
		getVideoList() {
			videoList().then(res => {
					let dataVideo = res.data;
					console.log('tag', res.data)
					if (dataVideo) {
						console.log('1', res)
						var arr = [];
						dataVideo.map((v,i) => {
                            arr.push(v);
							this.videoObj[i] = v;
							// console.log(arr, 'v+i')
						});
						this.backList = dataVideo;
						this.listData1.push(arr);
						console.log('this.listData1', this.listData1)
					}
				
			});
		},

		submit() {
			let postData = {
					password: this.password,
					newPassword:this.newPassword,
					confirmPassword:this.confirmPassword,
					platform:this.year,
				};
				console.log('postData', postData)
				if (this.password == "" || this.newPassword == null || this.confirmPassword == null || this.year == null ) {
					this.$toast.fail("请填写完整信息", {
						cover: true,
						duration: 4000
					});
					return
				}
				if (!/^\d{6,12}$/.test(this.newPassword)) {
				this.$toast.fail("视讯密码规则为6-12位数字", {
					cover: true,
					duration: 4000
                });
                return
			}
				if (this.newPassword != this.confirmPassword) {
					return this.$toast.fail("两次输入密码不一致", {
					cover: true,
					duration: 1000
					});
				}
				
				console.log(postData, "postData");
				videoPwd(postData).then(res => {
					if (res.success) {
						this.$toast.success("视讯密码修改成功", {
							cover: true,
							duration: 4000
						});
					} else {
						this.$toast.fail(res.message, {
							cover: true,
							duration: 4000
						});
					}
				});
			},

		switchPicker(param) {
			this[`${param}`] = !this[`${param}`];
		},
		setYearValue(chooseData) {
			// this.year = `${chooseData[0]}年`;
			this.year = chooseData[0];
			this.bankcardActive = true;
			this.platform = this.videoObj[this.year] ;
			console.log(chooseData[0], "chooseData[0]");
		}
	}
};
</script>
<style lang="scss" scoped>
    @import "../../../styles/pk-pwd.scss";
    .mgt24{
        margin-top: px2rem(24);
    }
    .not-line::after{
        border-bottom: 0!important;
    }
	.videopwd {
        background: $center-newbg;
        position: relative;
		.pk-bankcard {
			height: 100%;
			width: 100%;
			text-decoration: none;
            background-color: $default-color !important;
            padding: 0;
			span,
			label {
				font-size: 0.29333rem;
            }
            /deep/.nut-cell-box{
                height: 100%;
                .nut-cell-right{
                    .nut-cell-desc{
                        .selected-option{
                            .show-value{
                                font-size: px2rem(28);
                            }
                        }
                    }
                }
            }
		}
		/deep/.nut-actionsheet-menu {
			display: none;
        }
        .has-btn {
            position: absolute;
            width: 100%;
        }
        .btns {
            display: flex;
            justify-content: center;
            height: px2rem(88);
            .btnsf {
                font-size: px2rem(28);
                display: block;
                width: 9.2rem /* 690/75 */;
                height: px2rem(88)!important;
                background-color: #17c492;
                border-radius: 0.13333rem /* 10/75 */;
            }
        }
	}
	.tipbox {
		color: #757575;
		font-size: 0.32rem /* 24/75 */;
		text-align: center;
		margin-top: 0.24rem /* 18/75 */;
		margin-bottom: 0.33333rem; /* 25/75 */
    }
    .nut-button {
		height: 0.96rem /* 72/75 */;
		background: #151515;
		font-size: .48rem /* 36/75 */;
	}
	.nut-button.circle {
		border-radius: 0.13333rem /* 10/75 */;
	}
	.pk-bankcard-active {
		.show-value {
			color: $about-color !important;
		}
	}
	.pk-bankcard {
		.nut-cell-box {
			min-height: 1.06667rem /* 80/75 */;
			.nut-cell-right {
				.nut-cell-icon {
					img {
						margin-left: 0.08rem /* 6/75 */;
					}
				}
			}
		}
		.show-value {
			color: $color-W;
		}
    }
    .pk-form-content {
        padding-right: 0.4rem;
        padding-left: .4rem;
        .pk-input{
			
			border-top: none;
            height: px2rem(88);
            label{
                font-size: px2rem(28);
                color: $tip-color;
            }
            .el-input input{
                font-size: px2rem(28);
                color: $state-end;
            }
        }
        ::-webkit-input-placeholder {
            color: $placeholder-color;
            font-size: px2rem(28);
        }

        /* Firefox版本4-18 */
        :-moz-placeholder {
            color: $placeholder-color;
            font-size: px2rem(28);
        }

        /* Firefox版本19+ */
        ::-moz-placeholder {
            color: $placeholder-color;
            font-size: px2rem(28);
        }

        /* IE浏览器 */
        :-ms-input-placeholder {
            color: $placeholder-color;
            font-size: px2rem(28);
        }
        .yes-botline{
            &::after{
               border-bottom: 2px solid $bet-record-bdr;
            }
		}
    }
</style>
