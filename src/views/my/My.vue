<template>
    <div class="my" ref="my" v-cloak>
        <Header title="我的" 
            :showLeftIcon="false" 
            :showRight="true" 
            :showRightIcon="true"
            @on-right="goPath('set')"
        ></Header>
        <div class="bgfff mgt-8">
            <router-link tag="div" class="avatar-tit" to="/about">
                <div class="avatar">
                    <i><img src="../../assets/img/morentouxiang.png" ></i>
                </div>
                <div class="tit">{{ userinfo.nickname?userinfo.nickname:userinfo.account }}</div>
                <div class="icon-wrap">
                    <i class="icons iconfont iconicon_mine_rmore"></i>
                </div>
            </router-link>
            <div class="money-wrap">
                <div class="money-s">
                    <div class="products">
                        <div class="top-tits">总资产</div>
                        <div class="moneys">￥{{userinfo.totalBalance}}</div>
                    </div>
                    <div class="changer">
                        <router-link tag="i" class="icon-changer" to="/transfer"><img src="../../assets/img/my-icon/icons/icon_mine_moneychange.png"></router-link>
                    </div>
                    <div class="products last-money">
                        <div class="top-tits">钱包余额</div>
                        <div class="moneys">￥{{userinfo.balance}}</div>
                    </div>
                    <div class="refresh" @click="getMyInfo(1)">
                        <i class="icon-refreshs"><img src="../../assets/img/my-icon/icons/icon_mine_refresh.png"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-card">
            <ul class="tabs">
                <router-link tag="li" to="/deposit">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_cz.png"></i>
                    </div>
                    <div class="text pk-1px-b">充值</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
                <router-link tag="li" to="/withdraw">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_tx.png" ></i>
                    </div>
                    <div class="text pk-1px-b">提现</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
                <router-link tag="li" to="/bankCard">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_bankcard.png" ></i>
                    </div>
                    <div class="text pk-1px-b">银行卡管理</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
                <router-link tag="li" to="/intergral">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_vip.png" ></i>
                    </div>
                    <div class="text pk-1px-b">会员积分</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
                <router-link tag="li" to="/betInformation">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_tzzx.png" ></i>
                    </div>
                    <div class="text pk-1px-b">投注资讯</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
            </ul>

        </div>
        <ul class="tabs">
            <router-link tag="li" to="/transfer">
                <div class="icon-left">
                    <i><img src="../../assets/img/my-icon/icons/icon_mine_edzh.png" ></i>
                </div>
                <div class="text pk-1px-b">额度转换</div>
                <div class="icon pk-1px-b">
                    <i class="iconfont iconicon_mine_rmore"></i>
                </div>
            </router-link >
            <router-link tag="li" to="/auditQuery">
                <div class="icon-left">
                    <i><img src="../../assets/img/my-icon/icons/icon_mine_jsjhcx.png" ></i>
                </div>
                <div class="text pk-1px-b">即时稽核查询</div>
                <div class="icon pk-1px-b">
                    <i class="iconfont iconicon_mine_rmore"></i>
                </div>
            </router-link >
            <router-link tag="li" to="/backwater" v-show="switchList.isWaterSelf">
                <div class="icon-left">
                    <i><img src="../../assets/img/my-icon/icons/icon_mine_zzfs.png" ></i>
                </div>
                <div class="text pk-1px-b">自助返水</div>
                <div class="icon pk-1px-b">
                    <i class="iconfont iconicon_mine_rmore"></i>
                </div>
            </router-link >
            <router-link tag="li" to="/spread" v-show="switchList.isSpread">
                <div class="icon-left">
                    <i><img src="../../assets/img/my-icon/icons/icon_mine_wytg.png" ></i>
                </div>
                <div class="text pk-1px-b">我要推广</div>
                <div class="icon pk-1px-b">
                    <i class="iconfont iconicon_mine_rmore"></i>
                </div>
            </router-link >
        </ul>
        <div class="bgfff bgf">
            <ul class="tabs">
                <router-link tag="li" :to="{name:'betRecord'}">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_tzjl.png" ></i>
                    </div>
                    <div class="text pk-1px-b">投注记录</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
                <router-link tag="li" :to="{name:'depositRecord'}">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_czjl.png" ></i>
                    </div>
                    <div class="text pk-1px-b">充值记录</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
                <router-link tag="li" :to="{name:'withdrawRecord'}">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_txjl.png" ></i>
                    </div>
                    <div class="text pk-1px-b">提现记录</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
                <router-link tag="li" :to="{name:'transferRecord'}">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_edzhjl.png" ></i>
                    </div>
                    <div class="text pk-1px-b">额度转换记录</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
                <router-link tag="li" :to="{name:'capitalRecord'}">
                    <div class="icon-left">
                        <i><img src="../../assets/img/my-icon/icons/icon_mine_zjls.png" ></i>
                    </div>
                    <div class="text pk-1px-b">资金流水</div>
                    <div class="icon pk-1px-b">
                        <i class="iconfont iconicon_mine_rmore"></i>
                    </div>
                </router-link >
            </ul>
        </div>


        
        <Footer></Footer>
    </div>
