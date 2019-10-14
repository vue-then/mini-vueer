<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">
					<div class="heads pk-1px-b">
                        <div class="modal-header">
							<slot name="header">{{ modal_heading }}</slot>
						</div>
						<i class="close" @click="$emit('close')">
							<img class="imgs" src="../assets/img/cha.png" alt="">
						</i>
					</div>

					<div class="modal-body">
						<slot name="body">{{ modal_body }}</slot>
					</div>

					<div class="modal-footer">
						<!-- <slot name="footer">
							<button class="modal-default-button btn-primary" @click="$emit('close')">确定</button>
						</slot> -->
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: "modal",
	data: function() {
		return {
			showModal: false,
		};
	},
	props: ["modal_heading", "modal_body"]
};
</script>
<style lang="scss" scoped>
//padding: 0.26667rem /* 20/75 */ 0.4rem /* 30/75 */;
.pk-1px-b:after {
	content: " ";
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	height: 1px;
	border-bottom: 1px solid $inputbotline-color;
	color: $inputbotline-color;
	-webkit-transform-origin: 0 100%;
	transform-origin: 0 100%;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}
    .heads{
        display: flex;
        justify-content: space-between;
        height: .85333rem /* 64/75 */;
        align-items: center;
        font-size: .42667rem /* 32/75 */;
        position: relative;
        padding: 0 0.4rem; /* 20/75 */
        // padding: 0.26667rem /* 20/75 */ 0.4rem /* 30/75 */;
    }

</style>


<style scoped>
	.close {
		width: 0.64rem /* 48/75 */;
		height: 0.64rem /* 48/75 */;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .close .imgs{
        display: block;
        width: .48rem /* 36/75 */;
    }
	.modal-mask {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: table;
		transition: opacity 0.3s ease;
	}

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	.modal-container {
		width: 9rem;
		margin: 0px auto;
		
		background-color: #fff;
		border-radius: 0.06667rem /* 5/75 */;
		box-shadow: 0 0.02667rem /* 2/75 */ 0.10667rem /* 8/75 */
			rgba(0, 0, 0, 0.33);
		transition: all 0.3s ease;
		font-family: Helvetica, Arial, sans-serif;
	}

	.modal-header h3 {
		margin-top: 0;
		color: #42b983;
	}

	.modal-body {
        max-height: 10.66667rem /* 800/75 */;
        overflow-y: scroll;
	}

	.modal-default-button {
		float: right;
	}

	/*
		     * The following styles are auto-applied to elements with
		     * transition="modal" when their visibility is toggled
		     * by Vue.js.
		     *
		     * You can easily play with the modal transition by editing
		     * these styles.
		     */

	.modal-enter {
		opacity: 0;
	}

	.modal-leave-active {
		opacity: 0;
	}

	.modal-enter .modal-container,
	.modal-leave-active .modal-container {
		-webkit-transform: scale(1.1);
		transform: scale(1.1);
	}
</style>