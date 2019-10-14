<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-30 12:15:51
 * @LastEditTime: 2019-09-30 17:38:54
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="pk-auth">
        <div class="pk-auth-box">
            <div class="pk-site-info">
                <!-- <img :src="siteInfo.logo" alt="" class="pk-site-logo"> -->
                <img src="@/assets/img/icon_logo.png" alt="" class="pk-site-logo">
                <p class="pk-site-name">zzy_a</p>
                <!-- <p class="pk-site-name">{{siteInfo.siteName}}</p> -->
            </div>
            <section class="pk-form-box">
                <ul>
                    <li>
                        <h3>注册</h3>
                    </li>
                    <li class="pk-form-item">
                        <input id="jsr" type="text" readonly v-model="promoCode">
                        <label for="jsr">
                            <img src="@/assets/img/auth-icon/jsr.png" alt="">
                        </label>
                    </li>
                    <li class="pk-form-item">
                        <input type="text" id="account" placeholder="5-16位字母和数字组合" v-model="account" maxlength="16">
                        <label for="account">
                            <img src="@/assets/img/auth-icon/zh.png" alt="">
                        </label>
                    </li>
                    <li class="pk-form-item">
                        <input type="password" id="password" placeholder="6-20位字母和数字组合" v-model="password">
                        <label for="password">
                            <img src="@/assets/img/auth-icon/mm.png" alt="">
                        </label>
                    </li>
                    <li class="pk-form-item">
                        <input type="password" id="passwordComf" placeholder="再次输入您的登录密码" v-model="passwordComf">
                        <label for="passwordComf">
                            <img src="@/assets/img/auth-icon/mm.png" alt="">
                        </label>
                    </li>
                    <li class="pk-form-item form-code" v-if="setting.isCode == 1 && setting.captchaType == 1">
                        <input type="text" id="code" v-model="code">
                        <label for="password">
                            <img src="@/assets/img/auth-icon/yzm.png" alt="">
                        </label>
                        <img :src="'data:image/png;base64,'+codeInfo.code" alt="" class="login-code-img"
                            @click="getCaptchaImg" v-if="codeInfo.code">
                    </li>
                    <li class="form-tool">
                        <div class="tool-item checkbox"><input type="checkbox" name="" id="rember"
                                v-model="agree"><label for="rember">同意</label><span class="agreement"
                                @click="agreementText = true">《注册协议》</span></div>
                    </li>
                </ul>
                <div class="btns">
                    <div class="btn btn-active" @click="toRegister">
                        注册</div>
                </div>
                <div class="pk-register-in">
                    已有账号，<router-link tag="a" :to="{name:'login'}" class="tool-item kf">直接登录</router-link>
                </div>
                <!-- 验证码 start -->
                <Mpanel v-if="mpanelShow" @close="mpanelShow = false" @success="onMpanelSuccess" :type="2"></Mpanel>
                <!-- 验证码 end -->
            </section>
            <!--注册协议 -start -->
            <nut-dialog title="注册协议" customClass="pk-dialog-transfer" :visible="agreementText" :lockBgScroll="false"
                :closeOnClickModal="false" :noCancelBtn="true" :noFooter="true" @close="agreementText=false">
                <div class="pk-agreement">
                    <p>
                        尊敬的客户，欢迎您注册成为本网站用户，在注册前请仔细阅读如下服务条款：
                    </p>
                    <p>
                        在注册本网站之前，请您务必认真阅读并充分理解本协议全部内容。您点击本协议下方的“注册”按钮，并按照本网站注册程序成功成为注册为用户
                        ，即视为您已经充分理解和同意本协议全部内容，并签署了本协议，本协议立即在您与本公司之间产生合同法律效力，您使用本网站服务的全部活动将受到本协议的 约束并应承担相应的责任和义务。
                    </p>
                    <p>
                        1、协议组成说明
                    </p>
                    <p>
                        1.1 本协议的内容包括本协议以下全部条款以及本网站已经公示发布的及将来可能公示发布的各项规则，该等规则均为本协议不可分割的一部分，与本协议以下所列条款具有同等法律效力。
                    </p>
                    <p>
                        1.2 本网站有权根据需要修改本协议的内容。如以下条款或本网站各项规则有任何变更，本网站将在网站上刊载公告，不再向用户作个别通知。经修订的相关条款和规则
                        一经公告，即于公告规定的特定生效日期自动生效。请您及时关注本网站关于相关条款和规则的公告，如不同意该变更，请您在变更公告刊载之日起72小时内以您
                        在本网站注册时提供的个人邮箱向本网站公布的的服务邮箱发送邮件或拨打客服电话表明希望终止本协议（"注册终止申请"），本网站确认收到您的邮件和电话后
                        将与您协商本协议终止后双方义务的履行。如您在本条所述时限内未发送注册终止申请，则本条所述时限届满之时，视为您已经同意接受该等变更，并应遵照修改后
                        的协议履行应尽义务，经修订的相关条款和规则一经公告，即于公告规定的特定生效日期自动生效并对您产生法律约束力。
                    </p>
                    <p>
                        1.3本协议不涉及您与本网站的其他用户之间因网上交易而产生的法律关系及法律纠纷。但您在此不可撤销地同意，您将全面接受并履行与本网站其他用户在本网站签订的任何电子法律文本，并承诺按照该法律文本享有和（或）放弃相应的权利、承担和（或）豁免相应的义务。
                    </p>

                </div>

                <div class="pk-agreement-bnt" @click="agree=true,agreementText=false">
                    确认并继续
                </div>

            </nut-dialog>
            <!--注册协议 -end -->
        </div>
    </div>
