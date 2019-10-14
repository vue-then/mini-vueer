<template>
  <div class="ranking" ref="ranking">
    <Header title="排行榜"></Header>

    <div class="rankingCont" v-cloak>
      <div class="rank_tab">
        <span :class="{active : cashType==1 }" @click="getRanking(1,1)">投注榜</span>
        <span :class="{active : cashType==2 }"  @click="getRanking(2,1)">中奖榜</span>
        <span  :class="{active : cashType==3 }" @click="getRanking(3,1)">返佣榜</span>
      </div>
      <div class="titImg">
        <img v-if="cashType==1" src="../../../assets/img/phb_tzphb.png" />
        <img v-if="cashType==2" src="../../../assets/img/phb_zjphb.png" alt="">
        <img v-if="cashType==3" src="../../../assets/img/phb_fyphb.png" alt="">
      </div>
      <div class="contTitle">
        <a class="titleOne" :class="{choice : dType==1 }" v-if="cashType != 3"  @click="getRanking(cashType,1)">日榜</a>
        <a class="titleTwo" :class="{choice : dType==2 }" v-if="cashType != 3" @click="getRanking(cashType,2)">月榜</a>
        <a class="titleThree" :class="{choice : dType==3 }" v-if="cashType != 3" @click="getRanking(cashType,3)">总榜</a>
        <span class="tetTitle" v-if="cashType ==3">推广返佣排行榜</span>
      </div>
      <div class="rankList" >
        <table class="rankTable">
          <thead class="ranHead">
            <tr>
              <td class="tLeft">排名</td>
              <td class="tCent">玩家</td>
              <td v-if="cashType==1" class="tRight">投注金额</td>
              <td v-if="cashType==2" class="tRight">中奖金额</td>
              <td v-if="cashType==3" class="tRight">返佣金额</td>
            </tr>
          </thead>
          <tbody class="rankBody" v-if="success">
            <tr v-for="(item, index) in rankList" :key="index" >
              <td class="tLeft">{{item.sort}}</td>
              <td class="tCent" :class="{myCent:myInfo.sort==item.sort}">{{item.nickname}}</td>
              <td class="tRight">{{item.money}}</td>
            </tr>
            
          </tbody>
          
        </table>
        <no-data v-show="rankList == null || rankList.length <= 0" class="no-data-box"></no-data>
      </div>
      <div class="myRank" v-cloak v-if="myInfo.sort!=0">
        <table class="rankTable">
          <thead class="ranHead">
            <tr>
              <td class="tLeft">排名</td>
              <td class="tCent">玩家</td>
              <td v-if="cashType==1" class="tRight">投注金额</td>
              <td v-if="cashType==2" class="tRight">中奖金额</td>
              <td v-if="cashType==3" class="tRight">返佣金额</td>
            </tr>
          </thead>
          <tbody class="rankBody"  v-if="success">
            <tr>
              <td class="tLeft">{{myInfo.sort}}</td>
              <td class="tCent">{{myInfo.nickname}}</td>
              <td class="tRight">{{myInfo.money}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getRankingInfo } from "@/services/ranking.js";
