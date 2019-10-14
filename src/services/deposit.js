import axios from './axios';
import api from './api';


// 额度转换
function getNoAutoTransferInfo() {
    return axios.post(api.TRANSFER_GET_NO_AUTO_TRANSFER_INFO).then(res => {
        return res.data
    })
}

//一键回归
function recoveryById() {
    return axios.post(api.TRANSFER_RECOVERY_BY_ID).then(res => {
        return res.data
    })
}

//单个刷新
function refreshApi(data) {
    return axios.post(api.TRANSFER_REFRESH_API,data).then(res => {
        return res.data
    })
}

//提交额度转换
function transfersMoney(data) {
    return axios.post(api.TRANSFER_MONEY,data).then(res => {
        return res.data
    })
}

//多钱包和免转钱包模式切换
function postTransferModeChange(data){
    return axios.post(api.TRANSFER_MODE_CHANGE,data).then(res => {
        return res.data
    })
}



//存款-获取线上入款和公司入款存款方式
function getOnlineCompanyList(){
    return axios.post(api.PURSE_ONLINE_COMPANY_LIST).then(res => {
        return res.data
    })
}

//线上入款-获取入款信息
function getOnlineInfo(data) {
    return axios.post(api.PURSE_ONLINE_INFO,data).then(res => {
        return res.data
    })
}

//线上入款-提交
function postOnline(data) {
    return axios.post(api.PURSE_ONLINE_ADD,data).then(res => {
        return res.data
    })
}

//线上入款-跳转第三方
function goThreeWay(data) {
    return axios.post(api.PURSE_ONLINE_THREE,data).then(res => {
        return res.data
    })
}

//获取线上入款-银行卡下拉列表
function getBankSelect(data) {
    return axios.post(api.PURSE_ONLINE_BANK,data).then(res => {
        return res.data
    })
}








//公司入款-获取入款信息
function getCompanyInfo(data){
    return axios.post(api.PURSE_COMPANY_INFO,data).then(res => {
        return res.data
    })
}

//公司入款-提交
function postCompany(data){
    return axios.post(api.PURSE_COMPANY_ADD, data).then(res => {
        return res.data
    })
}

//公司入款/线上入款-获取订单详情
function getOrderInfo(data) {
    return axios.post(api.PURSE_ORDER_INFO,data).then(res => {
        return res.data
    })
}


//取款-取款页面详情
function getWithdrawInfo() {
    return axios.post(api.PURSE_WITHDRAW_INFO).then(res => {
        return res.data
    })
}

//取款-提交
function postWithdraw(data) {
    return axios.post(api.PURSE_WITHDRAW_OUT,data).then(res => {
        return res.data
    })
}


//取款-继续取款
function postWithdrawContinue(data) {
    return axios.post(api.PURSE_WITHDRAW_CONTINUE,data).then(res => {
        return res.data
    })
}

//及时稽核查询
function getAuditInfo() {
    return axios.post(api.PURSE_AUDIT).then(res => {
        return res.data
    })
}

//获取设置的快捷转入
function getFastSettingInfo() {
    return axios.post(api.PURSE_CONVERSION_SET_FAST_INFO).then(res => {
        return res.data
    })
}
//额度转换-设置快捷转入设置信息
function postFastSetting(data) {
    return axios.post(api.PURSE_CONVERSION_SET_FAST,data).then(res => {
        return res.data
    })
}



export default {
    getNoAutoTransferInfo,
    recoveryById,//一键回归
    refreshApi,//单个刷新
    transfersMoney,//提交额度转换
    postTransferModeChange,//多钱包和免转钱包模式切换

    getOnlineCompanyList,
    getOnlineInfo,
    postOnline,
    goThreeWay,
    getBankSelect,

    getCompanyInfo,
    postCompany,
    getOrderInfo,

    getWithdrawInfo,
    postWithdraw,
    postWithdrawContinue,

    getAuditInfo,
    getFastSettingInfo,
    postFastSetting,

}