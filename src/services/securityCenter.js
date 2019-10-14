import axios from "./axios";
import api from "./api";

//修改登陆密码
function modifyLoginPwd(data) {
	return axios.post(api.MODIFY_LOGINPWD, data).then(res => {
		return res.data;
	});
}
//修改取款密码
function modifyWithdrawlPwd(data) {
	return axios.post(api.UPD_WITHDRAWLPWD, data).then(res => {
		return res.data;
	});
}
//添加银行卡
function addBankCard(data) {
	return axios.post(api.MEM_BANK_ADD, data).then(res => {
		return res.data;
	});
}
//银行卡下拉框数据
function memBankList(data) {
	return axios.post(api.BANK_LIST, data).then(res => {
		return res.data;
	});
}

//是否设置过取款密码
function getIsSetPwd() {
	return axios.post(api.MEM_IS_SET_PWD).then(res => {
		return res.data;
	});
}
function getRealName() {
	return axios.post(api.MEM_REALNAME).then(res => {
		return res.data;
	});
}
// check bankcard 是否绑定
function getBankList() {
	return axios.post(api.MEM_BANK_LIST).then(res => {
		return res.data;
	});
}
// 设置为默认银行卡
function makeDefalutCard(data) {
    return axios.post(api.DEFAULT_BANKCARD, data).then(res => {
			return res.data;
		});
}

// 修改视讯密码
function videoPwd(data) {
    return axios.post(api.VIDEOPWD, data).then(res => {
			return res.data;
		});
}
// 视讯列表
function videoList(data) {
    return axios.post(api.VIDEOLIST, data).then(res => {
			return res.data;
		});
}

export {
	modifyLoginPwd,
	addBankCard,
	modifyWithdrawlPwd,
	memBankList,
	getIsSetPwd,
	getRealName,
	getBankList,
	makeDefalutCard,
	videoPwd,
	videoList
};
