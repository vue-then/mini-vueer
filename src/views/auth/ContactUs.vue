<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-30 16:28:20
 * @LastEditTime: 2019-09-30 17:05:23
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="set">
        <Header title="忘记密码" backPath="/login" :dofunc="true"   :callback="backfunc"></Header>
        <div class="pk-desc">忘记密码请通过以下方式联系我们进行处理</div>
        <div class="cent">
            <div class="pk-form-content">
                <div class="bgf mgt24">
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
                <div class="bgf ">
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
                        <label>微信</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input">
                                <input disabled class="inputs" type="text" v-model="wechat" />
                            </div>
                        </nut-col>
                    </div>
                </div>
                <div class="bgf">
                    <div class="pk-input">
                        <label>QQ</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input">
                                <input disabled class="inputs" type="text" v-model="qq" />
                            </div>
                        </nut-col>
                    </div>
                </div>
                <div class="bgf">
                    <div class="pk-input">
                        <label>邮箱</label>
                        <nut-col :span="16" class="pk-foricon">
                            <div class="flex-content el-input">
                                <input disabled class="inputs" type="text" v-model="email" />
                            </div>
                        </nut-col>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header";
import { getContactus } from "@/services/center";
export default {
    components: {
        Header
    },
    data() {
        return {
            mobilephone: "",
            phone: "",
            wechat: "",
            qq: "",
            email: ""
        };
    },

    mounted() {
        this.getContactus();
    },
    watch: {
        secretChatReminder(val) {
            this.remindSet();
        },
        makeSystemReminder(val) {
            this.remindSet();
        },
        makeAnnouncementReminder(val) {
            this.remindSet();
        }
    },
    methods: {
        backfunc(){

        },
        getContactus() {
            getContactus().then(res => {
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
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "@/styles/pk-pwd.scss";
.mphone {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    a {
        color: $label-color;
    }
}
.mgt24 {
    margin-top: px2rem(24);
}
.pk-desc {
    padding: px2rem(24) px2rem(32);
    box-sizing: border-box;
    background: $default-color;
    font-size: px2rem(24);
    font-weight: bold;
    color: $tip-color;
}
.set {
    /deep/.nut-navbar.pk-title {
        z-index: 1;
    }
    .pk-form-content {
        padding: 0;
        background-color: #f2f2f2;
        .bgf {
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
            margin: 0 0.426667rem;
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
                    color: $label-color;
                }
                input::-webkit-input-placeholder {
                    /* WebKit browsers */
                    font-size: px2rem(28);
                }
                input:-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    font-size: px2rem(28);
                }
                i {
                    position: absolute;
                    right: -0.4rem /* 35/75 */;
                    width: 0.24rem /* 18/75 */;
                    height: 0.426667rem /* 32/75 */;
                    top: 31.4%;
                    color: $label-color;
                    img {
                        width: 0.24rem /* 18/75 */;
                        margin-top: -10px;
                    }
                }
            }
        }
    }
}
</style>
