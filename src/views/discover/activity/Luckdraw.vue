<template>
    <div class="container">
        <!-- <nut-navbar class="pk-title" :rightShow="false" @on-click-back="$router.go(-1)">
            <a class="spans" slot="back-icon">
                <img class="imgsbank" src="@/assets/img/my-icon/fanhui.png" />
            </a>
            {{drawList.table.title}}
        </nut-navbar> -->
        <Header :title="drawList.table.title"></Header>
        <div class="skeleton vue-skeleton-loading" v-show="loading&&this.thisId">
            <div class="skeleton-bac-animation"></div>
            <div class="skeleton-bac-content">
                <skeleton-circle diameter="9rem" margin="1rem auto 0.2rem">
                </skeleton-circle>
                <skeleton-square width="5rem" height="1rem" margin="0.2rem auto">
                </skeleton-square>
                <skeleton-square width="9rem" height="4rem" margin="0.2rem auto">
                </skeleton-square>
                <column>
                    <skeleton-square width="9rem" :count="9" margin="0.2rem 0.5rem"></skeleton-square>
                </column>
            </div>
        </div>
        <div v-show="!loading&&this.thisId" class="conts">
            <div class="box-bg">
                <div class="box">
                    <div class="pointer" @click="chou()"></div>
                    <div class="boxbg" :style="{transform:rotate_angle,transition:rotate_transition}">
                        <div class="turn">
                            <div :class="{'wheel-bg6':true}">
                                <div class="prize-list">
                                    <ul class="ulOne">
                                        <li v-for="(item,index) in arrOne" :key="index" :class="{'redbg':index%2 == 0}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
                                    </ul>
                                    <ul class="ulTwo">
                                        <li v-if="prize_list.length==6" v-for="(item,index) in arrTwo" :key="index" :class="{'redbg':index%2 == 1}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
                                        <li v-if="prize_list.length==8" v-for="(item,index) in arrTwo" :key="index" :class="{'redbg':index%2 == 0}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
                                        <li v-if="prize_list.length==10" v-for="(item,index) in arrTwo" :key="index" :class="{'redbg':index%2 == 1}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
                                        <li v-if="prize_list.length==12" v-for="(item,index) in arrTwo" :key="index" :class="{'redbg':index%2 == 0}" :style="{ zIndex: item.zIndex,transform: item.deg }"></li>
    
                                        <li v-if="prize_list.length==3" style="border:none;z-index:4; transform: rotate(329deg)"></li>
                                    </ul>
                                    <div></div>
                                </div>
                                <div class="prize-list">
                                    <div class="prize-item" :class="{'yellow':index%2 != 0}" v-for="(item,index) in prize_list" :key="index" :style="{transform:item.troter,width:item.width}">
                                        <div class="prize-pic">
                                            <!--<img v-if="item.prizeType==0" src="../../static/img/xiexie.png">-->
                                        </div>
                                        <div v-if="item.prizeName.length <= 5" class="prize-name">
                                            {{item.prizeName}}
                                        </div>
                                        <div v-if="item.prizeName.length > 5" class="prize-name small">
                                            {{item.prizeName.slice(0,5)}}···
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                    <div class="drawBg"></div>
                </div>
            </div>
        </div>
        <div class="popup" v-show="toast_control">
            <div class="popbg"></div>
    
            <!-- 中了 特等奖/一等奖/二等奖/三等奖/再来一次  eyeshow 谢谢参与-->
            <div class="popbox" v-show="drawn || eyeshow">
                <div class="popcontent-bg">
                    <div class="popcontent">
                        <div v-show="drawn" class="topTitle">{{hasPrize.prizeName}}</div>
                        <div v-show="eyeshow" class="topTitle">很遗憾</div>
                        <div class="content-top">
                            <div class="lucking">
                                <div class="money" v-show="hasPrize.prizeType != 2 && drawn">恭喜:获得{{hasPrize.prizeName}}{{hasPrize.prizeFee}}</div>
                                <!-- 抽到再来一次 -->
                                <div class="money" v-show="hasPrize.prizeType === 2">获得一次抽奖机会</div>
                                <p v-show="eyeshow">什么都没有抽中!</p>
                            </div>
                        </div>
                        <img class="centerM" src="@/assets/img/luckdraw/img_redbag_money_cen.png" />
                        <div class="content-bottom">
                            <div class="btns" @click="toast_control=false">确定</div>
                            <div class="btns again" @click="again">继续抽奖</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 没有机会了 -->
            <div class="popbox" v-show="lottery">
                <div class="popcontent-bg">
                    <div class="popcontent">
                        <div class="topTitle">很遗憾</div>
                        <div class="content-top">
                            <div class="nochanges">
                                <div class="title">
                                    <p>您已经没有抽奖机会了</p>
                                    <!-- 1.存款和投注 都不为0 ->显示 存款 -->
                                    <p v-show="saving!=0 && spending!=0">存款<span>{{saving}}元</span></p>
                                    <!-- 2.存款不为0，投注为0 ->显示存款 -->
                                    <p v-show="saving!=0 && spending==0">存款<span>{{saving}}元</span></p>
                                    <!-- 3.存款为0，投注不为0 ->显示投注 -->
                                    <p v-show="saving==0 && spending!=0">投注<span>{{spending}}元</span></p>
                                    <p v-show="saving!=0 || spending!=0">即可获得<span>1次</span>抽奖机会！</p>
                                </div>
                            </div>
                        </div>
                        <img class="centerM" src="@/assets/img/luckdraw/img_redbag_money_cen.png" />
                        <div class="content-bottom">
                            <div class="btns" @click="toast_control=false">取消</div>
                            <router-link tag="div" :to="{name:'deposit'}" class="btns again">立即存款</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
        <!--bottom-->
        <div v-show="!loading&&this.thisId" class="main">
            <div class="content">
                <p>您还有<span class="lottery_ticket">{{lottery_ticket}}</span>次抽奖机会!</p>
    
                <!-- 如果投注为O->显示存款 -->
                <p v-show="saving!=0 && spending==0" class="deposit-money">
                    <router-link tag="div" class="depositBtn" :to="{name:'deposit'}">立即存款</router-link>
                    存款<span class="lottery_ticket">{{saving}}</span>元得一次抽奖机会
                </p>
    
                <!-- 如果存款为O->显示投注 -->
                <!-- <p v-show="spending!=0 && saving==0" class="deposit-money">
                        <router-link tag="div" class="depositBtn" :to="{name:'index'}">我要玩游戏</router-link>
                        投注<span class="lottery_ticket">{{spending}}</span>元即可获得一次抽奖机会
                    </p> -->
    
                <!-- 如果存款和投注都不为O就->显示存款和投注 -->
                <p v-show="saving!=0 && spending!=0" class="deposit-money">
                    <router-link tag="div" class="depositBtn" :to="{name:'deposit'}">立即存款</router-link>
                    存款<span class="lottery_ticket">{{saving}}</span>元得一次抽奖机会
                </p>
                <!-- <p v-show="spending!=0 && saving!=0" class="deposit-money">
                        <router-link tag="div" class="depositBtn" :to="{name:'index'}">我要玩游戏</router-link>
                        投注<span class="lottery_ticket">{{spending}}</span>元即可获得一次抽奖机会
                    </p> -->
    
            </div>
            <div class="statistics">
                <div class="stat-box">
                    <div class="stat-cont-top">
                        <div class="topbox">奖项设置</div>
                        <nut-row v-if="prizeList.length>0" class="ul" type="flex" flexWrap="wrap" justify="space-between">
                            <nut-col class="list" :span="8" v-for="(prizeLists,index) in prizeList" :key="index">
                                <div class="flex-content">
                                    <div class="before">{{prizeLists.money}}元</div>
                                    <div class="after"><span>{{prizeLists.title}}</span></div>
                                </div>
                            </nut-col>
                        </nut-row>
                    </div>
    
                    <div class="stat-cont-top winPrize">
                        <div class="topbox">中奖排行榜</div>
                        <div class="stat-cont-scroll">
                            <ul>
                                <li v-for="(history,index) in historyList" class="clearfix" :key="index">
                                    <div class="left">{{history.winningTime | filterDate('H:m')}}</div>
                                    <div class="right">玩家 {{history.memberName | filterPlayerName}} 抽中{{history.prizeName}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <no-data v-show="loading&&!this.thisId" class="no-data-box"></no-data>
    </div>
</template>

<script>
    import {
        geTurntableinfo,
        geTurntableReceive,
        geTurntableLuckdraw,
        geTurntableHistory,
        geTurntable
    } from "@/services/moneyRecord.js";
    import Header from '@/components/Header';
    import noData from "@/components/NoData.vue";
    export default {
        components: {
            Header,
            noData
        },
        name: "luckdraw",
        data() {
            return {
                loading: false,
                popbg: "commonbg",
                drawn: false,
                eyeshow: false,
                animate: false,
                prizeList: [],
                historyList: [],
                drawList: {
                    table: {
                        title: ""
                    }
                },
                thisId: this.$route.query.id,
                turnId: "",
                lottery_ticket: 0, //抽奖次数
                winnum: "0", //中奖的下标
                toast_control: false, //抽奖结果和活动规则弹出框控制器
                click_flag: true, //是否可以旋转抽奖
                start_rotating_degree: 0, //转盘初始旋转角度
                rotate_angle: 0, //转盘将要旋转的角度
                start_rotating_degree_pointer: 0, //指针初始旋转角度
                rotate_angle_pointer: 0, //指针将要旋转的度数
                rotate_transition: "", //初始化选中的过度属性控制
                rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
                prize_list: [], //奖品列表
                arrOne: [],
                arrTwo: [],
                shopUid: "",
                userinfo: "",
                hasPrize: {
                    prizeName: ""
                }, //抽奖之后弹出框信息
                numb: 1,
                lottery: false,
                saving: 0, //存款多少元即可获得一次抽奖机会
                spending: 0, //消费多少元即可获得一次抽奖机会
                isShill: false,
                isLogin: sessionStorage.getItem("token"),
                turnlist: {},
            };
        },
        mounted() {
            //获取转盘详情
            this.getTurntable();
            setTimeout(()=>{
                this.setSan();
                this.history();
            },100)
        },
        created() {
            setInterval(this.scroll, 1000);
        },
        methods: {
            getTurntable() {
                if (this.isLogin) {
                    geTurntable().then(res => {
                        console.log(res,'ressss')
                        if (res.success) {
                            if (res.data.status === 1) {
                                this.turnlist = res.data;
                                this.thisId = this.turnlist.id;
                            } 
                        } else {
                            this.$toast.text(res.message, {
                                cover: true,
                                duration: 1000
                            });
                        }
                    });
                }
            },
            chou() {
                if (this.isShill) {
                    this.$toast.fail("条件不满足。", {
                        cover: true,
                        duration: 1000
                    });
                } else {
                    if (this.lottery_ticket <= 0) {
                        this.click_flag = false;
                        this.lottery = true;
                        this.toast_control = true;
                    } else if (this.click_flag) {
                        geTurntableLuckdraw({
                            id: this.thisId * 1
                        }).then(res => {
                            if (res.success) {
                                let turnDraw = this.drawList.prizes;
                                this.turnId = res.data;
                                for (let i = 0; i < turnDraw.length; i++) {
                                    if (turnDraw[i].id == res.data) {
                                        this.winnum = i;
                                    }
                                }
                                this.rotating(this.winnum, () => {
                                    if (this.prize_list[this.winnum].prizeType === 3) {
                                        //谢谢参与
                                        this.toast_control = true;
                                        this.eyeshow = true;
                                        this.drawn = false;
                                    } else if (this.prize_list[this.winnum].prizeType === 2) {
                                        //再来一次
                                        this.toast_control = true;
                                        this.drawn = true;
                                        this.eyeshow = false;
                                    } else {
                                        this.toast_control = true;
                                        this.drawn = true;
                                        this.eyeshow = false;
                                    }
                                    if (this.lottery_ticket <= 0) {
                                        this.eyeshow = false;
                                        this.drawn = false;
                                        this.click_flag = false;
                                        this.lottery = true;
                                        this.toast_control = true;
                                    }
                                });
                            } else {
                                this.$toast.fail(res.message, {
                                    cover: true,
                                    duration: 1000
                                });
                            }
                        });
                    }
                }
            },
            setSan() {
                this.loading = true;
                if(!this.thisId)return;
                geTurntableinfo({
                    id: this.thisId * 1
                }).then(res => {
                    if (res.success) {
                        this.drawList = res.data;
                        this.prize_list = res.data.prizes;
                        this.lottery_ticket = res.data.num || 0; //剩余抽奖次数
                        this.saving = res.data.table.saving; //存款多少可以抽奖
                        this.spending = res.data.table.spending; //消费多少可以抽奖
                        this.isShill = res.data.isShill == 1;
                        let przlist = [];
                        for (let k in res.data.prizes) {
                            if (res.data.prizes[k].prizeFee > 0) {
                                przlist.push({
                                    money: res.data.prizes[k].prizeFee,
                                    title: res.data.prizes[k].prizeName
                                });
                            }
                        }
                        this.prizeList = przlist;
    
                        this.arrOne = [];
                        this.arrTwo = [];
                        this.rotate_angle =
                            "rotate(" +
                            Math.floor(-360 * 100 / this.prize_list.length) / 200 +
                            "deg)";
                        this.start_rotating_degree =
                            Math.floor(-360 * 100 / this.prize_list.length) / 200;
                        for (let i = 0; i < this.prize_list.length; i++) {
                            this.prize_list[i].troter =
                                "rotate(" +
                                Math.floor(360 * 100 / this.prize_list.length) /
                                100 *
                                (0.5 + Number(i)) +
                                "deg) translateX(-50%)";
                            this.prize_list[i].width =
                                Math.floor(3.14 * 5.6 / this.prize_list.length) + "rem";
                            let item = {
                                value: this.prize_list[i].name,
                                zIndex: Number(i) + 1,
                                deg: "rotate(" +
                                    Math.floor(360 * 100 / this.prize_list.length) * i / 100 +
                                    "deg)",
                                degnum: i
                            };
                            if (i < this.prize_list.length / 2) {
                                this.arrOne.push(item);
                            } else {
                                this.arrTwo.push(item);
                            }
                        }
                        this.loading = false;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 4000
                        });
                    }
                });
            },
            rotating(index, cb) {
                //转盘转动函数，index值为中奖的下标，后台会返回中奖的id，这边会首先for循环判断中奖的下标
    
                this.rotate_transition = "transform 3s cubic-bezier(0.25,0.1,0.01,1)";
                if (!this.click_flag) return;
                let type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
                let during_time = 2; // 默认为1s
                let result_index = index; // 最终要旋转到哪一块，对应prize_list的下标
                this.click_flag = false; // 旋转结束前，不允许再次触发
                if (type == 0) {
                    if (this.start_rotating_degree < 0) {
                        this.start_rotating_degree = 0;
                    } else {
                        this.start_rotating_degree =
                            this.start_rotating_degree +
                            Math.floor(360 * 100 / this.prize_list.length) / 200;
                    }
                    let rotate_angle =
                        this.start_rotating_degree +
                        360 * 5 +
                        Math.floor(-360 * 100 / this.prize_list.length) / 200 -
                        Math.floor(360 * 100 / this.prize_list.length) * result_index / 100;
                    this.start_rotating_degree = rotate_angle;
                    this.rotate_angle = "rotate(" + rotate_angle + "deg)";
                    // 旋转结束后，允许再次触发
                    setTimeout(() => {
                        this.game_over();
                        cb ? cb() : "";
                    }, during_time * 1000 + 1500); // 延时，保证转盘转完
                }
            },
            game_over() {
                this.start_rotating_degree =
                    360 * (5 * this.numb) -
                    Math.floor(360 * 100 / this.prize_list.length) / 200;
                this.numb++;
                geTurntableReceive({
                    turntableId: this.thisId * 1,
                    prizeId: this.turnId * 1
                }).then(res => {
                    if (res.success) {
                        this.toast_control = true;
                        // this.lottery_ticket--
                        //中了 再来一次 请求次数
                        // this.thisId = this.turnlist.id;
                        geTurntableinfo({
                            id: this.thisId * 1
                        }).then(res => {
                            if (res.success) {
                                this.lottery_ticket = res.data.num || 0;
                            } else {
                                this.$toast.fail(res.message, {
                                    cover: true,
                                    duration: 1000
                                });
                            }
                        });
                        this.history();
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                        this.hasPrize.prizeName = err;
                        this.eyeshow = true;
                        this.drawn = false;
                        this.popbg = "commonbg";
                        this.toast_control = true;
                    }
                });
                this.hasPrize = this.prize_list[this.winnum];
                setTimeout(() => {
                    this.click_flag = true;
                }, 500);
            },
            again() {
                this.toast_control = false;
                this.chou();
            },
            history() {
                if(!this.thisId)return;
                geTurntableHistory({
                    id: this.thisId * 1
                }).then(res => {
                    if (res.success) {
                        this.historyList = res.data;
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            },
            scroll() {
                if (this.historyList.length > 4) {
                    this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                    setTimeout(() => {
                        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                        this.historyList.push(this.historyList[0]); // 将数组的第一个元素添加到数组的
                        this.historyList.shift(); //删除数组的第一个元素
                        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                    }, 500);
                }
            }
        },
        beforeRouteLeave(to, from, next) {
            this.ModalHelper.close();
            next();
        }
    };
</script>


<style lang="scss" scoped>
    .container {
        width: 100%;
        background: $luckbg;
        overflow-x: hidden;
        .conts {
            padding-top: 3.5rem;
            width: 100%;
            background-size: 10rem;
            overflow: hidden;
            background: url('../../../assets/img/luckdraw/img_dzp_title@2x.png') no-repeat center -0.4rem/10rem;
            .activitytime {
                height: 0.5rem;
                width: 100%;
                position: absolute;
                .timebg {
                    width: 100%;
                    height: 100%;
                    background: $text-color;
                    opacity: 0.3;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .time {
                    color: $text-color;
                    line-height: 0.5rem;
                    padding-left: 0.2rem;
                    font-size: 0.24rem;
                    position: relative;
                    z-index: 2;
                }
            }
            .rule {
                height: 0.69rem;
                margin-bottom: 2.37rem;
                position: relative;
                .ruletop {
                    width: 1.35rem;
                    height: 0.46rem;
                    position: absolute;
                    right: 0;
                    bottom: 3px;
                    .rulebg {
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        background: $text-color;
                        opacity: 0.3;
                        border-top-left-radius: 0.23rem;
                        border-bottom-left-radius: 0.23rem;
                    }
                    .ruletitle {
                        text-align: center;
                        line-height: 0.46rem;
                        font-size: 0.24rem;
                        color: $text-color;
                        position: relative;
                        z-index: 3;
                        border-top-left-radius: 0.23rem;
                        border-bottom-left-radius: 0.23rem;
                        border-bottom: 3px solid $text-color;
                    }
                }
            }
            .title {
                height: 0.46rem;
                text-align: center;
                color: $color-f;
                font-size: 0.28rem;
                line-height: 0.46rem;
                font-weight: 700;
                margin-bottom: 0.24rem;
            }
            .box-bg {
                padding-bottom: 0.3rem;
                background: url("../../../assets/img/luckdraw/img-dzp-dpty@2x.png") no-repeat center bottom;
                background-size: 60%;
            }
            .box {
                width: 7.387rem;
                height: 7.387rem;
                margin: auto;
                margin-top: 0.413rem;
                position: relative;
                overflow: hidden;
                background: $luck-yel;
                background-size: 100%;
                border-radius: 50%;
                .drawBg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: url("../../../assets/img/img-dzp-light@2x.png") no-repeat center;
                    background-size: 95%;
                }
                .pointer {
                    width: 1.64rem;
                    height: 2.253rem;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: 20;
                    transform: translate(-50%, -60%);
                    background: url("../../../assets/img/img_dzpZzsc.png") top center no-repeat;
                    background-size: 100%;
                }
                .boxbg {
                    width: 6.373rem;
                    height: 6.373rem;
                    padding: 0.507rem;
                    .turn {
                        width: 6.373rem;
                        height: 6.373rem;
                        border-radius: 50%;
                        overflow: hidden;
                        border: $onerem solid rgba($color: $luckbg, $alpha: 0.6);
                        .slice {
                            box-sizing: border-box;
                            border: 1px solid $text-color;
                        }
                        .wheel-bg6 {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            div {
                                text-align: center;
                            }
                            .prize-list {
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                .redbg {
                                    background: $luck-yel;
                                }
                                ul {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 50%;
                                    overflow: hidden;
                                    margin: 0;
                                    padding: 0;
                                    li {
                                        position: absolute;
                                        top: 0;
                                        left: 50%;
                                        width: 50%;
                                        height: 50%;
                                        transform-origin: 0 100%;
                                        overflow: hidden;
                                        cursor: pointer;
                                        box-sizing: border-box;
                                        background: $luck-yellow;
                                    }
                                }
                                .ulOne {
                                    clip: rect(0, 6.373rem, 6.373rem, 3.1865rem);
                                }
                                .ulTwo {
                                    clip: rect(0, 3.1865rem, 6.373rem, 0);
                                }
                                .prize-item {
                                    position: absolute;
                                    top: 0;
                                    z-index: 12;
                                    height: 3.1865rem;
                                    left: 50%;
                                    transform: translateX(-50%);
                                    transform-origin: 0 100%;
                                    .prize-pic {
                                        padding-top: 0.3rem;
                                        text-align: center;
                                        img {
                                            width: 0.75rem;
                                        }
                                    }
                                    .prize-name {
                                        font-size: 0.42rem;
                                        color: $luck-redtxt;
                                        margin: 0 auto;
                                    }
                                    .small{
                                        font-size: 0.22rem;
                                    }
                                }
                            }
                        }
                    }
                }
                .money {
                    position: absolute;
                    width: 0.57rem;
                    height: 0.55rem;
                    top: 2.17rem;
                    right: -0.2rem;
                }
            }
        }
        .popup {
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 100;
            top: 0;
            left: 0;
            .popbg {
                width: 100%;
                height: 100%;
                background: $text-color;
                opacity: 0.7;
            }
            .prositbg {
                background: url("../../../assets/img/turntable_bg02.png") center top 3rem no-repeat;
                background-size: 100%;
            }
            .commonbg {
                background: url("../../../assets/img/turntable_bg01.png") center no-repeat;
                background-size: 100%;
            }
            .popbox {
                width: 10rem;
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin: auto;
                text-align: center;
                .popcontent-bg {
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    .faguang {
                        position: absolute;
                        width: 100%;
                        height: 7.12rem/* 534/75 */
                        ;
                        top: -6.5rem;
                        left: 0;
                    }
                    .popcontent {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 8.32rem;
                        height: 10rem;
                        background: url("../../../assets/img/luckdraw/img_redbag_bgbg@2x.png") no-repeat center top;
                        background-size: 100%;
                        .topTitle {
                            margin: 1.973rem auto 0;
                            width: 5.8266rem;
                            height: 1.0666rem;
                            font-size: 0.47rem;
                            text-align: center;
                            line-height: 1.1rem;
                            color: $luck-duckred;
                            background: url("../../../assets/img/luckdraw/img_redbag_title_bot@2x.png") no-repeat center;
                            background-size: 100%;
                        }
                        .jingbi {
                            position: absolute;
                            top: -0.4rem/* 30/75 */
                            ;
                            left: -0.4rem/* 30/75 */
                            ;
                            width: 7.37333rem/* 553/75 */
                            ;
                            height: 6.22667rem/* 467/75 */
                            ;
                        }
                        .text {
                            font-weight: bold;
                            font-size: 0.45333rem/* 34/75 */
                            ;
                            color: $text-color;
                        }
                        .content-top {
                            margin: 0 auto;
                            width: 5.8266rem;
                            height: 3.08rem;
                            font-size: 0.4rem;
                            background: url("../../../assets/img/luckdraw/img_redbag_txt_bot@2x.png") no-repeat center;
                            background-size: 100%;
                            .lucking {
                                line-height: 2.5rem;
                                font-size: 0.47rem;
                                font-weight: bold;
                                color: $luckbg;
                            }
                            .nochanges {
                                .title {
                                    padding-top: 0.3rem/* 80/75 */
                                    ;
                                    span {
                                        color: $luckbg;
                                    }
                                }
                            }
                        }
                        .centerM {
                            margin-top: -0.3rem;
                            width: 1.45rem;
                            height: 1.45rem;
                        }
                        .content-bottom {
                            display: flex;
                            justify-content: space-around;
                            width: 100%;
                            box-sizing: border-box;
                            position: absolute;
                            bottom: 0;
                            .btns {
                                width: 3.3rem;
                                height: 0.92rem;
                                line-height: 0.92rem;
                                font-size: 0.4rem;
                                text-align: center;
                                color: $luck-btntxt;
                                background-color: $luck-btnbg;
                                border-radius: 0.107rem;
                            }
                        }
                    }
                }
            }
            .activityrule {
                width: 5.54rem;
                height: 6.32rem;
                position: absolute;
                top: 20%;
                left: 0;
                right: 0;
                margin: auto;
                background-size: 100%;
                .rulecnt {
                    padding: 1.3rem 0.77rem 0;
                    p {
                        font-size: 0.24rem;
                        line-height: 0.4rem;
                        text-align: justify;
                        color: $text-color;
                    }
                    p:last-of-type {
                        color: $text-color;
                    }
                }
            }
        }
        .main {
            position: relative;
            .content {
                font-size: 0.4rem/* 30/75 */
                ;
                color: $default-color;
                text-align: center;
                .lottery_ticket {
                    font-size: 0.64rem/* 48/75 */
                    ;
                    color: $luck-num;
                }
                .deposit-money {
                    margin-top: 0.4rem/* 30/75 */
                    ;
                    line-height: 1;
                    font-size: 0.32rem/* 30/75 */
                    ;
                    span {
                        font-size: 0.32rem/* 48/75 */
                        ;
                    }
                    .depositBtn {
                        margin: 0 auto 0.14rem;
                        width: 2.76rem;
                        height: 1.067rem;
                        line-height: 1.067rem;
                        text-align: center;
                        font-size: 0.4rem/* 30/75 */
                        ;
                        color: $luck-redtxt;
                        background: url("../../../assets/img/luckdraw/img-ljlj-btn@2x.png") no-repeat;
                        background-size: 100%;
                    }
                }
            }
            .statistics {
                margin: 0.587rem 0;
                padding: 0 $four;
                .stat-box {
                    .stat-cont-top {
                        background-color: $luck-yel;
                        border-radius: 0.067rem;
                        .topbox {
                            margin: 0 auto;
                            width: 5.733rem;
                            height: 1.067rem;
                            line-height: 1.067rem;
                            text-align: center;
                            font-size: 0.533rem;
                            letter-spacing: 0.027rem;
                            background-color: $luck-duck;
                            border-radius: 0rem 0rem 0.067rem 0.067rem;
                            color: $luck-num;
                        }
                        .ul {
                            text-align: center;
                            .list {
                                padding: 0.16rem 0.26rem;
                                .flex-content {
                                    font-size: 0.427rem;
                                    color: $luckbg;
                                    background: $default-color;
                                    border-radius: 0.067rem;
                                    .before {
                                        margin: 0 auto;
                                        padding-top: 0.52rem;
                                        width: 1.667rem;
                                        height: 2.16rem;
                                        font-size: 0.371rem;
                                        color: $luck-numa;
                                        background: url("../../../assets/img/luckdraw/img_dzp_smallredbar@2x.png") center no-repeat;
                                        background-size: 100%;
                                    }
                                    .after {
                                        padding-bottom: 0.18rem;
                                    }
                                }
                            }
                        }
                        .stat-cont-scroll {
                            margin: 0.4rem auto;
                            width: 7.093rem;
                            max-height: 6.8rem;
                            min-height: 2.4rem;
                            overflow: hidden;
                            ul {
                                color: $text-color;
                                li {
                                    line-height: 0.627rem;
                                    font-size: 0.427rem;
                                    letter-spacing: 0.021rem;
                                    .left {
                                        float: left;
                                    }
                                    .right {
                                        float: right;
                                        text-align: right;
                                    }
                                }
                            }
                        }
                    }
                    .winPrize {
                        margin-top: 0.533rem;
                        background-color: $default-color;
                        border: 0.133rem solid $luck-yel;
                        .topbox {
                            margin-top: -0.133rem;
                        }
                    }
                }
            }
        }
        .toast {
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 999;
            transform: translate(-50%, -50%);
            width: 7.387rem;
            border-radius: 0.3125rem;
            padding: 0.3125rem;
            background-color: $text-color;
            .toast-container {
                position: relative;
                width: 100%;
                height: 100%;
                border: 1px dotted $text-color;
                .toast-picture {
                    position: absolute;
                    top: -6.5rem;
                    left: -1.5rem;
                    width: 7.387rem;
                    height: 7.387rem;
                }
                .close {
                    position: absolute;
                    top: -0.9375rem;
                    right: -0.9375rem;
                    width: 2rem;
                    height: 2rem;
                    background-size: 100%;
                }
                .toast-title {
                    padding: 2.8125rem 0;
                    font-size: 0.24rem;
                    color: $text-color;
                    text-align: center;
                }
                .toast-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 0.9375rem;
                    .toast-cancel {
                        background-image: -moz-linear-gradient( -18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
                        background-image: -ms-linear-gradient( -18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
                        background-image: -webkit-linear-gradient( -18deg, rgb(242, 148, 85) 0%, rgb(252, 124, 88) 51%, rgb(252, 124, 88) 99%);
                        box-shadow: 0 0.053rem 0 0 rgba($color: $nondefault-color, $alpha: 0.12);
                        width: 4.6875rem;
                        height: 1.875rem;
                        border-radius: 1.875rem;
                        text-align: center;
                        line-height: 1.875rem;
                        color: $text-color;
                    }
                }
            }
        }
        .toast-mask {
            position: fixed;
            top: 0;
            left: 0;
            background: $text-color;
            z-index: 998;
            width: 100%;
            height: 100%;
        }
    }
    /deep/.no-data{
        background: #f2f2f2;
    }
</style>
