<template>
	<div>
		<!-- <nut-navbar class="pk-title"  @on-click-back="back('my')" @on-click-more="back('index')">
			
			<a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png"/>
			</a>
            <a class="backIdex" slot="more-icon" >
                <img class="imgsbank" src="../../../assets/img/my-icon/backIndex.png"/>
            </a>
		</nut-navbar> -->
        <Header title="银行卡管理"></Header>
		<nut-actionsheet
			:is-visible="tabtype"
			@close="switchActionSheet('tabtype')"
			:menu-items="tabItems"
			@choose="chooseTablelist"
		>
		</nut-actionsheet>
		<div class="content">
			<div
				class="acctCard"
				v-for="(item, i) in bankList"
				:key="i"
				@click="open(item)"
			>
				<div class="bank-name">{{ item.bankName }}</div>
				<div class="username">{{ item.username }}</div>
				<div class="subbranch">{{ item.subBranch }}</div>
				<div class="subbranch">
					{{ item.province }}
					<span v-if="item.city">-{{ item.city }}</span>
				</div>
				<div class="card">{{ item.card | filterBankNum }}</div>
				<div class="acctBg dis-inb">
					<i
						class="iconfont icon-bank-normal"
						v-show="item.isDefault === 1"
					></i>
					<i class="iconfont icon-qb-bank-tongyong1 f200"></i>
				</div>
			</div>
		</div>
		<div class="contentf" v-if="bankList.length < 3">
			<router-link
				to="/securityCenter/bankcardAdd"
				tag="div"
				class="dntAcct"
			>
				<div class="dntAcctBox">
					<div class="divbox">
						<i class="iconfont iconicon_info_chat_more f70"></i>
					</div>
					<p>点击添加银行卡</p>
				</div>
			</router-link>
		</div>
	</div>
</template>


<script>
import { getBankList, makeDefalutCard } from "@/services/securityCenter.js";
import Header from "@/components/Header";
export default {
	components: {
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
	@import "../../../styles/pk-pwd.scss";

	.cards {
		width: 100%;
		padding: 0.26667rem 0;
		text-align: center;
		height: 4rem /* 300/75 */;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.li {
			font-size: 0.37333rem /* 28/75 */;
			width: 100%;
			height: 1.06667rem /* 80/75 */;
			line-height: 1.06667rem;
			border-radius: 0;
			color: #656b79;
			background: #fff;
		}
	}

	//
	.hasbox {
		width: 100%;
		height: 1.22667rem !important/* 92/75 */
	        ;
	}
	.contentf {
		padding-left: 0.4rem /* 30/75 */ !important;
		padding-right: 0.4rem !important;
		max-width: 100%;
		overflow: hidden;
	}

	.dntAcct {
		text-align: center;
		max-width: 100%;
		height: 3.733rem;
		padding-top: 0.4rem /* 30/75 */;
		&:first-child {
			padding-top: 0;
		}
	}

	.f70 {
		font-size: 0.93333rem /* 70/75 */;
	}

	.f200 {
		font-size: 2.66667rem /* 200/75 */;
		color: #fbfbfb;
	}

	.dntAcct .dntAcctBox {
		padding: 1.62667rem 0 1rem;
		height: 1.01333rem /* 76/75 */;
		font-size: 0.37333rem /* 28/75 */;
		color: $label-color;
		border-radius: 0.06667rem /* 5/75 */;
		border: 1px dashed #c8c8cc;
		box-shadow: 0 1px 0.04rem rgba(0, 0, 0, 0.1);
		background-size: 0.8rem /* 60/75 */;
		.divbox {
			margin-top: -1.01333rem /* 76/75 */;
			margin-bottom: 0.26667rem /* 20/75 */;
		}
	}

	.content {
		padding: 0.4rem 0.4rem /* 30/75 */ 0;
	}

	.acctCard {
		position: relative;
		padding: .46667rem /* 35/75 */ .4rem /* 30/75 */;
		background-image: linear-gradient(-90deg, $bank-card-bgright 0%, $bank-card-bgleft 100%);
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
		border-radius: 0.13333rem /* 10/75 */;
		margin-bottom: 0.4rem /* 30/75 */;
		color: #fff;
		.bank-name {
			font-size: .48rem /* 36/75 */;
			margin-bottom: .13333rem /* 10/75 */
		}
		.username {
			font-size: .34667rem /* 26/75 */;
			margin-bottom: .13333rem /* 10/75 */
		}
		.subbranch {
			font-size: 0.32rem;
			margin-bottom: .13333rem /* 10/75 */
		}
		.card {
			font-size: .426667rem;
		}
		.acctBg {
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			width: 40%;
			text-align: right;
			i.icon-qb-bank-tongyong1 {
				position: absolute;
				right: 0;
				top: 0;
				font-size: 3.8rem;
				opacity: 0.2;
			}
			i.icon-bank-normal {
				position: absolute;
				font-size: 1.06667rem /* 80/75 */;
				color: #fff;
				opacity: 0.8;
				right: 0.26667rem /* 20/75 */;
				top: -0.12rem /* 6/75 */;
			}
		}
		&:nth-child(2n) {
			background-image: linear-gradient(-90deg, #3064ff 0%, #6ba9ff 100%);
			box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
		}
		&:nth-child(3n) {
			background-image: linear-gradient(-90deg, #10c3b4 0%, #2dd99e 100%);
			box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
		}
	}
</style>
