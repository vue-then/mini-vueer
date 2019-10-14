<template>
    <div class="msg-box questionnaire">
        <div>
            <div class="skeleton vue-skeleton-loading" v-show="isLoading">
                <div class="skeleton-bac-animation"></div>
                <div class="skeleton-bac-content">
                    <column padding="0.2rem  0 0.2rem 0 ">
                        <skeleton-square width="9.4667rem" style="height:2.9777rem" margin="0 0  0.2667rem 0"></skeleton-square>
                        <skeleton-square width="9.4667rem" style="height:2.9777rem" margin="0 0  0.2667rem 0"></skeleton-square>
                        <skeleton-square width="9.4667rem" style="height:2.9777rem" margin="0 0  0.2667rem 0"></skeleton-square>
                    </column>
                </div>
            </div>
            <ul v-show="!isLoading && list.length > 0">
                <li @click="toInfo(item)" v-for="(item, i) in list" :key="i" class="mint-cell-value swipeout-list-item">
                    <div class="swipeout-content">
                        <div class="box-parent">
                            <div class="box-title-qs">
                                <div :class="{'stop-status-style':item.stopStatus == 1}">{{ item.title }}</div>
                                <i class="iconfont icon-yitianxie pk-qs-status icon-yiguoqi" v-if="item.stopStatus == 1"></i>
                            </div>
                            <div class="box-cent-time">
                                {{item.createTime | filterDate}} ~ {{item.stopTime | filterDate}}
                                <div class="type-style-wt" v-if="item.status == 1">未填写</div>
                                <div class="type-style-yt" v-if="item.status == 2">已填写</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <no-data v-show="list.length <= 0 && !isLoading"></no-data>
        </div>
    </div>
</template>

<script>
    import noData from "@/components/NoData.vue"
    import {
        getQuestionnaireList
    } from "@/services/msgCenter.js";
    export default {
        components: {
            noData
        },
        data() {
            return {
                isLoading: true,
                list: []
            };
        },
        mounted() {
            getQuestionnaireList({
                page: 1,
                pageSize: 100
            }).then(res => {
                this.isLoading = false;
                if (res.success) {
                    this.list = res.data.investigationFrontMessage;
                    console.log(this.list, "this.list");
                } else {
                    this.$toast.fail(res.message, {
                        cover: true,
                        duration: 1000
                    });
                }
            });
        },
        methods: {
            toInfo(item) {
                this.$router.push({
                    name: "questionnaireList",
                    query: {
                        id: item.status == 2 ? item.pid : item.id,
                        showAnswer: item.status == 2,
                        platform: item.platform
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/styles/pk-pwd.scss";
    @import "./questionnaire.scss";
</style>