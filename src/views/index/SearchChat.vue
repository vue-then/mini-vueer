<!--
 * @Description: 搜索聊天室列表
 * @Author: your name
 * @Date: 2019-10-01 13:12:21
 * @LastEditTime: 2019-10-07 12:06:59
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="pk-add-chat">
        <div class="pk-add-chat-box">
            <i class="iconfont icon-nav-back" @click="back()"></i>
            <div class="pk-search-chat">
                <img src="@/assets/img/chat-icon/icon_nav_search.png" alt="" class="">
                <input type="text" placeholder="请输入相关搜索" v-model="searchChat">
            </div>

        </div>
        <div class="pk-def-list" v-if="!searchChat">
            <div class="title" v-show="!searchChat">快捷入口</div>
            <div class="pk-in">
                <router-link tag="div" :to="{name:'deposit'}" class="pk-in-item">
                    <span>充值</span>
                </router-link>
                <router-link tag="div" :to="{name:'withdraw'}" class="pk-in-item">
                    <span>提现</span>
                </router-link>
                <router-link tag="div" :to="{name:'transfer'}" class="pk-in-item">
                    <span>额度转换</span>
                </router-link>
                <router-link tag="div" :to="{name:'activity'}" class="pk-in-item">
                    <span>优惠活动</span>
                </router-link>

            </div>
            <div class="title" v-show="!searchChat">热门推荐</div>
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="toGame(item,1)">
                    <img :src="item.img" alt class="pk-game-logo" />
                    <img src="../../assets/img/game-icon/yxdt_lts.png" alt v-if="item.hasChat" class="pk-chat-icon" />
                    <p>{{item.productName}}</p>
                </li>
            </ul>
        </div>
        <div class="list" v-if="searchChat">
            <ul class="pk-1px-b">
                <li v-for="(item,index) in chatList" :key="index" @click="goChat(item)">
                    <Item :item="item" />
                </li>
            </ul>
        </div>
        <!--额度转换弹框 -start -->
        <nut-dialog title="额度转换" customClass="pk-dialog-transfer" :visible="isShowTransInOrOut" :lockBgScroll="true"
            :closeOnClickModal="false" :noFooter="true" @close="isShowTransInOrOut=false">
            <div class="changers">
                <div class="left">
                    <div class="tit">系统余额</div>
                    <div class="moneys">¥{{walletBalance | currency('',2)}}</div>
                </div>
                <div class="mid">
                    <div class="tit">
                        转入
                        <i>
                            <img src="../../assets/img/my-icon/icons/transfer/icon_mine_edzh_zr.png" alt="zr" />
                        </i>
                    </div>
                </div>
                <div class="right">
                    <div class="tit">{{productName}}</div>
                    <div class="moneys">¥{{platformBalance | currency('',2)}}</div>
                </div>
            </div>
            <div class="money">
                <div class="label">转入金额</div>
                <div class="money-input">
                    <div class="num">
                        <input type="number" maxlength="10" placeholder="请输入转入金额" v-model.number="transferAmount" />
                        <span>.00</span>
                    </div>
                </div>
            </div>
            <p class="in-money-chinese">{{moneyChinese}}</p>

            <nut-row class="fast-money" :gutter="5">
                <nut-col :span="6" v-for="(item,index) in fastMoneyList" :key="index"
                    :class="{'active':fastMoneyIndex === index,'money-disabled': walletBalance * 1 < item *1 }"
                    @click.native="handleFast(index)">
                    <div class="fast-money-item">{{item}}</div>
                </nut-col>
            </nut-row>

            <div class="btns">
                <div class="cancel" @click="intoGame(selectGame)">直接进入</div>
                <div class="sure" @click="transferSubmit()">转帐进入</div>
            </div>
            <div class="pk-close-box" @click="isShowTransInOrOut=false">
                <img src="../../assets/img/game-icon/gb.png" alt />
            </div>
        </nut-dialog>
        <!--额度转换弹框 -end -->
    </div>
