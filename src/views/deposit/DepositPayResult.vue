<template>
	<div class="pay-result">
		<Header title="线上充值"></Header>

		<div class="content">
			<pay-return-result :fromType="2"></pay-return-result>
		</div>
		<Advcommon :itype="1" :typeId="2"></Advcommon>
	</div>
</template>
<script>
import Advcommon from "@/components/Advcommon";
import PayReturnResult from "@/components/PayReturnResult";
import Header from "@/components/Header";

export default {
	name: "payResult",
	components: {
		PayReturnResult,
		Advcommon,
		Header
	}
};
</script>



