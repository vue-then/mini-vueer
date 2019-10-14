<template>
	<div class="spread">
        <Header title="我要推广"></Header>
        <div class="spread-num">
            <div class="spread-num-top">
                <div class="spread-p">
                    <span class="spread-title">推广人数</span>
                    <p>{{info.retreatAllMember}}</p>
                </div>
                <div class="spread-p spread-money">
                    <span class="spread-title">累计返佣</span>
                    <p>{{info.retreatAllMoney | currency('',2)}}</p>
                </div>
            </div>
            <div class="spread-num-bottom">
                <h2>
                    <span>返佣余额</span>
                    <span>{{info.retreatBalance | currency('',2)}}</span>
                </h2>
                <p @click="transferTobag">转出到钱包</p>
            </div>
            
        </div>
        <div class="link-box">
            <div class="wrap-tbox">
                <div class="qrcode" v-show="true">
                    <div class="left" @click.stop="previewQrCode()">
                        <span>
                            <qriously
                                v-if="imgUrl"
                                :value="imgUrl"
                                :size="size"
                            />
                        </span>
                    </div>
                </div>
                <div class="links">
                    <p class="linkp">
                        <span>推广链接</span>
                        <span>
                            <a id="down_btn_a" @click="downLoadImg()">下载二维码</a>
                            <span class="copys" @click.stop="copyLink(imgUrl)" v-show="true">
                                <!-- <i class="iconfont icon-qb-copy"></i> -->复制链接
                            </span>
                        </span>
                    </p>
                    <p class="linkurl">{{ imgUrl }}</p>
                </div>
            </div>
            <div class="spread-code">推广码：{{spreadCode}}</div>
            <div class="has-btn">
                <div class="btns">
                    <nut-button class="btnsf" block shape="circle" @click="back('toprompt')">我要推广</nut-button>
                </div>
            </div>
        </div>
		<div class="tab-card">
            <ul class="tabs">
                <router-link tag="li" to="/spread/statisics">
                    <div class="icon-left">
                        <i><img src="../../../assets/img/my-icon/icons/spread/tongji.png"></i>
                    </div>
                    <div class="text pk-1px-b">推广统计</div>
                    <div class="icon pk-1px-b">
                        <i><img :src="leftSrc"></i>
                    </div>
                </router-link >
                <router-link tag="li" to="/spread/subordinate">
                    <div class="icon-left">
                        <i><img src="../../../assets/img/my-icon/icons/spread/biaodan.png" ></i>
                    </div>
                    <div class="text pk-1px-b">下级报表</div>
                    <div class="icon pk-1px-b">
                        <i><img :src="leftSrc"></i>
                    </div>
                </router-link >
                <router-link tag="li" to="/spread/memberManagement">
                    <div class="icon-left">
                        <i><img src="../../../assets/img/my-icon/icons/spread/tuiguang(1).png" ></i>
                    </div>
                    <div class="text pk-1px-b">推广记录</div>
                    <div class="icon pk-1px-b">
                        <i><img :src="leftSrc"></i>
                    </div>
                </router-link >
                <router-link tag="li" to="/spread/promote">
                    <div class="icon-left">
                        <i><img src="../../../assets/img/my-icon/icons/spread/shuoming.png" ></i>
                    </div>
                    <div class="text pk-1px-b">推广说明</div>
                    <div class="icon pk-1px-b">
                        <i><img :src="leftSrc"></i>
                    </div>
                </router-link >
            </ul>

        </div>
        <!--二维码预览弹框 -start -->
			<div
				v-show="isShowQrCodeMask"
				@click="isShowQrCodeMask = false"
				class="qrcode-preview"
			>
            <div
                class="copy-writer-details-mask"
                @touchmove.self.prevent
            ></div>
            <div class="copy-writer-details-box" id="imgbox">
                <qriously v-if="imgUrl" :value="imgUrl" :size="sizeBig" />
            </div>
        </div>
        <!--二维码预览弹框 -end -->
	</div>
