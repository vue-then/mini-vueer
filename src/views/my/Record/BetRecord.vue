<template>
  <div class="betRecord" ref="betRecord">
    <nut-picker
      title="请选择游戏"
      :is-visible="isVisible1"
      :default-value-data="defaultValueData1"
      :list-data="listData1"
      @close="switchPicker('isVisible1')"
      @confirm="setYearValue"
    ></nut-picker>
    <!-- common -->
    <nut-picker
      :title="fortitle"
      :is-visible="isVisibles"
      :default-value-data="defaultValueDatas"
      :list-data="listDatas"
      @close="switchPicker('isVisibles')"
      @confirm="setValues"
    ></nut-picker>
    <nut-picker
      :title="fortitle"
      :is-visible="isVisiblestime"
      :default-value-data="defaultValuetime"
      :list-data="listDatastime"
      @close="switchPicker('isVisiblestime')"
      @confirm="setValuestime"
    ></nut-picker>
    <nut-picker
      :title="fortitle"
      :is-visible="isVisiblestype"
      :default-value-data="defaultValuelot"
      :list-data="listDataslot"
      @close="switchPicker('isVisiblestype')"
      @confirm="setValuestype"
    ></nut-picker>
  
<HeaderNav title="投注记录" :titleRight="year" 
            :showLeftIcon="true" 
            :showRight="true" 
            :showRightIcon="true"
            @on-right="switchPicker('isVisible1')"
        ></HeaderNav>

    <div class="cent" v-show="!showLoading">
      <div class="top-fifter">
        <div class="fifter" @click="makeList(0, betVideoTitle)">
          <label>视讯：</label>
          <div class="input-dates input-game hasicon">
            <nut-cell :showIcon="false" :isLink="true" @click.native="switchPicker('isVisibles')">
              <div slot="desc" class="selected-option">
                <span class="show-value">
                  {{
                  years ? years : "请选择"
                  }}
                </span>
              </div>
            </nut-cell>
            <i>
              <img src="../../../assets/img/to-down-b.png">
            </i>
          </div>
        </div>
        <div class="fifter" @click="makeList(1, dataList)">
          <label>时间：</label>
          <div class="input-dates input-game hasicon">
            <nut-cell
              :showIcon="false"
              :isLink="true"
              @click.native="switchPicker('isVisiblestime')"
            >
              <div slot="desc" class="selected-option">
                <span class="show-value">
                  {{
                  dateType ? dateType : "请选择"
                  }}
                </span>
              </div>
            </nut-cell>
            <i>
              <img src="../../../assets/img/to-down-b.png">
            </i>
          </div>
        </div>
        <div v-show="ShowbetTypesTitle" class="fifter" @click="makeList(2, betTypesTitle)">
          <label>彩种：</label>
          <div class="input-dates input-game hasicon">
            <nut-cell
              :showIcon="false"
              :isLink="true"
              @click.native="switchPicker('isVisiblestype')"
            >
              <div slot="desc" class="selected-option">
                <span class="show-value">
                  {{
                  betType ? betType : "请选择"
                  }}
                </span>
              </div>
            </nut-cell>
            <i>
              <img src="../../../assets/img/to-down-b.png">
            </i>
          </div>
        </div>
      </div>
      <div class="radio-group">
          <div class="transfer-fixed" v-show="showFclxClass">
            <div class="pk-trans-type">
                <!-- <h2><span>彩票类型</span></h2> -->
                <div>
                    <nut-radiogroup v-model="fclxClass">
                        <nut-radio class="my-radio"  v-for="item in officialCredit" :key="item.value" :label="item.value">{{item.key}}
                        </nut-radio>
                    </nut-radiogroup>
                </div>
            </div>
          </div>
      </div>
      <div class="table">
        <nut-row class="thead reheads" type="flex" justify="space-between" flexWrap="nowrap">
          <nut-col class="md-3">
            <div class="flex-content">购彩名称</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">投注时间</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">投注额</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">派彩</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">状态</div>
          </nut-col>
        </nut-row>
        <div class="betList">
          <div v-show="list.length > 0" class="page-loadmore">
            <div
              class="page-loadmore-wrapper"
              ref="wrapper"
              :style="{ height: wrapperHeight + 'px' }"
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
                <div
                  v-for="(item, index) of list"
                  :key="index"
                  @click="handleDetails(item)"
                  class="nut-row nut-vert-list-panel thead tbody tableList nut-row-flex nut-row-justify-space-between"
                >
                  <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                    <div class="flex-content">
                      <p class="ptype">{{ item.gameName }}</p>
                      <p class="ptype">{{ item.productName }}</p>
                    </div>
                  </div>
                  <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                    <div class="flex-content ptime">{{ item.betTime | filterDate }}</div>
                  </div>
                  <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                    <div class="flex-content green">{{ item.singleAmount }}</div>
                  </div>
                  <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                    <div class="flex-content red">{{ item.win }}</div>
                  </div>
                  <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                    <div class="flex-content">{{ item.statusName }}</div>
                  </div>
                </div>
                 
                <div class="nodata" v-show="hasData">我是有底线的</div>
              </pk-loadmore>
              <div class="report" @click="back('detailRecord')" v-show="!showLoading">
            <p>我的报表</p>
          </div>
            </div>
          </div>
          <no-data v-show="list == null || list.length <= 0" class="no-data-box"></no-data>
        </div>
        <div class="report" v-show="list == null || list.length <= 0" @click="back('detailRecord')" >
            <p>我的报表</p>
          </div>

      </div>
    </div>
    <div class="skeleton vue-skeleton-loading" v-show="showLoading">
      <div class="skeleton-bac-animation"></div>
      <div class="skeleton-bac-content">
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="2.9777rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <!-- <skeleton-square width="2.1667rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square> -->
        </row>
        <row padding="0.2rem  0 0 0 ">
          <skeleton-square width="1.6799rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="1.6799rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="1.6799rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="1.6799rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
          <skeleton-square width="1.6799rem" style="height:0.8rem" margin="0 0 0 0.2667rem"></skeleton-square>
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
        <row padding="0.2rem  0 0 0 " style="justify-content: center;">
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0.3rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 " style="justify-content: center;">
          <skeleton-square width="7rem" style="height:1rem;" margin="0 0.3rem"></skeleton-square>
        </row>
        <row padding="0.2rem  0 0 0 " style="justify-content: center;">
          <skeleton-square width="10rem" style="height:2rem;" margin="0 0.3rem"></skeleton-square>
        </row>
      </div>
    </div>
    <!-- 查看详情弹框 -->

    <div v-show="haveMorepop" class="dialogbox popmoreBox">
      <div class="positionFixed dialog-mask"></div>
      <div class="positionFixed">
        <div class="title">
          详情
          <span class="closebox" @click="haveMorepop = false">
            <nut-icon type="cross" color="#fff" size="0.4rem"></nut-icon>
          </span>
        </div>
        <div class="popmore-content">
          <ul>
            <li class="clearfix">
              <div class="left">游戏名称</div>
              <div class="right">
                <h1>
                  {{ details.productName }}-{{
                  details.gameName
                  }}
                </h1>
              </div>
            </li>
            <li class="clearfix">
              <div class="left">投注时间</div>
              <div class="right">{{ details.betTime | filterDate }}</div>
            </li>
            <li class="clearfix">
              <div class="left">投注额</div>
              <div class="right">{{ details.singleAmount }}</div>
            </li>
            <li class="clearfix">
              <div class="left">派彩</div>
              <div class="right red">{{ details.win }}</div>
            </li>
            <li class="clearfix">
              <div class="left">状态</div>
              <div class="right">{{ details.statusName }}</div>
            </li>
            <!-- <li class="clearfix">
                            <div class="left">额外优惠</div>
                            <div class="right">{{details.otherDiscount}}</div>
            </li>-->
            <li class="clearfix">
              <div class="left">注单号</div>
              <div class="right">{{ details.orderNumber }}</div>
            </li>

            <!-- 彩票 -->
            <div v-show="details.gameType === 1">
              <li class="clearfix">
                <div class="left">期数</div>
                <div class="right">{{ details.periodsTable }}</div>
              </li>

              <li v-show="details.status === 99" class="clearfix">
                <div class="left">可赢</div>
                <div class="right">{{ details.win }}</div>
              </li>
              <li class="clearfix">
                <div class="left">赔率</div>
                <div class="right">{{ details.odds }}</div>
              </li>
              <li class="clearfix">
                <div class="left">投注明细</div>
                <div class="right">{{ details.information }}</div>
              </li>
            </div>

            <!-- 电子 -->
            <div v-show="details.gameType === 2">
              <li class="clearfix">
                <div class="left">场景编号</div>
                <div class="right">{{ details.periodsTable }}</div>
              </li>
              <li v-show="details.status === 99" class="clearfix">
                <div class="left">赢亏</div>
                <div class="right">{{ details.win }}</div>
              </li>

              <li class="clearfix">
                <div class="left">游戏明细</div>
                <div class="right">{{ details.information }}</div>
              </li>
            </div>

            <!-- 视讯 -->
            <div v-show="details.gameType === 3">
              <li class="clearfix">
                <div class="left">桌号</div>
                <div class="right">{{ details.periodsTable }}</div>
              </li>
              <li v-show="details.status !== 99" class="clearfix">
                <div class="left">赢亏</div>
                <div class="right">{{ details.win }}</div>
              </li>
              <li class="clearfix">
                <div class="left">赔率</div>
                <div class="right">{{ details.odds }}</div>
              </li>
              <li class="clearfix">
                <div class="left">游戏明细</div>
                <div class="right">{{ details.information }}</div>
              </li>
            </div>

            <!-- 棋牌 -->
            <div v-show="details.gameType === 4">
              <li class="clearfix">
                <div class="left">房间号</div>
                <div class="right">{{ details.periodsTable }}</div>
              </li>
              <li class="clearfix">
                <div class="left">赢亏</div>
                <div class="right">{{ details.win }}</div>
              </li>
              <li class="clearfix">
                <div class="left">游戏明细</div>
                <div class="right">{{ details.information }}</div>
              </li>
            </div>

            <!-- 体育 -->
            <div v-show="details.gameType === 5">
              <li class="clearfix">
                <div class="left">赔率</div>
                <div class="right">{{ details.odds }}</div>
              </li>
              <li v-show="details.status === 99" class="clearfix">
                <div class="left">可赢</div>
                <div class="right">{{ details.win }}</div>
              </li>
              <li v-show="details.status !== 99" class="clearfix">
                <div class="left">赢亏</div>
                <div class="right">{{ details.win }}</div>
              </li>
              <li class="clearfix">
                <div class="left">投注明细</div>
                <div class="right">{{ details.information }}</div>
              </li>
            </div>

            <!-- 捕鱼 -->
            <div v-show="details.gameType === 6">
              <li class="clearfix">
                <div class="left">赢亏</div>
                <div class="right">{{ details.win }}</div>
              </li>
              <!-- <li class="clearfix">
                                <div class="left">投注明细</div>
                                <div class="right">{{details.information}}</div>
              </li>-->
            </div>
          </ul>
          <div class="close" @click="haveMorepop = false">
                <p>确定</p>
          </div>
        </div>
        
      </div>
    </div>
    
  </div>
