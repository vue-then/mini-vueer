<template>
	<div class="bankcard" ref="bankcard">
		<!-- <nut-navbar class="pk-title"  @on-click-back="back('bankcard')" @on-click-more="back('index')">
			绑定银行卡
			<a class="spans" slot="back-icon">
				<img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png"/>
			</a>
            <a class="backIdex" slot="more-icon" >
                <img class="imgsbank" src="../../../assets/img/my-icon/backIndex.png"/>
            </a>
		</nut-navbar> -->
        <Header title="绑定银行卡"></Header>
		<div class="pk-form-content">
			<div class="pk-input pad0">
				<nut-cell
					class="pk-bankcard"
					:class="{ 'pk-bankcard-active': bankcardActive }"
					:showIcon="true"
					:isLink="true"
					@click.native="switchPicker('isVisible1')"
				>
					<span slot="title">
						<label class="noline must">开户银行</label>
					</span>
					<div slot="desc" class="selected-option">
						<!-- <span class="btn" @click.stop.prevent="modifyYear">修改为指定的年份</span> -->
						<span class="show-value">{{
							year ? year : "请选择"
						}}</span>
					</div>
				</nut-cell>
				<nut-picker
					title="请选择银行卡"
					:is-visible="isVisible1"
					:default-value-data="defaultValueData1"
					:list-data="listData1"
					@close="switchPicker('isVisible1')"
					@confirm="setYearValue"
				></nut-picker>
			</div>
			<div class="pk-input">
				<label class="bankuser must">
					真实姓名
				</label>
				<!-- <nut-noticebar leftIcon="close" background="#fff">银行卡户名与真实姓名一致才能取款成功</nut-noticebar> -->
				<nut-col :span="9">
					<div class="flex-content el-input">
						<p v-show="!nameflag" class="names">{{username}}</p>
						<input
							v-show="nameflag"
							type="text"
							v-model="username"
							class="inputs"
							placeholder="请输入真实姓名"
						/>
					</div>
				</nut-col>
			</div>
            <div class="pk-input pad0">
				<nut-cell
					class="pk-bankcard"
					:class="{
						'pk-place-active':
							placeActive || citys != null
					}"
					:showIcon="true"
					:isLink="true"
					@click.native="switchPicker('isVisibles')"
				>
					<span slot="title">
						<label class="noline must">开户行地址</label>
					</span>
					<div slot="desc" class="selected-option">
						<!-- <span class="btn" @click.stop.prevent="modifyYear">修改为指定的年份</span> -->
						<span class="show-value">{{
							citys ? citys : "请选择"
						}}</span>
					</div>
				</nut-cell>
				<nut-picker
					:is-visible="isVisibles"
					title="请选择城市"
					:list-data="andProvince"
					:default-value-data="defaultValueData"
					@close="switchPicker('isVisibles')"
					@confirm="setChooseValues"
					@choose="updateChooseValue"
					@close-update="closeUpdateChooseValue"
				></nut-picker>
			</div>
			<div class="pk-input">
				<label class="must">
					开户行网点
				</label>
				<nut-col :span="12">
					<div class="flex-content el-input">
						<input
							type="text"
							class="inputs"
							placeholder="如：河北唐山建设银行"
							v-model="subbranch"
						/>
					</div>
				</nut-col>
			</div>
			<div class="pk-input">
				<label class="must">银行卡号</label>
				<nut-col :span="16">
					<div class="flex-content el-input">
						<input
							type="text"
							class="inputs"
							v-model="card"
							placeholder="请输入卡号"
						/>
					</div>
				</nut-col>
			</div>
		</div>
		<div class="has-btn">
            <div class="btns">
                <nut-button class="btnsf" block shape="circle" @click="submit()">绑定</nut-button>
            </div>
        </div>
	</div>
