<template>
    <div id="passwordmge" class="questionnaire">
        <!-- <nut-navbar class="pk-title" :rightShow="false" @on-click-back="closeModal">
            <a class="spans" slot="back-icon">
                <img class="imgsbank" src="../../../../assets/img/my-icon/fanhui.png">
            </a>
            问卷调查
        </nut-navbar> -->
        <Header title="问卷调查"></Header>
        <div class="questionnaire-info" v-show="questionView.title">
            <div class="questionnaire-header">
                <div class="questionnaire-header-cent">
                    <img src="../../../../assets/img/image-wjdc-txt.png" alt>
                    <div class="view-header-text">{{questionView.title}}</div>
                </div>
            </div>
            <div class="questionnaire-remark">{{questionView.remark}}</div>
            <div class="view-content">
                <div class="view-content-width">
                    <ul class="view-content-width-ul">
                        <li class="pk-disabled-mask" v-if="showType == 2"></li>
                        <li v-for="(question,index) in questionView.questionViewList " class="question-item" :key="index">
                            <label class="question-index" :class="{'must':question.must == 1}"></label>
                            <div class="question-info">
                                <div class="question-title">
                                    {{index + 1}}、{{question.title}}
                                    <span v-if="question.type == 1">（单选）</span>
                                    <span v-if="question.type == 2">（多选）</span>
                                    <span v-if="question.type == 3">（请输入内容）</span>
                                    <span v-if="question.type == 4">（请点击星星操作）</span>
                                </div>
                                <div class="question-answer">
                                    <ul v-show="question.type == 1">
                                        <li v-for="(answer,idx) in question.answer" class="smart-form ansswer-item" :key="idx">
                                            <label>
                                                        <input
                                                            type="radio"
                                                            class="radio"
                                                            :name="index+'ansswer'"
                                                            @click="changeRadio(question,index,answer.id)"
                                                            :value="answer.id"
                                                            v-model="question.userAnswer">
                                                        <div class="question-answer-text">{{answer.title}}</div>
                                                        </label>
                                        </li>
                                        <li class="smart-form ansswer-item" v-show="question.other == 1 && showType == 1">
                                            <label>
                                                        <input
                                                            type="radio"
                                                            class="radio"
                                                            :name="index+'ansswer'"
                                                            @click="changeRadio(question,question.answer.length,index)"
                                                            :value="question.answer.length"
                                                            v-model="question.userAnswer"
                                                        >
                                                        <div class="question-answer-text">其他</div>
                                                    </label>
                                        </li>
                                        <li class="smart-form ansswer-item" v-show="question.userAnswerOther == 1 && showType == 2">
                                            <label>
                                                        <input type="radio" class="radio" checked>
                                                        <div class="question-answer-text">其他</div>
                                                    </label>
                                        </li>
                                        <div class="question-other-answer" v-show="question.userAnswer == question.answer.length && showType == 1">
                                            <textarea class="form-control inp_2" placeholder="请输入答案" v-model="question.userAnswerStr" @blur="setOtherAnswer(question,index,$event)"></textarea>
                                        </div>
                                        <div class="question-other-answer" v-show="question.userAnswerOther == 1 && showType == 2">
                                            <textarea class="form-control inp_2" placeholder="请输入答案" v-model="question.userAnswerStr" @blur="setOtherAnswer(question,index,$event)"></textarea>
                                        </div>
                                    </ul>
                                    <ul v-show="question.type == 2 && showType == 1">
                                        <li v-for="(answer,idx) in question.answer" class="smart-form ansswer-item" :key="idx">
                                            <label>
                                                    <input
                                                        type="checkbox"
                                                        class="checkbox"
                                                        @click="selectCheckbox(question,answer.id,index)"
                                                    >
                                                    <div class="question-answer-text">{{answer.title}}</div>
                                                    </label>
                                        </li>
                                        <li class="smart-form ansswer-item" v-show="question.other == 1">
                                            <label>
                                                    <input
                                                    type="checkbox"
                                                    class="checkbox iconfont"
                                                    true-value="1"
                                                    @click="changeBox(question,index)"
                                                    >
                                                    <div class="question-answer-text">其他</div>
                                                </label>
                                        </li>
                                        <div class="question-other-answer" v-show="question.userAnswerOther == 1">
                                            <textarea class="form-control inp_2" placeholder="请输入答案" v-model="question.userAnswerStr" @blur="setOtherAnswer(question,index,$event)"></textarea>
                                        </div>
                                    </ul>
                                    <ul v-if="question.type == 2 && showType == 2">
                                        <li v-for="(answer,idx) in question.answer" class="smart-form ansswer-item" :key="idx">
                                            <label>
                                                        <input
                                                            type="checkbox"
                                                            class="checkbox"
                                                            :checked="checkedSelect(answer.id,question)"
                                                        >
                                                        <i class="colorfff"></i>
                                                        <div class="question-answer-text">{{answer.title}}</div>
                                                        </label>
                                        </li>
                                        <li class="smart-form ansswer-item" v-show="question.other == 1 ">
                                            <label>
                                                    <input type="checkbox" class="checkbox" :checked="question.userAnswerOther == 1">
                                                    <i class="colorfff"></i>
                                                    <div class="question-answer-text">其他</div>
                                                    </label>
                                        </li>
                                        <div class="question-other-answer" v-show="question.userAnswerOther == 1">
                                            <textarea class="form-control inp_2" placeholder="请输入答案" v-model="question.userAnswerStr"></textarea>
                                        </div>
                                    </ul>
                                    <ul v-show="question.type == 3 ">
                                        <li>
                                            <div class="question-other-answer">
                                                <textarea class="form-control inp_2" placeholder="请输入答案" @blur="setAnswerStr(question,index,$event)" v-model="question.userAnswer"></textarea>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul v-show="question.type == 4 ">
                                        <li class="pk-star-parent">
                                            <star-rating :star-size="starSize" @rating-selected="setRating($event, question,index)" :increment="question.starType  == 1?1:0.5" :rating="question.userAnswer *1"></star-rating>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
    
                <div class="question-sub" @click="openWarning" v-if="showType == 1">
                    <button>确认提交</button>
                </div>
                <div class="question-sub" @click="closeModal" v-if="showType == 2">
                    <button>关闭</button>
                </div>
            </div>
    
        </div>
        <div class="questionnaire-footer">
            <img src="../../../../assets/img/image-wjdc-bottom.png" alt>
        </div>
    </div>
