/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-01 15:17:00
 * @LastEditTime: 2019-10-05 14:36:02
 * @LastEditors: Please set LastEditors
 */
import axios from "@/services/axios";
import api from "@/services/api";


/**
 * @description:  获取推荐群聊
 * @return: 
 */
function getRecommendChat() {
    return axios.post(api.CHAT_RECOMMEND).then(res => {
        return res.data;
    });
}
/**
 * @description: 获取搜索群聊信息
 * @param {type} 
 * @return: 
 */
function searchChat(data) {
    return axios.post(api.CHAT_SEARCH, data).then(res => {
        return res.data;
    });
}
/**
 * @description: 获取群详情
 * @param {data} 
 * @return: 
 */

function getChatInfo(data) {
    return axios.post(api.CHAT_INFO, data).then(res => {
        return res.data;
    });
}

function getApplication(data) {
    return axios.post(api.CHAT_APPLICATION, data).then(res => {
        return res.data;
    });
}

function getChatList() {
    return axios.post(api.CHAT_LIST).then(res => {
        return res.data;
    });

}

function getPopularGames() {
    return axios.post(api.CHAT_POPULAR_GAMES).then(res => {
        return res.data;
    });

}

function getPlayRecent() {
    return axios.post(api.PLAY_RECENT).then(res => {
        return res.data;
    });
}

function getAdminInfo(data) {
    return axios.post(api.GET_ADMIN_INFO, data).then(res => {
        return res.data;
    });
}

function getMemberInfo(data) {
    return axios.post(api.GET_MEMBER_INFO, data).then(res => {
        return res.data;
    });
}

function attentionAdd(data) {
    return axios.post(api.ATTENTION_ADD, data).then(res => {
        return res.data;
    });
}

function getGroupChatList(data) {
    return axios.post(api.CHAT_GROUP_LIST, data).then(res => {
        return res.data;
    });
}

function getMemberList(data) {
    return axios.post(api.CHAT_MEMBER_INFO, data).then(res => {
        return res.data;
    });
}


//消息相关

// 通知-消息列表
function getImNotificationMessageList() {
    return axios.post(api.IM_NOTIFICATION_MESSAGE_LIST, {}).then(res => {
        return res.data;
    });
}

// 获取离线消息数列
function getImMemberMsgCount() {
    return axios.post(api.IM_MEMBER_MSG_COUNT).then(res => {
        return res.data;
    });
}

// 获取消息列表
function getImMemberHisMsg(data) {
    return axios.post(api.IM_MEMBER_HIS_MSG, data).then(res => {
        return res.data;
    });
}

// 获取聊天历史记录列表
function getImMemberHisMsgList(data) {
    return axios.post(api.IM_MEMBER_HIS_MSG_LIST, data).then(res => {
        return res.data;
    });
}

// 发送消息
function postSendMessage(data) {
    return axios.post(api.IM_GROUP_SEND_MESSAGE, data).then(res => {
        return res.data;
    });
}

// 获取红包详情信息
function getRedbagDetails(data) {
    return axios.post(api.GET_REDBAG_DETAILS, data).then(res => {
        return res.data;
    });
}

// 领取红包
function getRedbag(data) {
    return axios.post(api.GET_RECEIVE_REDBAG, data).then(res => {
        return res.data;
    });
}

// 领取红包的详情
function getRedbagList(data) {
    return axios.post(api.GET_REGBAG_HAVERECEIVE_DETAILS, data).then(res => {
        return res.data;
    });
}

function uploadFile(data) {
    return axios.form(api.UPLOAD_FILE, data).then(res => {
        return res.data;
    });
}

//进入-聊天室
function userIn(data) {
    return axios.post(api.CHAT_USER_IN, data).then(res => {
        return res.data;
    });
}

//退出-聊天室
function userOut(data) {
    return axios.post(api.CHAT_USER_OUT_ROOM, data).then(res => {
        return res.data;
    });
}





//退出群聊
function outGroup(data) {
    return axios.post(api.CHAT_OUT, data).then(res => {
        return res.data;
    });
}

//获取投注计划
function getPlanned(data) {
    return axios.post(api.GETPLANNED_INFO, data).then(res => {
        return res.data;
    });
}

export {
    getRecommendChat,
    searchChat,
    getChatInfo,
    getApplication,
    getChatList,
    getPlayRecent,
    getAdminInfo,
    getMemberInfo,
    attentionAdd,
    getPopularGames,
    getGroupChatList,
    getImNotificationMessageList,
    getImMemberMsgCount,
    getImMemberHisMsg,
    getImMemberHisMsgList,
    postSendMessage,
    getRedbagDetails,
    getRedbag,
    getRedbagList,
    outGroup,
    getMemberList,
    userIn,
    userOut,
    uploadFile,
    getPlanned,
};