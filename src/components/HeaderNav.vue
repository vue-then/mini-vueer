<template>
	<div class="pk-header" :class="headerClass">
		<div class="nav-left">
			<div v-show="showLeft" @click="onClickLeft">
				<slot name="back-icon">
					<i v-show="showLeftIcon" class="iconfont iconicon_nav_back"></i>
					<span class="pk-header-title text-dots">{{title}}</span>
				</slot>
			</div>
			<slot name="left"></slot>
			<!-- 接受自定义左边内容 -->
		</div>
		<div class="nav-center">
			<div v-show="showCenter"></div>
			<!-- 默认中间内容  暂无-->
			<slot name="center"></slot>
			<!-- 接受自定义中间内容 -->
		</div>
		<div class="nav-right">
			<div class="more" v-show="showRight" @click="onClickRight">
				<slot name="more-icon">
					<span class="pk-header-title text-dots right">{{titleRight}}</span>
					 <img src="../assets/img/to-down-b.png">
				</slot>
			</div>
			<slot name="right"></slot>
			<!-- 接受自定义右边内容 -->
		</div>
	</div>
</template>
<script>
export default {
	props: {
		title: {
			type: String,
			default: "首页"
		},
		titleRight:{
			type: String,
			default: "菜单"
		},
		showLeft: {
			type: Boolean,
			default: true
		},
		showCenter: {
			type: Boolean,
			default: false
		},
		showRight: {
			type: Boolean,
			default: false
		},
		showLeftIcon: {
			type: Boolean,
			default: true
		},
		showRightIcon: {
			type: Boolean,
			default: false
		},
		headerClass: {
			type: String,
			default: "white"
        },
        // 左侧点击跳转路径
        backPath: {
            type: String,
            default: ""
        },
        // 是否导入返回额外方法
        dofunc:{
            type: Boolean,
            default: false
        },
        // 导入返回额外方法
        callback: {
            type: Function
        }
	},
	data() {
		return {};
	},
	methods: {
		onClickLeft() {
            if(!this.backPath){
                this.$router.go(-1)
            }else{
                this.$router.push(this.backPath)
            }
            if(this.dofunc){
                return this.callback()
            }
        },
        onClickRight(){
            this.$emit('on-right');
        }
	}
};
</script>
<style scoped lang="scss">
.pk-header {
	height: px2rem(88);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 99;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 px2rem(32);
	box-sizing: border-box;
	.pk-header-title {
		font-size: px2rem(34);
		color: $tip-color;
		vertical-align: middle;
		margin-left: px2rem(16);
        font-weight: bold;
        max-width: px2rem(620);
        display: inline-block;
	}
	.iconfont {
		font-size: px2rem(44);
		vertical-align: middle;
	}
	.right{
		font-size: px2rem(28);
		color: #000;
		font-weight: normal;
	}
	.rightIcon::before{
		transform:rotate(180deg);
	}
}
.white {
	background: $default-color;
	.iconfont {
		color: $tip-color;
	}
	.pk-header-title {
		color: $tip-color;
	}
}
.black {
	background: $nondefault-color;
	.iconfont {
		color: $default-color;
	}
	.pk-header-title {
		color: $default-color;
	}
}
.transparent {
	background: transparent;
	.iconfont {
		color: $default-color;
	}
	.pk-header-title {
		color: $default-color;
	}
}
</style>