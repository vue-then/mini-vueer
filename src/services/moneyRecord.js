import axios from './axios';
import api from './api';

//资金记录类型获取
function getTransactionType(){
    return axios.post(api.TRANSACTION_TYPE).then(res => {
        return res.data
    })
}
//资金记录 数据列表
function getTransactionList(data){
    return axios.post(api.TRANSACTION,data).then(res => {
        return res.data
    })
}
//getActivityTypeList
function getActtype(){
    return axios.post(api.ACTIVITYTYPE).then(res => {
        return res.data
    })
}
function getActivity(data){
    return axios.post(api.ACTIVITYLIST,data).then(res => {
        return res.data
    })
}
function receiveActivity(data){
    return axios.post(api.ACTIVITYRECEIVE,data).then(res => {
        return res.data
    })
}
function getActivityInfo(data){
    return axios.post(api.ACTIVITYINFO,data).then(res => {
        return res.data
    })
}
//额度转换记录 CONVERSIONS
function getConversions(data){
    return axios.post(api.CONVERSIONS,data).then(res => {
        return res.data
    })
}
//取款记录 WITHDRAWLIST
function getWithdrawList(data){
    return axios.post(api.WITHDRAWLIST,data).then(res => {
        return res.data
    })
}
//存款记录 DEPOSITS
function getDeposits(data){
    return axios.post(api.DEPOSITS,data).then(res => {
        return res.data
    })
}
//大转盘 TURNTABLE TURNTABLEINFO TURNTABLERECEIVE TURNTABLELUCKDRAW
function geTurntable(){
    return axios.post(api.TURNTABLE).then(res => {
        return res.data
    })
}
function geTurntableinfo(data){
    return axios.post(api.TURNTABLEINFO,data).then(res => {
        return res.data
    })
}
function geTurntableReceive(data){
    return axios.post(api.TURNTABLERECEIVE,data).then(res => {
        return res.data
    })
}
function geTurntableLuckdraw(data){
    return axios.post(api.TURNTABLELUCKDRAW,data).then(res => {
        return res.data
    })
}
//大转盘历史记录 TURNTABLEHISTORY
function geTurntableHistory(data){
    return axios.post(api.TURNTABLEHISTORY,data).then(res => {
        return res.data
    })
}

export {
    getTransactionType,
    getTransactionList,
    getActtype,
    getActivity,
    receiveActivity,
    getActivityInfo,
    geTurntable,
    geTurntableinfo,
    geTurntableReceive,
    geTurntableLuckdraw,
    geTurntableHistory,
    getConversions,
    getWithdrawList,
    getDeposits
}