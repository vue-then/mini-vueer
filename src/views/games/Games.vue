<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-26 08:55:04
 * @LastEditTime: 2019-10-09 12:44:30
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="content">
        <Header title="游戏大厅" :showLeftIcon="false"></Header>
        <div class="pk-game-lsit">
            <!-- banner -->
            <div class="pk-banner">
                <swiper :options="swiperOptionBanner" ref="swiperOptionBanner">
                    <swiper-slide v-for="(item, index) in bannerImg" :key="index">
                        <img :src="item.imgUrl" @click="toLink(item)" />
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <!-- banner  END -->
            <div class="pk-game-box">
                <!-- 六大视讯导航 -->
                <nav class="pk-game-nav">
                    <ul>
                        <li v-for="(type, index) in gameList" :key="index" :class="{ active: gameNavActive == index && (type.apiType == 1 || type.apiType == 2 || type.apiType == 4), 
                            'active-other': gameNavActive == index && (type.apiType != 1 && type.apiType != 2)}"
                            @click="changeType(type, index)">
                            <div class="pk-game-nav-imgStyle">
                                <img :src="type.icon" alt v-if="index != gameNavActive" />
                                <img :src="type.activeIcon" alt v-if="index == gameNavActive" />
                                <img src="../../assets/img/game-icon/yxdt_lts.png" alt v-if="type.hasChat"
                                    class="pk-chat-icon" />
                            </div>
                            <p>{{ type.name }}</p>
                        </li>
                    </ul>
                </nav>
                <!-- 六大视讯导航  END-->
                <div class="pk-game-type-list">
                    <!-- 彩票 、 电子 、棋牌 -->
                    <div
                        v-if="gameTypeListActive.apiType == 1 || gameTypeListActive.apiType == 2 || gameTypeListActive.apiType == 4">
                        <div class="pk-game-secondary-nav">
                            <swiper :options="swiperOptionv1">
                                <swiper-slide v-for="(game, idx) in gameTypeListActive.siteApis" :key="idx"
                                    class="game-type-nav-item" :class="{'game-type-active': gameTypeActive == idx }">
                                    <div @click="selectGameType(idx, game,true)" class="pk-game-secondary-nav-item">
                                        <img src="../../assets/img/game-icon/yxdt_lts.png" alt v-if="game.hasChat"
                                            class="pk-chat-icon" />
                                        <span>{{ game.name }}</span>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                        <div class="pk-game-list" v-show="!hasChangeGameType">
                            <!-- 彩票 -->
                            <div v-if="gameTypeListActive.apiType == 1">
                                <div v-for="(gameChild,idx) in gameTypeActiveList.gameList" :key="idx"
                                    class="pk-game-item" @click="toPlay(gameTypeActiveList, gameChild)">
                                    <img src="../../assets/img/game-icon/yxdt_fb_wh.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.whStatus == 2 || gameChild.isWh == 1" />

                                    <img src="../../assets/img/game-icon/yxdt_fb_hot.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.whStatus != 2 &&  gameChild.isWh != 1  &&  gameChild.hot == 1" />
                                    <!-- 
                                    <img src="../../assets/img/game-icon/yxdt_fb_djsw.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.swHref && (gameTypeActiveList.whStatus != 2 ||  gameChild.isWh != 1 ) && gameChild.hot != 1" /> -->
                                    <div class="pk-game-icon-style">
                                        <img src="../../assets/img/game-icon/yxdt_lts.png" alt v-if="gameChild.hasChat"
                                            class="pk-chat-icon" />
                                        <img v-lazy="gameImgUrl+'/'+gameTypeActiveList.apiPlatform+'/'+gameChild.fcType+'.png'"
                                            alt v-if="gameTypeActiveList.apiTypeId == 1 && !hasChangeGameType"
                                            class="pk-game-icon" />
                                        <img v-lazy="gameImgUrl+'/'+gameTypeActiveList.apiPlatform+'q/'+gameChild.image"
                                            alt v-if="gameTypeActiveList.apiTypeId == 4 && !hasChangeGameType"
                                            class="pk-game-icon" />

                                    </div>
                                    <p>{{ gameChild.aspiName }}</p>
                                </div>
                            </div>
                            <!-- 电子 -->
                            <div v-if="gameTypeListActive.apiType == 2">
                                <div v-for="(gameChild,idx) in gameTypeActiveList.gameList" :key="idx"
                                    class="pk-game-item pk-game-item-other"
                                    @click="toPlay(gameTypeActiveList, gameChild)">
                                    <img src="../../assets/img/game-icon/yxdt_fb_wh.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.whStatus == 2 || gameChild.isWh == 1" />

                                    <img src="../../assets/img/game-icon/yxdt_fb_hot.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.whStatus != 2 &&  gameChild.isWh != 1  &&  gameChild.hot == 1" />

                                    <!-- <img src="../../assets/img/game-icon/yxdt_fb_djsw.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.swHref && (gameTypeActiveList.whStatus != 2 ||  gameChild.isWh != 1 ) && gameChild.hot != 1" /> -->
                                    <div class="pk-game-icon-style">
                                        <img src="../../assets/img/game-icon/yxdt_lts.png" alt v-if="gameChild.hasChat"
                                            class="pk-chat-icon" />
                                        <img v-lazy="gameImgUrl+'/'+gameTypeActiveList.apiPlatform+'/'+gameChild.image"
                                            alt="" class="pk-game-icon" v-if="!hasChangeGameType">
                                        <!-- <img v-lazy="gameChild.image" alt="" v-if="gameClassId == 217"
                                            class="game-icon"> -->
                                    </div>
                                    <p>{{ gameChild.name }}</p>
                                </div>

                            </div>
                            <!-- 棋牌 -->
                            <div v-if="gameTypeListActive.apiType == 4">
                                <div v-for="(gameChild,idx) in gameTypeActiveList.gameList" :key="idx"
                                    class="pk-game-item pk-game-item-other"
                                    @click="toPlay(gameTypeActiveList, gameChild)">
                                    <img src="../../assets/img/game-icon/yxdt_fb_wh.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.whStatus == 2 || gameChild.isWh == 1" />

                                    <img src="../../assets/img/game-icon/yxdt_fb_hot.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.whStatus != 2 &&  gameChild.isWh != 1  &&  gameChild.hot == 1" />

                                    <!-- <img src="../../assets/img/game-icon/yxdt_fb_djsw.png" alt class="pk-play-icon"
                                        v-if="gameTypeActiveList.swHref && (gameTypeActiveList.whStatus != 2 ||  gameChild.isWh != 1 ) && gameChild.hot != 1" /> -->
                                    <div class="pk-game-icon-style">
                                        <img src="../../assets/img/game-icon/yxdt_lts.png" alt v-if="gameChild.hasChat"
                                            class="pk-chat-icon" />
                                        <img v-lazy="gameImgUrl+'/'+gameTypeActiveList.apiPlatform+'/'+gameChild.fcType+'.png'"
                                            alt v-if="gameTypeActiveList.apiTypeId == 1 && !hasChangeGameType"
                                            class="pk-game-icon" />
                                        <img v-lazy="gameImgUrl+'/'+gameTypeActiveList.apiPlatform+'q/'+gameChild.image"
                                            alt v-if="gameTypeActiveList.apiTypeId == 4 && !hasChangeGameType"
                                            class="pk-game-icon" />

                                    </div>
                                    <p>{{ gameChild.aspiName }}</p>
                                </div>

                            </div>
                            <!-- 没有游戏数据 -->
                            <div v-if="!gameTypeActiveList.gameList || gameTypeActiveList.gameList.length <=0 "
                                class="pk-games-none">
                                <img src="../../assets/img/game-icon/none.png" alt="">
                                <p>暂无游戏</p>
                            </div>
                        </div>
                    </div>
                    <!-- 彩票 、 电子 、棋牌  END -->
                    <!-- 体育 -->
                    <div v-if="gameTypeListActive.apiType == 5" class="pk-ty-games">
                        <ul>
                            <li class="pk-by-game-item" v-for="(byGame,index) in gameTypeListActive.siteApis"
                                :key="index" :style="{backgroundImage:'url('+tybgArr[index%tybgArr.length]+')'}">
                                <img src="../../assets/img/game-icon/yxdt_fb_wh.png" alt class="pk-play-icon"
                                    v-if="byGame.whStatus == 2" />
                                <img src="../../assets/img/game-icon/yxdt_fb_hot.png" alt class="pk-play-icon"
                                    v-if="byGame.hot == 1 && byGame.whStatus != 2 " />
                                <!-- <img src="../../assets/img/game-icon/yxdt_fb_djsw.png" alt class="pk-play-icon"
                                    v-if="byGame.swHref && byGame.whStatus != 2 &&  byGame.hot != 1" /> -->
                                <img v-lazy="gameImgUrl+'/'+byGame.apiPlatform+'/'+byGame.apiPlatform+'.png'" alt
                                    class="pk-by-game-icon">
                                <span>{{  byGame.name}}</span>
                                <img src="../../assets/img/game-icon/yxdt_lts2.png" alt v-if="byGame.hasChat"
                                    class="pk-chat-icon" />
                                <div class="pk-by-play-btn" @click="toPlayGame(byGame)">点击进入</div>
                            </li>
                        </ul>
                        <!-- 没有游戏数据 -->
                        <div v-if="gameTypeListActive.siteApis.length <=0 " class="pk-games-none">
                            <img src="../../assets/img/game-icon/none.png" alt="">
                            <p>暂无游戏</p>
                        </div>
                    </div>
                    <!-- 体育  END-->
                    <!-- 真人视讯 -->
                    <div v-if="gameTypeListActive.apiType == 3" class="pk-zr-games">
                        <ul>
                            <li class="pk-zr-game-item" v-for="(zrGame,index) in gameTypeListActive.siteApis"
                                :key="index">
                                <img :src="sxbgArr[index%sxbgArr.length]" alt="" class="pk-zr-game-item-bg">
                                <div class="pk-zr-game-item-style">

                                    <img src="../../assets/img/game-icon/yxdt_fb_wh.png" alt class="pk-play-icon"
                                        v-if="zrGame.whStatus == 2" />
                                    <img src="../../assets/img/game-icon/yxdt_fb_hot.png" alt class="pk-play-icon"
                                        v-if="zrGame.hot == 1 && zrGame.whStatus != 2 " />
                                    <!-- <img src="../../assets/img/game-icon/yxdt_fb_djsw.png" alt class="pk-play-icon"
                                        v-if="zrGame.swHref && zrGame.whStatus != 2 &&  zrGame.hot != 1" /> -->
                                    <span>{{ zrGame.name}}</span>
                                    <div class="pk-zr-play-btn" @click="toPlayGame(zrGame)">点击进入</div>
                                    <img src="../../assets/img/game-icon/yxdt_lts2.png" alt v-if="zrGame.hasChat"
                                        class="pk-chat-icon" />
                                </div>
                            </li>
                        </ul>
                        <!-- 没有游戏数据 -->
                        <div v-if="gameTypeListActive.siteApis.length <=0 " class="pk-games-none mt-32">
                            <img src="../../assets/img/game-icon/none.png" alt="">
                            <p>暂无游戏</p>
                        </div>
                    </div>
                    <!-- 真人视讯  END-->
                    <!-- 捕鱼 -->
                    <div v-if="gameTypeListActive.apiType == 6" class="pk-by-games">
                        <ul>
                            <li class="pk-by-game-item" v-for="(byGame,index) in gameTypeListActive.siteApis"
                                :key="index">
                                <img src="../../assets/img/game-icon/yxdt_fb_wh.png" alt class="pk-play-icon"
                                    v-if="byGame.whStatus == 2" />
                                <img src="../../assets/img/game-icon/yxdt_fb_hot.png" alt class="pk-play-icon"
                                    v-if="byGame.hot == 1 && byGame.whStatus != 2 " />
                                <!-- <img src="../../assets/img/game-icon/yxdt_fb_djsw.png" alt class="pk-play-icon"
                                    v-if="byGame.swHref && byGame.whStatus != 2 &&  byGame.hot != 1" /> -->
                                <img v-lazy="gameImgUrl+'/'+byGame.apiPlatform+'/'+byGame.apiPlatform+'.png'" alt
                                    class="pk-by-game-icon">
                                <span>{{  byGame.name}}</span>
                                <img src="../../assets/img/game-icon/yxdt_lts.png" alt v-if="byGame.hasChat"
                                    class="pk-chat-icon" />
                                <div class="pk-by-play-btn" @click="toPlayGame(byGame)">点击进入</div>
                            </li>
                        </ul>
                        <!-- 没有游戏数据 -->
                        <div v-if="gameTypeListActive.siteApis.length <=0 " class="pk-games-none">
                            <img src="../../assets/img/game-icon/none.png" alt="">
                            <p>暂无游戏</p>
                        </div>
                    </div>
                    <!-- 捕鱼  END-->
                </div>
            </div>
            <money-conversion :date="new Date().getTime()" :productName="productName"
                :isShowTransInOrOut="isShowTransInOrOut" :apiTypeId="apiTypeId" :apiPlatform="apiPlatform"
                :apiId="apiId" @on-closeBox="isShowTransInOrOut=false"></money-conversion>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MoneyConversion from "@/components/MoneyConversion";