</template>


<script>
    import StarRating from "vue-star-rating";
    import Header from "@/components/Header";
    import {
        getQSInfo,
        subQSInfo,
        getQSAnswerInfo
    } from "@/services/msgCenter";
    
    export default {
        components: {
            StarRating,
            Header
        },
        data() {
            return {
                id: "",
                platform: 0,
                questionView: {},
                showType: 1,
                qsErr: "",
                showErr: 0,
                showAnswer: false,
                starSize: 25
            };
        },
        computed: {},
        watch: {},
        mounted() {
            this.showAnswer = this.$route.query.showAnswer;
            this.id = this.$route.query.id * 1;
            this.platform = this.$route.query.platform * 1;
            if (this.showAnswer) {
                this.getAnswerInfo();
                this.showType = 2;
            } else {
                this.getInfo();
                this.showType = 1;
            }
        },
        methods: {
            getAnswerInfo() {
                var _this = this;
                let data = {
                    id: this.id,
                    platform: this.platform
                };
                getQSAnswerInfo(data).then(resq => {
                    let res = resq.data;
                    if (resq.success) {
                        var qsArr = JSON.parse(res.content);
                        _this.questionView = res;
                        _this.questionView.questionViewList = qsArr;
                        _this.questionView.questionViewList.map(function(v) {
                            v.userAnswer = v.type == 5 ? v.userAnswer / 2 : v.userAnswer;
                            v.starType = v.type == 5 ? 2 : 1;
                            v.type = v.type == 5 ? 4 : v.type;
                        });
                    } else {
                        this.$toast.fail(resq.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            getInfo() {
                var _this = this;
                console.log(1111);
                let data = {
                    id: this.id
                };
                getQSInfo(data).then(resq => {
                    let res = resq.data;
                    if (resq.success) {
                        var arr = [];
                        var qsArr = JSON.parse(res.content);
                        _this.questionView = res;
                        for (var i = 0; i < qsArr.length; i++) {
                            var qs = qsArr[i];
                            var data = {
                                titleId: qs.id,
                                title: qs.title, //标题
                                answerStr: qs.answer.join(","), //答案选项
                                answer: qs.answer, //答案选项数组
                                must: qs.must, //是否必填
                                other: qs.other, //是否存在其他选项（1存在，2不存在）
                                userAnswer: qs.type == 4 ? 0 : "", //用户的答案（单选/多选以逗号隔开，值对应的为答案选项里面的下标，填空为字符串，评分为分数）
                                userAnswerOther: 2, //用户是否选择 其他选项 1：选择 2：未选择
                                userAnswerStr: "", //用户选择其他选项后的输入
                                type: qs.type == 5 ? 4 : qs.type, //题型 1 单选 2 多选 3 填空 4 5星评分 5 10星评分
                                starType: qs.type == 5 ? 2 : 1 // 评分类型 1：5分 2：10分,
                            };
                            arr.push(data);
                        }
                        _this.questionView.questionViewList = arr;
                    } else {
                        this.$toast.fail(resq.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            changeRadio(question, index, answer) {
                question.userAnswer = answer;
                this.$set(this.questionView, index, question);
            },
            changeBox(question, index) {
                question.userAnswerOther = question.userAnswerOther == 1 ? 2 : 1;
                this.$set(this.questionView, index, question);
            },
            setOtherAnswer(question, index, event) {
                question.userAnswerStr = event.target.value;
                this.$set(this.questionView, index, question);
            },
            setAnswerStr(question, index, event) {
                question.userAnswer = event.target.value;
                this.$set(this.questionView, index, question);
            },
            selectCheckbox(question, index, idx) {
                console.log(question.userAnswer, index, idx);
                var index = index + "";
                var answerArr = question.userAnswer ? question.userAnswer.split(",") : [];
                if (answerArr.indexOf(index) > -1) {
                    for (var i = 0; i < answerArr.length; i++) {
                        if (answerArr[i] == index) {
                            answerArr.splice(i, 1);
                        }
                    }
                } else {
                    answerArr.push(index);
                }
                question.userAnswer = answerArr.join(",");
                this.$set(this.questionView, idx, question);
            },
            setRating(rating, question, idx) {
                console.log(rating, question);
                question.userAnswer = rating;
                this.$set(this.questionView, idx, question);
            },
            sub() {
                var _this = this;
                var noAnswer = [];
                for (var i = 0; i < this.questionView.questionViewList.length; i++) {
                    var v = this.questionView.questionViewList[i];
                    v.userAnswerOther = v.userAnswerOther + "";
                    v.userAnswer = v.userAnswer + "";
                    if (v.must == 1) {
                        if (v.userAnswerOther == 1) {
                            if ((v.type == 2 || v.type == 1) && !v.userAnswerStr) {
                                noAnswer.push(i + 1);
                            }
                        } else if (
                            v.type == 1 &&
                            v.userAnswer == v.answer.length &&
                            !v.userAnswerStr
                        ) {
                            noAnswer.push(i + 1);
                        } else if (v.type == 4 && v.userAnswer == 0) {
                            noAnswer.push(i + 1);
                        } else if (!v.userAnswer) {
                            noAnswer.push(i + 1);
                        }
                        if (v.type == 1 && v.userAnswer == v.answer.length) {
                            v.userAnswerOther = "1";
                        }
                    }
                }
                if (noAnswer.length > 0) {
                    this.qsErr = "请完整填写问卷必填项（第" + noAnswer.join(",") + "题)";
                    this.$dialog({
                        title: "提示",
                        content: this.qsErr,
                        noOkBtn: true,
                        cancelBtnTxt: "确定"
                    });
                    return;
                }
                this.questionView.content = this.questionView.questionViewList;
    
                var centData = [];
                this.questionView.questionViewList.map(function(v) {
                    let starAnswer = v.starType == 2 ? v.userAnswer * 2 : v.starType;
                    var qs = {
                        titleId: v.titleId,
                        type: v.type == 4 ? (v.starType == 1 ? 4 : 5) : v.type,
                        userAnswer: v.type == 1 && v.userAnswerOther == 1 ?
                            "" :
                            v.type == 4 && v.starType == 2 ? starAnswer + "" : v.userAnswer,
                        userAnswerOther: v.userAnswerOther * 1,
                        userAnswerStr: v.userAnswerStr
                    };
                    centData.push(qs);
                });
                var postData = {
                    platform: this.questionView.platform,
                    investigationId: this.questionView.pid,
                    answer: centData
                };
                subQSInfo(postData).then(res => {
                    if (res.success) {
                        this.$toast.success("问卷提交成功，感谢您的填写。", {
                            cover: true,
                            duration: 1500,
                            onClose() {
                                _this.$router.go(-1)
                            }
                        });
                    } else {
                        this.$toast.fail(res.message, {
                            cover: true,
                            duration: 1500
                        });
                    }
                });
            },
            checkedSelect(index, question) {
                if (question.userAnswer.indexOf(index) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            closeModal() {
                this.$router.push({
                    name: "questionnaireList",
                    query: {
                        active: 2
                    }
                });
            },
            openWarning(){
                let self = this;
                this.$dialog({
                    id:'open_warning',
                    lockBgScroll:true,
                    closeOnClickModal:false,
                    textAlign:'center',
                    title: "温馨提示",
                    content:"您确定提交问卷调查的结果吗，提交后不可修改?",
                    customClass:'pk-dialogs',
                    onOkBtn() {
                        self.sub()
                        this.close(); //关闭对话框
                    }
                });
                
                this.$("#open_warning .nut-dialog-btn").eq(1).css({
                    "border-top": "1px solid #F6F6F6",
                    "border-left": "1px solid #F6F6F6",
                    "color": "#17c492"
                })
                this.dotitle()
            },
            dotitle(){
                this.$(".pk-dialogs .nut-dialog-btn").removeClass("nut-dialog-ok")
                this.$(".pk-dialogs .nut-dialog-body").css({
                    "padding-top": ".26667rem",
                    "padding-bottom": ".26667rem"
                })
                this.$(".pk-dialogs .nut-dialog-content").css({
                    "padding-top": ".36555rem",
                    "color": "#1a1a1a"
                })
                this.$(".pk-dialogs .nut-dialog-ok").css({
                    "background": "#fff",
                    "color":"#17c492",
                    "border-top":"1px solid #F6F6F6",
                    "border-left":"1px solid #F6F6F6"
                })
            },
        }
    };
</script>

<style lang="scss" scoped>
    @import "./questionnaire.scss";
</style>

