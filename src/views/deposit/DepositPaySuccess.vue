<template>
    <div class="pay-result">
        <Header :title="title"></Header>
        <div class="content">
            <pay-success :dataObj="dataObj" @ok="$router.go(-3)"></pay-success>
        </div>
        <Advcommon :itype="1" :typeId="2"></Advcommon>
    </div>
</template>

<script>
    import PaySuccess from '@/components/PaySuccess'
    import Advcommon from '@/components/Advcommon'
    import Header from '@/components/Header'
    import func from '@/services/deposit'
   
    export default {
        name: 'payResult',
        components: {
            PaySuccess,
            Advcommon,
            Header
        },
        mounted() {
            if (this.$route.query.fromType == 1) {
                this.title = "线上入款";
                this.getOnlineOrderInfo();
               
            } else {
                this.title = "公司入款";
                this.getCompanyOrderInfo();
            }
        },
        data() {
            return {
                title: '线上入款',
                dataObj: {},
                contactusUrl: ""
            }
        },
        methods: {
            //获取公司入款 订单详情
            getCompanyOrderInfo() {
                let loading = this.$toast.loading('加载中...');
                func.getOrderInfo({
                    order: this.$route.query.order,
                    incomeType: 1, //公司入款 2线上入款
                }).then((res) => {
                    loading.hide();
                    if(res.success){
                        this.dataObj = {
                            desc: '您已完成存款，我们将及时为您增加余额，注意查收系统消息。',
                            details: [{
                                    name: '订单号',
                                    value: res.data.order
                                },
                                {
                                    name: '存入机构',
                                    value: res.data.bankName
                                },
                                {
                                    name: '存款人',
                                    value: res.data.incomeUser,
                                },
                                {
                                    name: '存入金额',
                                    value: res.data.incomeMoney
                                },
                                {
                                    name: '存款优惠',
                                    value: res.data.depositDiscount
                                },
                                {
                                    name: '额外优惠',
                                    value: res.data.otherDiscount
                                },
                            ]
                        }
                    }else {
                        this.$toast.text(res.message,{cover:true,duration:4000});
                    }
                    
                })
            },
            //获取线上入款 订单详情
            getOnlineOrderInfo(){
                let loading = this.$toast.loading('加载中...');
                func.getOrderInfo({
                    order: this.$route.query.order,
                    incomeType: 2, //公司入款 2线上入款
                }).then((res) => {
                    loading.hide();
                    if(res.success){
                        this.dataObj = {
                            desc: '恭喜！您已提交点卡存款，我们将及时为您增加余额，注意查收系统消息。',
                            details: [{
                                    name: '订单号',
                                    value: res.data.order
                                },
                                {
                                    name: '存款金额',
                                    value: res.data.incomeMoney
                                },
                            ]
                        }
                    }else {
                        this.$toast.text(res.message,{cover:true,duration:4000});
                    }
                })
            },
             getContactuFunc() {
                getContactus().then(res => {
                    if (res.success) {
                        let list = res.data;
                        if (list.length >= 5) {
                            list.map(item => {
                                if (item.itype == 6) {
                                    this.contactusUrl = item.content;
                                }
                            });
                        }
                    } else {
                        this.$toast.text(res.message, {
                            cover: true,
                            duration: 1000
                        });
                    }
                });
            },
        }
    }
</script>