<template>
    <div class="mint-loadmore">
        <div class="mint-loadmore-content" :class="{ 'is-dropped': topDropped || bottomDropped}" :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }">
            <slot name="top">
                <div class="mint-loadmore-top" v-if="topMethod">
                    <!-- v-if="topStatus === 'loading'" -->
                    <div class="ball-beat">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <span class="mint-loadmore-text">{{ topText }}</span>
                </div>
            </slot>
            <slot></slot>
            <slot name="bottom">
                <div class="mint-loadmore-bottom"  v-if="bottomMethod">
                <!-- v-if="bottomStatus === 'loading'" -->
                    <div class="ball-beat">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <span class="mint-loadmore-text">{{ bottomText }}</span>
                </div>
            </slot>
    
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            stopTranslate: {
                type: Number,
                default: 80
            },
            maxDistance: {
                type: Number,
                default: 0
            },
            autoFill: {
                type: Boolean,
                default: false
            },
            distanceIndex: {
                type: Number,
                default: 2
            },
            topPullText: {
                type: String,
                default: ''
            },
            topDropText: {
                type: String,
                default: ''
            },
            topLoadingText: {
                type: String,
                default: ''
            },
            topDistance: {
                type: Number,
                default: 70
            },
            topMethod: {
                type: Function
            },
            bottomPullText: {
                type: String,
                default: ''
            },
            bottomDropText: {
                type: String,
                default: ''
            },
            bottomLoadingText: {
                type: String,
                default: ''
            },
            bottomDistance: {
                type: Number,
                default: 70
            },
            bottomMethod: {
                type: Function
            },
            bottomAllLoaded: {
                type: Boolean,
                default: false
            },
            topAllLoaded: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                size: parseInt(this.HTML_FONT_SIZE * 0.4),
                translate: 0, // 此变量决定当前组件上下移动,
                scrollEventTarget: null, // 滚动的dom节点
                containerFilled: false, // 当前滚动的内容是否填充完整,不完成会调用 loadmore的回调函数
                topText: "", // 下拉刷新,显示的文本
                topDropped: false, // 记录当前drop状态,用给组件dom添加is-dropped class(添加回到原点的动画)
                bottomText: "", // 上拉加载更多 显示的文本
                bottomDropped: false, // 同topDropped
                bottomReached: false, // 当前滚动是否滚动到了底部
                direction: "", // touch-move过程中, 当前滑动的方向
                startY: 0, // touch-start 起始的y的坐标值
                startScrollTop: 0, // touch-start 起始的滚动dom的 scrollTop
                currentY: 0, // touch-move 过程中的 y的坐标
                topStatus: "", // 下拉刷新的状态: pull(下拉) drop(释放) loading(正在加载数据)
                bottomStatus: "" // 上拉加载更多的状态: 状态同上
            };
        },
        watch: {
            topStatus(val) {
                this.$emit("top-status-change", val);
                switch (val) {
                    case "pull":
                        this.topText = this.topPullText;
                        break;
                    case "drop":
                        this.topText = this.topDropText;
                        break;
                    case "loading":
                        this.topText = this.topLoadingText;
                        break;
                }
            },
    
            bottomStatus(val) {
                this.$emit("bottom-status-change", val);
                switch (val) {
                    case "pull":
                        this.bottomText = this.bottomPullText;
                        break;
                    case "drop":
                        this.bottomText = this.bottomDropText;
                        break;
                    case "loading":
                        this.bottomText = this.bottomLoadingText;
                        break;
                }
            }
        },
        mounted() {
            this.init(); // 当前 vue component挂载完成之后, 执行init()函数
        },
        methods: {
            onTopLoaded: function onTopLoaded() {
                var this$1 = this;
    
                this.translate = 0;
                setTimeout(function() {
                    this$1.topStatus = 'pull';
                }, 200);
            },
            onBottomLoaded: function onBottomLoaded() {
                var this$1 = this;
    
                this.bottomStatus = 'pull';
                this.bottomDropped = false;
                this.$nextTick(function() {
                    if (this$1.scrollEventTarget === window) {
                        document.body.scrollTop += this.stopTranslate;;
                    } else {
                        this$1.scrollEventTarget.scrollTop += this.stopTranslate;;
                    }
                    this$1.translate = 0;
                });
                if (!this.bottomAllLoaded && !this.containerFilled) {
                    this.fillContainer();
                }
            },
            init() {
                this.topStatus = 'pull';
                this.bottomStatus = 'pull';
                this.topText = this.topPullText;
                this.scrollEventTarget = this.getScrollEventTarget(this.$el); // 获取滚动的dom节点
                if (typeof this.bottomMethod === 'function') {
                    this.fillContainer(); // 判断当前滚动内容是否填满,没有执行外部传入的loadmore回调函数加载数据
                    this.bindTouchEvents(); // 为当前组件dom注册touch事件
                }
                if (typeof this.topMethod === 'function') {
                    this.bindTouchEvents();
                }
            },
            getScrollEventTarget: function getScrollEventTarget(element) {
                var currentNode = element;
                while (currentNode && currentNode.tagName !== 'HTML' &&
                    currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                    var overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                    if (overflowY === 'scroll' || overflowY === 'auto') {
                        return currentNode;
                    }
                    currentNode = currentNode.parentNode;
                }
                return window;
            },
            getScrollTop: function getScrollTop(element) {
                if (element === window) {
                    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
                } else {
                    return element.scrollTop;
                }
            },
            bindTouchEvents: function bindTouchEvents() {
                this.$el.addEventListener('touchstart', this.handleTouchStart);
                this.$el.addEventListener('touchmove', this.handleTouchMove);
                this.$el.addEventListener('touchend', this.handleTouchEnd);
            },
    
    
            fillContainer() {
                if (this.autoFill) {
                    this.$nextTick(() => {
                        if (this.scrollEventTarget === window) {
                            this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                                document.documentElement.getBoundingClientRect().bottom;
                        } else {
                            this.containerFilled = this.$el.getBoundingClientRect().bottom >=
                                this.scrollEventTarget.getBoundingClientRect().bottom;
                        }
                        if (!this.containerFilled) { // 如果没有填满内容, 执行loadmore的操作
                            this.bottomStatus = 'loading';
                            this.bottomMethod(); // 调用外部的loadmore函数,加载更多数据
                        }
                    });
                }
            },
            handleTouchStart(event) {
                this.startY = event.touches[0].clientY; // 手指按下的位置, 用于下面move事件计算手指移动的距离
                this.startScrollTop = this.getScrollTop(this.scrollEventTarget); // 起始scroll dom的 scrollTop(滚动的距离)
                //下面重置状态变量
                this.bottomReached = false;
                if (this.topStatus !== 'loading') {
                    this.topStatus = 'pull';
                    this.topDropped = false;
                }
                if (this.bottomStatus !== 'loading') {
                    this.bottomStatus = 'pull';
                    this.bottomDropped = false;
                }
            },
            handleTouchMove(event) {
                //确保当前touch节点的y的位置,在当前loadmore组件的内部
                if (this.startY < this.$el.getBoundingClientRect().top && this.startY > this.$el.getBoundingClientRect().bottom) {
                    return;
                }
                this.currentY = event.touches[0].clientY;
                let distance = (this.currentY - this.startY) / this.distanceIndex;
                this.direction = distance > 0 ? 'down' : 'up';
                // 下拉刷新,条件(1.外部传入了刷新的回调函数 2.滑动方向是向下的 3.当前滚动节点的scrollTop为0 4.当前topStatus不是loading)
                if (typeof this.topMethod === 'function' && this.direction === 'down' &&
                    this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading' && !this.topAllLoaded) {
                    // event.preventDefault();
                    event.stopPropagation();
                    //计算translate(将要平移的距离), 如果当前移动的距离大于设置的最大距离,那么此次这次移动就不起作用了
                    if (this.maxDistance > 0) {
                        this.translate = distance <= this.maxDistance ? distance - this.startScrollTop : this.translate;
                    } else {
                        this.translate = distance - this.startScrollTop;
                    }
                    if (this.translate < 0) {
                        this.translate = 0;
                    }
                    this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull'; // drop: 到达指定的阈值,可以执行刷新操作了
                }
    
                // 上拉操作, 判断当前scroll dom是否滚动到了底部
                if (this.direction === 'up') {
                    this.bottomReached = this.bottomReached || this.checkBottomReached();
                }
                if (typeof this.bottomMethod === 'function' && this.direction === 'up' &&
                    this.bottomReached && this.bottomStatus !== 'loading' && !this.bottomAllLoaded) {
                    // event.preventDefault();
                    event.stopPropagation();
                    // 判断的逻辑思路同上
                    if (this.maxDistance > 0) {
                        this.translate = Math.abs(distance) <= this.maxDistance ?
                            this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance : this.translate;
                    } else {
                        this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
                    }
                    if (this.translate > 0) {
                        this.translate = 0;
                    }
                    this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
                }
                this.$emit('translate-change', this.translate);
            },
            checkBottomReached() {
                if (this.scrollEventTarget === window) {
                    return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
                } else {
                    return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
                }
            },
            handleTouchEnd() {
                if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
                    this.topDropped = true; // 为当前组件添加 is-dropped class(也就是添加动画处理)
                    if (this.topStatus === 'drop') { // 到达了loading的状态
                        this.translate = this.stopTranslate; // top slot的高度
                        this.topStatus = 'loading';
                        this.topMethod(); // 执行回调函数
                    } else { // 没有到达,回调原点
                        this.translate = '0';
                        this.topStatus = 'pull';
                    }
                }
                // 处理逻辑同上
                if (this.direction === 'up' && this.bottomReached && this.translate < 0) {
                    this.bottomDropped = true;
                    this.bottomReached = false;
                    if (this.bottomStatus === 'drop') {
                        this.translate = -this.stopTranslate;
                        this.bottomStatus = 'loading';
                        this.bottomMethod();
                    } else {
                        this.translate = '0';
                        this.bottomStatus = 'pull';
                    }
                }
                this.$emit('translate-change', this.translate);
                this.direction = '';
            }
        }
    
    
    
    
    
    }
