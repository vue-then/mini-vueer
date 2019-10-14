

<template>
  <!-- 充值记录 -->
  <div class="capitalrecord">
    <Header title="资金流水"></Header>

    <div class="FundType" v-show="isShowFund">
      <div class="fundList">
        <div class="title">
          <span class="left" @click="cancelFund">取消</span>
          <span @click="choselFund()" class="right">确定</span>
        </div>
        <div class="titButton">
          <button @click="unAllChose()" class="left">重置</button>
          <button :class="isAllChose ? 'on':''" @click="choseAllType()" class="right allChose">全部</button>
        </div>
        <ul>
          <li
            @click="choseType(item)"
            :class="[item.chose?'on':'']"
            v-for="(item, index) in typeList"
            :key="index"
          >{{item.value}}</li>
        </ul>
      </div>
    </div>

    <div v-show="loading" class="skeleton vue-skeleton-loading">
      <div class="skeleton-bac-animation"></div>
      <column>
        <skeleton-square width="9rem" height="1rem" :count="9" margin="0.2rem 0.5rem"></skeleton-square>
      </column>
    </div>

    <div v-show="!loading" class="searchBox">
      <div class="flex-content" @click="choosecapital()">
        筛选:
        <p class="input-drop">
          <span class="text">类型</span>
          <i class="kailong iconfont iconicon_mine_rmore"></i>
        </p>
      </div>
      <div class="flex-content" @click="choosetime()">
        时间:
        <p class="input-drop">
          <span class="text">{{timeText[0]}}</span>
          <i class="kailong iconfont iconicon_mine_rmore"></i>
        </p>
      </div>

      <nut-picker
        :is-visible="isShowTimeChoose"
        :list-data="timeItems"
        :default-value-data="defaultTime"
        @close="switchActionSheet('isShowTimeChoose')"
        @confirm="setTimeSelected"
      ></nut-picker>
    </div>

    <!--列表数据展示 -start -->
    <div v-show="!loading" class="generalizeLink-list table">
      <div v-show="list.length > 0" class="page-loadmore">
        <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px'}" ref="wrapper">
          <pk-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            :top-all-loaded="topAllLoaded"
            @top-status-change="handleTopChange"
            @bottom-status-change="handleBottomChange"
            ref="loadmore"
            :stop-translate="stopTranslate"
          >
            <ul>
              <li class="pk-1px-b" v-for="(item, index) of list" :key="index">
                <div class="title green">
                  <p>
                    <span>{{item.transactionTypeName}}</span>
                  </p>
                  <span class="money">{{item.transactionMoney | currency('+',2)}}</span>
                </div>
                <div class="order">
                  <span class="number">{{item.remark}}</span>
                  <span class="time">{{item.createTime | filterDate}}</span>
                </div>
              </li>
            </ul>
            <div class="noMoredata" v-show="hasData">我是有底线的</div>
          </pk-loadmore>
        </div>
      </div>
      <no-data v-show="list.length == 0"></no-data>
    </div>
    <!--列表数据展示 -end -->
  </div>
</template>

<script>
import { getTransactionList, getTransactionType } from "@/services/moneyRecord";
import { timeStamp } from "@/services/commonfn";
import pkLoadmore from "@/components/Loadmore";
import noData from "@/components/NoData";
import Header from "@/components/Header";

