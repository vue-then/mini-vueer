<template>
  <div class="detailRecord">
    <nut-picker
      title="请选择时间"
      :is-visible="isShowTimeModal"
      :default-value-data="defaultValueDatas"
      :list-data="timeList"
      @close="switchPicker('isShowTimeModal')"
      @confirm="confirmTime"
    ></nut-picker>
  
<HeaderNav title="我的报表" :titleRight="selectTime.name" 
            :showLeftIcon="true" 
            :showRight="true" 
            :showRightIcon="true"
            @on-right="switchPicker('isShowTimeModal')"
        ></HeaderNav>
    <div class="cent" v-show="!showLoading">
      <div class="table">
        <nut-row class="thead" type="flex" justify="space-between" flexWrap="nowrap">
          <nut-col :span="8">
            <div class="flex-content left">下注总额</div>
          </nut-col>
          <nut-col :span="8">
            <div class="flex-content cent">有效下注额</div>
          </nut-col>
          <nut-col :span="8">
            <div class="flex-content right">盈利</div>
          </nut-col>
        </nut-row>

        <div class="contents">
          <!--列表数据展示 -start -->
          <div v-show="list.length>0" class="page-loadmore">
            <div
              class="page-loadmore-wrapper"
              ref="wrapper"
              
            >
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
                  <li v-for="(item, index) in list" :key="index">
                    <div class="left">
                      <p class="ptype gray">{{item.betAmount}}</p>
                      <p class="ptype fs22">{{item.date}} {{item.weekNumber}}</p>
                    </div>
                    <div class="cent">
                      <p class="ptype gray">{{item.betValidAmount}}</p>
                    </div>
                    <div class="right">
                      <p class="ptype" :class="{green:item.betWin>0,red:item.betWin<0}">{{item.betWin}}</p>
                      <p class="ptype fs22">注单量：{{item.betNum}}</p>
                    </div>
                  </li>
                </ul>
                <div class="nodata" v-show="hasData">我是有底线的</div>
              </pk-loadmore>
            </div>
          </div>

          <no-data class="no-data-box" v-show="list == null || list.length<=0"></no-data>
          <!--列表数据展示 -end -->
        </div>

        
          <div class="theadpro">
            <div class="title">
              <div class="left">{{selectTime.name}}合计：</div>
            </div>
          </div>
          <div class="total">
            <div class="part left">
              <p class="ptype gray">{{totalData.betAll}}</p>
            </div>
            <div class="part cent">
              <p class="ptype gray">{{totalData.betValid}}</p>
            </div>
            <div class="part right">
              <p class="ptype" :class="{green:totalData.betWin>0,red:totalData.betWin<0}">{{totalData.betWin}}</p>
              <p class="ptype fs22">注单量：{{totalData.num}}</p>
            </div>
        </div>
      </div>
    </div>
    <div class="skeleton vue-skeleton-loading" v-show="showLoading">
      <div class="skeleton-bac-animation"></div>
      <div class="skeleton-bac-content">
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.1667rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 " style="margin-top: .6rem;">
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
        </row>
      </div>
    </div>
  </div>