</script>

<style lang="scss" scoped>

@-webkit-keyframes ball-beat {
  50% {
    opacity: 0.2;
    -webkit-transform: scale(0.75);
            transform: scale(0.75); }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); } }

@keyframes ball-beat {
  50% {
    opacity: 0.2;
    -webkit-transform: scale(0.75);
            transform: scale(0.75); }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
            transform: scale(1); } }

.ball-beat > div {
  background-color: $primary-color;
  width: 0.266666rem;
  height: 0.266666rem;
  border-radius: 100%;
  margin: 0.02666rem;
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  display: inline-block;
  -webkit-animation: ball-beat 0.7s 0s infinite linear;
          animation: ball-beat 0.7s 0s infinite linear; }
  .ball-beat > div:nth-child(2n-1) {
    -webkit-animation-delay: 0.35s !important;
            animation-delay: 0.35s !important; 
}
   
    .mint-spinner-fading-circle {
        position: relative
    }
    
    .mint-spinner-fading-circle-circle {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: absolute
    }
    
    .mint-spinner-fading-circle-circle::before {
        content: " ";
        display: block;
        margin: 0 auto;
        width: 15%;
        height: 15%;
        border-radius: 100%;
        -webkit-animation: mint-fading-circle 1.2s infinite ease-in-out both;
        animation: mint-fading-circle 1.2s infinite ease-in-out both
    }
    
    .mint-spinner-fading-circle-circle.is-circle2 {
        -webkit-transform: rotate(30deg);
        transform: rotate(30deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle2::before {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s
    }
    
    .mint-spinner-fading-circle-circle.is-circle3 {
        -webkit-transform: rotate(60deg);
        transform: rotate(60deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle3::before {
        -webkit-animation-delay: -1s;
        animation-delay: -1s
    }
    
    .mint-spinner-fading-circle-circle.is-circle4 {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle4::before {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s
    }
    
    .mint-spinner-fading-circle-circle.is-circle5 {
        -webkit-transform: rotate(120deg);
        transform: rotate(120deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle5::before {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s
    }
    
    .mint-spinner-fading-circle-circle.is-circle6 {
        -webkit-transform: rotate(150deg);
        transform: rotate(150deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle6::before {
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s
    }
    
    .mint-spinner-fading-circle-circle.is-circle7 {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle7::before {
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s
    }
    
    .mint-spinner-fading-circle-circle.is-circle8 {
        -webkit-transform: rotate(210deg);
        transform: rotate(210deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle8::before {
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s
    }
    
    .mint-spinner-fading-circle-circle.is-circle9 {
        -webkit-transform: rotate(240deg);
        transform: rotate(240deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle9::before {
        -webkit-animation-delay: -0.4s;
        animation-delay: -0.4s
    }
    
    .mint-spinner-fading-circle-circle.is-circle10 {
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle10::before {
        -webkit-animation-delay: -0.3s;
        animation-delay: -0.3s
    }
    
    .mint-spinner-fading-circle-circle.is-circle11 {
        -webkit-transform: rotate(300deg);
        transform: rotate(300deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle11::before {
        -webkit-animation-delay: -0.2s;
        animation-delay: -0.2s
    }
    
    .mint-spinner-fading-circle-circle.is-circle12 {
        -webkit-transform: rotate(330deg);
        transform: rotate(330deg)
    }
    
    .mint-spinner-fading-circle-circle.is-circle12::before {
        -webkit-animation-delay: -0.1s;
        animation-delay: -0.1s
    }
    
    @-webkit-keyframes mint-fading-circle {
        0%,
        39%,
        100% {
            opacity: 0
        }
        40% {
            opacity: 1
        }
    }
    
    @keyframes mint-fading-circle {
        0%,
        39%,
        100% {
            opacity: 0
        }
        40% {
            opacity: 1
        }
    }
    
    .mint-loadmore {
        overflow: hidden
    }
    
    .mint-loadmore-content.is-dropped {
        -webkit-transition: .2s;
        transition: .2s
    }
    
    .mint-loadmore-top,
    .mint-loadmore-bottom {
        text-align: center;
        height: 50px;
        line-height: 50px
    }
    
    .mint-loadmore-top {
        margin-top: -1.6rem /* 120/75 */;
        height: 1.6rem /* 120/75 */;
        line-height: 1.6rem /* 120/75 */;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            display: inline-block;
            vertical-align: middle;
            &.is-rotate {
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg)
            }
        }
        /deep/.mint-spinner-fading-circle{
            display: block;
        }
    }
    
    .mint-loadmore-bottom {
        margin-bottom: -1.6rem /* 120/75 */;
        height: 1.6rem /* 120/75 */;
        line-height: 1.6rem /* 120/75 */;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .mint-loadmore-spinner {
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle
    }
    
    .mint-loadmore-text {
        vertical-align: middle;
        font-size: .32rem/* 24/75 */;
        color: $primary-color;
    }


.mint-loadmore-bottom{
    margin-bottom: -1.6rem /* 120/75 */;
    height: 1.6rem /* 120/75 */;
    line-height: 1.6rem /* 120/75 */;
        span {
        display: inline-block;
        -webkit-transition: .2s linear;
        transition: .2s linear;
        vertical-align: middle;
        &.is-rotate {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg)
        }
    }
    /deep/.mint-spinner-fading-circle{
        display: block;
    }
}
</style>



