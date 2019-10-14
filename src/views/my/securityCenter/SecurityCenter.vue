<template>
	<div class="securityCenter">
        <Header title="安全中心" backPath="/set"></Header>
		<div class="sercur-content mgt24">
			<nut-cell
				class="pk-titler"
				title="修改登录密码"
				desc=""
				:showIcon="true"
				@click.native="back('editLoginpwd')"
			>
			</nut-cell>
			<nut-cell
				class="pk-titler"
				title="修改取款密码"
				desc=""
				:showIcon="true"
				@click.native="back('securitypwd')"
			>
			</nut-cell>
			<nut-cell
				class="pk-titler"
				title="修改视讯密码"
				desc=""
				:showIcon="true"
				@click.native="back('videopwd')"
			>
			</nut-cell>
			<!-- <a
				href="javascript:;"
				class="pk-titler nut-cell"
				style="background-color: rgb(255, 255, 255);"
				@click="back('bankcard')"
			>
				<div class="nut-cell-box">
					<div class="nut-cell-left">
						<span class="nut-cell-title"
							>银行卡</span
						>
					</div>
					<div class="nut-cell-right">
						<span class="nut-cell-desc">设置</span>
						<span class="nut-cell-icon">
							<img :src="leftSrc" alt="" class="src" />
						</span>
					</div>
				</div>
			</a> -->
		</div>
	</div>
</template>
<script>
import { getUserInfo } from "@/services/about.js";
import Header from '@/components/Header';
export default {
    components: {
        Header
    },
	data() {
		return {
            user:"",
            realNames:"",
            bankList: [],
			leftSrc:
				"data:image/svg+xml,%3Csvg viewBox='0 0 5 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.215 9.757l3.577-4.17a.931.931 0 0 0 0-1.173L1.215.244a.642.642 0 0 0-1.007 0 .929.929 0 0 0 0 1.172L3.283 5 .208 8.584a.93.93 0 0 0 0 1.173.643.643 0 0 0 1.007 0z' fill='rgb(200,200,205)'/%3E%3C/svg%3E"
		};
	},
	mounted() {
        this.getUser()
	},
	methods: {
		back(path) {
			this.$router.push({
				name: path
			});
		},
		getUser() {
			getUserInfo().then(res => {
				if (res.success) {
					this.user = res.data.user;
					this.realNames = this.user.realName;
				} else {
					this.$toast.fail(res.message, {
						cover: true,
						duration: 1000
					});
				}
			});
        }
	}
};
</script>

<style lang="scss" scoped>
	@import "../../../styles/pk-pwd.scss";
    .mgt24{
        margin-top: px2rem(24);
    }
	.securityCenter {
		background: $center-newbg;
		// margin-top: -1.22667rem;
		
		.sercur-content {
			.pk-titler {
				height: px2rem(88);
				font-size: px2rem(28);
				color: $nondefault-color;
				padding: 0 0.4rem /* 30/75 */;
                text-decoration: none;
                /deep/.nut-cell-box{
                    .nut-cell-left{
                        .nut-cell-title{
                            font-size: px2rem(28);
                            color: $tip-color;
                        }
                    }
                    .nut-cell-right{
                        .nut-cell-desc{
                            font-size: px2rem(28);
							color: $label-color;
							font-weight: normal;
                        }
                    }
                }
			}
		}
	}
	.nut-cell {
		.nut-cell-title{
				font-size: px2rem(28);
				color: $tip-color !important;
			}
		height:  px2rem(88);
		line-height:  px2rem(88);
		font-size:  px2rem(28);
		color: $tip-color !important;
		padding: 0 0.4rem /* 30/75 */;
		text-decoration: none;
	}
	.unbind {
		color: $center-unbind;
	}
	.nut-cell .nut-cell-title, .nut-cell-left ,
	.nut-cell .nut-cell-right {
			font-size: px2rem(28);
			color: $tip-color;
	}

	.nut-cell .nut-cell-icon img {
		height: 0.33333rem; /* 25/75 */
	}
</style>