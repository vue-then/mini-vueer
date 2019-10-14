import axios from './axios';
import api from './api';

function getGameNotice(data) {
    return axios.post(api.GET_GAME_NOTICE, data).then(res => {
        return res.data
    })
}

function getGameType(data) {
    return axios.post(api.GET_GAME_TYPE, data).then(res => {
        return res.data
    })
}

function getGameNoticeDetail(data) {
    return axios.post(api.GET_GAMENOTICE_DETAIL, data).then(res => {
        return res.data;
    });
}

function getSysNotice(data) {
    return axios.post(api.GET_SYS_NOTICE, data).then(res => {
        return res.data;
    });
}

function getSysNoticeDetail(data) {
    return axios.post(api.GET_SYS_NOTICE_DETAIL, data).then(res => {
        return res.data;
    });
}

function getQuestionnaireList(data) {
    return axios.post(api.INCESTIGATION_MESSAGE_LIST, data).then(res => {
        return res.data;
    });
}

function getQSInfo(data) {
    return axios.post(api.INCESTIGATION_MESSAGE_INFO, data).then(res => {
        return res.data;
    });
}

function subQSInfo(data) {
    return axios.post(api.INCESTIGATION_MESSAGE_SEND, data).then(res => {
        return res.data;
    });
}

function getQSAnswerInfo(data) {
    return axios.post(api.INCESTIGATION_MESSAGE_ANSWER_INFO, data).then(res => {
        return res.data;
    });
}
//---------收件箱------------
function getBoxnum(){
    return axios.post(api.INBOX_NUM).then(res => {
        return res.data;
    });
}
//----系统消息-----
function getInboxList(data){
    return axios.post(api.INBOX_SYS_LIST, data).then(res => {
        return res.data;
    });
}
function getInboxInfo(data){
    return axios.post(api.INBOX_SYS_INFO, data).then(res => {
        return res.data;
    });
}
function getInboxStatus(data){
    return axios.post(api.INBOX_SYS_STATUS, data).then(res => {
        return res.data;
    });
}
function getInboxDel(data){
    return axios.post(api.INBOX_SYS_DEL, data).then(res => {
        return res.data;
    });
}
//----我的消息-----
function getInboxMyList(data){
    return axios.post(api.INBOX_MY_LIST, data).then(res => {
        return res.data;
    });
}
function getInboxMyInfo(data){
    return axios.post(api.INBOX_MY_INFO, data).then(res => {
        return res.data;
    });
}
function getInboxMyStatus(data){
    return axios.post(api.INBOX_MY_STATUS, data).then(res => {
        return res.data;
    });
}
function getInboxMyDel(data){
    return axios.post(api.INBOX_MY_DEL, data).then(res => {
        return res.data;
    });
}

export {
    getGameNotice,
    getGameType,
    getGameNoticeDetail,
    getSysNotice,
    getSysNoticeDetail,
    getQuestionnaireList,
    getQSInfo,
    subQSInfo,
    getQSAnswerInfo,
    getInboxList,
    getInboxInfo,
    getInboxStatus,
    getInboxDel,
    getInboxMyList,
    getInboxMyInfo,
    getInboxMyStatus,
    getInboxMyDel,
    getBoxnum
};