</template>
<script>
import noData from "@/components/NoData.vue";
import func from "@/services/spread";
import HeaderNav from "@/components/HeaderNav";
import {
  getGameTag,
  getSiteGames,
  betRecordCondition,
  betRecordThird,
  getBetList
} from "@/services/betRecord.js";
import {
  today,
  nearTwohours,
  week,
  month,
  lastmonth,
  timeItems
} from "@/services/commonfn.js";
import pkLoadmore from "@/components/Loadmore";

export default {
  components: {
    pkLoadmore,
    noData,
    HeaderNav
  },
  data() {
    return {
      titleRight:'请选择',  //右侧导航名字
      
      year: null,
      isVisible1: false,
      defaultValueData1: null,
      listData1: [[]],
      // commonPicker
      years: null,
      fortitle: "",
      isVisibles: false,
      isVisiblestime: false,
      isVisiblestype: false,
      defaultValueDatas: null,
      defaultValuetime: null,
      defaultValuelot: null,
      listDatas: [],
      listDatastime: [],
      listDataslot: [],
      dataList: [[]],
      dateType: null,
      //
      betType: null,
      //
      timers: null,
      page: 2,
      isShowlist: false,
      //整理三级联动数据
      betHeadTitle: [], //头部 渲染所需 key
      betHeadfindArr: [], //头部遍历对象
      betVideoTitle: [], //视讯 渲染所需 key
      betVideofindArr: [],
      //key对应key 渲染所需 三级联动地址需要
      betVideoObj: {}, //视讯
      thirdId: null, //视讯id
      betTypesTitle: [], //种类
      ShowbetTypesTitle: false, //是否展示彩种选项
      NumThree: null,
      thirdkey: null, //要传的第三方key
      thirdName: null, // 彩种名称
      second: false, //是否第一次循环找到头部ID
      beginTime: "",
      endTime: "",
      showLoading: true, //数据是否正在加载
      allLoaded: false,
      topAllLoaded: false,
      topStatus: "",
      bottomStatus: "",
      wrapperHeight: 0,
      stopTranslate: parseInt(this.HTML_FONT_SIZE * 1.6),
      page: 1, //当前页数
      pageSize: 10, //每页请求的条数
      totalSize: 0, //总页数
      list: [], //列表数据
      info: {}, //返点详情
      hasData: false, //我是有底线的 是否显示
      haveMorepop: false,
      details: {},
      getListFlag: false, //是否是选中投注记录的title为彩票游戏并发起请求
    //   fclxClass: 2, //视讯类型是否是‘pkplus’
      showFclxClass: false,
      officialCredit: [{key: '官方彩票', value: 2}, {key: '信用彩票', value: 1}],
      fclxClass: 2,//选择的模式 1=官方彩票 2=信用彩票
    };
  },
  mounted() {
    // this.$refs.betRecord.style.height = window.innerHeight + "px";
    this.$nextTick(function() {
      var arr = [];
      timeItems.map(v => {
        arr.push(v.name);
      });
      this.dataList[0] = arr;
      this.dateType = this.dataList[0][1]; //默认选中今天
      this.makeList(1, this.dataList);
      this.makeTimeSE(this.dateType);
    });

    this.makeTitle();

    // this.getList();
  },
  watch: {
    // 监听彩票类型
    fclxClass(val) {
        this.getBetList();
    },
    // 投注记录下拉监听
    year(val) {
      if (this.betHeadfindArr && this.second) {
        this.betHeadfindArr.map(v => {
          if (v.value == this.year) {
            this.titleHeadId = v.id;
          }
        });
        // console.log(this.titleHeadId, "this.titleHeadId");
      }
      
      this.betVideoTitle[0] = this.betVideoObj[val];
      this.betVideofindArr = this.betVideoObj[val + "key"];
    //   console.log(
    //   	this.betVideoTitle,
    //   	"this.betVideoTitle",
    //   	this.betVideoObj[val + "key"]
    //   );
      this.years = this.betVideoTitle[0][0];
      this.second = true;
    },
    // 监听视讯选项是否改变
    years(val) {
      this.betVideofindArr.map(v => {
        if (v.value == val) {
          this.thirdId = v.id;
          this.NumThree = v.key;
          if(v.key=='pkplus'){
              this.showFclxClass = true;
              this.fclxClass =1;
              this.$(".betRecord .table").css("top","3rem")
          }else{
              this.showFclxClass = false;
              this.$(".betRecord .table").css("top","2.5rem")
          }
        }
      });
      this.betTypesTitle = [];
      this.ShowbetTypesTitle = false;
      // console.log(this.thirdId, "this.thirdId", this.NumThree);

      // 彩票游戏id为1，判断是否为彩票游戏
      if (this.titleHeadId == 1) {
          
        this.betRecordThird();
        this.getListFlag = true;
      } else {
        this.getBetList();
      }
    },
    //时间
    dateType(val) {
      this.getBetList();
    },
    //彩种
    betType(val) {
      if (!this.getListFlag) {
        this.getBetList();
      }
      this.getListFlag = false;
    }
  },
  methods: {
    getBetList() {
      if (this.NumThree == null) return;
      var post = {
        gameType: this.titleHeadId,
        platform: this.NumThree,
        fclxType: this.titleHeadId == 1 ? this.thirdkey : "",
        fclxName: this.titleHeadId == 1 ? this.thirdName: "",
        fclxClass: this.fclxClass,
        beginBetTime: this.beginTime,
        endBetTime: this.endTime,
        page: this.page,
        pageSize: this.pageSize
      };
      getBetList(post).then(res => {
        if (res.success) {
          if (res.data) {
            let data = res.data;
            let result = data.list ? data.list : [];
            this.totalSize = data.totalSize;
            // this.level = data.level;
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
          this.$toast.fail(res.message, {
            cover: true,
            duration: 4000
          });
        }
      });
    },
    makeTitle() {
      var _this = this;
      betRecordCondition().then(res => {
        if (res.success) {
        //   console.log(res.data, "res.data");
          var dataList = res.data;
          dataList.map(v => {
            var betHeadfindObj = { id: null, value: null };
            let { id, value } = v;
            betHeadfindObj.id = id;
            betHeadfindObj.value = value;
            _this.betHeadfindArr.push(betHeadfindObj);
            this.betHeadTitle.push(v.value);
            var arr = []; //二级菜单
            var arrs = [];
            v.nextCondition.map((v2, i2) => {
              arr.push(v2.value);

              var betVideofindObj = {
                id: null,
                value: null,
                key: null
              };
              betVideofindObj.id = v2.id;
              betVideofindObj.key = v2.key;
              betVideofindObj.value = v2.value;
              arrs.push(betVideofindObj);
            });
            _this.betVideoObj[v.value + "key"] = arrs;
            _this.betVideoObj[v.value] = arr;
          });

          // console.log(_this.betHeadfindArr, "betHeadfindArr");
          // console.log(this.betHeadTitle, "betHeadTitle");
          // console.log(_this.betVideoObj, "betVideoObj");
          this.listData1[0] = this.betHeadTitle;
          this.year = this.listData1[0][0];
          if (_this.betHeadfindArr) {
            _this.betHeadfindArr.map(v => {
              if (v.value == this.year) {
                this.titleHeadId = v.id;
              }
            });
            // console.log(this.titleHeadId, "this.titleHeadId");
          }
        } else {
          this.$toast.fail(res.message, {
            cover: true,
            duration: 1000
          });
        }
        this.showLoading = false;
      });
    },
    chooseTimes(value) {
      var timeobj = {};
      switch (value) {
        case 0:
          timeobj = nearTwohours();
          break;
        case 1:
          timeobj = today();
          break;
        case 2:
          timeobj = week();
          break;
        case 3:
          timeobj = month();
          break;
        default:
          timeobj = lastmonth();
      }
      return timeobj;
    },

    betRecordThird() {
      betRecordThird({ lotteryId: this.thirdId }).then(res => {
        if (res.success) {
        //   console.log(res.data, "res");
          let dataList = res.data;
          this.thirdarr = dataList;
          var arr = [];
          if (dataList) {
            dataList.map(v => {
              arr.push(v.name);
            });
            this.betTypesTitle.push(arr);
            this.betType = this.betTypesTitle[0][0];
            this.ShowbetTypesTitle = true;

            dataList.map(v => {
              if (v.name == this.betType) {
                this.thirdkey = v.key;
                this.thirdName = v.name;
              }
            });
            console.log(this.thirdkey, "thirdkey");
            this.getBetList();
          }
        } else {
          this.$toast.fail(res.message, {
            cover: true,
            duration: 1000
          });
        }
      });
    },
    switchPicker(param) {
      this[`${param}`] = !this[`${param}`];
    },
    //
    setYearValue(chooseData) {
      this.year = chooseData[0];
    //   console.log(chooseData[0], "chooseData[0]");
    },

    makeList(status, arr) {
      this.statusf = status;
      if(this.statusf==1){
        this.listDatastime=arr;
      }else if(this.statusf==2){
          this.listDataslot = arr;
      }else if(this.statusf==0){
          this.listDatas = arr;
      }
    },
    makeTimeSE(dateType) {
      var timeobj = {};
      timeItems.map(v => {
        if (v.name == dateType) {
          timeobj = this.chooseTimes(v.value);
        }
      });
      this.beginTime = timeobj.startDate;
      this.endTime = timeobj.endDate;
      console.log(timeobj, "timeobj");
    },
    // picker选中执行方法
    setValues(chooseData) {
        this.years = chooseData[0];
        console.log(chooseData[0],'chooseData[0]')
    },
    setValuestime(chooseData) {
        this.dateType = chooseData[0];
        this.makeTimeSE(this.dateType);
    },
    setValuestype(chooseData) {
        this.betType = chooseData[0];
        this.getListFlag = false; //选中之后就要触发请求
        var dataList = this.thirdarr;
        if (dataList) {
          dataList.map(v => {
            if (v.name == this.betType) {
              this.thirdkey = v.key;
              this.thirdName = v.name;
            }
          });
        }
    },
    //下拉刷新
    handleTopChange(status) {
      console.log("下拉刷新");
      this.topStatus = status;
    },

    //下拉刷新 状态改变
    loadTop() {
      this.page = 1;
      this.hasData = false;
      setTimeout(() => {
        this.getBetList();
        this.$refs.loadmore.onTopLoaded();
        this.allLoaded = false;
      }, 1500);
    },

    //上拉加载 状态改变
    handleBottomChange(status) {
      this.bottomStatus = status;
      console.log("上拉加载");
    },

    // 上拉加载
    loadBottom() {
      console.log("上拉加载");
      this.page += 1;
      this.hasData = false;
      setTimeout(() => {
        this.getBetList();
        this.$refs.loadmore.onBottomLoaded();
        if (this.page * this.pageSize >= this.totalSize) {
          this.allLoaded = true; //所有数据加载完成
          this.hasData = true;
          this.topAllLoaded = false;
        }
      }, 1500);
    },
    handleDetails(item) {
      this.details = item;
      this.haveMorepop = true;
    //   console.log(this.details);
    },
    back(path) {
      this.$router.push({
        name: path
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./betRecord.scss";
.betRecord {
  background: $bet-record-bg;
  .table{
    top: px2rem(225);
  }
}
.report{
  float: right;
  margin-right: px2rem(32);
  width: px2rem(48);
  padding: px2rem(20) px2rem(20);
	height: px2rem(48);
	background-image: linear-gradient(-25deg, 
		$color-w 0%, 
		#ffb726 100%), 
	linear-gradient(
		$default-color, 
    $default-color);
    border-radius: px2rem(44);
    color: $default-color;
    font-size: px2rem(24);
    line-height: px2rem(24);
}
.generalizeLink-list {
  padding: 0 px2rem(30) px2rem(30);
  ul {
    li {
      background: $default-color;
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
      border-radius:px2rem(9.75);
      padding: px2rem(24);
      display: flex;
      margin: px2rem(20.25) 0;
      .left {
        flex: 1;
        h1 {
          font-size:px2rem(24);
          color: $color-C;
          font-weight: 400;
          line-height: 1.6;
          span {
            font-size: px2rem(24);
            color: $color-p;
            font-weight: bold;
          }
        }
        h2 {
          font-size: px2rem(24);
          color: $color-C;
          font-weight: 400;
          line-height: 1.6;

          span {
            font-size: px2rem(24);
            color: $color-C;
            font-weight: bold;
          }
        }
        p {
          font-size: px2rem(20.25);
          color: $color-J;
          line-height: 1.6;
        }
      }
      .right {
        flex: 1;
        h1 {
          font-size: px2rem(24);
          color: $color-C;
          font-weight: 400;
          line-height: 1.6;
          span {
            font-size:px2rem(24);
            color: $color-p;
            font-weight: bold;
          }
        }
        h2 {
          font-size: px2rem(24);
          color: $color-C;
          font-weight: 400;
          line-height: 1.6;

          span {
            font-size:px2rem(24);
            color: $color-C;
            font-weight: bold;
          }
        }
        p {
          font-size: px2rem(20.25);
          color: $color-J;
          line-height: 1.6;
        }
        position: relative;
        h1 {
          span {
            text-decoration: underline;
          }
        }
        i {
          font-size: px2rem(48);
          box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
          border-radius: px2rem(9.75);
          color: $primary-color;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top:px2rem(-24);
        }
      }
    }
  }
}
.popmoreBox {
  .title {
    position: absolute;
    top: px2rem(305);
    width: px2rem(630);
    left: 50%;
    margin-left: px2rem(-315);
    height:px2rem(96);
    line-height:px2rem(96);
    text-align: center;
    font-size: px2rem(32);
    color: $tip-color;
    background: $default-color;
    border-radius: px2rem(10.5) px2rem(10.5) 0 0;
    .closebox {
      position: absolute;
      top: 0;
      right: px2rem(15);
      color: $default-color;
    }
  }
  .popmore-content {
    position: absolute;
    width: px2rem(630);
    top:px2rem(401);
    left: 50%;
    margin-left: px2rem(-315);
    right: 0;
    background: $default-color;
    border-radius: 0px 0px px2rem(20) px2rem(20);
    overflow-y: scroll;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      padding: 0 px2rem(32);
      li {
        line-height:px2rem(60);
        font-size:px2rem(24);
        color: $tip-color;
        border-bottom: $onerem solid $border-color;
        .left {
          float: left;
        }
        .right {
          float: right;
          color:$label-color;
        }
      }
      li.remark {
        .remarktxt {
          line-height: px2rem(30);
          word-wrap: break-word;
        }
      }
    }
    .close{
      height: px2rem(80);
      line-height: px2rem(80);
      color: $primary-color;
      text-align: center;

    }
  }
}
// 单选框样式
.pk-trans-type {
    background: $default-color;
    height: px2rem(60);
    line-height:px2rem(52.5);
    padding-left: px2rem(27.75);;
    h2 {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        font-size:px2rem(26);
        color: $tip-color;
        font-weight: 400;
    }
}
.my-radio {
    line-height: px2rem(52.5);
    color: $tip-color;
    /deep/ input {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='20' height='15' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8l2.5-2.5 5 4.5 10-9.5L20 3 8 15H7z' fill='%23FFF' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-color: $dark-color;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 60%;
        width: px2rem(28);
        height: px2rem(28);
        border-radius: 50%;
    }
    /deep/input:checked{
            background-color: $primary-color !important;
    }
    /deep/ .nut-radio-label {
        font-size:px2rem(26);
        margin-right:  px2rem(20.25);
    }
}
/deep/ .nut-radiogroup {
    display: inline-block;
    margin-left: px2rem(30);
}
</style>