import tyIcon from "@/assets/img/game-icon/yxdt_ty.png";
import dzIcon from "@/assets/img/game-icon/yxdt_dz.png";
import zrIcon from "@/assets/img/game-icon/yxdt_zr.png";
import cpIcon from "@/assets/img/game-icon/yxdt_cp.png";
import qpIcon from "@/assets/img/game-icon/yxdt_qp.png";
import byIcon from "@/assets/img/game-icon/yxdt_by.png";

import tyLightIcon from "@/assets/img/game-icon/yxdt_ty_light.png";
import dzLightIcon from "@/assets/img/game-icon/yxdt_dz_light.png";
import zrLightIcon from "@/assets/img/game-icon/yxdt_zr_light.png";
import cpLightIcon from "@/assets/img/game-icon/yxdt_cp_light.png";
import qpLightIcon from "@/assets/img/game-icon/yxdt_qp_light.png";
import byLightIcon from "@/assets/img/game-icon/yxdt_by_light.png";
//-------导入视讯背景图---------
const sxbgArr = [];
for (let i = 0; i < 20; i++) {
    sxbgArr[i] = require(`@/assets/img/game-icon/yxdt_sx${
        i < 9 ? `0${i + 1}` : i + 1
    }.png`);
}
//------体育背景图片------
const tybgArr = [];
for (let i = 0; i < 3; i++) {
    tybgArr[i] = require(`@/assets/img/game-icon/yxdt_ty0${i + 1}.png`);
}