export default {
  name: "capitalrecord",
  components: {
    pkLoadmore,
    noData,
    Header,
  },
  data() {
    return {
      typeList: [], //资金类别
      //充值类型选择
      isShowDepositChoose: false,
      depositSelectData: [],
      transactionType: [], //后端需要传递一个数组

      //时间选择
      isShowTimeChoose: false,
      timeItems: [],
      timeText: [],
      defaultTime: [],
      beginTime: 0,
      endTime: 0,

      //分页
      list: [],
      stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
      allLoaded: false,
      topAllLoaded: false,
      topStatus: "",
      bottomStatus: "",
      wrapperHeight: 0,
      page: 1, //当前页数
      pageSize: 10, //每页请求的条数
      totalNum: 0, //总页数
      hasData: false,

      fromType: this.$route.query.fromType * 1 || "",
      loading: false,

      isShowFund: false,
      isAllChose: false
    };
  },
  mounted() {
    this.getTypeList(1); //获取资金类别
    this.timeItems = [timeStamp.map(item => item.name)];

    //设置需要传递给后端的值 默认是今天
    this.beginTime = timeStamp[1].value.startDate;
    this.endTime = timeStamp[1].value.endDate;
    this.timeText = [timeStamp[1].name];
    this.defaultTime = this.timeText;
   
  },
  methods: {
    unAllChose() {
      this.typeList.map(v => {
        this.$set(v, "chose", false);
        return v;
      });
      this.isAllChose = false;
    },
    choseAllType() {
      this.typeList.map(v => {
        this.$set(v, "chose", true);
        return v;
      });
      this.isAllChose = true;
    },
    //选择分类
    choseType(item) {
      if (typeof item.chose != "undefined") {
        item.chose = !item.chose;
      } else {
        this.$set(item, "chose", true);
      }
      this.isAllChose = true;
      this.typeList.map(v => {
        if (v.chose == false) {
          this.isAllChose = false;
        }
      });

      console.log(item, "chose");
    },
    //类型选择取消按钮
    cancelFund() {
      this.isShowFund = false;
    },

    //类型选择确定按钮
    choselFund() {
      this.transactionType = [];
      this.typeList.map(v => {
        if (v.chose == true) {
          this.transactionType.push(v.id);
        }
      });
      this.isShowFund = false;
      this.getList();
      console.log(this.transactionType, " this.transactionType");
    },

    //类型选择弹框
    choosecapital() {
      this.isShowFund = true;
      //this.isShowDepositChoose = true;
    },

    //时间选择
    choosetime() {
      this.isShowTimeChoose = true;
    },
    //时间选择确定
    setTimeSelected(data) {
      let item = timeStamp.filter(item => item.name === data[0]);
      this.beginTime = item[0].value.startDate;
      this.endTime = item[0].value.endDate;
      this.timeText = [item[0].name];
      this.getList(1);
    },
    switchActionSheet(param) {
      this[`${param}`] = !this[`${param}`];
    },
    getTypeList(first) {
      getTransactionType().then(res => {
        if (res.success) {
          this.typeList = res.data;
          this.typeList.map(v => {
        this.$set(v, "chose", false);
        return v;
      });
          console.log("tag", this.typeList, res.data);
        } else {
          this.$toast.text(res.message, {
            cover: true,
            duration: 1000
          });
        }
        //第一次进页面，默认展示第一个资金分类数据
        if (first == 1) {
          this.typeList[0].chose = true;
          this.transactionType.push(this.typeList[0].id);
          this.getList();
          console.log(this.transactionType, "this.transactionType");
        }
      });
    },
    getList(time) {
      let data = {
        beginBetTime: this.beginTime,
        endBetTime: this.endTime,
        transactionType: this.transactionType,
        page: this.page,
        pageSize: this.pageSize
      };

      //重新选择时间后，避免load拼接的list继续展示在页面中
      if (time == 1) {
        this.list = [];
      }
      getTransactionList(data).then(res => {
        if (res.success) {
          let result = [];
          this.totalNum = res.data.count;
          result = res.data.fundListApps || [];
          if (this.page === 1) {
            this.list = result;
            if (this.totalNum < this.page * this.pageSize) {
              this.allLoaded = true;
              this.topAllLoaded = true;
            } else {
              this.allLoaded = false;
              this.topAllLoaded = false;
            }
          } else {
            this.list = this.list.concat(result);
            this.topAllLoaded = false;
          }
          this.$nextTick(() => {
            this.wrapperHeight =
              document.documentElement.clientHeight -
              this.$refs.wrapper.getBoundingClientRect().top;
          });
          this.loading = false;
        } else {
          this.$toast.text(res.message, {
            cover: true,
            duration: 1000
          });
        }
      });
    },
    //下拉刷新
    handleTopChange(status) {
      this.topStatus = status;
    },
    loadTop() {
      this.page = 1;
      this.hasData = false;
      setTimeout(() => {
        this.getList();
        this.$refs.loadmore.onTopLoaded();
        this.allLoaded = false;
      }, 1500);
    },
    //mint-ui 上拉加载
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      this.page += 1;
      this.hasData = false;
      setTimeout(() => {
        this.getList();
        this.$refs.loadmore.onBottomLoaded();
        if (this.page * this.pageSize >= this.totalNum) {
          this.allLoaded = true; //所有数据加载完成
          this.hasData = true;
          this.topAllLoaded = false;
        }
      }, 1500);
    }
  }
};
</script>

