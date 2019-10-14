<template>
    <div class="intergDetailed" v-cloak>
        <!-- <nut-navbar class="pk-title" @on-click-back="$router.go(-1)">
			<a class="spans" slot="back-icon">
                <img class="imgsbank" src="../../../assets/img/my-icon/fanhui.png" />
            </a>
			积分明细
			<a class="backIdex" @click="$router.push('/')" slot="more-icon">
				<img class="imgsbank" src="../../../assets/img/my-icon/backIndex.png">
			</a>
		</nut-navbar> -->
        <Header title="积分明细"></Header>
        <div class="intergDeta">
            <div class="intergDetaTit">
                <p>总积分：{{scoreNum.totalIntegral}}</p>
                <span>当日积分：{{scoreNum.todayIntegral}}</span>
            </div>
            <div class="getIntergList">
                <div class="getInterg" v-for="item in intergInfoDate" :key="item.id">
                    <p class="getType">{{item.remark}}</p>
                    <span class="time">{{item.createTime  | filterDate('YYYY-MM-DD HH:mm:ss')}}</span>
                    <span class="number">+{{item.score}}分</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header';
import { getIntergChange } from "@/services/intergral.js";
export default {
    name:"intergDetailed",
    components: {
        Header
    },
    data() {
        return {
            intergInfoDate:[],
            scoreNum:[]
        }
    },
    mounted(){
        this.intergInfo();
    },
    methods: {
        intergInfo() {
          getIntergChange({ asc:false }).then(res => {
        if (res.success) {
          this.intergInfoDate = res.data.data;
            this.scoreNum = res.data;
          console.log(this.intergInfoDate, 'this.memberInfoDate')
        } else {
          this.$toast.fail(res.message, {
            cover: true,
            duration: 1000
          });
        }
      });
    }
    },
}
</script>

<style lang="scss" scoped>
.intergDetailed{
        background-color:#f3f3f3; 
}
    .intergDeta{
        background-color: #ffffff;
        .intergDetaTit{
            background-color:#f3f3f3; 
            height: 1.04rem;
            line-height: 1.04rem;
            color: #999999;
            font-size: .346667rem;
            p{
                float: left;
                margin-left: .426667rem;
            }
            span{
                float: right;
                margin-right: .266667rem;
            }
        }
        .getIntergList{
            .getInterg{
                height: 1.76rem;
                margin:0 .413333rem;
                border-bottom:.026667rem solid #d9d9d9;
                position: relative;
                p{
                    position: absolute;
                    top: .426667rem;
                    font-size: .426667rem;
                    color: #1a1a1a;
                }
                .time{
                    position: absolute;
                    top: 1.16rem;
                    color: #999999;
                }
                .number{
                    position: absolute;
                    top: .653333rem;
                    right: 0;
                    float: right;
                    font-size: .426667rem;
                    color: #ff5500;
                }
            }
            .getInterg:last-child{
                border-bottom: none;
            }
        }
    }
</style>