</template>
<script>
import noData from "@/components/NoData.vue";
import pkLoadmore from "@/components/Loadmore";
import HeaderNav from "@/components/HeaderNav";
import { getBetRecordReport } from "@/services/betRecord";
import { timeStamp } from "@/services/commonfn";
export default {
  name: "detailRecord",
  components: {
    pkLoadmore,
    noData,
    HeaderNav
  },
  data() {
    return {
      isShowTimeModal: false, //是否显示时间弹框
      defaultValueDatas: null, //默认选择
      selectTime: {}, //选择的时间
      showLoading: true,
      allLoaded: false,
      topAllLoaded: false,
      topStatus: "",
      bottomStatus: "",
      wrapperHeight: 0,
      stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
      page: 1, //当前页数
      pageSize: 10, //每页请求的条数
      totalSize: 0, //总页数
      totalData: {
        betAll: 0,
        betValid: 0,
        betWin: 0,
        num: 0
      },
      list: [], //列表数据
      hasData: false //我是有底线的 是否显示
    };
  },
  computed: {
    timeList() {
      return [timeStamp.map(({ name }) => name)];
    }
  },
  mounted() {
    this.confirmTime([this.timeList[0][2]]); //默认选择本周 获取时间戳
    this.defaultValueDatas = [this.timeList[0][2]]; //设置默认值为本周
    this.getList();
  },
  methods: {
    switchPicker(param) {
      this[`${param}`] = !this[`${param}`];
    },
    //选择时间
    confirmTime(values) {
      let select = values[0];
      timeStamp.map(item => {
        if (item.name === select) {
          this.selectTime = {
            name: item.name,
            betBeginTime: item.value.startDate,
            betEndTime: item.value.endDate
          };
        }
      });
      this.list = [];
      this.getList();
    },

    getList() {
      let postData = {
        page: this.page,
        pageSize: this.pageSize,
        ...this.selectTime
      };
      let loading = this.$toast.loading("加载中...");
      getBetRecordReport(postData).then(res => {
        loading.hide();
        if (res.success) {
          if (res.data) {
            let data = res.data;
            console.log(data, "23456");
            let result = data.betReports ? data.betReports : [];
            this.totalSize = data.totalSize;
            this.totalData = data;

            this.level = data.level;
            if (this.page === 1) {
              this.list = result;
              if (this.totalSize < this.page * this.pageSize) {
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
          }
        } else {
          this.$toast.fail(res.message, { cover: true, duration: 4000 });
        }
        this.showLoading = false;
      });
    },
    //下拉刷新
    handleTopChange(status) {
      this.topStatus = status;
    },

    //下拉刷新 状态改变
    loadTop() {
      this.page = 1;
      this.hasData = false;
      setTimeout(() => {
        this.getList(1);
        this.$refs.loadmore.onTopLoaded();
        this.allLoaded = false;
      }, 1500);
    },

    //上拉加载 状态改变
    handleBottomChange(status) {
      this.bottomStatus = status;
    },

    // 上拉加载
    loadBottom() {
      this.page += 1;
      this.hasData = false;
      setTimeout(() => {
        this.getList();
        this.$refs.loadmore.onBottomLoaded();
        if (this.page * this.pageSize >= this.totalSize) {
          this.allLoaded = true; //所有数据加载完成
          this.hasData = true;
          this.topAllLoaded = false;
        }
      }, 1500);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/pk-pwd.scss";
@import "./betRecord.scss";
/deep/.nut-cell .nut-cell-right{
    font-size:px2rem(26);
}
.detailRecord {
  background: $bet-record-bg;
  .top-fifter {
    text-align: left;
    padding-left:px2rem(30);
    justify-content: start;
    box-sizing: border-box;
  }
  .tbody {
    margin-bottom: 0 !important;
    position: relative;
    border-bottom: 1px solid $bet-record-bdr;
    &:last-child {
      border-bottom: none;
    }
    .flex-content {
      border-right: none !important;
      font-size: px2rem(26);
      color: $tip-color;
    }
  }
  .gray {
    color: $color-D;
    font-size:px2rem(32);
  }
  .red{
      color: #ef0505;
      font-size:px2rem(28);
  }
  .green{
      font-size:px2rem(28);
      &::before{
        content: "+"
      }
  }
  .fs22{
      font-size: px2rem(26);
      color: $label-color;
  }
  .contents {
    ul {
     // padding: 0 0.4rem;
      background: $default-color;
      li {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $border-color;
        div{
          width: 33%;
        }
        p {
          line-height:2;
        }
        &:last-child {
          border-bottom: none;
        }
        
      }
    }
  }
  .total{
    display: flex;
          background: $default-color;
          p{
            line-height: 2;
          }
    .part{
      width: 33%;
      float: left;
    }
  }
  .theadpro {
        width: 100%;
          height: px2rem(68);
          border-bottom: 1px solid $bet-record-bdr;
          .title {
            width: auto;
            height: 100%;
            line-height:px2rem(68);
            color: $auth-thdlogins-title;
            div {
              border-bottom: 1px solid $bet-record-bdr;
            }
          }
        }
  
}
.table {
  padding-bottom:px2rem(82);
  .left{
    padding-left: px2rem(33);
          text-align: left
        }
        .cent{
          text-align: center;
        }
        .right{
          padding-right: px2rem(33);
          text-align: right;
        }
}

</style>
