<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 08:36:40
 * @LastEditTime: 2019-10-09 10:22:22
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="focusInfo">
        <Header title=""></Header>
        <div class="infoPart" v-if="fromType ==2">
            <!-- 管理员 -->
            <div class="mainInfo manager">
                <img class="photo" v-if="infoData.photo != ''" :src="infoData.photo" alt />
                <img class="photo" v-if="infoData.photo == ''" src="../../../assets/img/icon_visitor.png" />
                <p class="name">
                    {{infoData.nikeName}}
                    <img v-if="infoData.sex==1" class="sex" src="../../../assets/img/discover/icon_man@2x.png" alt />
                    <img v-if="infoData.sex==2" class="sex" src="../../../assets/img/discover/icon_woman@2x.png" alt />
                </p>
                <button class="delFocus" v-if="infoData.isFocus" @click="delFocus()">不再关注</button>
                <button class="addFocus" v-if="!infoData.isFocus" @click="addFocus()">关注 +</button>
            </div>
        </div>
        <div class="infoPart" v-if="fromType ==2" @click="toChat">
            <p class="sendMsg">发消息</p>
        </div>

        <div class="infoPart" v-if="fromType ==1">
            <!-- 会员 -->
            <div class="mainInfo">
                <img class="photo" :src="infoData.photo" alt />
                <p class="name">
                    {{infoData.nickname}}
                    <img v-if="infoData.sex==1" class="sex" src="../../../assets/img/discover/icon_man@2x.png" alt />
                    <img v-if="infoData.sex==2" class="sex" src="../../../assets/img/discover/icon_woman@2x.png" alt />
                </p>
                <img class="level" :src="infoData.scorelogo" alt />
                <button class="delFocus" v-if="infoData.isFocus" @click="delFocus()">不再关注</button>
                <button class="addFocus" v-if="!infoData.isFocus" @click="addFocus()">关注 +</button>
            </div>
            <div class="mainData">
                <div class="data">
                    <p class="colorOne">{{infoData.rate}}</p>
                    <span>近100注命中率</span>
                </div>
                <div class="data">
                    <p class="colorTwo">{{infoData.highestConnection}}</p>
                    <span>最高连中</span>
                </div>
                <div class="data">
                    <p class="colorThree">{{infoData.highestError}}</p>
                    <span>最高连错</span>
                </div>
            </div>
        </div>
        <div class="infoPart" v-if="fromType ==1">
            <div class="infoList">
                <p class="title">生日</p>
                <p class="Details">{{infoData.birthday}}</p>
            </div>
            <div class="infoList">
                <p class="title">所在地</p>
                <p class="Details">{{infoData.city}}</p>
            </div>
        </div>
        <div class="infoPart" v-if="fromType ==1">
            <div class="infoList">
                <p class="title">个性签名</p>
                <p class="DetailsTwo">{{infoData.personalSign}} </p>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getFocusInfo,
    getManagerInfo,
    addFocus,
    delFocus
} from "@/services/myFocus.js";
import Header from "@/components/Header";
export default {
    name: "focusInfo",
    components: {
        getFocusInfo,
        getManagerInfo,
        addFocus,
        delFocus,
        Header
    },
    data() {
        return {
            id: this.$route.query.focusMemberId * 1,
            infoData: [],
            fromType: this.$route.query.focusType * 1
        };
    },
    mounted() {
        this.getInfo(this.$route.query.focusType);
    },
    methods: {
        getInfo(typeFrom) {
            //2管理员   1会员
            var data = {
                id: this.id
            };
            if (typeFrom == 1) {
                getFocusInfo(data).then(res => {
                    if (res.success) {
                        this.infoData = res.data;
                        console.log(res, "res");
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            } else {
                getManagerInfo(data).then(res => {
                    if (res.success) {
                        this.infoData = res.data;
                        console.log(res, "res");
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            }
        },

        addFocus() {
            var data = {
                focusType: this.$route.query.focusType * 1,
                id: this.$route.query.focusMemberId * 1
            };
            addFocus(data).then(res => {
                if (res.success) {
                    this.getInfo(this.$route.query.focusType);
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1500
                    });
                }
            });
        },
        delFocus() {
            var data = {
                focusType: this.$route.query.focusType * 1,
                id: this.$route.query.focusMemberId * 1
            };
            delFocus(data).then(res => {
                if (res.success) {
                    this.getInfo(this.$route.query.focusType);
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1500
                    });
                }
            });
        },
        toChat(){
            this.$router.push({
					name: "chat",
					query: {
						id: this.infoData.agencyId,
						roomType: 4,
                        name: this.infoData.nikeName,
					}
				});
        }
    }
};
</script>
<style lang="scss" scoped>
.focusInfo {
    .infoPart {
        background: $default-color;
        margin-bottom: px2rem(24);
        .sendMsg {
            height: px2rem(89);
            line-height: px2rem(89);
            color: $primary-color;
            font-size: px2rem(28);
            text-align: center;
            padding-left: px2rem(40);
            background: url(../../../assets/img/discover/icon_info_gmsiliao@2x.png)
                no-repeat px2rem(299) center;
            background-size: px2rem(44) px2rem(44);
        }
        .mainInfo {
            width: px2rem(718);
            height: px2rem(138);
            margin-left: px2rem(32);
            border-bottom: px2rem(1) solid $backwater-no-btn;
            position: relative;
            .photo {
                position: absolute;
                left: 0;
                top: px2rem(21);
                width: px2rem(96);
                height: px2rem(96);
            }
            .name {
                position: absolute;
                top: px2rem(34);
                left: px2rem(129);
                color: $tip-color;
                font-size: px2rem(36);
                font-weight: bold;
                .sex {
                    width: px2rem(16);
                    height: px2rem(30);
                    padding-left: px2rem(16);
                }
            }
            .level {
                width: px2rem(44);
                height: px2rem(20);
                position: absolute;
                top: px2rem(84);
                left: px2rem(130);
            }
            button {
                position: absolute;
                top: px2rem(36);
                right: px2rem(32);
                width: px2rem(144);
                height: px2rem(66);
                background-color: $default-color;
                border-radius: px2rem(10);
            }
            .delFocus {
                color: $color-w;
                border: solid px2rem(2) $color-w;
            }
            .addFocus {
                color: $primary-color;
                border: solid px2rem(2) $primary-color;
            }
        }
        .manager {
            border: none;
            .name {
                color: $color-f;
            }
        }
        .mainData {
            display: -webkit-flex;
            display: flex;
            .data {
                flex: 1;
                text-align: center;
                p {
                    font-size: px2rem(36);
                    font-weight: bold;
                    padding: px2rem(31) 0 0;
                }
                .colorOne {
                    color: $color-w;
                }
                .colorTwo {
                    color: $primary-color;
                }
                .colorThree {
                    color: $label-color;
                }
                span {
                    font-size: px2rem(24);
                    color: $label-color;
                    line-height: px2rem(69);
                }
            }
        }
        .infoList {
            display: flex;
            line-height: px2rem(89);
            font-size: px2rem(28);
            margin-left: px2rem(32);
            border-bottom: px2rem(1) solid $backwater-no-btn;
            .title {
                width: 256px;
                flex: 1;
                color: $tip-color;
            }
            .DetailsTwo {
                max-width: px2rem(493);
                color: $label-color;
                padding: px2rem(31) px2rem(32) px2rem(31) 0;
                text-align: right;
                line-height: px2rem(28);
            }
            .Details {
                max-width: px2rem(493);
                color: $label-color;
                padding-right: px2rem(32);
                text-align: right;
            }
        }
        .infoList:last-child {
            border-bottom: none;
        }
    }
}
</style>