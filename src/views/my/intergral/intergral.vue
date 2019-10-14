<template>
  <div class="intergral" v-cloak>
    <div class="interHead">
      <Header title="会员积分" backPath='/my' class="navblack"></Header>
      <div class="noticebar" v-if="announcement.length > 0" @click="toSystemAnnounce">
            <div class="noticebar-label">
                <i><img src="../../../assets/img/my-icon/icons/intergral/tongzhi.png" alt="" srcset=""></i>
            </div>
            <marquee class="marquee" direction="left" align="bottom" width="100%" scrollamount="4" scrolldelay="1">
                <div class="noticeText" v-for="(noticeDatas,index) in announcement" :key="index">{{noticeDatas.content}}</div>
            </marquee>
        </div>
        <div class="noticebar" v-show="!announcement.length"></div>
      
        <div class="userLevel">
            <div class="topDetail">
                <div class="mem-avatar">
                    <img v-show="memberInfoDate.memberLogo" :src="memberInfoDate.memberLogo" alt="">
                    <img v-show="!memberInfoDate.memberLogo" src="../../../assets/img/morentouxiang.png" alt="">
                </div>
                <div class="mid-tit">
                    <div class="name">{{memberInfoDate.memberName}}</div>
                    <div class="level"><img :src="nowLevelLogo" alt=""></div>
                </div>
                <div class="mem-intergral">
                    <div class="num">{{memberInfoDate.memberIntegar}}</div>
                    <div class="cont">我的积分</div>
                </div>
            </div>
            
            <div class="levelLine">
                <div class="toptit">
                    <div class="left">当前等级：{{memberInfoDate.memberVipName}}</div>
                    <div class="right" v-show="memberInfoDate.memberNextNeedIntegar!==0">还差{{memberInfoDate.memberNextNeedIntegar}}积分升级为{{memberInfoDate.memberNextLevelName}}</div>
                    <div class="right rightpro" v-show="memberInfoDate.memberNextNeedIntegar===0">已是最高等级</div>
                </div>
                <div class="levelLineUp" ref="levelLineUp">
                    <div class="progresser" ref="progresser"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="tabCards">
        <router-link tag="div" class="intergDetail" to="/intergral/intergDeta">
            <span>积分明细</span> 
        </router-link>
        <router-link tag="div" class="levelSystem" to="/intergral/intergRule">
            <span>等级制度</span> 
        </router-link>
    </div>
    <div class="intergTask">
      <div class="taskList taskListTit">
        <h2 class="taskTit">做任务拿积分</h2>
      </div>
      <div class="taskList">
        <p :class="memberInfoDate.if_sign?'butCloseColor':''">每签到1天+{{memberInfoDateList.sign_in_score}}积分</p>
        <button v-if="!memberInfoDate.if_sign" v-on:click="singIn()">签到</button>
        <button v-if="memberInfoDate.if_sign" class="butClose">已签到</button>
      </div>
      <div class="taskList">
        <p :class="memberInfoDate.if_complete_information?'butCloseColor':''">个人信息全部填写完成+{{memberInfoDateList.complete_information_score}}积分</p>
        <button v-if="!memberInfoDate.if_complete_information" @click="$router.push('/about')">去填写</button>
        <button v-if="memberInfoDate.if_complete_information" class="butClose">已获得</button>
      </div>
      <div class="taskList">
        <p>每充值1元+{{memberInfoDateList.recharge_score}}积分</p>
        <button @click="$router.push('/deposit')">去充值</button>
      </div>
      <div class="taskList">
        <p>每投注1元+{{memberInfoDateList.comsume_score}}积分，每日首次投注额外+{{memberInfoDateList.complete_information_score}}积分</p>
        <button @click="$router.push('/')">去投注</button>
      </div>
      <div class="taskList">
        <p>推广会员发生首次有效投注+{{memberInfoDateList.spread_score}}积分</p>
        <button @click="$router.push('/spread')">去推广</button>
      </div>
    </div>
  </div>
</template>

<script>
import { intergSignin, intergMerber } from "@/services/intergral.js";
import { getBoxnum } from "@/services/msgCenter.js";
import Header from '@/components/Header';
import {
    getAnnouncement,
} from "@/services/index.js";

