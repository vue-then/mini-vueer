
<template>
	<div class="lowerReport" ref="lowerReport">
        <Header title="下级报表"></Header>
		<div class="tab">
			<nut-tab @tab-switch="tabSwitch" :contentShow="false">
				<nut-tab-panel v-for="item in timeArr" :key="item.value" :tabTitle="item.name"></nut-tab-panel>
			</nut-tab>
		</div>
       
		<div class="tab-content" v-show="!showLoading">
			<div class="lower-content">
				<div v-show="list.length > 0" class="lis" v-for="(item,index) in list" :key="index">
					<ul>
						<li>
							<label>账号：</label>
							<span>{{item.account}}</span>
						</li>
						<li>
							<label>推广人数：</label>
							<span>{{item.num}}</span>
						</li>
						<li>
							<label>投注总额：</label>
							<span>{{item.bet | currency("",2)}}</span>
						</li>
						<li>
							<label>返水总额：</label>
							<span>{{item.win | currency("",2)}}</span>
						</li>
                        <li>
							<label>自身返佣：</label>
							<span>{{item.self | currency("",2)}}</span>
						</li>
						<li>
							<label>返佣贡献：</label>
							<span>{{item.win | currency("",2)}}</span>
						</li>
						<li class="botli">
							<label>最后登录时间：</label>
							<span>{{item.last | filterDate}}</span>
						</li>
						<div class="clearboth"></div>
					</ul>
                </div>
                <no-data v-show="list.length <= 0 || list==0" class="no-data-box"></no-data>
			</div>
		</div>
        <div class="skeleton vue-skeleton-loading" v-show="showLoading">
            <div class="skeleton-bac-animation"></div>
            <div class="skeleton-bac-content">
                <row style="width:100%">
                    <skeleton-square style="width:100%;height:1.3333rem"></skeleton-square>
                </row>
                <row padding="0.2rem 0 0 0 " style="width:100%">
                    <skeleton-square style="width:100%;height:2.25rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="3.1667rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="6rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="3.1667rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="6rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="3.1667rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="6rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
                <row padding="0.2rem  0 0 0 ">
                    <skeleton-square width="3.1667rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                    <skeleton-square width="6rem" style="height:3rem;" margin="0 0 0 0.2667rem"></skeleton-square>
                </row>
            </div>
        </div>
	</div>
</template>

<script>
    import func from '@/services/spread'
    import noData from "@/components/NoData.vue"
    import Header from '@/components/Header';
export default {
    name:'subordinate',
    components: {
        noData,
        Header
    },
	data() {
		return {
            timeArr:[
                {value:2,name:'今日'},
                {value:1,name:'昨日'},
                {value:5,name:'本月'},
                {value:6,name:'上月'},
            ],
            dayType: 2,
            list:[],
            showLoading: true
		};
	},
	mounted() {
        this.getSubOrdinateReportList();
	},
	methods: {
		getSubOrdinateReportList(){
            let loading = this.$toast.loading('加载中...');
            func.getSubOrdinateReportList({
                dayType:this.dayType
            }).then((res) => {
                loading.hide();
                if(res.success){
					this.list = res.data.list;
					this.list = this.list === null ? 0 : this.list
                }else {
                    this.$toast.fail(res.message,{cover:true,duration:4000});
                }
                this.showLoading=false;
            })
        },
		tabSwitch(index) {
            this.dayType = this.timeArr[index].value;
            this.getSubOrdinateReportList();
		}
	}
};
</script>

<style lang="scss" scoped>
    /deep/.skeleton{
            .skeleton-bac-content{
                .vue-skeleton-row{
                    .vue-skeleton-square-wrap{
                        .vue-skeleton-square{
                            height: 100%!important;
                        }
                    }
                }
            }
        }
	.lowerReport {
        height: 100%;
        background-color: $prompt-bg;
        .spansright {
			.imgsbank {
				position: absolute;
				width: 0.58667rem /* 44/75 */;
                top: .24rem /* 18/75 */;
                right: .2rem /* 15/75 */;
			}
		}
        .levelBlue{
            color: #3a74d2;
        }
        .levelRed{
            color: #ff321d;
        }
		.tab {
			position: fixed;
			top: 1.17rem;
			left: 0;
			width: 100%;
			z-index: 1;
			/deep/ .nut-tab-title {
				height: 1.07rem;
				.nav-bar {
					background: $primary-color;
				}
			}
			/deep/ .nut-tab {
				padding: 0;
				.nut-tab-active {
					.nut-tab-link {
						color: $primary-color;
					}
				}
				/deep/ .nut-tab-link {
					font-size: 0.37rem;

					&:hover {
						text-decoration: none;
					}
				}
			}
		}
		.tab-content {
			padding-top: 1.17rem;
            height: 100%;
		}
		.lower-content {
			padding: 0 0.4rem /* 30/75 */;
			.lis {
				margin-top: 0.26667rem /* 20/75 */;
				width: 100%;
                height: auto;
                color: $text-color;
				// padding: .30667rem /* 23/75 */ .4rem /* 30/75 */;
				ul {
					width: auto;
					font-size: .293333rem /* 22/75 */;
					background-color: #ffffff;
					border-radius: 10px;
                    padding: 0.33333rem /* 25/75 */ 0.4rem /* 30/75 */;
                    box-shadow:$subord-blue-shadow;
					li {
						width: 50%;
						height: auto;
                        float: left;
                        margin-bottom: .13333rem /* 10/75 */;
                    }
                    .botli{
                        width: 100%;
                       // font-size: .26667rem /* 20/75 */;
                        color: $label-color;
                        margin-bottom: 0;
                    }
					.clearboth {
						clear: both;
					}
				}
			}
		}
    }
    
    .no-data-box {
		margin-top: 2.13333rem /* 160/75 */;
		text-align: center;
		i {
			font-size: 2.53333rem /* 190/75 */;
			color: $primary-color;
			opacity: .6;
		}
		p {
			text-align: center;
			font-size: .42667rem /* 32/75 */;
			color: $primary-color;
			margin-top: .26667rem /* 20/75 */;
		}
	}
</style>


