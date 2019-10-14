<template>
  <div class="myFocus">
      <Header title="我的关注"></Header>
    <div class="content">
      <div class="focusList" v-for="(item, index) in focusList" :key="index" @click="goInfo(item)">
        <img class="photo" v-if="item.photo != ''" :src="item.photo" />
        <img class="photo" v-if="item.photo == ''" src="../../../assets/img/icon_visitor.png" />
        <div class="focusName">
          {{item.focusName}}
          <span class="focusType" v-if="item.focusType==2">管理员</span>
          <img v-if="item.focusType==1" class="level" :src="item.levelLogo" alt />
        </div>
      </div>
      <no-data v-show="focusList == null || focusList.length <= 0" class="no-data-box"></no-data>
    </div>
  </div>
</template>

<script>
import { getMyFocusList } from "@/services/myFocus.js";
import Header from "@/components/Header";
import noData from "@/components/NoData.vue";
export default {
    name: "myFocus",
    components: {
		getMyFocusList,
    Header,
    noData
	},
  data() {
    return {
      focusList: [],
      
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      var data = {
        page: 1,
        pageSize: 10
      };
      getMyFocusList(data).then(res => {
        if (res.success) {
          this.focusList = res.data.data;
          console.log(res, "res");
        } else {
          this.$toast.fail(res.message, {
            cover: true,
            duration: 1500
          });
        }
      });
    },
     goInfo (item) {
                    this.$router.push({
                        name: "focusInfo"
                        ,query:{focusMemberId:item.focusMemberId ,focusType:item.focusType} 
                    });
                
            },
  }
};
</script>

<style lang="scss" scoped>
.myFocus {
  .content {
    margin-top: px2rem(24);
    .focusList {
      background: $default-color;
      height: px2rem(121);
      line-height: px2rem(121);
      .photo {
        float: left;
        padding: px2rem(20) px2rem(32);
        width: px2rem(80);
        height: px2rem(80);
        border-radius: px2rem(40);
      }
      .focusName {
        float: right;
        width: px2rem(606);
        height: px2rem(121);
        font-size: px2rem(28);
        border-bottom: px2rem(1) solid $backwater-no-btn;
        box-sizing: border-box;
        .focusType {
          font-size: px2rem(18);
          background: $primary-color;
          color: $default-color;
          border-radius: px2rem(4);
        }
        .level {
          padding-left: px2rem(12);
          width: px2rem(60);
          height: px2rem(24);
        }
      }
    }
    .focusList:last-child {
      .focusName {
        border-bottom: none;
      }
    }
  }
}
</style>