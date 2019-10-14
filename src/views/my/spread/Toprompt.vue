<template>
	<div class="topromote" ref="topromote">
		<Header title="我要推广" headerClass="transparent"></Header>
		<swiper :options="swiperOption" ref="mySwiper" >
            <!-- slides -->
            <swiper-slide class="bg">
                <div class="prompt-content">
                    <div class="mid">
                        <div class="img">
                            <div class="qrcode">
                                <div class="left">
                                    <span>
                                        <qriously
                                            v-if="imgUrl"
                                            :value="imgUrl"
                                            :size="size"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="code">
                            <img src="../../../assets/img/my-icon/icons/spread/topromp/icon_share_txt_code.png" alt="">
                            <div class="has_code">邀请码：<span @click="copyLink(spreadCode)">{{spreadCode}}</span></div>
                        </div>
                    </div>
                    <div class="mid-img">
                        <img src="../../../assets/img/my-icon/icons/spread/topromp/icon_share_txt_three.png" alt="">
                    </div>
                    <div class="btn">
                        <div class="share">分享</div>
                        <div class="save" @click="downLoadImg()">保存</div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class='bg2'>
                <div class="prompt-content">
                    <div class="mid">
                        <div class="img">
                            <div class="qrcode">
                                <div class="left">
                                    <span>
                                        <qriously
                                            v-if="imgUrl"
                                            :value="imgUrl"
                                            :size="size"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="code">
                            <img src="../../../assets/img/my-icon/icons/spread/topromp/icon_share_ele_txt_code.png" alt="">
                            <div class="has_code">邀请码：<span @click="copyLink(spreadCode)">{{spreadCode}}</span></div>
                        </div>
                    </div>
                    <div class="mid-img">
                        <img src="../../../assets/img/my-icon/icons/spread/topromp/icon_share_ele_txt_three.png" alt="">
                    </div>
                    <div class="btn">
                        <div class="share">分享</div>
                        <div class="save" @click="downLoadImg()">保存</div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="bg3">
                <div class="prompt-content">
                    <div class="mid">
                        <div class="img">
                            <div class="qrcode">
                                <div class="left">
                                    <span>
                                        <qriously
                                            v-if="imgUrl"
                                            :value="imgUrl"
                                            :size="size"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="code">
                            <img src="../../../assets/img/my-icon/icons/spread/topromp/icon_share_chess_btn_code.png" alt="">
                            <div class="has_code">邀请码：<span @click="copyLink(spreadCode)">{{spreadCode}}</span></div>
                        </div>
                    </div>
                    <div class="mid-img">
                        <img src="../../../assets/img/my-icon/icons/spread/topromp/icon_share_chess_btn_three.png" alt="">
                    </div>
                    <div class="btn">
                        <div class="share">分享</div>
                        <div class="save" @click="downLoadImg()">保存</div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="bg4">
                <div class="prompt-content">
                    <div class="mid">
                        <div class="img">
                            <div class="qrcode">
                                <div class="left">
                                    <span>
                                        <qriously
                                            v-if="imgUrl"
                                            :value="imgUrl"
                                            :size="size"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="code">
                            <img src="../../../assets/img/my-icon/icons/spread/topromp/icon_share_ele_txt_code.png" alt="">
                            <div class="has_code">邀请码：<span @click="copyLink(spreadCode)">{{spreadCode}}</span></div>
                        </div>
                    </div>
                    <div class="mid-img">
                        <img src="../../../assets/img/my-icon/icons/spread/topromp/icon_share_ele_txt_three.png" alt="">
                    </div>
                    <div class="btn">
                        <div class="share">分享</div>
                        <div class="save" @click="downLoadImg()">保存</div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
	</div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import Header from '@/components/Header';
import func from "@/services/spread";
export default {
    components: {
        Header
    },
    data() {
        return {
            swiperOption: {},
            imgUrl: "",
            spreadCode: "",
            size: 100,
            account: localStorage.getItem("account"), //当前账号
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      this.$refs.topromote.style.height = window.innerHeight + "px";
      this.getQriously()
      // current swiper instance
    //   this.swiper.slideTo(3, 1000, false)
    },
	methods: {
		back(path) {
			this.$router.push({
				name: path
			});
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
	}
};
</script>
<style lang="scss" scoped>
// @import "../../../styles/pk-pwd.scss";
.topromote{
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: -1.17333rem;
    .swiper-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
    }
    .prompt-content{
       position: absolute;
       bottom: 1.56rem;
       width: 100%;
       display: flex;
       flex-direction: column;
       .mid{
           display: flex;
           width: 100%;
           justify-content: center;
           align-items: center;
        //    padding-left: px2rem(20);
           .img{
               width: px2rem(200);
               height: px2rem(200);
           }
           .code{
               display: flex;
               flex-direction: column;
               margin-left: px2rem(30);
               img{
                   width: auto;
                   height: px2rem(98);
               }
               .has_code{
                   color: white;
                   font-size: px2rem(32);
                   font-weight: 900;
                   margin-top: px2rem(40);
                   span{
                        text-decoration: underline;
                   }
               }
           }
       }
       .mid-img{
           margin:.4rem 0;
           padding: 0 .4rem;
           width: auto;
           img{
               width: 100%;
           }
       }
       .btn{
           width: auto;
           display: flex;
           justify-content: space-around;
           padding: 0 px2rem(130);
           .share{
               width: px2rem(166);
               height: px2rem(80);
               background: #fff;
               color: #448ce0;
               font-size: px2rem(40);
               border-radius: px2rem(80);
               font-weight: 900;
               text-align: center;
               line-height: px2rem(80);
               box-shadow: 2px 9px 30px 2px rgba(0,0,0,0.75);
           }
           .save{
               width: px2rem(166);
               height: px2rem(80);
               background: #448ce0;
               color: #fff;
               font-size: px2rem(40);
               border-radius: px2rem(80);
               font-weight: 900;
               text-align: center;
               line-height: px2rem(80);
               box-shadow: 2px 9px 47px 2px rgba(0,0,0,0.75);
           }
        //    img{
        //        width: 100%;
        //        height: 100%;
        //    }
       }

    }
    .bg{
        background: url('../../../assets/img/my-icon/icons/spread/topromp/icon_share_fishing_bg.png') no-repeat 0 center;
        background-size: 100%;
    }
    .bg2{
        background: url('../../../assets/img/my-icon/icons/spread/topromp/icon_share_electronics_bg.png') no-repeat 0 center;
        background-size: 100%;
        .btn{
            .share{
                background: #78331f;
                color: #fff;
            }
            .save{
                background: #fff;
                color: #78331f;               
            }
        }
    }
    .bg3{
        background: url('../../../assets/img/my-icon/icons/spread/topromp/icon_share_chess_bg.png') no-repeat 0 center;
        background-size: 100%;
        .btn{
            .share{
                background: #e3c262;
                color: #fff;
            }
            .save{
                background: #fff;
                color: #e3c262;               
            }
        }
    }
    .bg4{
        background: url('../../../assets/img/my-icon/icons/spread/topromp/icon_share_video_bg.png') no-repeat 0 center;
        background-size: 100%;
        .btn{
            .share{
                background: #a9289d;
                color: #fff;
            }
            .save{
                background: #fff;
                color: #a9289d;               
            }
        }
    }

    /deep/.qrcode{
        .left{
            canvas{
                background: $default-color!important;
            }
        }
    }
}


</style>
