import axios from "./axios";
import api from "./api";

function getMyFocusList(data) {
    return axios.post(api.FOCUSLIST, data).then(res => {
			return res.data;
		});
}//关注列表


function getFocusInfo(data) {
    return axios.post(api.FOCUSINFO, data).then(res => {
			return res.data;
		});
}//会员详情

function getManagerInfo(data) {
    return axios.post(api.FOCUSMANAGER, data).then(res => {
			return res.data;
		});
}//管理员详情

function addFocus(data) {
    return axios.post(api.ADDFOCUS, data).then(res => {
			return res.data;
		});
}//添加关注

function delFocus(data) {
    return axios.post(api.DELFOCUS, data).then(res => {
			return res.data;
		});
}//取消关注


export {
    getMyFocusList,
    getFocusInfo,
    getManagerInfo,
    addFocus,
    delFocus,
}