export default {
  name: "intergral",
  components: {
        Header
    },
  data() {
    return {
      memberInfoDate: [],
      memberInfoDateList: [],
      announcement: [],
      levelWidth: 0,
      boxNum: 0,
      nowLevelLogo: ''
    };
  },
  mounted() {
    this.memberInfo();
    this.getBoxnumFunc();
    this.getAnnouncementFunc();
  },
  methods: {
    //签到
    singIn() {
      console.log("12121");
      intergSignin().then(res => {
        if (res.success) {
          this.$toast.success("签到成功!", {
                            cover: true,
                            duration: 800
                        });
          this.memberInfo();
        } else {
          this.$toast.fail(res.message, {
            cover: true,
            duration: 1000
          });
        }
      });
    },

    //获取会员基本信息
    memberInfo() {
      intergMerber().then(res => {
        if (res.success) {
          this.memberInfoDate = res.data;
          this.memberInfoDateList = res.data.groupLevelRules;
          this.nowLevelLogo = this.memberInfoDate.levelRules[0].levelLogo;
          var a = res.data.memberIntegar * 1;
          var b = (res.data.memberIntegar + res.data.memberNextNeedIntegar) * 1;
          this.levelWidth = (a / b) * 8; //总宽度 8rem
          this.$refs.progresser.style.width = this.levelWidth + "rem";
        } else {
          this.$toast.fail(res.message, {
            cover: true,
            duration: 1000
          });
        }
      });
    },

    //获取右上角信息条数
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
    more(path) {
      this.$router.push({
        name: path
      });
    },
    toSystemAnnounce() {
        this.$router.push({
            name: "systemAnnounce",
            query: {
                active: 1
            }
        });
    },
    getAnnouncementFunc() {
        getAnnouncement(-1).then(res => {
            if (res.success) {
                this.announcement = res.data.announcement || [];
            } else {
                this.$toast.fail(res.message, {
                    cover: true,
                    duration: 1500
                });
            }
        });
    },


  }
};
</script>

<style lang="scss" scoped>
.bgfff{
    color: $default-color;
}
/deep/.navblack{
    background: #12100f;
    .nav-left{
        div{
            span,i{
                color: $default-color;
            }
        }
    }
}

//右上角消息红点
// .imgsbank {
//   width: 0.6rem /* 45/75 */;
// }
// .inbox-num {
//   position: relative;
//   z-index: 1;
//   &::before {
//     content: "";
//     position: absolute;
//     top: -0.1334rem;
//     right: -0.1rem;
//     width: 0.2667rem;
//     height: 0.2667rem;
//     border-radius: 0.2667rem;
//     background: $color-a;
//   }
// }

