<template>
	<div class="discover">
		<Header title="发现" :showLeftIcon="false"></Header>
		<Footer></Footer>
		<div class="content">
			<ul>
				<router-link tag="li" :to="{name:item.link}" v-for="(item) in list" :key="item.link">
					<div class="li-box">
						<div class="left company-icon">
							<img :src="item.icon" alt />
						</div>
						<div class="right pk-1px-b">
							<div class="desc">
								<h2>{{item.title}}</h2>
							</div>
							<i class="iconfont iconicon_mine_rmore"></i>
						</div>
					</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
	name: "discover",
	components: {
		Header,
		Footer
	},
	data() {
		return {
			list: [
				{
					title: "我的关注",
					link: "myFocus",
                    icon: require("@/assets/img/discover/fx_wdgz@2x.png")
				},
				{
					title: "排行榜",
					link: "ranking",
                    icon: require("@/assets/img/discover/fx_phb@2x.png")
				},
				{
					title: "幸运大转盘",
					link: "luckdraw",
                    icon: require("@/assets/img/discover/fx_dzp@2x.png")
				},
				{
					title: "优惠活动",
					link: "activity",
                    icon: require("@/assets/img/discover/fx_yhhd@2x.png")
				},
				{
					title: "自助优惠申请",
					link: "selfHelp",
                    icon: require("@/assets/img/discover/fx_zzyhsq@2x.png")
				}
			]
		};
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.content {
	padding-top: px2rem(24);
	ul {
		li {
			background-color: $default-color;
			&:nth-child(3) {
				margin-top: px2rem(24);
			}
			.li-box {
				display: flex;
				margin-left: px2rem(30);
				.left {
					flex: 1;
					padding: px2rem(20) px2rem(30) px2rem(20) 0;
					display: flex;
					justify-content: center;
					align-self: center;
					i {
						font-size: px2rem(44);
						// color: $color-a;
					}
					&.company-icon {
						i,img {
							width: px2rem(44);
							height: px2rem(44);
							display: block;
						}
					}
				}
				.right {
					flex: 10;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: px2rem(20) px2rem(30) px2rem(20) 0;
					.desc {
						h2 {
							font-size: px2rem(28);
							line-height: px2rem(28);
							color: $tip-color;
							font-weight: normal;
						}
					}
					.iconfont {
						font-size: px2rem(28);
						color: $label-color;
					}
				}
				&:last-child {
					.right {
						border-bottom: none;
					}
				}
			}
		}
	}
}
</style>