</template>
<script>
import { getInfo } from "../../services/auth.js";
import { getBoxnum } from "../../services/msgCenter.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default {
	data() {
		return {
			userinfo: {
				account: "",
				lastLoginTime: "",
				totalBalance: "",
				gameBalance: ""
			},
			switchList: {
				isSpread: true, //是否开启会员推广
				isAgencyReg: true, //是否开启代理注册
				isOfferSelf: true, //是否开启自助优惠
				isWaterSelf: true //是否开启自助返水
			},
			boxNum: 0
		};
	},
	mounted() {
		this.getMyInfo();
		this.getBoxnumFunc();
	},
	components: {
		Header,
		Footer
	},
	name: "my",
	methods: {
		goPath(path) {
			this.$router.push({
				name: path
			});
		},
		getBoxnumFunc() {
			getBoxnum().then(res => {
				if (res.success) {
					console.log(res);
					if (res.data) {
						let num1 = res.data.advisoryUnReadCount || 0;
						let num2 = res.data.sysMessageUnReadCount || 0;
						this.boxNum = num1 + num2;
						console.log(this.boxNum);
					}
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1500
					});
				}
			});
		},
		getMyInfo(status) {
            let loading = this.$toast.loading('切换中...');
			getInfo().then(res => {
                loading.hide();
				if (res.success) {
					console.log(res);
					this.userinfo = res.data.user;
					this.switchList = res.data.switch;
					if (status == 1) {
						this.$toast.success("刷新成功", {
							cover: true,
							duration: 1500
						});
					}
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1500
					});
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
    .iconicon_mine_rmore{
        color: #999999;
    }
    .my{
        background: #f2f2f2;
        padding-bottom: px2rem(100);
    }
	.avatar-tit{
        background: #fff;
        padding-top: px2rem(15);
        height: px2rem(96);
        display: flex;
        align-items: center;
        padding-left: px2rem(56);
        padding-right: px2rem(56);
        .avatar{
            i{
                height: px2rem(96);
                width: px2rem(96);
                margin-right: px2rem(30);
                display: block;
                border-radius: 50%;
                box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
            }
        }
        .tit{
            color: #1a1a1a;
            font-size: px2rem(36);
            font-weight: 500;
        }
        .icon-wrap{
            flex: 1;
            text-align: right;
            display: flex;
            flex-direction: row-reverse;
            .icons{
                display: block;
                height: px2rem(20);
                width: px2rem(20);
                margin-top: px2rem(-8);
            }
        }
        i{
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .money-wrap{
        width: auto;
        padding-left: px2rem(56);
        padding-right: px2rem(56);
        background: #fff;
        .money-s{
            background: #fff;
            background-image: linear-gradient(270deg, 
                #17c492 0%, 
                #4fd5ae 100%), 
            linear-gradient(
                #436af6, 
                #436af6);
            background-blend-mode: normal, 
                normal;
            display: flex;
            width: 100%;
            height: px2rem(150);
            color: #fff;
            border-radius: px2rem(20);
            margin-top: px2rem(34);
            .top-tits{
                font-weight: 400;
            }
            .moneys{
                font-weight: 500;
            }
            .products{
                flex: 3;
                text-align: center;
                &:first-child{
                    margin-left: px2rem(20);
                }
                .top-tits{
                    font-size: px2rem(24)
                }
                .moneys{
                    font-size: px2rem(36)
                }
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding: px2rem(15) 0;
                

            }
            .changer{
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                .icon-changer{
                    display: block;
                    height: px2rem(40);
                    width: px2rem(40);
                    border-radius: 50%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .last-money{
                flex: 3;
                text-align: center;
            }
            .refresh{
                flex: 1;
                text-align: center;
                display: flex;
                justify-content: center;
                padding-top: 0.35rem;
                .icon-refreshs{
                    display: block;
                    height: px2rem(32);
                    width: px2rem(32);
                    border-radius: 50%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }

        }
    }
    .tab-card{
        padding-top: px2rem(62);
        background: #fff;
    }
    .bgfff{
        background: #fff;
        
    }
    .tabs{
        width: 100%;
        background: #fff;
        li{
            width: auto;
            height: px2rem(88);
            display: flex;
            align-items: center;
            padding:0 px2rem(56);
            &:last-child{
                margin-bottom: px2rem(24);
            }
            .icon-left{
                margin-right: px2rem(52);
                i{
                    display: block;
                    width: px2rem(44);
                    height: px2rem(44);
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .text{
                color: #1a1a1a;
                font-size: px2rem(28);
                height: 100%;
                line-height: px2rem(88);
            }
            .icon{
                height: 100%;
                line-height: px2rem(88);
                flex: 1;
                display: flex;
                flex-direction: row-reverse;
                i{
                    display: block;
                    width: px2rem(20);
                    height: px2rem(20);
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    .mgt-8{
        margin-top: px2rem(-8);
    }
    .bgf{
        li{
            &:last-child{
                margin-bottom: 0;
                padding-bottom: px2rem(24);
            }
        }
    }
    
	
</style>