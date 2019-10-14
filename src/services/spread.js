
import axios from './axios';
import api from './api';

//获取推广链接列表
function getSpreadList() {
    return axios.post(api.SPREAD_LIST).then(res => {
        return res.data
    })
}

//获取添加链接需要的彩种数据
function getAddSpreadData() {
    return axios.post(api.SPREAD_GAME_TYPE).then(res => {
        return res.data
    })
}

//生成链接
function setSpreadAdd(data) {  
    return axios.post(api.SPREAD_ADD,data).then(res => {
        return res.data
    })
}

//删除链接
function deleteSpread(data) {
    return axios.post(api.SPREAD_DELETE,data).then(res => {
        return res.data
    })
}

//获取会员管理列表
function getMemberList(data) {
    return axios.post(api.SPREAD_MEMBER,data).then(res => {
        return res.data
    })
}

//获取推广统计列表
function getGeneralizeStatisList(data) {
    return axios.post(api.SPREAD_STATIS_LIST,data).then(res => {
        return res.data
    })
}

//获取下级报表列表
function getSubOrdinateReportList(data) {  
    return axios.post(api.SPREAD_SUBORDINATE_LIST,data).then(res => {
        return res.data
    })
}

//转出到钱包
function transferToBag(data) {
    return axios.post(api.SPREAD_TRANSFER_TO_BAG,data).then(res => {
        return res.data
    })
}


export default {
    getSpreadList,
    getAddSpreadData,
    setSpreadAdd,
    deleteSpread,
    getMemberList,
    getGeneralizeStatisList,
    getSubOrdinateReportList,
    transferToBag

}