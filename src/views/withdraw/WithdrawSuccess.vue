<template>
    <div class="widthdraw-success">
        <Header title="提现"></Header>
        <div class="content">
            <pay-success :dataObj="dataObj" @ok="$router.go(-2)"></pay-success>
            <adv-common :itype="2" :typeId="2"></adv-common>
        </div>
    </div>
</template>
<script>
import PaySuccess from '@/components/PaySuccess'
import AdvCommon from '@/components/Advcommon'
import Header from "@/components/Header";

export default {
    name:'withdrawSuccess',
    components:{
        PaySuccess,
        AdvCommon,
        Header
    },
    data(){
        return {
            dataObj:{
                desc:'出款已提交，我们将尽快审核您的订单，请注意查收消息。',
                details:[
                    {name:'订单号',value:''},
                ]
            }
        }
    },
    mounted(){
        this.dataObj.details[0].value = this.$route.query.orderId;
    },
}
</script>




