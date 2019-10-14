<template>
	<div class="set">
		<Header v-show="showMain" title="设置" backPath="/my"></Header>
		<Header v-show="showRemind" 
            title="提醒设置" 
            backPath="/set"
            :dofunc="true"
            :callback="backfunc"
        ></Header>
        <Header 
            v-show="showConn"
            title="联系我们"
            backPath="/set"
            :dofunc="true"
            :callback="backfuncpro"
        ></Header>

		<div class="cent">
            <div v-show="showMain" class="pk-form-content">
                <router-link tag="div" to="/securityCenter" class="bgf mgt24">
                    <div class="pk-input">
                        <label>安全中心</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input">
                                <!-- <input
                                    disabled
                                    class="inputs"
                                    type="text"
                                    v-model="user.realName"
                                /> -->
                                <i class="iconfont iconicon_mine_rmore"></i>
                            </div>
                        </nut-col>
                    </div>
                </router-link>
                
                <div class="bgf mgb24">
                <div class="pk-input mgb24 not-line" @click="openRemind">
                    <label>提醒设置</label>
                    <nut-col :span="16" class="pk-foricon">
                        <div class="flex-content el-input">
                            <i class="iconfont iconicon_mine_rmore"></i>
                        </div>
                    </nut-col>
                </div>
                </div>
                
                <div class="bgf mgt24">
                <div class="pk-input mgt24" @click="openVersion">
                    <label>版本检测</label>
                    <nut-col :span="16" class="pk-foricon">
                        <div class="flex-content el-input">
                            <input
                                disabled
                                class="inputs"
                                type="text"
                                placeholder="设置"
                            />
                           <i class="iconfont iconicon_mine_rmore"></i>
                        </div>
                    </nut-col>
                </div>
                </div>

                <div class="bgf mgb24">
                <div class="pk-input mgb24 not-line" @click="openCleanCache">
                    <label>清除缓存</label>
                    <nut-col :span="16" class="pk-foricon">
                        <div class="flex-content el-input">
                           <i class="iconfont iconicon_mine_rmore"></i>
                        </div>
                    </nut-col>
                </div>
                </div>

                <div class="bgf mgt24">
                <div class="pk-input mgt24" @click="popupQuick=true">
                    <label>设备信息</label>
                    <nut-col :span="16" class="pk-foricon">
                        <div class="flex-content el-input">
                            <i class="iconfont iconicon_mine_rmore"></i>
                        </div>
                    </nut-col>
                </div>
                </div>

                <div class="bgf mgb24">
                <div class="pk-input mgb24 not-line" @click="openConnUs">
                    <label>联系我们</label>
                    <nut-col :span="16" class="pk-foricon">
                        <div class="flex-content el-input">
                            <i class="iconfont iconicon_mine_rmore"></i>
                        </div>
                    </nut-col>
                </div>
                </div>

                <div class="bgf mgt24">
                <div class="pk-input mgt24 not-line" @click="logout">
                    <label>退出登录</label>
                    <nut-col :span="16" class="pk-foricon">
                        <div class="flex-content el-input">
                            <i class="iconfont iconicon_mine_rmore"></i>
                        </div>
                    </nut-col>
                </div>
                </div>
            </div>
            <!-- IOS -->
            <div v-show="showRemind" class="pk-form-content">
                <div class="bgf mgt24">
                    <div class="pk-input mgb24">
                        <label>密聊消息提醒</label>
                        <nut-col :span="16" class="pk-foricon pk-sw">
                            <nut-switch :active.sync="secretChatReminder"></nut-switch>
                        </nut-col>
                    </div>
                </div>
                <div class="bgf">
                    <div class="pk-input">
                        <label>系统消息提醒</label>
                        <nut-col :span="16" class="pk-foricon pk-sw">
                            <nut-switch :active.sync="makeSystemReminder"></nut-switch>
                        </nut-col>
                    </div>
                </div>
                <div class="bgf mgb24">
                    <div class="pk-input mgb24 not-line">
                        <label>公告通知提醒</label>
                        <nut-col :span="16" class="pk-foricon pk-sw">
                            <nut-switch :active.sync="makeAnnouncementReminder"></nut-switch>
                        </nut-col>
                    </div>
                </div>

            </div>

            <div v-show="showConn" class="pk-form-content">
                <div class="bgf mgt24">
                    <div class="pk-input">
                        <label>手机</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input mphone">
                                <a :href="'tel:'+mobilephone">{{mobilephone}}</a>
                                <i class="iconfont iconicon_mine_rmore"></i>
                            </div>
                        </nut-col>
                    </div>
                </div>
                <div class="bgf">
                    <div class="pk-input">
                        <label>座机</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input">
                                <div class="flex-content el-input mphone">
                                <a :href="'tel:'+phone">{{phone}}</a>
                                <i class="iconfont iconicon_mine_rmore"></i>
                            </div>
                            </div>
                        </nut-col>
                    </div>
                </div>
                <div class="bgf">
                    <div class="pk-input">
                        <label>微信</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input">
                                <input
                                    disabled
                                    class="inputs"
                                    type="text"
                                    v-model="wechat"
                                />
                                <i class="iconfont iconicon_fz" @click="copy(wechat)"></i>
                            </div>
                        </nut-col>
                    </div>
                </div>
                <div class="bgf">
                    <div class="pk-input">
                        <label>QQ</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input">
                                <input
                                    disabled
                                    class="inputs"
                                    type="text"
                                    v-model="qq"
                                />
                                <i class="iconfont iconicon_fz" @click="copy(qq)"></i>
                            </div>
                        </nut-col>
                    </div>
                </div>
                <div class="bgf">
                    <div class="pk-input">
                        <label>邮箱</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input">
                                <input
                                    disabled
                                    class="inputs"
                                    type="text"
                                    v-model="email"
                                />
                                <i class="iconfont iconicon_fz" @click="copy(email)"></i>
                            </div>
                        </nut-col>
                    </div>
                </div>

            </div>


            
        </div>


        <!-- 查看弹框 -start -->
        <div v-show="popupQuick" class="quickBox">
            <div class="quickCont">
                <div class="title">设备信息</div>
                <div class="input">
                    <div class="input-top pk-1px-b">
                        <div class="input-left">App版本号</div>
                        <div class="input-right color1a">1.0.2</div>
                    </div>
                    <div class="input-bottom pk-1px-b">
                        <div class="input-left">操作系统</div>
                        <div class="input-right color1a">
                            ios-123456
                        </div>
                    </div>
                    <div class="input-bottom pk-1px-b">
                        <div class="input-left">手机型号</div>
                        <div class="input-right color1a">
                            iphone 6
                        </div>
                    </div>
                    <div class="input-bottom">
                        <div class="input-left">登录IP</div>
                        <div class="input-right color1a">
                            10.1.1.1
                        </div>
                    </div>
                </div>
                
                <div class="button">
                    <div class="button-left">
                        <button @click="cancelFastSetting" type="button">关闭</button>
                    </div>
                    <div class="button-right">
                        <button @click="saveFastSetting" type="button">复制设备信息</button>
                    </div>
                </div>
            </div>
            <div class="box-mask" @click="cancelFastSetting"></div>
        </div>
        <!-- 设置快捷转入弹框 -end -->
        
        
	</div>
