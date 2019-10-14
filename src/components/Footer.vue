<template>
	<div class="pk-footer">
		<ul>
			<li
				:class="activeLink === item.link?'active':''"
				v-for="item in tabList"
				:key="item.link"
				@click="changeTab(item)"
			>
				<i class="iconfont" :class="item.icon"></i>
				<span>{{item.tabTitle}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
		return {
			activeLink: "index",
			tabList: [
				{
					tabTitle: "消息",
					link: "index",
					icon: "iconicon_tabbar_info_nor"
				},
				{
					tabTitle: "充值",
					link: "deposit",
					icon: "iconicon_tabbar_cz_nor"
				},
				{
					tabTitle: "游戏大厅",
					link: "games",
					icon: "iconicon_tabbar_cz_nor"
				},
				{
					tabTitle: "发现",
					link: "discover",
					icon: "iconicon_tabbar_fx_nor"
				},
				{
					tabTitle: "我的",
					link: "my",
					icon: "iconicon_tabbar_mine_nor"
				}
			]
		};
	},
	created() {
		this.tabList.map(item => {
			if (this.$route.name === item.link) {
				this.activeLink = item.link;
			}
		});
	},
	methods: {
		changeTab(item) {
			this.$router.push({ name: item.link });
		}
	}
};
</script>
<style scoped lang="scss">
.pk-footer {
	// background-color: $default-color;
	color: $tip-color;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
    z-index: 99;
    height: px2rem(132);
    display: flex;
    align-items: flex-end;
    background: url("../assets/img/footer/img_tabbar_bg.png") no-repeat 0 center;
    background-size: 100%;
	ul {
        width: 100%;
		background-color: $default-color;
		display: flex;
        // box-shadow: 0px px2rem(-2) px2rem(10) #ccc;
		li {
			flex: 1;
			height: px2rem(90);
			display: flex;
			flex-direction: column;
			align-items: center;
            justify-content: center;
            &:nth-child(3){
                position: relative;
                &::after{
                    position: absolute;
                    content: "";
                    width: px2rem(95)!important;
                    height: px2rem(95)!important;
                    border-radius: 50%;
                    background: url("../assets/img/footer/icon_tabbar_game_nor.png") no-repeat px2rem(4) px2rem(8);
                    background-size: 95%;
                    background-color: $default-color; 
                    top: px2rem(-40);
                }
                &.active {
                    &::after{
                        background-image: url("../assets/img/footer/icon_tabbar_game_cur.png")
                    }
                    span{
                        color: $color-r;
                    }
                }
            }
			i {
				font-size: px2rem(36);
				color: $tip-color;
				margin-bottom: px2rem(5);
			}
			span {
				font-size: px2rem(24);
				color: $tip-color;
			}
			&.active {
				i {
					color: $primary-color;
				}
				span {
					color: $primary-color;
				}
			}
		}
	}
}
</style>