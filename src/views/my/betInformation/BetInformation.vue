<!--投注资讯-->
<template>
  <div id="agencyappli">
    <nut-picker
      title="请选择投注种类"
      :is-visible="isVisible1"
      :default-value-data="defaultValueData1"
      :list-data="listData1"
      @close="switchPicker('isVisible1')"
      @confirm="setYearValue"
    ></nut-picker>
    <nut-picker
      title="请选择彩票种类"
      :is-visible="isVisible2"
      :default-value-data="defaultValueData2"
      :list-data="listData2"
      @close="switchPicker('isVisible2')"
      @confirm="setYear"
    ></nut-picker>
    <nut-picker
      title="请选择彩种"
      :is-visible="isVisible3"
      :default-value-data="defaultValueData3"
      :list-data="listData3"
      @close="switchPicker('isVisible3')"
      @confirm="setYearFc"
    ></nut-picker>
  
    <HeaderNav title="投注资讯" :titleRight="typeName" 
            :showLeftIcon="true" 
            :showRight="true" 
            :showRightIcon="true"
            @on-right="switchPicker('isVisible1')"
        ></HeaderNav>
    <div class="content">
      <div class="searchBox top-fifter" v-show="typeId==1">
        <div class="fifter">
          <label>类型：</label>
          <div class="input-dates input-game hasicon">
            <nut-cell :showIcon="false" :isLink="true" @click.native="switchPicker('isVisible2')">
              <div slot="desc" class="selected-option">
                <span class="show-value">
                  {{
                  fcName ? fcName : "请选择"
                  }}
                </span>
              </div>
            </nut-cell>
            <i>
              <img src="../../../assets/img/to-down-b.png" />
            </i>
          </div>
        </div>
        <div class="fifter">
          <label>彩种：</label>
          <div class="input-dates input-game hasicon">
            <nut-cell :showIcon="false" :isLink="true" @click.native="switchPicker('isVisible3')">
              <div slot="desc" class="selected-option">
                <span class="show-value">
                  {{
                  fc_Name ? fc_Name : "请选择"
                  }}
                </span>
              </div>
            </nut-cell>
            <i>
              <img src="../../../assets/img/to-down-b.png" />
            </i>
          </div>
        </div>
      </div>
      <div class="table" v-show="typeId==1">
        <nut-row class="thead reheads theadH" type="flex" justify="space-between" flexWrap="nowrap">
          <nut-col class="md-3">
            <div class="flex-content">玩法</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">退水限额</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">单场限额</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">单注限额</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">最低限额</div>
          </nut-col>
        </nut-row>
        <div class="betList" ref="homePage">
          <div v-show="lotteryList.length > 0" class="page-loadmore">
            <div
              v-for="(item, index) of lotteryList"
              :key="index"
              class="nut-row nut-vert-list-panel thead tbody tableList nut-row-flex nut-row-justify-space-between"
            >
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ item.playIdName }}</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">0</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ item.fieldMax }}</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ item.max }}</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ item.min }}</div>
              </div>
            </div>
          </div>
          <no-data v-show="lotteryList == null || lotteryList.length <= 0" class="no-data-box"></no-data>
        </div>
      </div>
      <div class="table topNull" v-show="typeId==3">  
        <nut-row class="thead reheads" type="flex" justify="space-between" flexWrap="nowrap">
          <nut-col class="md-3">
            <div class="flex-content">真人视讯</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">最低限额</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">最高限额</div>
          </nut-col>
        </nut-row>
        <div class="betList">
          <div class="page-loadmore">
            <div
              class="nut-row nut-vert-list-panel thead tbody tableList nut-row-flex nut-row-justify-space-between"
            >
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">AG视讯</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ lotteryList.min }}</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ lotteryList.max }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div class="table topNull" v-show="typeId==5">  
        <nut-row class="thead reheads" type="flex" justify="space-between" flexWrap="nowrap">
          <nut-col class="md-3">
            <div class="flex-content">体育</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">单场限额</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">单注限额</div>
          </nut-col>
          <nut-col class="md-3">
            <div class="flex-content">最低限额</div>
          </nut-col>
        </nut-row>
        <div class="betList">
          <div class="page-loadmore">
            <div
              class="nut-row nut-vert-list-panel thead tbody tableList nut-row-flex nut-row-justify-space-between"
            >
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">体育</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ lotteryList.fieldMax }}</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ lotteryList.max }}</div>
              </div>
              <div class="nut-col md-3 cols nut-col-24 nut-col-offset-0">
                <div class="flex-content">{{ lotteryList.min }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "@/components/NoData.vue";
import HeaderNav from "@/components/HeaderNav";
import { fcTypeSelect, getBetInfo } from "@/services/betInformation.js";
export default {
  components:{noData,HeaderNav},
  name: "agencyappli",
  data() {
    return {
      subTime: 0,
      hasLoading: false,
      title: "代理账号申请",
      addData: {
        code: ""
      },
      listData1: [],
      listData2: [],
      listData3: [],
      lotteryList: [],
      bankId: null,
      defaultValueData1: null,
      defaultValueData2: null,
      defaultValueData3: null,
      typeName: null,
      fcName: null,
      fc_Name: null,
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      typeList: [
        { id: 1, title: "彩票" },
        { id: 3, title: "视讯" },
        { id: 5, title: "体育" }
      ],
      fcList: [{ id: 1, title: "信用彩" }, { id: 2, title: "官方彩" }],
      fc_list: [],
      typeId: 1, //种类ID   1 彩票   3视讯  5体育,
      fcType: 1,
      fcId: 1,
      clientHeight:'',  //获取页面高度
      navH:0
    };
  },
  mounted() {
    this.getTypeList();

    this.getHeight();
    
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      },

    listData1(val) {
      //初始化给默认值
      this.typeName = this.typeList[0].title;
      this.typeId = this.typeList[0].id;
      console.log(this.typeName, this.typeId, "typeName");
      if ((this.typeId = 1)) {
        this.fcName = this.fcList[0].title;
        this.fcType = this.fcList[0].id;
        this.getFctypeList(this.fcType);
        this.search(1, this.fcType, this.fcId);
        console.log(this.fcName, this.fcType, "信/官");
      }
    },
    typeId(val){
      if(this.typeId ==1){
        this.search(1, this.fcType, this.fcId);
      }else if(this.typeId == 3){
        this.search(3,null,null);
      }else if(this.typeId ==5){
         this.search(5,null,null);
      }
    },
    fcType(val) {
      this.getFctypeList(this.fcType);
      this.search(1, this.fcType, this.fcId);
      console.log("typeId改变", "");
    },
    fcId(val) {
      this.search(1, this.fcType, this.fcId);
      console.log("fcId改变", "");
    }
  },

  methods: {

    getHeight(){
// 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
      let navH =document.getElementsByClassName('pk-header')[0].offsetHeight;
      let searchH = document.getElementsByClassName('content')[0].offsetHeight;
      let theadH = document.getElementsByClassName('theadH')[0].offsetHeight;
      console.log(navH,searchH,theadH, 'navH')
      this.clientHeight = this.clientHeight-navH-searchH-theadH;
      console.log(this.clientHeight , 'this.clientHeight ')

    },
    switchPicker(param) {
      this[`${param}`] = !this[`${param}`];
    },

    changeFixed(clientHeight){                        //动态修改样式
        console.log(clientHeight);
        this.$refs.homePage.style.height = clientHeight+'px';

      },
    setYearValue(chooseData) {
      console.log(chooseData, 'chooseData值')
      this.typeName = chooseData[0];
      console.log(chooseData[0], "默认值");
      console.log(this.typeName, "typeName值");
      var data = this.typeList;
      if (data) {
        data.map(v => {
          if (this.typeName == v.title) {
            this.typeId = v.id;
          }
        });
        console.log(this.typeId, "彩票体育视讯id值");
      }
    },
    setYear(chooseData) {
      console.log(chooseData, 'chooseData值')
      this.fcName = chooseData[0];
      console.log(this.fcName, "this.fcName");
      console.log(chooseData[0], "chooseData[0]");
      var data = this.fcList;
      if (data) {
        data.map(v => {
          if (this.fcName == v.title) {
            this.fcType = v.id;
          }
        });
        console.log(this.fcType, "this.信/官");
      }
    },
    setYearFc(chooseData) {
      console.log(chooseData, 'chooseData值')
      this.fc_Name = chooseData[0];
      console.log(this.fc_Name, "chooseData[0]");
      var data = this.fc_list;
      if (data) {
        data.map(v => {
          if (this.fc_Name == v.fc_name) {
            this.fcId = v.id;
          }
        });
        console.log(this.fcId, "this.fcId");
      }
    },
    getTypeList() {
      var arr = [];
      this.typeList.map(v => {
        arr.push(v.title);
      });
      this.listData1.push(arr);
      var arr2 = [];
      this.fcList.map(v => {
        arr2.push(v.title);
      });
      this.listData2.push(arr2);
    },

    back(path) {
      this.$router.push({
        name: path
      });
    },

    //获取彩种列表接口
    getFctypeList(type) {
      var postData = {
        fcType: type
      };
      fcTypeSelect(postData).then(res => {
        if (res.success) {
          this.fc_list = res.data.Data;
          this.listData3 = [];
          console.log(this.fc_list[0].fc_name, "fc_list");
          if (this.fc_list) {
            var arr = [];
            this.fc_list.map(v => {
              arr.push(v.fc_name);
            });
            this.listData3.push(arr);
            console.log(this.listData3, "this.listData3");

            this.fc_Name = this.fc_list[0].fc_name;
            this.fcId = this.fc_list[0].id;
            console.log(this.fc_Name, this.fcId, "获取下拉时给默认值");
          }
        } else {
          this.$toast.fail(res.message, {
            cover: true,
            duration: 1000
          });
        }
      });
    },
    //获取数据接口
    search(from, type, fc_id) {
      var postData = {
        typeId: from,
        fcType: type,
        fcId: fc_id
      };
      // 限额类型 1."彩票", 2."电子", 3."视讯", 4."棋牌", 5."体育", 6."捕鱼",
      getBetInfo(postData).then(res => {
        if (res.success) {
          this.lotteryList = res.data;

          // var arr = [];
          // lotteryList.map(v => {
          //   arr.push(v.title);
          // });
          // this.backList = lotteryList;
          // this.listData1.push(arr);
          console.log(this.lotteryList.max, "lotteryList");
        } else {
          this.$toast.fail(res.message, {
            cover: true,
            duration: 1000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./BetInformation.scss";
.relative {
  position: relative;
}
.headi {
  position: absolute;
  width: px2rem(24);
  right:px2rem(-18);
  img {
    width: 100%;
  }
}
.headp {
  font-weight: normal;
  height:px2rem(91);
  display: flex;
  justify-content: space-around;
  align-items: center;
  .input-dates {
    /deep/.bet-name {
      background: $index-banner-bg !important;
    }
  }
}
.bet-name {
  /deep/.nut-cell-box {
    background-color: $index-banner-bg;
    // margin-top: -.06667rem /* 5/75 */;
  }
  .show-value {
    color: $default-color;
    font-size: px2rem(36);
    display: block;
  }
}
</style>