</template>
<script>
import Item from "@/views/index/component/Item";
import {
    searchChat,
    getApplication,
    getPopularGames,
    getGroupChatList
} from "@/services/im/chat";
import func from "@/services/deposit";
import { getInfo } from "../../services/auth.js";
import { getImgUrl, openGame } from "@/services/index";
export default {
    components: {
        Item
    },
    name: "index",
    data() {
        return {
            //聊天室
            chatOldList: [],
            chatList: [],
            list: [],
            searchChat: "",
            //-------额度转换-----
            freeWalletSwitch: 1, //钱包模式  1: 免转钱包 2:多钱包
            platformList: [],
            walletBalance: 0,
            platformBalance: 0,
            transferAmount: "", //转入转出金额
            moneyChinese: "零", //转入,转出金额中文大写
            isShowTransInOrOut: false,
            fastMoneyIndex: "",
            fastMoneyList: ["全部", 50000, 10000, 5000, 1000, 500, 200, 100],
            productName: "",
            platformName: ""
        };
    },
    mounted() {
        this.getImgUrlFunc();
        this.getList();
        this.getGroupChatListFunc();
        this.$(".nut-dialog-btn").removeClass("nut-dialog-ok");
    },
    watch: {
        searchChat(newVal) {
            if (newVal) {
                this.searchChatFunc();
            }
        },
        transferAmount(newVal, oldVal) {
            if (newVal >= this.walletBalance) {
                this.transferAmount = this.walletBalance;
                this.fastMoneyIndex = 0;
                this.moneyChinese = newVal
                    ? this.filterAmount(newVal * 1)
                    : "零";
                return;
            }
            this.moneyChinese = newVal ? this.filterAmount(newVal * 1) : "零";
            let idx = -1;
            for (var i = 0; i < this.fastMoneyList.length; i++) {
                if (this.fastMoneyList[i] == newVal) {
                    idx = i;
                }
            }
            if (idx == -1) {
                this.fastMoneyIndex = "";
            } else {
                this.fastMoneyIndex = idx;
            }
        }
    },
    methods: {
        /**
         * @description: 获取游戏图标域名
         * @return: 游戏图标域名
         */
        getImgUrlFunc() {
            getImgUrl().then(res => {
                if (res.success) {
                    this.gameImgUrl = res.data || [];
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1500
                    });
                }
            });
        },
        /**
         * @description: 获取推荐群聊
         * @return: 推荐群聊列表
         */
        async getList() {
            let res = await getPopularGames();
            if (res.success) {
                this.list = res.data;
                this.list.map(item => {
                    item.img =
                        item.iconUrl.indexOf("http") > -1
                            ? item.iconUrl
                            : this.gameImgUrl + "/" + item.iconUrl;
                });
            }
        },
        /**
         * @description: 聊天室列表
         * @param {type}
         * @return:
         */
        async getGroupChatListFunc() {
            let data = {
                gameType: 0,
                platformId: 0,
                gameId: ""
            };
            let res = await getGroupChatList(data);
            if (res.success) {
                this.chatOldList = res.data;
                this.chatOldList.map(item => {
                    item.img = item.logo;
                    item.top = item.name;
                    item.left = item.productName;
                    item.right = item.lowestLevelName + "级以上进入";
                    item.bottom = item.onlineMember + "人在线";
                    item.isCp = true;
                });
            } else {
                this.$toast.fail(res.message, {
                    cover: true,
                    duration: 1500
                });
            }
        },
        /**
         * @description: 搜索群聊
         * @return: 搜索结果
         */

        async searchChatFunc() {
            this.chatList = [];
            this.chatOldList.map(item => {
                if (item.top.indexOf(this.searchChat) > -1) {
                    this.chatList.push(item);
                }
            });
        },
        /**
         * @description:
         * @param {obj} 想要加入的群聊
         * @return:
         */
        async addChat(item) {
            let data = {
                roomId: item.id
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
         * @description:
         * @param {obj} item: 当前选择的聊天室
         * @return:
         */

        goChat(item) {
            sessionStorage.setItem(
                "chatInfo",
                encodeURIComponent(JSON.stringify(item))
            );
            this.$router.push({
                name: "chat",
                query: {
                    id: item.id,
                    roomType: 1,
                    name: item.name
                }
            });
        },

        /**
         * @description: 返回至群聊列表
         * @return:
         */
        back() {
            this.$router.go(-1);
        },
        /**
         * @description: 进入游戏、聊天室
         * @param {obj} item:  当前选择的游戏
         * @param {init} type: 1 热门推荐 2 最近玩过
         * @return:
         */
        async toGame(item, type) {
            //isChange :1 开启额度转换 2
            console.log(item);
            this.selectGame = {
                apiTypeId: item.typeId,
                apiPlatform: item.platformName,
                apiId: item.id
            };
            if (item.isChange === 1) {
                let res = await getInfo();
                if (res.success) {
                    if (res.data) {
                        let platformList = res.data.user.apis;
                        this.walletBalance = res.data.user.balance; //钱包余额
                        platformList.map(gameApi => {
                            if (item.platformId == gameApi.apiId) {
                                this.isShowTransInOrOut = true;
                                this.platformBalance = gameApi.balance;
                                this.platformName = item.platformName;
                                this.productName = item.productName;
                            }
                        });
                    }
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 4000
                    });
                }
            } else if (item.hasChat || type === 2) {
                this.$router.push({
                    name: "chatList",
                    query: {
                        gameId: item.gameId,
                        platformId: item.platformId,
                        gameType: item.gameType
                    }
                });
            } else {
                this.intoGame(this.selectGame);
            }
        },
        /**
         * @description: 快捷选择转换金额
         * @param {init}  index: 当前选中的快捷金额
         * @return: 改变选中金额和快捷金额样式
         */
        handleFast(index) {
            if (this.fastMoneyList[index] > this.walletBalance) {
                return;
            }
            this.fastMoneyIndex = index;
            if (index == 0) {
                this.transferAmount = this.walletBalance;
            } else {
                this.transferAmount = this.fastMoneyList[index];
            }
        },
        /**
         * @description: 进入游戏
         * @param {obj} game: 当前游戏
         * @return:
         */
        intoGame(game) {
            console.log(game);

            let data = {
                gameType: game.apiTypeId,
                platform: game.apiPlatform,
                gameId: game.apiId + ""
            };
            openGame(data).then(res => {
                if (res.success) {
                    if (res.data) {
                        window.open(res.data, "_blank");
                    }
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1500
                    });
                }
            });
        },
        /**
         * @description:  额度转换
         * @return:
         */
        transferSubmit() {
            let postData = {
                doType: 2,
                gameType: this.selectGame.apiTypeId,
                transferAmount: this.transferAmount,
                transferIntoId: this.selectGame.apiPlatformId,
                transferInto: this.selectGame.apiPlatform
            };

            if (!postData.transferAmount) {
                this.$toast.fail("请输入转换金额", { cover: true });
                return;
            }
            if (/\D/.test(postData.transferAmount)) {
                this.$toast.fail("转换金额必须是数字", { cover: true });
                return;
            }
            func.transfersMoney(postData).then(res => {
                if (res.success) {
                    this.$toast.success("转换成功", { cover: true });
                    this.walletBalance -= this.transferAmount;
                    this.platformBalance += this.transferAmount;
                    setTimeout(() => {
                        this.intoGame(this.selectGame);
                    }, 1200);
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 2000
                    });
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
.pk-add-chat {
    .pk-add-chat-box {
        height: px2rem(88);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99;
        display: flex;
        align-items: center;
        padding: 0 px2rem(32);
        box-sizing: border-box;
        background: $default-color;
        text-align: left;
        .iconfont {
            margin-right: px2rem(24);
            font-size: px2rem(44);
            vertical-align: middle;
        }
        .pk-search-chat {
            position: relative;
            width: 100%;
            height: px2rem(60);
            img {
                position: absolute;
                top: 50%;
                left: px2rem(20);
                transform: translate(0, -50%);
                color: $label-color;
                width: px2rem(32);
                height: px2rem(32);
            }
            input {
                width: 100%;
                height: px2rem(60);
                background: $add-chat-input;
                border-radius: px2rem(10);
                border: 0;
                font-size: px2rem(28);
                padding-left: px2rem(80);
                box-sizing: border-box;
            }
        }
    }
    .pk-def-list {
        padding: 0 px2rem(32);
        box-sizing: border-box;
        height: 100%;
        background: $default-bg-color;
        .title {
            margin: px2rem(48) 0;
            // line-height: px2rem(80);
            // padding-left: px2rem(32);
            font-size: px2rem(24);
            color: $label-color;
            text-align: center;
        }
        .pk-in {
            .pk-in-item {
                margin-bottom: px2rem(50);
                display: inline-block;
                width: 50%;
                text-align: center;
                font-size: px2rem(28);
                color: $primary-color;
                line-height: 1;
                &:nth-child(2n-1) {
                    position: relative;
                    &::before {
                        content: "";
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: px2rem(2);
                        height: px2rem(30);
                        background: $label-color;
                    }
                }
            }
        }
        li {
            position: relative;
            margin-bottom: px2rem(48);
            display: inline-block;
            width: 25%;
            text-align: center;
            line-height: 1;
            .pk-game-logo {
                width: px2rem(96);
                height: px2rem(96);
                border-radius: 50%;
                box-shadow: 0 px2rem(3) px2rem(6) 0 rgba(0, 0, 0, 0.1);
            }
            .pk-chat-icon {
                position: absolute;
                right: px2rem(24);
                top: -px2rem(10);
                width: px2rem(24);
                height: px2rem(24);
            }
            p {
                margin-top: px2rem(15);
                font-size: px2rem(20);
                color: $tip-color;
            }
        }
    }
}
@import "../games/games.scss";
</style>