<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-09 08:36:40
 * @LastEditTime: 2019-10-09 10:05:47
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="noinfo">
        <div class="advBox">
            <div v-if="haveHot" class="adv-top">
                <div class="game-title">热门推荐</div>
                <div class="advScroll">
                    <ul class="clearfix">
                        <li @click="gameInto(item)" v-for="(item,index) in gamelist" :key="index">
                            <div class="game-pic">
                                <img v-lazy="cdnUrl+item.iconUrl" />
                                <img src="@/assets/img/game-icon/yxdt_lts.png" alt v-if="item.hasChat"
                                    class="pk-chat-icon" />
                            </div>
                            <div class="game-text">
                                <div class="top text-dots">{{item.gameName}}</div>
                                <div class="productName text-dots">{{item.productName}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <money-conversion :date="new Date().getTime()" :productName="productName"
                    :isShowTransInOrOut="isShowTransInOrOut" :apiTypeId="apiTypeId" :apiPlatform="apiPlatform"
                    :apiId="apiId" @on-closeBox="isShowTransInOrOut=false"></money-conversion>
            </div>
            <div class="adv-bottom" v-show="isAdv">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item, index) in swiperSlides" :key="index">
                        <img :src="item.advImg" alt @click="toLink(item)" />
                    </swiper-slide>
                </swiper>
                <span class="close" @click="closeadv">关闭</span>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getGameBanner,
    postAdvStatis,
    getHotGames,
    getImgUrl,
    openGame
} from "@/services/index";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { checkUrl } from "@/services/commonfn.js";
import { getContactus } from "@/services/center.js";
import MoneyConversion from "@/components/MoneyConversion";
export default {
    components: {
        swiper,
        swiperSlide,
        MoneyConversion
    },
    props: ["itype", "typeId"],
    data() {
        return {
            cdnUrl: "",
            haveHot: false,
            isAdv: true,
            gamelist: [],
            swiperOption: {
                autoplay: {
                    delay: 3000, //3秒切换一次
                    disableOnInteraction: false //，用户操作swiper之后自动切换不会停止，每次都会重新启动autoplay。
                },
                spaceBetween: "5%"
            },
            swiperSlides: [],
            contactusUrl: "",
            //-------额度转换-----
            isShowTransInOrOut: false,
            productName: "",
            platformName: "",
            selectGame: {},
            apiTypeId: 0,
            apiPlatform: "",
            apiId: ""
        };
    },
    computed: {
        Swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        console.log(123123);
        this.getHotGame();
        this.getCdnUrl();
        this.getContactuFunc();
    },
    methods: {
        closeadv: function() {
            this.isAdv = !this.isAdv;
        },
        getHotGame() {
            //itype-游戏类型ID 1 彩票 2 电子 3 视讯 4 棋牌 5 体育 1存款成功 2取款成功
            //typeId-广告类型 1=游戏广告 2=其他公告
            getGameBanner({
                itype: this.itype,
                typeId: this.typeId
            }).then(res => {
                if (res.success) {
                    this.swiperSlides = res.data;
                    this.isAdv = this.swiperSlides.length > 0;
                    //如果只有一个slide就销毁swiper
                    if (this.swiperSlides.length <= 1) {
                        this.Swiper.destroy();
                    }
                } else {
                    this.$toast.text(res.msg, {
                        cover: true,
                        duration: 4000
                    });
                }
            });
        },
        async getCdnUrl() {
            let cdnUrl = await getImgUrl();
            if (cdnUrl.data) {
                let result = await getHotGames();
                if (result.data) {
                    this.haveHot = true;
                    this.cdnUrl = cdnUrl.data + "/";
                    this.gamelist = result.data;
                }
            }
        },
        gameInto(item) {
            this.selectGame = {
                apiTypeId: item.typeId,
                apiPlatform: item.platformName,
                apiId: item.id
            };
            this.apiTypeId = item.typeId;
            this.apiPlatform = item.platformName;
            this.apiId = item.id;
            this.productName = item.productName;

            if (item.hasChat) {
                this.$router.push({
                    name: "chatList",
                    query: {
                        gameId: item.gameId,
                        platformId: item.platformId,
                        gameType: item.gameType
                    }
                });
            } else if (item.isChange === 1) {
                this.isShowTransInOrOut = true;
            } else {
                this.intoGame();
            }

            // let data = {
            //     platform: item.platformName,
            //     gameId: item.platformId + ""
            // };
            // openGame(data).then(res => {
            //     if (res.success) {
            // let loginUrl = res.data;
            // if (loginUrl) {
            //     if (loginUrl.indexOf("://") != -1) {
            //         window.open(
            //             loginUrl,
            //             "_blank",
            //             "toolbar=yes, width=1300, height=900"
            //         );
            //     } else {
            //         window.open(
            //             "http://" + loginUrl,
            //             "_blank",
            //             "toolbar=yes, width=1300, height=900"
            //         );
            //     }
            // }
            //     } else {
            //         this.$toast.text(res.msg, {
            //             cover: true,
            //             duration: 4000
            //         });
            //     }
            // });
        },
        /**
         * @description: 进入游戏
         * @return:
         */
        intoGame() {
            let data = {
                gameType: this.apiTypeId,
                platform: this.apiPlatform,
                gameId: this.apiId + ""
            };
            openGame(data).then(res => {
                if (res.success) {
                    if (res.data) {
                        // window.open(res.data, "_blank");
                        let loginUrl = res.data;
                        if (loginUrl) {
                            if (loginUrl.indexOf("://") != -1) {
                                window.open(
                                    loginUrl,
                                    "_blank",
                                    "toolbar=yes, width=1300, height=900"
                                );
                            } else {
                                window.open(
                                    "http://" + loginUrl,
                                    "_blank",
                                    "toolbar=yes, width=1300, height=900"
                                );
                            }
                        }
                    }
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1500
                    });
                }
            });
        },

        getContactuFunc() {
            getContactus().then(res => {
                if (res.success) {
                    let list = res.data;
                    if (list.length >= 5) {
                        list.map(item => {
                            if (item.itype == 6) {
                                this.contactusUrl = item.content;
                            }
                        });
                    }
                } else {
                    this.$toast.text(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            });
        },
        toLink(item) {
            let url = checkUrl(item.advUrl);
            if (item.isLink == 1) {
                //外链
                if (item.advUrl) {
                    if (item.advUrl.indexOf("://") != -1) {
                        window.open(item.advUrl);
                    } else {
                        window.open("http://" + item.advUrl);
                    }
                }
            } else {
                if (typeof url == "object") {
                    this.$router.push({
                        name: url.name,
                        query: {
                            id: url.id,
                            position: url.t
                        }
                    });
                } else {
                    //跳转到客服外链
                    if (url === "kefu") {
                        window.open(this.contactusUrl);
                    } else {
                        this.$router.push({
                            name: url
                        });
                    }
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.noinfo {
    .advBox {
        width: 100%;
        .adv-top {
            .game-title {
                padding-left: px2rem(30);
                font-size: px2rem(32);
                font-weight: bold;
                text-align: left;
                color: $tip-color;
                font-weight: 400;
            }
            .advScroll {
                width: 100%;
                height: auto;
                white-space: nowrap;
                overflow: hidden;
                overflow-x: scroll;
                /* 1 */
                -webkit-backface-visibility: hidden;
                -webkit-overflow-scrolling: touch;
                /* 2 */
                text-align: justify;
                /* 3 */
                &::-webkit-scrollbar {
                    display: none;
                }
                ul {
                    li {
                        display: inline-block;
                        margin: px2rem(22) 0 px2rem(30);
                        width: px2rem(186);
                        text-align: center;
                        font-size: px2rem(24);
                        .game-pic {
                            position: relative;
                            margin: 0 auto;
                            width: px2rem(124);
                            height: px2rem(124);
                            border-radius: 50%;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                            .pk-chat-icon {
                                position: absolute;
                                right: -px2rem(30);
                                width: px2rem(32);
                                height: px2rem(32);
                            }
                        }
                        .game-text {
                            margin-top: px2rem(20);
                            .top {
                                color: $tip-color;
                                height: px2rem(34);
                            }
                            .productName {
                                margin-top: px2rem(10);
                                color: $label-color;
                            }
                        }
                    }
                }
            }
        }
        .adv-bottom {
            position: relative;
            height: px2rem(240);
            width: 100%;
            .swiper-container,
            img {
                width: 100%;
                height: 100%;
            }
            .close {
                z-index: 999;
                position: absolute;
                top: px2rem(22);
                right: px2rem(30);
                display: block;
                width: px2rem(82);
                height: px2rem(48);
                line-height: px2rem(48);
                text-align: center;
                font-size: px2rem(24);
                color: $default-color;
                background-color: $color-N;
                border-radius: px2rem(10);
                opacity: 0.6;
            }
        }
    }
}
</style>