import {
    getCarouse,
    getGameList,
    getImgUrl,
    getDzGameList,
    openGame
} from "@/services/index.js";
import { getInfo } from "../../services/auth.js";
import func from "@/services/deposit";

import { checkUrl } from "@/services/commonfn.js";
export default {
    name: "games",
    components: {
        Header,
        Footer,
        MoneyConversion
    },
    computed: {
        swiper() {
            return this.$refs.swiperOptionBanner.swiper;
        }
    },
    data() {
        return {
            swiperOptionBanner: {
                init: false,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                }
            },
            bannerImg: [],
            contactusUrl: "",
            //----game----
            gameList: [],
            gameNavActive: 0,
            gameTypeListActive: {},
            //------厂商二级导航-----
            swiperOptionv1: {
                slidesPerView: 4,
                freeMode: true
            },
            gameTypeActive: 0,
            gameTypeActiveList: [],
            hasChangeGameType: false,
            //-------视讯背景图------
            sxbgArr,
            tybgArr,
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
    watch: {},
    mounted() {
        this.getImgUrlFunc();
        this.getCarouseFunc();
        this.getGameListFunc();
    },
    updated() {
        this.swiper.init();
    },
    methods: {
        /**
         * @description: 获取公告+banner
         * @return: banner数据列表
         */
        getCarouseFunc() {
            getCarouse().then(res => {
                if (res.success) {
                    this.bannerImg = res.data.banner || [];
                    this.popNotice = res.data.phoneDialog || [];
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1500
                    });
                }
            });
        },
        /**
         * @description: 获取游戏列表
         * @return: 游戏列表数据，游戏导航
         */
        getGameListFunc() {
            this.showLoading = true;
            const _this = this;
            getGameList().then(res => {
                if (res.success) {
                    this.gameList = res.data || [];
                    /**
                     * 通过不同的apiType赋予对应的名称和icon以及选中的icon字段
                     */
                    this.gameList.map(item => {
                        switch (item.apiType) {
                            case 5:
                                item.name = "体育";
                                item.icon = tyIcon;
                                item.activeIcon = tyLightIcon;
                                break;
                            case 2:
                                item.name = "电子";
                                item.icon = dzIcon;
                                item.activeIcon = dzLightIcon;
                                break;
                            case 3:
                                item.name = "视讯";
                                item.icon = zrIcon;
                                item.activeIcon = zrLightIcon;
                                break;

                            case 4:
                                item.name = "棋牌";
                                item.icon = qpIcon;
                                item.activeIcon = qpLightIcon;
                                break;
                            case 6:
                                item.name = "捕鱼";
                                item.icon = byIcon;
                                item.activeIcon = byLightIcon;
                                break;
                            case 1:
                                item.name = "彩票";
                                item.icon = cpIcon;
                                item.activeIcon = cpLightIcon;
                                break;
                        }
                    });
                    if (this.gameList.length > 0) {
                        this.gameTypeListActive = this.gameList[0];
                        this.gameTypeActiveList = this.gameList[0].siteApis[0];
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
         * @description: 选择游戏厂商
         * @param {obj} type: 当前选中的游戏厂商
         * @param {int} index: 当前选中的游戏厂商的下标
         * @return: 将选中样式赋予当前选中的游戏厂商
         */
        changeType(type, index) {
            if (index === this.gameNavActive) {
                return;
            }
            this.gameNavActive = index;
            this.gameTypeListActive = this.gameList[index];
            console.log(this.gameTypeListActive);

            this.selectGameType(0, this.gameTypeListActive.siteApis[0], false);
        },

        /**
         * @description:
         * @param {int} index: 当前选中厂商二级菜单下标
         * @param {obj} game: 当前选中二级厂商
         * @param {boolean} showChanege: 是否判断当前菜单重复点击
         * @return: 二级厂商游戏列表
         */
        selectGameType(index, game, showChanege) {
            if (this.gameTypeActive == index && showChanege) {
                return;
            }
            this.hasChangeGameType = true;
            this.gameTypeActive = index;
            if (game.apiTypeId == 2) {
                // this.gameTypeActiveList.gameList = "";
                let loading = this.$toast.loading("加载中...");

                let data = {
                    productId: game.apiId
                };
                getDzGameList(data).then(res => {
                    loading.hide();
                    if (res.success) {
                        setTimeout(() => {
                            this.gameTypeActiveList = game;
                            this.gameTypeActiveList.gameList =
                                res.data.casinoGames || [];
                            this.hasChangeGameType = false;
                        }, 10);
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            } else {
                setTimeout(() => {
                    this.gameTypeActiveList = game;
                    this.hasChangeGameType = false;
                }, 0);
            }
        },
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
         * @description:
         * @param {type}
         * @return:
         */
        async toPlayGame(game) {
            if (game.whStatus == 2) {
                this.$toast.fail("游戏维护中...", {
                    cover: true,
                    duration: 1500
                });
                return;
            }
            this.selectGame = {
                apiTypeId: game.apiTypeId,
                apiPlatform: game.apiPlatform,
                apiId: game.id
            };
            this.apiTypeId = game.apiTypeId;
            this.apiPlatform = game.apiPlatform;
            this.apiId = game.apiId;
            this.productName = game.name;

            if (game.isChange === 2) {
                this.intoGame(game);
            } else {
                this.isShowTransInOrOut = true;
            }
        },
        /**
         * @description:
         * @param {type}
         * @return:
         */
        async toPlay(game, gameChild) {
            if (game.whStatus == 2 || gameChild.isWh == 1) {
                this.$toast.fail("游戏维护中...", {
                    cover: true,
                    duration: 1500
                });
                return;
            }

            if (gameChild.hasChat) {
                this.$router.push({
                    name: "chatList",
                    query: {
                        gameId: gameChild.fcHref,
                        platformId: game.apiPlatformId,
                        gameType: game.apiTypeId
                    }
                });
                return;
            }

            //----判断当前彩票为系统彩票
            if (game.apiPlatform == "pkplus") {
                let url =
                    window.location.origin + "/pkpl/?fc_id=" + gameChild.fcHref;
                window.location.href = url;
                return;
                // window.open(url);
            }
            this.selectGame = {
                apiTypeId: game.typeId,
                apiPlatform: game.platformName,
                apiId: game.id
            };
            this.apiTypeId = game.apiTypeId;
            this.apiPlatform = game.apiPlatform;
            this.apiId = game.apiPlatformId;
            this.productName = game.name;
            if (game.isChange === 2) {
                this.intoGame(game);
            } else {
                this.isShowTransInOrOut = true;
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
         * @description:
         * @param {obj} item: 当前点击的需要跳转的对象
         * @return: 跳转相应的地址
         */
        toLink(item) {
            if (item.isLink == 1) {
                //外链
                if (item.advUrl) {
                    if (item.advUrl.indexOf("://") != -1) {
                        window.open(
                            item.advUrl,
                            "_blank",
                            "toolbar=yes, width=1300, height=900"
                        );
                    } else {
                        window.open(
                            "http://" + item.advUrl,
                            "_blank",
                            "toolbar=yes, width=1300, height=900"
                        );
                    }
                }
            } else {
                //内链
                let url = checkUrl(item.advUrl);
                //跳转到客服外链
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
                        if (url === "index") {
                            this.reload();
                        } else {
                            this.$router.push({
                                name: url
                            });
                        }
                    }
                }
            }
        }
    }
};
</script>
<style scoped lang="scss">
@import "./games.scss";
</style>
