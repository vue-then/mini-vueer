<template>
	<div class="msgs">
		<Header :title="title" backPath="/index"></Header>
		<div class="real-msg" v-show="tab==1">
            <div class="top-msg">
                <div class="avatar"><img src="@/assets/img/msg-icon/icon_info_zhangbianxx.png" alt=""></div>
                <div class="word">欢迎您使用IM聊天，如果您在使用过程中有任何的问题和建议，记得给我发消息反馈哦！祝你使用愉快！</div>
            </div>
            <ul class="msginfo">
                <li v-for="(item,i) in list" :key="i" @click="goPath('detailMsg',tab)">
                    <div class="times">{{item.createTime|filterDate("MM-DD HH:mm")}}</div>
                    <div class="msginfo-content">
                        <div class="msginfo-top">{{item.sourceType|filterSourceType}}</div>
                        <div class="cont pk-1px-b">
                            <div class="money">￥{{item.money|currency('')}}</div>
                            <div class="instr">{{item.sourceTypeName}}</div>
                        </div>
                        <div class="foots">
                            <div class="todetail">查看详情 <i class="iconfont iconicon_mine_rmore right-icon"></i></div>
                            <div class="order"><span>订单号：</span>{{item.orderId}}</div>
                            <ul class="real-detail">
                                <li><span>提现银行：</span>中国工商银行</li>
                                <li><span>提现时间：</span>{{item.createTime}}</li>
                                <li><span>到账时间：</span>{{item.createTime}}</li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="real-msg" v-show="tab==2">
            <div class="top-msg">
                <div class="avatar"><img src="@/assets/img/msg-icon/icon_info_gonggaotz.png" alt=""></div>
                <div class="word">hello，我是IM系统公告，所有公告内容都会在这里告诉你，如果对公告内容有疑问，请联系<a>人工客服</a> ,我们将在第一时间为您解释。</div>
            </div>
            <ul class="msginfo">
                <li v-for="(item,i) in list" :key="i" @click="toQSInfo()">
                    <div class="times">{{item.createTime|filterDate("MM-DD HH:mm")}}</div>
                    <div class="msginfo-content">
                        <div class="check-peos">
                            <span>{{item.sourceType|filterSourceType}}</span>
                            <span class="stats">未填写</span>
                        </div>
                        <div class="cont pk-1px-b">
                            <div class="tits">欢乐斗地主9点开始维护，为您带来不便尽请谅解</div>
                        </div>
                        <div class="foots">
                            <div class="todetail">查看详情 <i class="iconfont iconicon_mine_rmore right-icon"></i></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="real-msg" v-show="tab==3" @click="goPath('detailMsg',tab)">
            <div class="top-msg">
                <div class="avatar"><img src="@/assets/img/msg-icon/icon_info_xitongxx.png" alt=""></div>
                <div class="word">欢迎您使用IM聊天，如果您在使用过程中有任何的问题和建议，记得给我发消息反馈哦！祝你使用愉快！</div>
            </div>
            <ul class="msginfo">
                <li v-for="(item,i) in list" :key="i">
                    <div class="times">{{item.createTime|filterDate("MM-DD HH:mm")}}</div>
                    <div class="msginfo-content">
                        <div class="check-peos">
                            <span>{{item.sourceType|filterSourceType}}</span>
                        </div>
                        <div class="cont pk-1px-b">
                            <div class="tits">1000万和10年寿命你选哪一个？</div>
                        </div>
                        <div class="foots">
                            <div class="todetail">查看详情 <i class="iconfont iconicon_mine_rmore right-icon"></i></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
	</div>
