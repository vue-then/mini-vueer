import axios from "./axios";
import api from "./api";
//电子游戏分类
function getGameTag() {
    return axios.post(api.GET_GAMETAG).then(res => {
        return res.data;
    });
}
//投注记录大分类
function getSiteGames() {
    return axios.post(api.SITE_GAMES).then(res => {
        return res.data;
    });
}
//投注记录三级筛选
function betRecordCondition(data) {
    return axios.post(api.BETRECORD_CONDITION, data).then(res => {
        return res.data;
    });
}
//彩票种类获取
function betRecordThird(data) {
    return axios.post(api.BETRECORD_THIRD, data).then(res => {
        return res.data;
    });
}
//投注记录列表获取
function getBetList(data) {
    return axios.post(api.GET_BETTING, data).then(res => {
        return res.data;
    });
}

//我的报表-列表
function getBetRecordReport(data) {
    return axios.post(api.BET_RECORD_REPORT, data).then(res => {
        return res.data;
    });
}


export {
    getGameTag,
    getSiteGames,
    betRecordCondition,
    betRecordThird,
    getBetList,
    getBetRecordReport
};