import Header from "@/components/Header";
import noData from "@/components/NoData.vue";
export default {
name: "ranking",
  components: {
		getRankingInfo,
    Header,
    noData
	},
  data() {
    return {
      cashType:1,
      dType:1,
      rankList:[],
      myInfo:[],
      success:false,
    }
  },
  mounted() {
    this.getRanking(1,1);
  },
  methods: {
  
    back(path) {
      this.$router.push({
        name: path
      });
    },

    getRanking(cashType,dType){
      this.cashType = cashType,
      this.dType = dType
      var data ={
        cashType:cashType,
        dType:dType
      }
       getRankingInfo(data).then(res => {
                    if (res.success) {
                      this.success = res.success;
                      this.rankList = res.data.data;
                      
                      this.myInfo = res.data.myInfo;
                      console.log(res, 'res')
                      console.log(this.rankList, 'this.rankList')
                      console.log(this.myInfo, 'this.myInfo')
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
.ranking {
  .rankingCont {
    background: url(../../../assets/img/phb_bj.png) #ff7060 no-repeat;
    background-position: 0 px2rem(-127.5);
    background-size: 100%;
    min-height: 100%;
    position: absolute;
    width: 100%;
    .rank_tab {
      position: fixed;
      width: 100%;
      top: 1.17333rem;
      height: px2rem(88);
      line-height: px2rem(88);
      text-align: center;
      background:rgba(21, 21, 21, 0.5);
      border: none;
      color: $default-color;
      display: flex;
      span {
        display: block;
        flex: 1;
        width: 33%;
        font-size:px2rem(28);
        position: relative;
      }
      .active {
        font-weight: bold;
      }
      .active:before {
        content: " ";
        position: absolute;
        width: px2rem(32) !important;
        height: px2rem(8);
        background: $default-color;
        border-radius: px2rem(4);
        bottom: px2rem(15);
        left: px2rem(109);
      }
    }
    .titImg {
      width:px2rem(406);
      height:px2rem(90);
      margin: px2rem(320) auto 0;
      img {
        width: 100%;
      }
    }
    .contTitle {
      position: relative;
      z-index: 10;
      margin: 0 auto;
      width:px2rem(686);
      height: px2rem(88);
      background: $default-color;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
      border-radius: px2rem(44);
        text-align: center;
      a {
        position: absolute;
        display: block;
        line-height:px2rem(66);
        font-size: px2rem(28);
        border-radius: px2rem(33);
        width: px2rem(120);
        height:px2rem(66);
        top:px2rem(11);
      }
      .titleOne {
        left: px2rem(13);
      }
      .titleTwo {
        left: px2rem(277.5);
      }
      .titleThree {
        right:px2rem(13);
      }
      a.choice {
        background: $color-w;
        color: $default-color;
      }
      .tetTitle{
        line-height:px2rem(88);
        font-size: px2rem(28);
        color: $color-w;
      }
    }
    .rankList {
      width:px2rem(616);
      background: $default-color;
      margin: 0 auto;
      padding-bottom: px2rem(88);
      .rankTable {
        width:px2rem(553);
        margin: 0 auto;
        td {
          line-height:px2rem(88);
        }

        .ranHead {
          border-bottom: $backwater-no-btn px2rem(2) solid;
          .tLeft {
            width: 25%;
            text-align: left;
          }
          .tRight {
            width: 25%;
            text-align: right;
          }
          .tCent {
            width: 50%;
            text-align: center;
          }
          td {
            font-size: px2rem(24);
            font-weight: bold;
            line-height: px2rem(78);
          }
        }
        .rankBody {
          .tLeft {
            width: 25%;
            font-size:px2rem(30);
            color: $label-color;
            text-align: left;
            position: relative;
          }
          .tCent {
            width: 50%;
            font-size: px2rem(24);
            color: $tip-color;
            text-align: center;
          }
          .myCent{
            color: $color-w;
          }
          .tRight {
            width: 25%;
            text-align: right;
            font-size:px2rem(24);
            color: #ff7060;
          }
          tr:nth-child(1) .tLeft::before {
            content: " ";
            position: absolute;
            width:px2rem(36);
            height:px2rem(44);
            background: url(../../../assets/img/phb_nb1.png) $default-color 100% 100%
              no-repeat;
            background-size: 100%;
            top: px2rem(15);
            left:px2rem(-9.75);
          }
          tr:nth-child(2) .tLeft::before {
            content: " ";
            position: absolute;
            width: px2rem(36);
            height: px2rem(44);
            background: url(../../../assets/img/phb_nb2.png) $default-color 100% 100%
              no-repeat;
            background-size: 100%;
            top: px2rem(15);
            left:px2rem(-9.75);
          }
          tr:nth-child(3) .tLeft::before {
            content: " ";
            position: absolute;
            width:px2rem(36);
            height:px2rem(44);
            background: url(../../../assets/img/phb_nb3.png) $default-color 100% 100%
              no-repeat;
            background-size: 100%;
            top: px2rem(15);
            left: px2rem(-9.75);
          }
        }
      }
    }
    .myRank {
      width: px2rem(615);
      border-top: $backwater-no-btn px2rem(2) solid;
      background: $default-color;
      position: fixed;
      left: 50%;
      margin-left: px2rem(-308);
      bottom: 0;
      .rankTable {
        width: px2rem(553);
        margin: 0 auto;
        td {
          line-height:px2rem(88);
        }

        .ranHead {
          display: none;
          border-bottom: $backwater-no-btn px2rem(2) solid;
        }
        .rankBody {
          
          .tLeft {
            width: 25%;
            font-size:px2rem(30);
            color: $label-color;
            text-align: left;
            position: relative;
          }
          .tCent {
            width: 50%;
            font-size:px2rem(24);
            color: $tip-color;
            text-align: center;
            color: $color-w;
          }
          .tRight {
            width: 25%;
            text-align: right;
            font-size: px2rem(24);
            color: #ff7060;
          }
        }
      }
    }
  }
}
</style>