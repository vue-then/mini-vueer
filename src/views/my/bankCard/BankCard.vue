<template>
  <div>
    <Header title="银行卡"></Header>
    <div class="content">
      <div class="pk-bankCard" 	v-for="(item, i) in bankList"
				:key="i"
				@click="open(item)"
			>
            <div class="bank-type">{{ item.bankName }}</div>
            <div class="username">{{ item.username }}</div>
            <div class="bank-num">{{ item.card | filterBankNum }}</div>
            <div class="city">{{ item.province }}
					<span v-if="item.city">-{{ item.city }}</span></div>
            <div class="bank-name">{{ item.subBranch }}</div>
      </div>
      <router-link
				to="/bankAdd"
				tag="div"
				class="pk-bankCardAdd"
        v-if="bankList.length < 3"
			>
     
        <div class="divbox">
          <i class="iconfont iconicon_info_chat_more f70"></i>
        </div>
        <p>点击添加银行卡</p>
      
      </router-link>
      <p class="pk-bankMax" v-if="bankList.length == 3">银行卡已达上限</p>
    </div>
  </div>
</template>

<script>
import { getBankList, makeDefalutCard } from "@/services/securityCenter.js";
import Header from "@/components/Header";
export default {
  name: "bankAdd",
	components: {
    getBankList,
    makeDefalutCard,
		Header
	},
	data() {
		return {
			tabItems: [
				{ name: "设为默认", value: 1 },
				{ name: "取消", value: 2 }
			],
			bankList: [],
			itemHeight: parseInt(this.HTML_FONT_SIZE * 1.06667),
			popupVisible: false,
			chooseMainVal: "",
			chooseMain: "",
			sixId: 0,
			tabtype: false,
			makeShow: false
		};
	},

	mounted() {
		this.hasBankMsg();
	},
	methods: {
		hasBankMsg() {
			getBankList()
				.then(res => {
					console.log(res, "res");
					this.bankList = res.data;
				})
				.catch(err => {
					this.$toast({
						message: err,
						duration: 1000
					});
				});
		},
		switchActionSheet(param) {
			this[`${param}`] = !this[`${param}`];
		},

		chooseTablelist(item) {
			if (item.value == 1) {
				this.setDefault();
			}
		},
		open(item) {
			//如果是默认的就不能显示弹框设置
			if (item.isDefault === 1) {
				return;
			}
			this.tabtype = true;
			this.sixId = item.id;
		},
		setDefault() {
			makeDefalutCard({ id: this.sixId })
				.then(res => {
					this.$toast.success("设置成功", {
						cover: true,
						duration: 1000
					});
					this.tabtype = false;
					this.hasBankMsg();
				})
				.catch(err => {
					this.tabtype = false;
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1000
					});
				});
		},
		back(path) {
			this.$router.push({
				name: path
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.content {
  .pk-bankCard {
    background: url(../../../assets/img/icon_mine_bank_card1.png) no-repeat;
    background-size: 100% 100%;
    width: px2rem(686);
    height: px2rem(230);
    margin: px2rem(32) auto;
    border-radius: px2rem(10);
    font-size: px2rem(28);
    color: $default-color;
    position: relative;
    .bank-type{
        position: absolute;
        left: px2rem(33);
        top: px2rem(40);
    }
    .bank-num{
        position: absolute;
        left: px2rem(33);
        top: px2rem(106);
    }
    .city{
        position: absolute;
        left: px2rem(33);
        top: px2rem(167);
    }
    .username{
        position: absolute;
        right: px2rem(33);
        top: px2rem(40);
    }
    .bank-name{
        position: absolute;
        right: px2rem(33);
        top: px2rem(167);
    }
  }
  .pk-bankCard:nth-child(2) {
    background: url(../../../assets/img/icon_mine_bank_card2.png) no-repeat;
    background-size: 100% 100%;
  }
  .pk-bankCard:nth-child(3) {
    background: url(../../../assets/img/icon_mine_bank_card3.png) no-repeat;
    background-size: 100% 100%;
  }
  .pk-bankCardAdd {
    text-align: center;
    width: px2rem(686);
    height: px2rem(230);
    margin: px2rem(32) auto;
    border-radius: px2rem(10);
    border: px2rem(2) dashed $label-color;
    font-size: px2rem(32);
    color: $label-color;
    .divbox {
      padding-top: px2rem(65);
      max-width: 100%;
      height: px2rem(49);
      .iconfont {
        color: $label-color;
        font-size: px2rem(48);
      }
    }
  }
  .pk-bankMax{
      color: $label-color;
      text-align: center;
  }
}
</style>