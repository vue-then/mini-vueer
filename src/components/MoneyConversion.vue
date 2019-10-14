<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-08 12:25:28
 * @LastEditTime: 2019-10-08 17:33:27
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div>

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
                            <img src="@/assets/img/my-icon/icons/transfer/icon_mine_edzh_zr.png" alt="zr" />
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
                <div class="cancel" @click="intoGame()">直接进入</div>
                <div class="sure" @click="transferSubmit()">转账进入</div>
            </div>
            <div class="pk-close-box" @click="closeBox()">
                <img src="@/assets/img/game-icon/gb.png" alt />
            </div>
        </nut-dialog>
        <!--额度转换弹框 -end -->
    </div>
</template>
<script>
import { getInfo } from "@/services/auth.js";
import func from "@/services/deposit";
import { openGame } from "@/services/index";

export default {
    name: "moneyConversion",
    /**
     * description：props
     * date：当前时间，用于每次打开额度转换弹窗请求最新额度信息
     * apiTypeId：视讯类别
     * apiPlatform：视讯id
     * apiId：游戏id
     * productName：当前游戏/视讯/厂商名称
     * isShowTransInOrOut：是否展示当前弹窗
     */
    props: {
        date: {
            default: ""
        },
        apiTypeId: {
            default: ""
        },
        apiPlatform: {
            default: ""
        },
        apiId: {
            default: ""
        },
        productName: {
            type: String,
            default: ""
        },
        isShowTransInOrOut: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            freeWalletSwitch: 1, //钱包模式  1: 免转钱包 2:多钱包
            walletBalance: 0,
            platformBalance: 0,
            transferAmount: "", //转入转出金额
            moneyChinese: "零", //转入,转出金额中文大写
            fastMoneyIndex: "",
            fastMoneyList: ["全部", 50000, 10000, 5000, 1000, 500, 200, 100],
            apiPlatformId: 0
        };
    },
    mounted() {
        console.log(this.apiTypeId, this.apiPlatform, this.apiId);
    },
    watch: {
        date(newVal) {
            if (newVal && this.isShowTransInOrOut) {
                console.log(this.apiTypeId, this.apiPlatform, this.apiId);
                this.getNoAutoTransferInfo();
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
        },
        isShowTransInOrOut(newVal) {
            if (newVal) {
                this.transferAmount = "";
            }
        }
    },
    methods: {
        /**
         * @description: 获取余额
         * @return:
         */
        getNoAutoTransferInfo() {
            func.getNoAutoTransferInfo().then(res => {
                if (res.success) {
                    if (res.data) {
                        this.freeWalletSwitch = res.data.autoPay ? 1 : 2;
                        this.walletBalance = res.data.walletBalance;
                        let list = res.data.select;
                        list.map(item => {
                            if (item.textName == this.apiPlatform) {
                                this.platformBalance = item.value;
                                this.apiPlatformId = item.texId;
                            }
                        });
                    }
                } else {
                    this.list = [];
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 4000
                    });
                }
            });
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
                gameType: this.apiTypeId,
                transferAmount: this.transferAmount,
                transferIntoId: this.apiPlatformId,
                transferInto: this.apiPlatform
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
                        this.intoGame();
                    }, 1200);
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 2000
                    });
                }
            });
        },
        closeBox() {
            this.$emit("on-closeBox");
            // isShowTransInOrOut=false
        }
    }
};
</script>
<style scoped lang="scss">
// -------额度转换------

/deep/.nut-dialog-wrapper {
    .nut-dialog-box {
        .nut-dialog {
            .nut-dialog-body {
                .nut-dialog-title {
                    height: px2rem(96);
                    background: $default-color;
                    color: $tip-color;
                    position: relative;
                }

                .nut-dialog-content {
                    border-top: 0;

                    .addMoney {
                        position: absolute;
                        top: px2rem(32);
                        right: px2rem(32);
                        color: $banner-index;
                        border: solid 1px $banner-index;
                        border-radius: px2rem(17);
                        font-size: px2rem(20);
                        padding: 0 px2rem(15);
                    }

                    .money {
                        .label {
                            font-size: px2rem(28);
                        }
                    }

                    .money-input {
                        input {
                            color: $banner-index;
                        }

                        span {
                            color: $banner-index !important;
                        }
                    }
                }
            }
        }
    }
}

/deep/.pk-dialog-transfer {
    .nut-dialog .nut-dialog-body .nut-dialog-content div {
        white-space: normal;
    }

    .nut-dialog .nut-dialog-body .nut-dialog-content .in-money-chinese {
        padding-bottom: px2rem(24);
        border-bottom: 1px solid $backwater-disable;
    }

    .nut-dialog .nut-dialog-body .nut-dialog-content .btns {
        display: flex;
        padding: 0;

        div {
            flex: 1;
            margin-bottom: 0;
            border: none;

            &.sure,
            &.cancel {
                margin-bottom: 0;
                border-left: 1px solid $backwater-disable;
                border-top: 1px solid $backwater-disable;
                background: $default-color;
                color: $primary-color;
                font-size: px2rem(28);
                letter-spacing: 0px !important;
            }

            &.cancel {
                color: $banner-index;
            }
        }
    }
}

.changers {
    display: flex;
    padding: 0 px2rem(32);
    background-color: $default-color;
    height: px2rem(136);
    border-radius: px2rem(10);

    .left,
    .right {
        font-size: px2rem(28);
        flex: 4;
        background-color: $default-bg-color;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: px2rem(28) 0;
        color: $tip-color;

        .moneys {
            color: $banner-index;
            font-size: px2rem(24);
            font-weight: 500;
        }
    }

    .mid {
        height: 100%;
        flex: 2;
        background-color: $default-bg-color;
        color: $primary-color;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            display: block;
            margin-top: px2rem(-16);

            img {
                width: px2rem(50);
                height: px2rem(12);
            }
        }
    }
}

.money-disabled {
    .fast-money-item {
        background-color: $backwater-disable !important;
        color: $game-change-money !important;
        border-color: $backwater-disable !important;
    }
}
.pk-close-box {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, px2rem(380));
    width: px2rem(70);
    height: px2rem(70);
    img {
        width: 100%;
        height: 100%;
    }
}
</style>