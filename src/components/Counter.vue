<template>
	<div class="counter">
		<h2>{{childItem.typeName}}</h2>
		<div class="scope">(0-{{childItem.retreatCodeUp}})</div>
		<div class="action">
			<div class="reduce" @click="changeCount('-')"></div>
			<input type="number" @change="changeCount()" v-model.number="count">
			<div class="add" @click="changeCount('+')"></div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "Counter",
        props: ['childItem','index'],
        mounted () {
            console.log(this.count)
        },
        data () {
            return {
                count: this.childItem.retreatCode,
				countUp:this.childItem.retreatCodeUp,
                idx:this.index,
            }
        },
        methods: {
            changeCount(type){
                //减
                if(type=="-"){
                    this.count = (this.count * 10 - 1) / 10;
                    if(this.count <=0){
                        this.count = 0;
                    }
                    //加
				}else if(type=="+"){
                    this.count = (this.count * 10 + 1) / 10;
                    if(this.count >= this.countUp){
                        this.count = this.countUp;
                    }
                    //输入
				}else {
                    this.count = this.checkedValue(this.count);
                }
                this.$emit('addAndReduce',this.count,this.idx);
            },
            //校验 输入的范围
            checkedValue(value) {
                value = value.toString().replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '');
                let values = value > this.countUp ?
                    this.countUp :
                    value.indexOf(".") != -1 ?
                        value.replace(/^\s+|\s+$/g, "").split(".")[0] +
                        "." +
                        value
                        .replace(/^\s+|\s+$/g, "")
                        .split(".")[1]
                        .substr(0, 2) :
                        value.replace(/^\s+|\s+$/g, "");
                return parseFloat(values);
            },
        }

    }
</script>

<style scoped lang="scss">
	.counter {
		.scope {
			color: $color-qs-wt;
			font-size: 0.27rem;
			padding: 0.13rem 0 0.27rem;
		}
		h2 {
			font-size: 0.37rem;
			color: $color-C;
			font-weight: normal;
			/*padding-bottom: 0.67rem;*/
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			width: 100%;
		}
		.action {
			display: flex;
			width: 100%;
			justify-content: space-around;
			padding: 0 0.40rem;
			box-sizing: border-box;
			.reduce {
				width: 0.64rem;
				height: 0.64rem;
				border-radius: 50%;
				border: solid 2px $color-qs-yt;
				position: relative;
				&:after {
					content: '—';
					position: absolute;
					top: 50%;
					left: 50%;
					display: block;
					margin-left: -0.15rem;
					margin-top: -0.22rem;
					color: $color-qs-yt;
					border-radius: 2px;
					font-weight: bold;
					font-size: 0.35rem;
				}
			}
			.add {
				width: 0.64rem;
				height: 0.64rem;
				border-radius: 50%;
				border: solid 2px $color-qs-yt;
				position: relative;
				&:after {
					content: '—';
					position: absolute;
					top: 50%;
					left: 50%;
					display: block;
					margin-left: -0.15rem;
					margin-top: -0.22rem;
					color: $color-qs-yt;
					border-radius: 2px;
					font-weight: bold;
					font-size: 0.35rem;
				}
				border-color: $color-qs-wt;
				&:after {
					content: '+';
					color: $color-qs-wt;
					font-size: 0.53rem;
					margin-top: -0.4rem;
				}
			}
			input {
				width: 1.33rem;
				text-align: center;
				border: none;
				border-bottom: 1px solid $color-P;
				font-size: 0.53rem;
				padding-bottom: 0.40rem;
			}
		}
	}

</style>