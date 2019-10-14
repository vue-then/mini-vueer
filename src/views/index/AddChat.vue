<!--
 * @Description: 添加群聊
 * @Author: your name
 * @Date: 2019-10-01 13:12:21
 * @LastEditTime: 2019-10-02 16:46:48
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="pk-add-chat">
        <div class="pk-add-chat-box">
            <i class="iconfont icon-nav-back" @click="back()"></i>
            <div class="pk-search-chat">
                <img src="@/assets/img/chat-icon/icon_nav_search.png" alt="" class="">
                <input type="text" placeholder="请输入群聊名称或ID" v-model="searchChat">
            </div>

        </div>
        <div class="list">
            <div class="title" v-show="!searchChat">推荐群聊</div>
            <ul class="pk-1px-b">
                <li v-for="(item,index) in list" :key="index">
                    <div class="item" @click="getInfo(item)">
                        <div class="item-logo">
                            <img :src="item.logo" alt />
                        </div>
                        <div class="item-body pk-1px-b">
                            <div class="item-body-one">
                                <span class="top text-dots">{{item.name}}</span>
                            </div>
                            <div class="item-body-right add" v-if="!item.isExisted || item.isExisted == 2"
                                @click.stop="addChat(item)">
                                加入
                            </div>
                            <div class="item-body-right added" v-if="item.isExisted == 1">
                                已加入
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    getRecommendChat,
    searchChat,
    getApplication
} from "@/services/im/chat";
export default {
    components: {},
    name: "index",
    data() {
        return {
            recommendChatList: [],
            list: [],
            searchChat: ""
        };
    },
    mounted() {
        this.getList();
        this.$(".nut-dialog-btn").removeClass("nut-dialog-ok");
    },
    watch: {
        searchChat(newVal) {
            if (newVal) {
                this.searchChatFunc();
            } else {
                this.list = this.recommendChatList;
            }
        }
    },
    methods: {
        /**
         * @description: 获取推荐群聊
         * @return: 推荐群聊列表
         */
        async getList() {
            let res = await getRecommendChat();
            if (res.success) {
                this.recommendChatList = res.data;
                this.list = this.recommendChatList;
            }
        },
        /**
         * @description: 搜索群聊
         * @return: 搜索结果
         */

        async searchChatFunc() {
            let data = {
                searchContent: this.searchChat
            };
            let res = await searchChat(data);
            if (res.success) {
                this.list = res.data;
            } else {
                this.$toast.fail(res.message, {
                    cover: true,
                    duration: 1500
                });
            }
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
         * @description: 群聊详情
         * @return:
         */
        getInfo(item) {
            this.$router.push({
                name: "chatInfo",
                query: { id: item.id, isExisted: item.isExisted }
            });
        },
        /**
         * @description: 返回至群聊列表
         * @return:
         */
        back() {
            this.$router.go(-1);
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
    .list {
        height: 100%;
        background: $default-bg-color;
        .title {
            line-height: px2rem(80);
            padding-left: px2rem(32);
            font-size: px2rem(24);
            color: $label-color;
        }
        .more {
            line-height: px2rem(88);
            text-align: center;
            color: $color-w;
            background: $default-color;
        }
        .pk-add-chat {
            background: $default-color;
            position: relative;
            padding: px2rem(22) px2rem(32);
            box-sizing: border-box;
            img {
                vertical-align: middle;
                width: px2rem(44);
                height: px2rem(44);
            }
            span {
                margin-left: px2rem(25);
                vertical-align: middle;
                font-size: px2rem(28);
                color: $tip-color;
            }
            i {
                position: absolute;
                right: px2rem(32);
                top: 50%;
                transform: translate(0, -50%);
                vertical-align: middle;
                font-size: px2rem(24);
                color: $label-color;
            }
        }
        .item {
            height: px2rem(138);
            display: flex;
            background: $default-color;
            position: relative;

            .item-logo {
                width: px2rem(152);
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                img {
                    width: px2rem(96);
                    height: px2rem(96);
                    display: block;
                    border-radius: 50%;
                    box-shadow: 0 px2rem(3) px2rem(6) 0 rgba(0, 0, 0, 0.1);
                }
            }

            .item-body {
                flex: 1;
                padding: px2rem(20) px2rem(32) px2rem(20) 0;

                .item-body-one {
                    padding-right: px2rem(120);
                    box-sizing: border-box;
                    overflow: hidden;
                    // text-emphasis: ;
                    font-size: px2rem(28);
                    color: $tip-color;
                    font-weight: bold;
                    line-height: px2rem(98);
                }

                .item-body-right {
                    position: absolute;
                    top: 50%;
                    right: px2rem(32);
                    transform: translate(0, -50%);
                    width: px2rem(116);
                    height: px2rem(66);
                    text-align: center;
                    line-height: px2rem(66);
                    color: $default-color;
                    font-size: px2rem(28);
                    border-radius: px2rem(10);
                    &.add {
                        background-image: linear-gradient(
                                -35deg,
                                $primary-color 0%,
                                $add-chat-btn 100%
                            ),
                            linear-gradient($forminput-color, $forminput-color);
                        background-blend-mode: normal, normal;
                        box-shadow: 0px px2rem(2) px2rem(5) 0px
                            rgba(80, 168, 182, 0.3);
                    }
                    &.added {
                        background: $backwater-no-btn;
                    }
                }
            }
        }
    }
}
</style>