</template>
<script>
import Header from '@/components/Header';
import { getContactus,remindInfo,remindSet } from '@/services/center';
import {logout}from '@/services/auth';

export default {
    components: {
        Header
    },
	data() {
		return {
            showMain: true,
            showRemind: false,
            showConn: false,
            connUsText: [], //联系方式
            mobilephone: '',
            phone: '',
            wechat: '',
            qq: '',
            email: '',
            // 设备信息
            popupQuick: false,
            // 提醒设置
            remindMsg: {},
            secretChatReminder: true,
            makeSystemReminder: true,
            makeAnnouncementReminder: true,
            chatRoomReminder: 1
            
		};
	},
	created() {
        
	},
	mounted() {
        
    },
    watch: {
        secretChatReminder(val) {
            this.remindSet()
        },
        makeSystemReminder(val) {
            this.remindSet()
        },
        makeAnnouncementReminder(val) {
            this.remindSet()
        }
    },
	methods: {
        logout(){
            let self = this;
            this.$dialog({
                id:'open_cleancache',
                lockBgScroll:true,
                closeOnClickModal:false,
                textAlign:'center',
                title: "温馨提示",
                content:"您确定要退出登录吗?",
                customClass:'pk-dialogs',
                onOkBtn() {
                    this.close(); //关闭对话框
                    logout();
                    self.$router.push('/login');
                }
            });
            this.$("#open_cleancache .nut-dialog-btn").eq(1).css({
                "border-top": "1px solid #F6F6F6",
                "border-left": "1px solid #F6F6F6",
                "color": "#17c492"
            })
            this.dotitle()
            
        },
        openRemind(){
            this.showMain=false;
            this.showRemind=true;
            this.remindInfo()
        },
        openConnUs(){
            this.showConn=true;
            this.showMain=false;
            this.getContactus();
        },
        backfunc(){
            this.showMain=true;
            this.showRemind=false;

        },
        backfuncpro(){
            this.showMain=true;
            this.showConn=false;
        },
        openVersion(){
            let self = this;
            this.$dialog({
                id:'open_version',
                lockBgScroll:true,
                closeOnClickModal:false,
                textAlign:'center',
                title: "版本检测",
                content:"当前版本已是最新版本",
                customClass:'pk-dialogs',
                noCancelBtn: true,
                onOkBtn() {
                    this.close(); //关闭对话框
                }
            });
            this.dotitle()
        },
        openCleanCache(){
            let self = this;
            this.$dialog({
                id:'open_cleancache',
                lockBgScroll:true,
                closeOnClickModal:false,
                textAlign:'center',
                title: "清除缓存",
                content:"您确定要清除缓存吗?",
                customClass:'pk-dialogs',
                onOkBtn() {
                    console.log('ok')
                    this.close(); //关闭对话框
                }
            });
            
            this.$("#open_cleancache .nut-dialog-btn").eq(1).css({
                "border-top": "1px solid #F6F6F6",
                "border-left": "1px solid #F6F6F6",
                "color": "#17c492"
            })
            this.dotitle()
        },
        dotitle(){
            this.$(".pk-dialogs .nut-dialog-btn").removeClass("nut-dialog-ok")
            this.$(".pk-dialogs .nut-dialog-body").css({
                "padding-top": ".26667rem"
            })
            this.$(".pk-dialogs .nut-dialog-content").css({
                "padding-top": ".36555rem"
            })
            this.$(".pk-dialogs .nut-dialog-ok").css({
                "background": "#fff",
                "color":"#17c492",
                "border-top":"1px solid #F6F6F6",
                "border-left":"1px solid #F6F6F6"
            })
            this.$(".pk-dialogs .nut-dialog-content").css({
                "color": "#1a1a1a"
            })
        },
        getContactus(){
            getContactus().then(res => {
                console.log(res,'res')
                if (res.success) {
                    this.mobilephone = res.data[0].content;
                    this.phone = res.data[1].content;
                    this.wechat = res.data[2].content;
                    this.qq = res.data[3].content;
                    this.email = res.data[4].content;
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            })
        },
        copy(msg) {
			this.$copyText(msg).then(
				e => {
					this.$toast.success("复制成功", { cover: true });
				},
				e => {
					this.$toast.fail("复制失败", { cover: true });
				}
			);
        },
        //取消查看信息
        cancelFastSetting () {
            this.popupQuick = false;
        },
        //查看信息确认操作
        saveFastSetting () {
            this.popupQuick = false;

        },
        // 提醒设置
        remindInfo() {
            remindInfo().then(res=>{
                if (res.success) {
                    this.remindMsg = res.data;
                    this.secretChatReminder = this.remindMsg.secretChatReminder==1
                    this.makeSystemReminder = this.remindMsg.systemReminder==1
                    this.makeAnnouncementReminder= this.remindMsg.announcementReminder==1
                    this.chatRoomReminder = this.remindMsg.chatRoomReminder;
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            })
        },
        // 设置提醒设置
        remindSet() {
            let post = {
                secretChatReminder: this.secretChatReminder?1:2,
                systemReminder: this.makeSystemReminder?1:2,
                announcementReminder: this.makeAnnouncementReminder?1:2,
                chatRoomReminder: this.chatRoomReminder,
            }
            remindSet(post).then(res => {
                 if (res.success) {
                     console.log('设置成功');
                    // this.$toast.success('设置成功', {
                    //     cover: true,
                    //     duration: 1000
                    // });
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            })
        }
        
		
	}
};
</script>
<style lang="scss" scoped>
    @import "../../../styles/pk-pwd.scss";
    .mphone{
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        a{
            color: #1a1a1a;
        }
    }
    .mgt24{
        margin-top: px2rem(24);
    }
    .mgb24{
        margin-bottom: px2rem(24);
    }
    .color1a{
        color: rgb(153, 153, 153)!important;
        font-weight: 400!important;
    }
    .nav-center{
        z-index: 100;
    }
	.height100b {
		height: 100%;
	}
	.width100b {
		width: 100%;
	}
    .not-line::after{
        border-bottom: 0!important;
    }

	.set {
        /deep/.nut-navbar.pk-title{
            z-index: 1;
        }
		.pk-form-content {
            padding: 0;
            background-color: #f2f2f2;
            .bgf{
                background: #fff;
                width: 100%;
            }
			.pk-input {
				position: relative;
				display: flex;
				height: px2rem(88);
				justify-content: space-between;
				font-size: px2rem(28);
				color: $about-color;
                align-items: center;
                z-index: 10;
                margin: 0 .426667rem;
                background: $default-color;
				.icon-img {
					width: 1rem;
					height: 1rem;
				}
				&::after {
					content: " ";
					position: absolute;
					left: 0;
					bottom: 0;
					right: 0;
					// height: 0.01333rem /* 1/75 */;
					border-bottom: 0.01333rem solid $border-color;
					-webkit-transform-origin: 0 100%;
					transform-origin: 0 100%;
					-webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                    z-index: 99;
				}
				.pk-foricon {
					height: 100%;
					padding-right: 0.53333rem /* 40/75 */;
				}
				.el-input {
                    width: 100%;
                    height: 100%;
					position: relative;
					input {
                        font-size: px2rem(28);
						width: 100%;
						height: px2rem(88);
						border: none;
						text-align: right;
                    }
                    input::-webkit-input-placeholder { /* WebKit browsers */
                        font-size:px2rem(28);
                    }
                    input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                        font-size:px2rem(28);
                    }
					i {
						position: absolute;
						right: -0.4rem /* 35/75 */;
						width: 0.24rem /* 18/75 */;
						height: 0.426667rem /* 32/75 */;
                        top: 31.4%;
                        color:$label-color;
						img {
							width: 0.24rem /* 18/75 */;
							margin-top: -10px;
						}
					}
                }
                
			}
        }
        .pk-sw{
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            padding: 0!important;
        }
    }
    

    /deep/.nut-switch.nut-switch-active {
        border: 1px solid $primary-color;
        background: $primary-color;
        .nut-switch-btn{
            background: #fff;
        }
    }
    .nut-switch.nut-switch-base{
        .nut-switch-btn{
            border: none !important;
        }
    } 
    .nut-switch .nut-switch-btn{
        border: none !important;
    }
    .quickBox {
        z-index: 999;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        .quickCont {
            z-index: 1000;
            position: fixed;
            top: 50%;
            left: 50%;
            margin: 0 auto;
            width: 8.6rem;
            color: $default-color;
            background-color: $default-color;
            border-radius: 0.133rem;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            overflow: hidden;
            letter-spacing: 0px;
            .title {
                letter-spacing: 0px!important;
                padding: 0 px2rem(32);
                height: px2rem(96);
                line-height: 1.2rem;
                font-weight: bold;
                font-size: 0.427rem;
                color: #1a1a1a;
                text-align:center;
                background: $default-color;
                letter-spacing: .08rem /* 6/75 */;
            }
            .input {
                padding: 0 px2rem(32);
                background-color: $default-color;
                .input-top,
                .input-bottom {
                    display: -webkit-flex;
                    display: flex;
                    -webkit-box-pack: justify;
                    justify-content: space-between;
                    height: px2rem(80);
                    line-height: px2rem(80);
                    overflow: hidden;
                    .input-left {
                        font-size: px2rem(32);
                        color: $tip-color;
                        letter-spacing: 0px!important;
                    }
                    .input-right {
                        font-weight: bold;
                        font-size: px2rem(32);
                        color: #ff5500;
                        display: flex;
                        align-items: center;
                        letter-spacing: 0px!important;
                        input {
                            border: 0;
                            text-align: right;
                            font-size: px2rem(32);
                        }
                        input::-webkit-input-placeholder {
                            color: $label-color;
                            font-size: px2rem(32);
                        }
                        .mint-switch {
                            margin-top: 0.213rem;
                            width: 1.333rem;
                            height: 0.64rem;
                        }
                    }
                }
            }
            p {
                padding: 0.24rem 0.4rem;
                line-height: 1.5;
                font-size: .29333rem /* 22/75 */;
                color: #999;
            }
            .button {
                display: -webkit-flex;
                display: flex;
                // flex-direction: column;
                // justify-content: space-between;
                // padding:0 0.4rem;
                .button-left,
                .button-right {
                    flex:1;
                    button {
                        letter-spacing: 0;
                        width:100%;
                        display: block;
                        margin: 0 auto;
                        height: px2rem(80);
                        font-size: .48rem /* 36/75 */;
                        color: #999999;
                        border: 0;
                        font-size: px2rem(28);
                        background: $default-color;
                        border-left: 1px solid #eee;
                        border-top: 1px solid #eee;
                    }
                    
                }
                .button-right {
                    button {
                        color: $primary-color;
                    }
                }
            }
        }
    }
    // /deep/#open_cleancache.nut-dialog-wrapper.pk-dialogs{
    //     .nut-dialog-box{
    //         .nut-dialog{
    //             .nut-dialog-footer{
    //                 .nut-dialog-btn{
    //                     border: 1px solid red;
    //                 }
    //             }
    //         }
    //     }
    // }
</style>
