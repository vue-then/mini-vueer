<template>
  <div class="pk-auth">
    <nut-navbar class="pk-title" :rightShow="false" @on-click-back="$router.go(-1)">
      <a class="spans" slot="back-icon">
        <img class="imgsbank" src="">
      </a>
      注册协议
    </nut-navbar>
    <div class="pk-register">
      <!-- <h3 v-html="text.title" class="agreement-title"></h3>
      <div v-html="text.content" class="agreement-text"></div> -->
      <div class="agreement-text" scrolltop="0" scrollleft="0">
          <p>每个客户只能拥有一个帐号，如发现客户拥有多个帐号，本公司有权冻结客户的帐号以及保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利。本公司有权保留取消任何因素导致帐号结余不正确的金额。每位玩家、每一住址、每一电子邮箱、每一电话号码、相同支付卡/信用卡号码，以及共用电脑环境 (例如:网吧、其他公共用电脑等)只能够拥有一个会员帐号，各项优惠只适用于每位元客户在澳门永利娱乐城唯一的帐户。</p>
          <p>无论是个人或是团体，如有任何威胁、滥用澳门永利娱乐城优惠的行为，澳门永利娱乐城保留权利取消、收回由优惠产生的红利，并保留权利追讨最高50%手续费。</p>
          <p>所有澳门永利娱乐城的优惠是特别为玩家而设，在玩家注册资讯有争议时，为确保双方利益、杜绝身份盗用行为，澳门永利娱乐城保留权利要求客户向我们提供充足有效的档， 并以各种方式辨别客户是否符合资格享有我们的任何优惠。</p>
          <p>会员澳门永利娱乐城有责任时常检查本身的户口结余或者是交易记录，并且更新户口的资料。</p>
          <p>澳门永利娱乐城标定的时间均为国际时区美东时间。</p>
          <p>所有投注一经确认，将不可更改或取消。</p>
          <p>所有在澳门永利娱乐城进行的投注，本公司将以电脑系统保留的电子交易记录为投注的有效凭证。</p>
          <p>客户有责任确保自己的帐号及登入资料的保密性。以使用者帐号及密码进行的任何网上交易均被视为有效。</p>
          <p>澳门永利娱乐城只接受合法博彩年龄的客户申请。同时我们保留要求客户提供其年龄证明的权利。</p>
          <p>客户必须时刻遵守当地法律，如有疑问应就相关问题，寻求当地法律意见。本公司将不接受任何客户因违反当地博彩法律所引致之任何责任。</p>
          <p>本公司保留所有规则的修改权，并且无须事先公布。 客户一经注册开户，将被视为接受所有颁布在澳门永利娱乐场的规则与条例。</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { getTerms } from "../../services/auth.js";
export default {
  data() {
    return {
      text: ""
    };
  },
  mounted() {
    // getTerms().then(res => {
    //   if (res.success) {
    //     this.text = res.data;
    //   } else {
    //     this.$toast.fail(res.message, {
    //       cover: true,
    //       duration: 1000
    //     });
    //   }
    // });
  },
  methods: {
    goBack() {
      this.$router.push({
        name: "register"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./auth.scss";
</style>

