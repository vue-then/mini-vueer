/*
 * @Description:
 * @Author: xwl
 * @Date: 2019-05-29 13:06:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-09-30 17:26:33
 */
import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import Cubepro from "@/components/cube";
import "./assets/js/iconfont.js";
// import "./styles/skin.scss";
// import "./styles/common.scss";
import "@nutui/nutui/dist/styles/index.scss";


//引入jd-ui库
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/nutui.scss";
NutUI.install(Vue);
Vue.use(Cubepro);

//图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
    error: require("./assets/img/game-icon/yxdt_icon_none.png"),
    loading: require("./assets/img/loading.svg"),
    attempt: 1
});

//图片预览
import gallery from "img-vuer";
Vue.use(gallery, {
    swipeThreshold: 150, // default 100
    isIndexShow: true, // show image index, default true
    useCloseButton: false, // trigger gallery close with close button, default true
    preload: true // preload images in the same group, default true
});

import IM from "@/services/im/connect";
Vue.prototype.IM = IM;

// //富文本
// import VueQuillEditor from 'vue-quill-editor'
// // require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// Vue.use(VueQuillEditor)

//复制
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

//适配
import "./assets/js/flexible";

//引入VueAwesomeSwiper
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import $ from "jquery";
Vue.prototype.$ = $;
Vue.prototype.$jq = $;
//---滑块验证
import "./assets/js/verify";

//二维码
import VueQriously from "vue-qriously";
Vue.use(VueQriously);

//过滤器
import * as filters from "./filter";
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])); //注册过滤器
Vue.prototype.filterDate = filters.filterDate; //时间过滤方法
Vue.prototype.filterAmount = filters.filterAmount; //数字金额大写中文转换
Vue.prototype.ModalHelper = filters.ModalHelper; //弹框后禁止页面滑动
Vue.prototype.filterTimeStamp = filters.filterTimeStamp; // 时分秒时间过滤方法
Vue.prototype.makeTimes = filters.makeTimes; //字符串转换为时间戳

//全局常量
Vue.prototype.HTML_FONT_SIZE = parseInt(
    document.documentElement.style.fontSize
); //html字体大小
Vue.prototype.PAGE = 1; //page
Vue.prototype.PAGE_SIZE = 10; //pageSize

import { getContactus } from "@/services/center";
getContactus().then(res => {
    if (res.success) {
        let list = res.data;
        if (list.length >= 5) {
            list.map(item => {
                if (item.itype == 6) {
                    Vue.prototype.CONTACTUS_URL = item.content; //在线客服跳转地址
                }
            });
        }
    }
});

//全局公共方法

/**
 * @description: 内外链接跳转
 * @param {isIn} boolean ture内链 false 外链
 * @param {linkUrl} string 跳转地址
 */
Vue.prototype.jumpLink = (isIn, linkUrl) => {
    if (isIn) {
        linkUrl && router.push({ name: "linkUrl" });
    } else {
        linkUrl && window.open(linkUrl);
    }
};

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
