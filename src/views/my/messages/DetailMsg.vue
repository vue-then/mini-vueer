<template>
	<div class="msg-detail" :class="{bgfff:tab!=1}">
        <Header :title="title"></Header>
        <div class="divs" v-show="tab==1">
            <div class="dmsg-content">
                <div class="dmsg-top pk-1px-b ">
                    <div class="money">¥{{list.money|currency('')}}</div>
                    <div class="tits">提现金额</div>
                </div>
                <ul class="dmsg-bot">
                    <li>
                        <span>订单号：</span>
                        <span>364368834973493</span>
                    </li>
                    <li>
                        <span>提出额度：</span>
                        <span>500.00</span>
                    </li>
                    <li>
                        <span>费用：</span>
                        <span>20.00</span>
                    </li>
                    <li>
                        <span>实际提现：</span>
                        <span>480.00</span>
                    </li>
                    <li>
                        <span>提现时间：</span>
                        <span>{{list2.inTime|filterDate('YYYY-MM-DD HH:mm:ss')}}</span>
                    </li>
                    <li>
                        <span>状态：</span>
                        <span class="status-mid">处理中</span>
                    </li>
                </ul>
            </div>
            <div class="dmsg-content">
                <div class="dmsg-top pk-1px-b status-success">
                    <div class="money">¥{{list.money|currency('')}}</div>
                    <div class="tits">提现金额</div>
                </div>
                <ul class="dmsg-bot">
                    <li>
                        <span>订单号：</span>
                        <span>364368834973493</span>
                    </li>
                    <li>
                        <span>充值机构：</span>
                        <span>500.00</span>
                    </li>
                    <li>
                        <span>充值账号：</span>
                        <span>20.00</span>
                    </li>
                    <li>
                        <span>充值金额：</span>
                        <span>480.00</span>
                    </li>
                    <li>
                        <span>充值优惠：</span>
                        <span>20.00</span>
                    </li>
                    <li>
                        <span>额外优惠：</span>
                        <span>处理中</span>
                    </li>
                    <li>
                        <span>充值时间：</span>
                        <span>20.00</span>
                    </li>
                    <li>
                        <span>提交时间：</span>
                        <span>{{list2.inTime|filterDate('YYYY-MM-DD HH:mm:ss')}}</span>
                    </li>
                    <li>
                        <span>提现时间：</span>
                        <span>{{list2.inTime|filterDate('YYYY-MM-DD HH:mm:ss')}}</span>
                    </li>
                    <li>
                        <span>状态：</span>
                        <span class="status-mid">处理中</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="divs" v-show="tab==2">
            <div class="notice">
                <div class="notice-top">
                    天天救援金38888元，劲爆闯关赢35219元
                </div>
                <div class="times">
                    发布时间：2018-12-11 15:18:12
                </div>
                <div class="contents">
                    在入行互联网的这几年里，我写过很多活动策划文案，
                    自认为文笔虽然不好，但是脑洞还可以。每每看到为了
                    文案而感到痛苦的新媒体运营/网站编辑，我都想伸出一
                    把援助之手。
                    今天的这篇文章，我想可以作为一个好的ending ，希
                    望你能推荐给身边为了活动文案策划，拼命挣扎的小伙
                    伴。
                    接下来，我带大家拆解一下活动文案写作的来龙去脉。
                    一、活动策划文案的写作目的在开始写
                    文案之前，我们需要明确写活动文案的目的究竟是什么？
                    如果不是自媒体，一般的企业会把新媒体归属于两大功
                    能类部门。
                </div>
            </div>
        </div>
        <div class="divs" v-show="tab==3">
            <div class="notice">
                <div class="notice-top">
                    天天救援金38888元，劲爆闯关赢35219元
                </div>
                <div class="times">
                    发布时间：2018-12-11 15:18:12
                </div>
                <div class="img">
                    <img src="@/assets/img/mybg.png" alt="">
                </div>
                <div class="contents">
                    在入行互联网的这几年里，我写过很多活动策划文案，
                    自认为文笔虽然不好，但是脑洞还可以。每每看到为了
                    文案而感到痛苦的新媒体运营/网站编辑，我都想伸出一
                    把援助之手。
                    今天的这篇文章，我想可以作为一个好的ending ，希
                    望你能推荐给身边为了活动文案策划，拼命挣扎的小伙
                    伴。
                    接下来，我带大家拆解一下活动文案写作的来龙去脉。
                    一、活动策划文案的写作目的在开始写
                    文案之前，我们需要明确写活动文案的目的究竟是什么？
                    如果不是自媒体，一般的企业会把新媒体归属于两大功
                    能类部门。
                </div>
            </div>
        </div>

	</div>
</template>
<script>
import Header from "../../../components/Header";
import { getBillChangeInfo } from "@/services/msgs";
// tab 1帐变 2公告 3系统
export default {
	components: {
		Header
    },
    data() {
        return {
            tab: this.$route.query.tab,
            title: '提现详情',
            list: {
                    orderId: 364368834973493,
                    bankName: '充值机构',
                    bankNum: '',
                    money: 200,
                    offer: '',
                    additional: '',
                    inTime: '',
                    addTime: '',
                    status: 1,
                },
            list2:{
                orderId: 364368834973493,
                money: 1000,
                cost: 100,
                withdraw: 200,
                inTime: 1569980804,
                status: 2,
            },


        }
    },
    mounted() {
        this.makebg();

    },
    methods: {
        makebg(){
            if(this.tab!=1){
                this.$('#app').css({'background':'#fff'});
            }
        }
    },


}

</script>
<style lang="scss" scoped>
.bgfff{
    background: $default-color!important;
}
.msg-detail{
    position: absolute;
    width: 100%;
    // height: 100%;
    background: $default-bg-color;
    .divs{
        padding-bottom: px2rem(24);
    }
    .dmsg-content{
        margin-top: px2rem(24);
        background: $default-color;
        padding: px2rem(32);
        .dmsg-top{
            padding: px2rem(32) 0;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            color: $banner-index;
            font-weight: bold;
            padding-bottom: px2rem(64);
            .money{
                font-size: px2rem(48);
            }
            .tits{
                font-size: px2rem(28);
            }
            &.status-success{
                color: $primary-color;
            }
        }
        .dmsg-bot{
            li{
                font-size: px2rem(28);
                margin-top: px2rem(32);
                display: flex;
                span{
                    width: px2rem(140);
                    text-align: right;
                    color: $label-color;
                    &:last-child{
                        flex: 1;
                        text-align: left;
                        color: $tip-color;
                    }
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
        }
    }
    .notice{
        background: $default-color;
        margin-top: px2rem(8);
        .notice-top{
            padding: px2rem(24) px2rem(32);
            font-size: px2rem(36);
            color: $tip-color;
        }
        .times{
            color: $label-color;
            font-size: px2rem(24);
            margin-bottom: px2rem(24);
            padding: 0 px2rem(32); 
        }
        .contents{
            padding: 0 px2rem(32); 
            font-size: px2rem(28);
            line-height: px2rem(60);
        }
        .img{
            width: auto;
            height: px2rem(275);
            padding: 0 px2rem(32); 
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
