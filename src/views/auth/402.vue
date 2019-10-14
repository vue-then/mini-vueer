<template>
    <div class="maintain">
        <div class="pic">
            <img src="../../assets/img/image_weihu.png" alt="">
        </div>
        <h1>网站维护中</h1>
        <p v-html="msg"></p>
        <!-- <div class="service">如有疑问，请<router-link tag="span" :to="{name:'contactus'}">联系我们</router-link></div> -->
    </div>
</template>

<script>
    import {
        getImgUrl
    } from "../../services/index.js";
    
    export default {
        name: "maintainweb",
        data() {
            return {
                msg: ""
            }
        },
        mounted() {
            getImgUrl().then((res) => {
                if (res.success) {
                    this.$router.push('/');
                } else {
                     this.msg = res.message;
                }
            }).catch((res) => {
                this.msg = "";
            })
        }
    }
</script>


<style lang="scss" scoped>
    .maintain {
        position: fixed;
        left: 50%;
        top: 50%;
        text-align: center;
        -webkit-transform: translate(-50%, -60%);
        transform: translate(-50%, -60%);
        .pic {
            margin: 0 auto;
            width: 4.267rem;
            img {
                width: 100%;
            }
        }
        h1 {
            margin: 0.5333rem 0;
            font-weight: normal;
            font-size: 0.48rem;
            color: $primary-color;
        }
        p {
            margin-top: 0.5333rem;
            line-height: 0.45rem;
            font-size: 0.32rem;
            color: $color-C;
        }
         .service {
            margin-top: 0.267rem;
            font-size: 0.32rem;
            color: $color-C;
            span {
                color: $primary-color;
            }
        }
    }
</style>