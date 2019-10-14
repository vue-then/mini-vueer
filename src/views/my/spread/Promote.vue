<template>
	<div class="promote">
		<Header title="推广说明"></Header>
		<div class="instruct">
			<div class="tits">一．返佣金额如何计算</div>
            <p class="titp">计算方式请查看下图计算规则：</p>
            <div class="imgs">
                <img src="../../../assets/img/my-icon/icons/spread/fanyongab.png" alt>
            </div>
            <div class="tits">二．如何推广</div>
            <p class="titp">链接复制并发送给好友，好友点击链接进入站点并注册
成为会员后，即完成了一次推广。</p>
            <div class="tits">三．如何获得佣金</div>
            <p class="titp">当推广的会员进行了有效投注行为并获得了返水金额奖
励后，上级会员即可获得返佣金额奖励。另外，如果推
广的会员再次推广下级会员，最下级会员一样会为最上
级会员带来一定比例的返佣金额，所以推广的人数越
多，可能获得的佣金越多。</p>
            <div class="tits">四．返佣金额如何使用</div>
            <p class="titp">返佣金额可以归户到系统余额之中，以用来投注或直接
提现。</p>
            
		</div>
	</div>
</template>
<script>
import Header from '@/components/Header';
export default {
    components: {
        Header
    },
	methods: {
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
.promote {
	background-color: $prompt-bg;

	
	.instruct {
		background: #fff;
        padding: .4rem /* 15/75 */;
        font-size: px2rem(28);
        .tits{
            background-image: linear-gradient(90deg, 
                #17c492 0%, 
                #2ad5a4 50%, 
                #44eebd 100%), 
            linear-gradient(
                #b1b1b1, 
                #b1b1b1);
            background-blend-mode: normal, 
                normal;
            border-radius: px2rem(50);   
            height: px2rem(80);
            color: $default-color;
            line-height: px2rem(80);
            padding-left: px2rem(32);
        }
        .titp{
            padding: px2rem(32) 0;
            line-height: 1.8em;
        }
        .imgs {
            // height: 12.8rem /* 250/75 */;
            // padding: 0 .4rem;
            width: auto;
            margin-bottom: .4rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
		
    }
    
}
</style>