</template>
<script>
import Header from "../../../components/Header";
import { getBillChange } from "@/services/msgs";
// tab 1帐变 2公告 3系统
export default {
	components: {
		Header
	},
	data() {
		return {
			list: [
				{
					sourceType: 1, //数据来源类型
					doType: 1, //1. 存入 2. 取出
					money: 12345, //操作金额
					remark: "123456",
					createTime: 1569980804, //创建时间
					isInfo: 1, //是否有详情
					sourceTypeName: "充值金额", //数据来源类型名称
					orderId: 123456
                },
                {
					sourceType: 2, //数据来源类型
					doType: 1, //1. 存入 2. 取出
					money: 12345, //操作金额
					remark: "123456",
					createTime: 1569980804, //创建时间
					isInfo: 1, //是否有详情
					sourceTypeName: "充值金额", //数据来源类型名称
					orderId: 123456
				}
			],
            tab: this.$route.query.tab,
            title: ''
		};
	},
	mounted() {
        this.getList();
        this.$router.push({
            name: "moremsg",
            query: {
                tab: 2,
            }
        });
        this.tab = this.$route.query.tab;
        this.title = this.tab==1?'账变消息':this.tab==2?'公告通知':this.tab==3?'系统消息':'';
        this.$('#app').css({'background':'#f2f2f2'});
	},
	methods: {
		getList() {
			getBillChange().then(res => {
				console.log(res, "res");
			});
        },
        goPath(name,tab){
            this.$router.push({
                name: name,
                query: {
                    tab: tab,
                }
            });
        },
        //跳转至问卷调查页
        toQSInfo() {
            this.$router.push({
                name: "questionnaire",
                query: {
                    id: 280,
                    // showAnswer:'',
                    // platform:''
                }
            });
        },
        
	}
};
</script>
<style lang="scss" scoped>
.msgs{
    position: absolute;
    width: 100%;
    background: $default-bg-color;
    .top-msg{
        display: flex;
        padding-left: px2rem(32);
        margin-top: px2rem(40);
        .avatar{
            width: px2rem(80);
            height: px2rem(80);
            img{
                width: 100%;
                height: 100%;
            }
        }
        .word{
            margin-left: px2rem(16);
            width: px2rem(420);
            background: $default-color;
            font-size: px2rem(28);
            color: $tip-color;
            line-height: 2em;
            padding: px2rem(23) px2rem(26);
            border-radius: px2rem(10);
            position: relative;
            a{
                text-decoration: underline;
                color: $primary-color;
            }
            &::after{
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border: px2rem(12) solid transparent;
                border-right: px2rem(12) solid $default-color;
                top: 10%;
                left: px2rem(-24);
            }
        }
    }
    .msginfo{
        padding-bottom: px2rem(20);
        li{
            .times{
                font-size: px2rem(24);
                line-height: px2rem(48);
                color: $label-color;
                text-align: center;
                padding: px2rem(20) 0;
            }
            .msginfo-content{
                background: $default-color;
                border-radius: px2rem(10);
                margin: 0 px2rem(32);
                .msginfo-top,.check-peos{
                    font-size: px2rem(28);
                    font-weight: bold;
                    color: $tip-color;
                    padding: px2rem(30) px2rem(33);
                }
                .check-peos{
                    display: flex;
                    justify-content: space-between;
                    .stats{
                        font-weight: 400;
                        color: $msg-error;
                        &.status-mid{
                            color: $label-color;
                        }
                        &.status-success{
                            color: $primary-color;
                        }
                        &.status-fail{
                            color: $color-w;
                        }
                    }
                }
                .cont{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: px2rem(30) px2rem(126);
                    color: $primary-color;
                    text-align: center;
                    .money{
                        font-size: px2rem(48);
                        margin-bottom: px2rem(12);
                        font-weight: bold;
                    }
                    .instr{
                        font-size: px2rem(28);
                    }
                    .tits{
                        font-size: px2rem(32);
                        color: $tip-color;
                        font-weight: bold;
                    }
                }

            }
        }
    }
    .foots{
        padding-left: px2rem(32);
        font-size: px2rem(28);
        .todetail{
            // height: px2rem(88);
            position: relative;
            color: $tip-color;
            padding: px2rem(28) 0;
            .right-icon{
                position: absolute;
                right: px2rem(32);
                top: px2rem(32);
                color: $label-color;
                // &::after{
                //     content: '';
                //     position: absolute;
                //     background: url('')
                // }
            }
        }
        .order{
            color: $tip-color;
            padding: px2rem(28) 0;
            span{
                color: $label-color;
            }
        }
        .real-detail{
            li{
                color: $tip-color;
                padding: px2rem(14) 0;
                span{
                    color: $label-color;
                }
                &:last-child{
                    padding-bottom: px2rem(28);
                }
            }
        }

    }

}
</style>
