<!--
 * @Description: 聊天室列表
 * @Author: your name
 * @Date: 2019-10-01 13:12:21
 * @LastEditTime: 2019-10-09 12:23:12
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div>
        <Header title="聊天室列表"></Header>
        <div class="list">
            <ul class="pk-1px-b">
                <li v-for="(item,index) in chatList" :key="index" @click="goChat(item)">
                    <Item :item="item" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header";
import Item from "@/views/index/component/Item";
import { getGroupChatList } from "@/services/im/chat";
export default {
    components: {
        Header,
        Item
    },
    name: "index",
    data() {
        return {
            chatList: [],
            gameType: 0,
            platformId: 0,
            gameId: ""
        };
    },
    mounted() {
        this.gameType = this.$route.query.gameType * 1;
        this.platformId = this.$route.query.platformId * 1;
        this.gameId = this.$route.query.gameId;
        this.getGroupChatListFunc();
    },
    methods: {
        /**
         * @description: 聊天室列表
         * @param {type}
         * @return:
         */
        async getGroupChatListFunc() {
            let data = {
                gameType: this.gameType,
                platformId: this.platformId,
                gameId: this.gameId
            };
            let res = await getGroupChatList(data);
            if (res.success) {
                this.chatList = res.data;
                this.chatList.map(item => {
                    item.img = item.logo;
                    item.top = item.name;
                    item.left = item.productName;
                    item.right = item.lowestLevelName + "级以上进入";
                    item.bottom = item.onlineMember + "人在线";
                    item.isCp = true;
                });
                // if(this.chatList.length == 1){
                //     this.goChat(this.chatList[0]);
                // }
                // console.log(this.chatList);
            } else {
                this.$toast.fail(res.message, {
                    cover: true,
                    duration: 1500
                });
            }
        },
        /**
         * @description:
         * @param {obj} item: 当前选择的聊天室
         * @return:
         */

        goChat(item) {
            sessionStorage.setItem('chatInfo',encodeURIComponent(JSON.stringify(item)));
            this.$router.push({
                name: "chat",
                query: {
                    id: item.id,
                    roomType: 1,
                    name: item.name
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
.list {
    padding-top: px2rem(24);
    padding-bottom: px2rem(24);
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
}
</style>