</template>
<script>
import { memBankList, addBankCard,getBankList } from "@/services/securityCenter.js";
import { getRealName } from "@/services/securityCenter.js";
import provinceObjs from "@/components/json/provincesCities.js"
import Header from "@/components/Header";
export default {
    components: {
		Header
	},
	data() {
		return {
			bankcardActive: false,
			isVisible: false,
			date: null,
			nameflag: false, //是否可以输入真实姓名
			card: "",
			subbranch: "",
			username: "",
			province: "",
			city: "",
			year: null,
			isVisible1: false,
			defaultValueData1: null,
			listData1: [],
            backList: [],
            bankObj:{},
			bankId: null,
			isVisibles: false,
			defaultValueData: null,
            citys: null,
            placeActive: false,
			//省市的数据应用
			provinceList: [],
			provinceObj: {},
			andProvince: []
		};
	},
	created() {
        this.provinceList = provinceObjs.provinceList;
        this.andProvince[0] = provinceObjs.provinceList;
        this.provinceObj = provinceObjs.provinceObj;
        getBankList().then(res => {
            console.log(res.data,'res.data')
        })
	},
	mounted() {
		this.getBankList();
		getRealName().then(res => {
			if (res.success) {
				if (!res.data.realName) {
					this.nameflag = true;
				}else{
                    this.username =res.data.realName
                }
			} else {
				this.$toast.fail(res.message, {
					cover: true,
					duration: 2000
				});
			}
		});
		this.createPlace();
	},
	methods: {
		createPlace() {
			//第一个数组 为 省份
			//第二个数组 为 市县
			// 即 当第一个数组变的时候 第二个数组默认选中对应的第一项
			this.andProvince = [
				...[this.provinceList[0]],
				this.provinceObj[this.provinceObj[0][0]]
			];
		},
		back(path) {
			this.$router.push({
				name: path
			});
		},
		getBankList() {
			memBankList().then(res => {
				if (res.success) {
					let data = res.data;
					if (data) {
						var arr = [];
						data.map(v => {
                            arr.push(v.title);
                            this.bankObj[v.title] = v.id
						});
						this.backList = data;
                        this.listData1.push(arr);
					}
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},
		switchPicker(param) {
			this[`${param}`] = !this[`${param}`];
		},
		setYearValue(chooseData) {
			this.year = chooseData[0];
			this.bankcardActive = true;
            this.bankId = this.bankObj[this.year] ;
		},
		submit() {
            if(this.city == "" || this.city == null){
                this.$toast.fail("请选择开户行地址", {
					cover: true,
					duration: 4000
                });
                return
            }
			if (!/^([1-9]{1})(\d{15,18})$/.test(this.card)) {
				this.$toast.fail("银行卡号规则为16-19位数字", {
					cover: true,
					duration: 4000
                });
                return
			}
			if (this.subbranch == "" || this.subbranch == null) {
				this.$toast.fail("开户行网点不能为空", {
					cover: true,
					duration: 4000
                });
                return
            }
			let postData = {
				bankId: this.bankId,
				card: this.card,
				subbranch: this.subbranch,
				username: this.username,
				province: this.province,
				city: this.city
			};
			console.log(postData, "postData");
			addBankCard(postData).then(res => {
				if (res.success) {
                    this.$toast.success("绑定银行卡成功", {
						cover: true,
						duration: 4000
                    });
                    this.$router.push({
                        name: "bankCard"
                    });
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 4000
					});
				}
			});
		},
		setChooseValues(chooseData) {
			this.citys = `${chooseData[0]}-${chooseData[1]}`;
			this.province = chooseData[0];
			this.city = chooseData[1];
            // this.city = chooseData[2];
			this.placeActive = true;
		},
		updateLinkage(self, value, index, chooseValue, cacheValueData) {
			if (!value) {
				return false;
			}
			switch (index) {
				case 1:
					let i = this.andProvince[0].indexOf(value);
					this.andProvince.splice(index, 1, [
						...this.provinceObj[this.andProvince[0][i]]
					]);
					chooseValue = chooseValue
						? chooseValue
						: this.andProvince[index][0];
					self && self.updateChooseValue(self, index, chooseValue);
					break;
			}
		},

		updateChooseValue(self, index, value, cacheValueData) {
			index < 2 && this.updateLinkage(self, value, index + 1, null);
		},
		closeUpdateChooseValue(self, chooseData) {
			this.updateLinkage(
				self,
				chooseData[0],
				1,
				chooseData[1],
				chooseData
			);
		}
	}
};
</script>
<style lang="scss" scoped>
    @import "../../../styles/pk-pwd.scss";
	.bankcard {
        background: $center-newbg;
        position: absolute;
        width: 100%;
	    .pk-form-content{
			padding:0  0.4rem;
			.nut-cell-box {
				line-height: px2rem(88);
				min-height: px2rem(88) /* 110/75 */;
				.nut-cell-right {
					.nut-cell-icon {
						img {
							margin-left: 0.08rem /* 6/75 */;
						}
					}
				}
			}
			.pk-input{
				position: relative;
				line-height: px2rem(88);
				height: 1.46667rem /* 110/75 */;
				label{
					font-size: px2rem(28);
					color: $tip-color;
					display: inherit;
				}
				.nut-noticebar{
					position: absolute;
					bottom: 0;
					padding: 0;
					height: 0.42rem;
					width: 100%;
					font-size: px2rem(28);
					/deep/ .wrap{
						height: 0.42rem;
						color: $placeholder-color;
						.content{
							line-height: px2rem(28);
						}
					}
				}
				.el-input input{
					font-size: px2rem(28);
					color:$tip-color;
					background: transparent;
				}
				.nut-cell-box {
					min-height: px2rem(88) /* 110/75 */;
					.nut-cell-right {
						.nut-cell-icon {
							img {
								margin-left: 0.08rem /* 6/75 */;
							}
						}
					}
				}
				.nut-cell:only-of-type{
					background: none
				}
			}
			::-webkit-input-placeholder {
				color: $placeholder-color;
				font-size: px2rem(28);
			}

			/* Firefox版本4-18 */
			:-moz-placeholder {
				color: $placeholder-color;
				font-size: px2rem(28);
			}

			/* Firefox版本19+ */
			::-moz-placeholder {
				color: $placeholder-color;
				font-size: px2rem(28);
			}

			/* IE浏览器 */
			:-ms-input-placeholder {
				color: $placeholder-color;
				font-size: px2rem(28);
			}
			.no-botline{
				&::after{
					border-bottom: none;
				}
			}
		}
		.names {
			font-size: .426667rem;
			color: $bank-card-color;
			text-align: right;
		}
		.pk-bankcard {
			height: 100%;
			width: 100%;
			// padding: 0 0.26667rem;
			// padding-right: 0.5rem;
			text-decoration: none;
			padding-left: 0;
			background-color: $default-color !important;
			span,
			label {
				font-size: px2rem(28);
			}
		}
		.pk-place-active {
			.show-value {
				color: #141414 !important;
			}
		}
		/deep/.nut-actionsheet-menu {
			display: none;
		}
	}
	.bankuser{
		line-height: 0.35rem;
			small {
			font-size: .293333rem;
			color: $label-color;
			}
	}
	
	.nut-button {
		height: 0.96rem /* 72/75 */;
		background: $index-banner-bg;
		font-size: 0.34667rem /* 26/75 */;
	}
	.nut-button.circle {
		border-radius: 0.13333rem /* 10/75 */;
	}
	.pk-bankcard-active {
		.show-value {
			color: $tip-color !important;
		}
	}
	.pk-bankcard {
		.show-value {
			font-size: .426667rem;
			color: $color-W;
		}
	}
    .has-btn{
        width: 100%;
    }
    .btns{
        display: flex;
        justify-content: center;
        height: 1.17333rem;
        background: $default-bg-color;
        .btnsf{
            font-size: .48rem;
            display: block;
            width: 9.2rem /* 690/75 */;
            height: 1.17333rem;
            background-color: $primary-color;
            border-radius: .13333rem /* 10/75 */;
        }
    }
    .bankcard .pk-form-content .pk-input{
        line-height: px2rem(88);
        height: px2rem(88);
    }
</style>