</template>

<script>
import {
    getCaptchaCode,
    getRegisterSet,
    getAgent,
    register
} from "../../services/auth.js";
import { getAnnouncement } from "../../services/index.js";
import Mpanel from "../../components/Mpanel.vue"; //验证
export default {
    components: {
        Mpanel
    },
    data() {
        return {
            showAccountIcon: false,
            showCodeClearIcon: false,
            announcement: [],
            promoCode: "aaa",
            account: "",
            password: "",
            passwordComf: "",
            showPasswordComf: true,
            showPassword: true,
            code: "",
            codeInfo: {},
            agree: false,
            RegExp: {
                account: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,16}$/,
                pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
            },
            setting: {},
            mpanelShow: false,
            shwoCode: false,
            agreementText: false
        };
    },
    mounted() {
        this.getRegisterSetFunc();
        this.getAnnouncementFunc();
        let tid = this.getStorage("tid", 1000 * 60 * 60 * 24);
        console.log(tid);
        if (tid) {
            this.promoCode = tid;
        } else {
            this.getAgentFunc();
        }
    },
    methods: {
        getStorage(key, exp) {
            var data = localStorage.getItem(key);
            var dataObj = JSON.parse(data);
            if (dataObj) {
                if (new Date().getTime() - dataObj.time > exp) {
                    localStorage.removeItem("tid");
                    return null;
                } else {
                    return dataObj.data;
                }
            } else {
                return null;
            }
        },
        getAnnouncementFunc() {
            getAnnouncement(-2).then(res => {
                if (res.success) {
                    this.announcement = res.data.announcement || [];
                    console.log(213123123);
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1500
                    });
                }
            });
        },
        getAgentFunc() {
            getAgent().then(res => {
                if (res.success) {
                    this.promoCode = res.data;
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            });
        },
        getCaptchaImg() {
            this.code = "";
            getCaptchaCode().then(res => {
                if (res.success) {
                    this.codeInfo = res.data;
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            });
        },
        getRegisterSetFunc() {
            getRegisterSet().then(res => {
                if (res.success) {
                    console.log(res.data);
                    this.setting = res.data;
                    if (
                        this.setting.isCode == 1 &&
                        this.setting.captchaType == 1
                    ) {
                        this.getCaptchaImg();
                        this.shwoCode = true;
                    }
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1500
                    });
                }
            });
        },

        goBack() {
            this.$router.push({
                name: "index"
            });
        },

        hideClear() {
            setTimeout(() => {
                this.showAccountIcon = false;
            }, 1);
        },
        clearVal() {
            this.account = "";
        },
        hideClearCodeIcon() {
            setTimeout(() => {
                this.showCodeClearIcon = false;
            }, 1);
        },
        clearCodeVal() {
            this.code = "";
        },
        toAgreement() {
            this.$router.push({
                name: "registerAgreement"
            });
        },
        toLogin() {
            this.$router.push({
                name: "login"
            });
        },
        toRegister() {
            if (!this.agree) {
                this.$toast.fail("请阅读注册协议！", {
                    cover: true,
                    duration: 1000
                });
                return;
            }
            if (!this.account) {
                this.$toast.fail("请输入账号！", {
                    cover: true,
                    duration: 1000
                });
                return;
            } else if (!this.RegExp.account.test(this.account)) {
                this.$toast.fail("账号必须由5-16位字母和数字组合", {
                    cover: true,
                    duration: 1500
                });
                return;
            } else if (!this.password) {
                this.$toast.fail("请输入密码！", {
                    cover: true,
                    duration: 1000
                });
                return;
            } else if (!this.RegExp.pwd.test(this.password)) {
                this.$toast.fail("密码必须由6-20位字母和数字组合", {
                    cover: true,
                    duration: 1500
                });
                return;
            } else if (!this.passwordComf) {
                this.$toast.fail("请再次输入密码！", {
                    cover: true,
                    duration: 1000
                });
                return;
            } else if (this.passwordComf != this.password) {
                this.$toast.fail("两次密码输入不一致！", {
                    cover: true,
                    duration: 1000
                });
                return;
            }
            if (
                this.setting.isCode == 1 &&
                this.setting.captchaType == 1 &&
                !this.code
            ) {
                this.$toast.fail("请输入验证码！", {
                    cover: true,
                    duration: 1500
                });
                return;
            }
            if (this.setting.isCode === 1 && this.setting.captchaType === 2) {
                this.mpanelShow = true;
            } else {
                this.loginAjax();
            }
        },
        // 验证通过
        onMpanelSuccess(back, id) {
            this.code = back + "";
            this.codeInfo.id = id;
            this.mpanelShow = false;
            this.loginAjax();
        },
        loginAjax() {
            console.log(123123);
            let data = {
                account: this.account,
                password: this.password,
                confirmPassword: this.passwordComf,
                spreadId: this.promoCode,
                code: this.code,
                codeId: this.codeInfo.id,
                readAgree: this.agree
            };
            register(data).then(res => {
                if (res.success) {
                    sessionStorage.setItem("token", res.data);
                    localStorage.setItem("account", this.account);
                    localStorage.setItem(
                        "password",
                        encodeURIComponent(this.password)
                    );
                    this.$router.push({
                        name: "index"
                    });
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                    this.code = "";
                    this.codeInfo.id = "";
                    if (
                        this.setting.isCode == 1 &&
                        this.setting.captchaType == 1
                    ) {
                        this.getCaptchaImg();
                    }
                }
            });
        },
        selfmore() {
            this.$router.push({
                name: "index"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "./auth.scss";
</style>

