<template>
    <div class="intergralRule">
        <Header title="等级制度"></Header>
        <div class="ruleContent">
            <div class="rulePart">
                <h2>等级制度</h2>
                <div class="rulelList_center">
                    <div class="table-head clearfix">
                        <div class="table-th ">等级</div>
                        <div class="table-th ">成长积分</div>
                        <div class="table-th ">晋升奖励</div>
                    </div>
                    <div class="table-cent">
                        <div  class="table-tr clearfix" v-for= "item in ruleDate" :key="item.id">
                            <div class="table-td">{{item.LevelName}}</div>
                            <div class="table-td">{{item.Score}}</div>
                            <div class="table-td">{{item.Reward}}元</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rulePart two">
                <h2>晋升说明</h2>
                <div class="ruleText">
                    <p>
                        1、会员每晋升一个等级，都能获得晋升奖励，最高可达28888元。 <br>
                        2、成长积分、晋升奖励将在次日凌晨00:00之后统计，统计后将
                        把奖励直接发放至账户里。<br>
                        3、会员达到最高等级后，成长积分将不再进行统计累加。<br>
                        4、每个VIP等级将享受不同的特权权益，后续会更新具体的特权
                        权益。<br>
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { intergLevel } from "@/services/intergral.js";
import Header from '@/components/Header';
export default {
    name:"intergralRule",
    components: {
        Header
    },
    data() {
        return {
             ruleDate :[]
        }
    },
    mounted() {
        this.getRule();
    },
    methods: {
        getRule() {
      intergLevel().then(res => {
        if (res.success) {
          this.ruleDate = res.data;
          console.log(this.ruleDate, 'this.ruleDate')
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
    .ruleContent{
        background-color: #f3f3f3;
        margin-top: px2rem(24);
        .rulePart{
            background-color: #ffffff;
            padding-bottom: 0.4rem;
            h2{
                margin-left: 0.4rem;
                line-height: 1.093333rem;
                font-size: .426667rem;
                color: #1a1a1a;
            }
            .rulelList_center{
                width: 9.16rem;
                margin: 0 auto;
                border: .026667rem solid #d9d9d9;
                border-radius: .133333rem;
                color: #864c0e;
                font-size: .346667rem;
                text-align: center;
                .table-head{
                    background-color: #e4bd8c;
                    .table-th{
                        width: 3.03rem;
                        height: .893333rem;
                        line-height: .893333rem;
                        float: left;
                        border-right: .026667rem solid #d9d9d9;
                    }
                    .table-th:nth-child(3n){
                        border-right: none;
                    }
                }
                .table-tr:nth-child(2n) {
                    background-color: #e7dbcf;
                    }
                .table-td{
                    width: 3.03rem;
                    height: .893333rem;
                    line-height: .893333rem;
                    float: left;
                    border-right: .026667rem solid #d9d9d9;
                }
                .table-td:nth-child(3n){
                        border-right: none;
                    }
            }
        }
        .rulePart.two{
            margin-top: .373333rem;
            .ruleText{
                margin: 0 .426667rem;
                font-size: .346667rem;
                color: #999999;
            }
        }
    }
</style>