</template>
<script>
import {getUserInfo} from '@/services/about';
import trans from '@/services/spread';
import Header from '@/components/Header';
import func from "@/services/spread";
export default {
    components: {
        Header
    },
	data() {
		return {
            info:{
                retreatAllMember:0,
                retreatAllMoney:0,
                retreatBalance:0,
            },
            imgUrl: "",
			isShowDetailMask: false, //是否显示返点详情
			isShowQrCodeMask: false, //二维码预览 模态框打开
			size: 44, //列表二维码大小
            sizeBig: this.HTML_FONT_SIZE * 8, //二维码预览大小
            showDetail: false,
            account: localStorage.getItem("account"), //当前账号
            spreadCode: '',
			leftSrc:
				"data:image/svg+xml,%3Csvg viewBox='0 0 5 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.215 9.757l3.577-4.17a.931.931 0 0 0 0-1.173L1.215.244a.642.642 0 0 0-1.007 0 .929.929 0 0 0 0 1.172L3.283 5 .208 8.584a.93.93 0 0 0 0 1.173.643.643 0 0 0 1.007 0z' fill='rgb(200,200,205)'/%3E%3C/svg%3E"
		};
	},
	mounted() {
        this.getUserInfo();
        this.getQriously();
	},
	methods: {
		back(path) {
			this.$router.push({
				name: path
			});
        },
        //二维码预览
		previewQrCode() {
			this.isShowQrCodeMask = true;
		},
         //获取推广信息
        getUserInfo(){
            let loading = this.$toast.loading('加载中...');
            getUserInfo().then(res => {
                loading.hide();
                if(res.success){
                    this.info = res.data.user;
                }else {
                    this.$toast.fail(res.message,{cover:true,duration:4000});
                }
            })
        },
        transferTobag(){
            if(this.info.retreatBalance === 0){
                this.$toast.fail('金额不足无法转出',{cover:true,duration:4000});
                return;
            }
            trans.transferToBag({
                money:this.info.retreatBalance
            }).then(res => {
                this.getUserInfo();
                if(res.success){
                    this.$toast.success('转出成功',{cover:true,duration:2000});
                }else {
                    this.$toast.fail(res.message,{cover:true,duration:4000});
                }
            })
        },
        //复制链接
		copyLink(msg) {
			this.$copyText(msg).then(
				e => {
					this.$toast.success("复制成功", { cover: true });
				},
				e => {
					this.$toast.fail("复制失败", { cover: true });
				}
			);
        },
        downLoadImg() {
            var img = this.$jq(".qrcode .left")
				.children("span")
				.children("div")
                .children("canvas")[0];
            // 构建画布
			var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d")
            
            ctx.width = img.width;
            ctx.height = img.height;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, ctx.width, ctx.height);
            ctx.drawImage(img, 0, 0, ctx.width, ctx.height);
            
			// 构造url
            var url = canvas.toDataURL("image/png");
			// // 构造a标签并模拟点击
			var downloadLink = document.createElement("a");
			downloadLink.setAttribute("href", url);
			downloadLink.setAttribute("download", "推广二维码.png");
			downloadLink.click();
        },
        //获取二维码相关详情
		getQriously() {
			let postData = {
				pageParams: {
					page: 1,
					pageSize: 1
				},
				account: this.account
			};
			let loading = this.$toast.loading("加载中...");
			func.getMemberList(postData).then(res => {
				loading.hide();
				if (res.success) {
					if (res.data) {
						let data = res.data;
                        this.imgUrl = data.url;
                        this.spreadCode = data.spread_code;
					}
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
    @import "../../../styles/pk-pwd.scss";
    .copy-writer-details-mask{
        opacity: 1;
        background: #fff;
    }
    #imgbox{
        text-align: center;
    }
	.spread {
        background: $center-newbg;
        color: $default-color;
		.levelBlue {
			color: $default-color;
			font-size: 0.48rem /* 36/75 */;
		}
		.spansright {
			.imgsbank {
				position: absolute;
				width: 0.58667rem /* 44/75 */;
                top: .24rem /* 18/75 */;
                right: .2rem /* 15/75 */;
			}
		}
    }
    .tab-card{
        // mar-top: px2rem(62);
        background: #fff;
    }
    .no-data-box {
        text-align: center;
        i {
            font-size:1.07rem;
            color: $primary-color;
            opacity: .6;
        }
        span {
            display: block;
            text-align: center;
            font-size: .26667rem /* 20/75 */;
            color: $primary-color;
            margin-top: .26667rem /* 20/75 */;
        }
    }
	.nut-cell .nut-cell-title,
	.nut-cell .nut-cell-right {
		font-size: 0.34667rem /* 26/75 */;
	}
	.nut-cell .nut-cell-icon img {
		height: 0.33333rem; /* 25/75 */
	}
	.pk-1px-b:after {
		border-color: $border-light;
	}

    .spread-num{
        margin:0.4rem;
        .spread-num-top{
            display:flex;
            justify-content: space-between;
            .spread-p{
                height:1.82667rem /* 137/75 */;
                width:43%;
                background:url('../../../assets/img/my-icon/icons/spread/tuiguangrenshu.png') no-repeat;
                background-size: cover;
                padding-left:0.4rem;
                border-radius:0.13333rem;
                display:flex;
                flex-direction: column;
                justify-content: center;
                .spread-title{
                    font-size:0.34666rem;
                }
                p{
                    font-size:0.48rem;
                }
            }
            .spread-money{
                background:url('../../../assets/img/my-icon/icons/spread/leijifanyong.png') no-repeat;
                background-size: cover;

            }
        }
        .spread-num-bottom{
            margin-top:0.4rem;
            height:2.48rem;
            background:url('../../../assets/img/bg-yy.png') no-repeat;
            background-size: cover;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding:0 0.53333rem;
            h2{
                font-size:0.42666rem;
                display:flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid rgba(255,255,255,.4);
                height: 50%;
            }
            p{
                font-size:0.37333rem;
                height: 50%;
                display:flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .tabs{
        width: 100%;
        background: #fff;
        li{
            width: auto;
            height: px2rem(88);
            display: flex;
            align-items: center;
            padding:0 px2rem(32);
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
    .link-box {
        display: flex;
        padding: 0.46667rem /* 35/75 */ 0.4rem /* 30/75 */;
        padding-bottom: 0.13333rem /* 10/75 */;
        margin-bottom: 0.46667rem /* 35/75 */;
        background: $default-color;
        flex-direction: column;
        .wrap-tbox{
            display: flex;
            width: 100%;
        }
        .spread-code{
            color: #1a1a1a;
            margin-bottom: px2rem(20);
        }
        .links {
            flex: 1;
            width: 70%;
            .linkp {
                font-size: px2rem(28);
                color: $title-color;
                margin-bottom: 0.13333rem /* 10/75 */;
                display: flex;
                justify-content: space-between;
                #down_btn_a{
                    color: #17c492;
                    text-decoration: underline;
                }
                .copys {
                    color: $default-color;
                    padding: px2rem(9) px2rem(23);
                    background: #17c492;
                    border-radius: px2rem(50);
                    margin-left: px2rem(23);
                    font-size: px2rem(22);
                }
            }
            .linkurl {
                font-size: px2rem(24);
                color: #999;
            }
        }
        .qrcode {
            // flex: 1;
            margin-right: 0.13333rem /* 10/75 */;
            // width: px2rem(88);
            // height: px2rem(88);
            .left {
                text-align: center;
                width: 100%;
                
                span {
                    width: 100%;
                    display: block;
                }
                a {
                    font-size: 0.29333rem /* 22/75 */;
                    color: $primary-color;
                    text-decoration: underline;
                }
            }
        }
    }
    .has-btn {
        width: 100%;
    }
    .btns {
        display: flex;
        justify-content: center;
        height: px2rem(88);
        padding: 0;
        .btnsf {
            font-size: px2rem(28);
            display: block;
            width: 9.2rem /* 690/75 */;
            height: px2rem(80)!important;
            background: #17c492!important;
            border-radius: 0.13333rem /* 10/75 */;
        }
        /deep/.nut-button{
            background: #17c492!important;
        }
    }
</style>
