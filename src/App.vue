<!--
 * @Description: 
 * @Author: xwl
 * @Date: 2019-05-29 13:06:44
 * @LastEditors: xwl
 * @LastEditTime: 2019-05-29 13:52:48
 -->
<template>
	<div id="app" class="defalut">
        <!-- <button @click="showDateTimePicker">存款时间</button> -->
		<router-view v-if="isRouterAlive"/>
	</div>
</template>
<script>
import {LOCAL_TODAY} from '@/filter'
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      depositTime: null
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    showDateTimePicker() {
        if (!this.dateTimePicker) {
            this.dateTimePicker = this.$createDatePicker({
                title: '请选择存款时间',
                min: LOCAL_TODAY(-1),
                max: LOCAL_TODAY(),
                value: new Date(),
                columnCount: 6,
                onSelect: this.selectHandle,
                onCancel: this.cancelHandle
            })
        }
        this.dateTimePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
        this.depositTime = this.filterTimeStamp(date);
        var a = this.filterTimeStamp(this.depositTime,2);
        console.log(a,'a')
    },
    cancelHandle() {
        console.log("cancel time")
    },
  }
};
</script>
<style lang='scss'>
@import url("./assets/fonts/iconfont.css");
@import url("./styles/common.scss");

</style>