.intergral {
  background: #f3f3f3;
  .nut-navbar.pk-title,
  .interHead {
    // background-image: linear-gradient(270deg, #493e3e 0%, #1f1f1f 100%),
    //   linear-gradient(0deg, #3e364b 100%);
    background: #12100f;
  }
  .interHead {
    height: px2rem(430);
    color: #f7c279;
    .userInfo {
      position: relative;
      .userImg {
        position: absolute;
        top: 0.533333rem;
        left: 0.4rem;
        width: 1.28rem;
        height: 1.28rem;
        border-style: solid;
        border-width: 0.053333rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 1.28rem;
          height: 1.28rem;
        }
      }
      p {
        position: absolute;
        left: 1.96rem;
        top: 0.733333rem;
        font-size: 0.426667rem;
        font-weight: bold;
      }
      span {
        position: absolute;
        top: 1.346667rem;
        left: 1.96rem;
        font-size: 0.346667rem;
      }
      a {
        width: 50%;
        height: 1.333333rem;
        background: url(../../../assets/img/yy-more.png) right center no-repeat;
        background-size: 0.133333rem 0.266667rem;
        color: #f7c279;
        position: absolute;
        top: 0.9rem;
        right: 0.586667rem;
      }
    }
  }
  .userLevel {
    position: relative;
    width: 9.2rem;
    // background-image: linear-gradient(270deg, #e4d0ab 0%, #ecce8d 100%),
    //   linear-gradient(24deg, #fad5b9 1%, #fdd6b9 46%, #fecfa9 100%);
    background: -webkit-linear-gradient(left, #f2e3cb , #e4bc8b); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #f2e3cb, #e4bc8b); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #f2e3cb, #e4bc8b); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #f2e3cb , #e4bc8b); /* 标准的语法（必须放在最后） */
    margin: px2rem(32) auto;
    box-shadow: 0px 2px 5px 0px rgba(62, 15, 68, 0.1);
    border-radius: 10px;
    height: px2rem(306);
    display: flex;
    flex-direction: column;
    .topDetail{
        display: flex;
        flex: 1;
        align-items: center;
        padding: 0 px2rem(40);
        .mem-avatar{
            flex: 1;
            margin-right: px2rem(33);
            img{
                height: px2rem(96);
                width: px2rem(96);
            }
        }
        .mid-tit,
        .mem-intergral{
            display: flex;
            // justify-content: center;
            flex-direction: column;
            color: #864c0e;
            font-size: px2rem(36);
            font-weight: 500;
        }
        .mid-tit{
            flex: 4;
            .level{
                img{
                    width: px2rem(65);
                    height: px2rem(32);
                }
            }
        }
        .mem-intergral{
            flex: 2;
            text-align: right;
            .cont{
                font-size: px2rem(24);
                color: #864c0e;
                font-weight: 400;
            }
        }

    }
    // h2 {
    //   position: absolute;
    // //   left: 0.64rem;
    // //   top: px2rem(56);
    //   font-size: 0.506667rem;
    //   color: #8d5519;
    // }
    
    
    .levelLine {
      height: px2rem(74);
      width: 100%;
      position: relative;
      .toptit{
          color: #8d5519;
          display: flex;
          justify-content: space-between;
          font-size: px2rem(24);
          padding: 0 px2rem(43);
        //   position: absolute;
          margin-top: px2rem(-20);
          .right{
              background: url(../../../assets/img/renwu-upicon.png) left center
                    no-repeat;
                background-size: 0.266667rem 0.293333rem;
                padding-left: 0.426667rem;
          }
          .rightpro{
              background: none;
          }

      }
      .levelLineUp {
        background: #dcbc92;
        height: px2rem(8);
        margin: 0 auto;
        position: absolute;
        top: 45%;
        right: px2rem(43);
        width: 8rem;
        .progresser{
           height: 100%;
           background: #fb8224; 
           position: relative;
           &::after{
               content: '';
               position: absolute;
               right: px2rem(-40);
               top: px2rem(-20);
               width: px2rem(49);
               height: px2rem(43);
               background: url('../../../assets/img/my-icon/icons/intergral/jindubiao.png') no-repeat 0 center;
               background-size: 100%;
           }
        }
      }
    }
  }
  .intergTask {
    margin: 0.4rem 0.4rem;
    margin-top: 0;
    font-size: px2rem(28);
    border-radius: 0.133333rem;
    color: #864c0e;
    .taskList {
        padding: 0 0.4rem;
        margin-bottom: px2rem(23);
        line-height: 0.64rem;
        color: #3e364b;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        border-radius: px2rem(10);
      h2 {
        height: 1.066667rem;
        line-height: 1.066667rem;
        padding-left: 0.746667rem;
        background-color: #f2f2f2!important;
        background: url("../../../assets/img/my-icon/icons/intergral/renwu.png") left center no-repeat;
        background-size: 0.426667rem 0.426667rem;
        color: #864c0e;
      }
      p {
        padding: 0.2rem 0;
        float: left;
        width: 5.666667rem;
      }
      button {
        width: 1.346667rem;
        height: 0.533333rem;
        background-color: #fabc8a;
        border-radius: 0.266667rem;
        color: #ffffff;
        border: none;
        margin-top: 0.266667rem;
      }
      .butClose {
        background-color: #d9d9d9;
      }
      .butCloseColor{
        color: #999;
      }
    }
    .taskList:last-child {
      border: none;
    }
    .taskListTit{
      margin:0;
      padding: 0;
      display:block;
      background-color: #f2f2f2;
    }
  }
}
.noticebar {
    position: relative;
    height: px2rem(60);
    background: #12100f;
    .noticebar-label {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 1;
        width: 1.5467rem;
        text-align: center;

        i {
            padding-left: px2rem(26);
            width: px2rem(36);
            height: px2rem(33);
            display: block;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    .marquee {
        border-left: 1.0467rem solid #12100f;
        box-sizing: border-box;
        height: px2rem(60);
    }

    .noticeText {
        padding-left: 1.5467rem;
        line-height: px2rem(60);
        display: inline-block;
        vertical-align: middle;
        color: #e5bd8d;
    }
}
.tabCards{
    display: flex;
    height: px2rem(120);
    width: 100%;
    margin-top: px2rem(26);
    div{
        width: 45%;
        height: 100%;
        background-size: 100%;
        border-radius: px2rem(12);
        margin-left: px2rem(26);
        line-height: px2rem(120);
        span{
            margin-left: px2rem(33);
            color: #fff;
            font-size: px2rem(28);
        }
    }
    .intergDetail{
        background: url('../../../assets/img/my-icon/icons/intergral/jifenmingxi.png') no-repeat;
        background-size: 100%;
    }
    .levelSystem{
        background: url('../../../assets/img/my-icon/icons/intergral/dengjizhidu.png') no-repeat;
        background-size: 100%;
    }
}

</style>