<style scoped lang="scss">
.capitalrecord {
  .FundType {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: $nondefault-color, $alpha: 0.3);
    z-index: 3;
    .left {
      float: left;
      color: $label-color;
      text-align: left;
      padding-left: px2rem(32);
    }
    .right {
      float: right;
      text-align: right;
      padding-right: px2rem(32);
    }
    .titButton {
      height: px2rem(80);
      .allChose {
        width: px2rem(120);
        position: relative;
        &:before {
          content: "";
          position: absolute;
          display: block;
          top: px2rem(20);
          background: url("data:image/svg+xml;charset=utf-8,%3Csvg width='20' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8l2.5-2.5 5 4.5 10-9.5L20 3 8 15H7z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E")
            no-repeat left center;
          background-color: $dark-color;
          background-repeat: no-repeat;
          background-position: center;
          background-size: px2rem(22) px2rem(22);
          border-radius: px2rem(15);
          height: px2rem(30);
          width: px2rem(30);
        }
        &.on {
          color: $primary-color;
          &:before {
            background-color: $primary-color;
          }
        }
      }
    }

    .fundList {
      position: absolute;
      bottom: 0;
      background: $default-color;
      .title {
        height: px2rem(80);
        border-bottom: $backwater-no-btn solid px2rem(2);
        line-height: px2rem(80);
        font-size: px2rem(28);
        .right {
          color: $primary-color;
        }
      }
      button {
        line-height: px2rem(70);
        font-size: px2rem(24);
      }
    }

    ul {
      height: px2rem(600);
      overflow-x: auto;
      li {
        width: px2rem(207);
        height: px2rem(63);
        line-height: px2rem(63);
        border-radius: px2rem(5);
        float: left;
        font-size: px2rem(28);
        margin-left: px2rem(32);
        margin-bottom: px2rem(32);
        text-align: center;
        background: $default-bg-color;
        color: $label-color;
        &.on {
          background-color: $primary-color;
          color: $default-color;
        }
      }
    }
  }
  .searchBox {
    background: $default-color;
    margin-top: px2rem(24);
    padding: 0 px2rem(32);
    height: px2rem(88);
    line-height: px2rem(88);
    display: flex;
    flex-direction: row;
    .flex-content {
      margin-right: $twentyrem;
      color: $tip-color;
      display: flex;
      align-items: center;
      .input-drop {
        width: px2rem(200);
        height: px2rem(56);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 px2rem(8);
        margin-left: px2rem(8);
        box-sizing: border-box;
        // padding: $tenrem/2 $seventrem $tenrem/2 $tenrem;
        border: $onerem solid $border-color;
        border-radius: px2rem(8);
        color: $text-color;
        font-size:px2rem(24);
        i {
          transform: rotate(90deg);
          font-size: px2rem(20);
        }
      }
    }
  }
}

.page-loadmore {
  position: fixed;
  top: px2rem(224);
  left: 0;
  right: 0;
  .page-loadmore-wrapper {
    overflow-y: scroll;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ul {
    background: $default-color;
    padding-left: px2rem(30);
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: px2rem(140);
      padding-right: px2rem(30);
      .title {
        display: flex;
        justify-content: space-between;
        font-size: px2rem(28);
        color: $tip-color;
        .status {
          width: px2rem(88);
          height: px2rem(32);
          line-height: px2rem(32);
          display: inline-block;
          border-radius: px2rem(16);
          font-size: px2rem(24);
          text-align: center;
          color: $default-color;
          background: $backwater-no-btn;
          font-size: px2rem(22);
          margin-left: px2rem(22);
          padding: px2rem(4) px2rem(10);
        }
        .money {
          color: $label-color;
        }
        &.green {
          .status {
            background: $primary-color;
          }
          .money {
            color: $primary-color;
          }
        }
        &.red {
          .status {
            background: $color-a;
          }
          .money {
            color: $color-a;
          }
        }
      }
      .order {
        display: flex;
        justify-content: space-between;
        color: $label-color;
        .number {
          flex: 2;
        }
        .time {
          flex: 1;
          text-align: right;
        }
      }
    }
  }
}

.popmoreBox {
  .popmoreContent {
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: px2rem(630);
    border-radius: px2rem(20);
    overflow: hidden;
    .title {
      position: relative;
      width: 100%;
      height: px2rem(96);
      line-height: px2rem(96);
      text-align: center;
      font-size: px2rem(32);
      color: $tip-color;
      background: $default-color;
    }
    .popmore-content {
      background: $default-color;
      ul {
        padding: 0 px2rem(32);
        li {
          line-height: px2rem(60);
          font-size: px2rem(24);
          color: $tip-color;
          border-bottom: $onerem solid $border-color;
          .left {
            float: left;
            font-size: px2rem(24);
            color: $tip-color;
          }
          .right {
            float: right;
            font-size: px2rem(24);
            color: $label-color;
            font-weight: 300;
            &.green {
              color: $primary-color;
            }
            &.red {
              color: $color-a;
            }
          }
        }
      }
      .close {
        text-align: center;
        line-height: px2rem(80);
        font-size: px2rem(28);
        color: $primary-color;
      }
    }
  }
}
</style>