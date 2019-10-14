import axios from './axios';
import api from './api';


function getCaptchaCode() {
    return axios.post(api.CAPTCHA_CODE).then(res => {
        return res.data
    })

}

function login(data) {
    return axios.post(api.LOGIN, data).then(res => {
        return res.data
    })
}

function logout() {
    return axios.post(api.LOGIN_OUT).then(res => {
        return res.data
    })
}

function getInfo() {
    return axios.post(api.GET_USER_INFO).then(res => {
        return res.data
    })
}

function getRegisterSet() {
    return axios.post(api.REGISTER_SET).then(res => {
        return res.data
    })
}

function getCodeImg() {
    return axios.post(api.CAPTCHA_IMG).then(res => {
        return res.data
    })
}

function getTerms() {
    return axios.post(api.REGISTER_TERMS).then(res => {
        return res.data
    })

}

function getAgent() {
    return axios.post(api.REGISTER_AGENT).then(res => {
        return res.data
    })
}

//获取代理注册-后台配置信息
function getSetting() {
    return axios.post(api.PROXY_PROXYINFO).then(res => {
        return res.data
    })
}

function register(data) {
    // console.log(1231231231111111);
    return axios.post(api.REGISTER, data).then(res => {
        return res.data
    })
}
//代理注册
function setProxySetting(data) {
    return axios.post(api.PROXY_ADD,data).then(res => {
        return res.data 
    })
}

function thdLoginQq() {
    return axios.post(api.QQ_LOGIN).then(res => {
        return res.data 
    })
}

function getDownloadUrl() {
    return axios.post(api.DOWNLOAD_URL).then(res => {
        return res.data 
    })
}

function checkRatio(data){//是否设置快捷额度转换
    return axios.post(api.CHECK_SET_FAST,data).then(res => {
        return res.data 
    })
}
export {
    getCaptchaCode,
    getCodeImg,
    login,
    logout,
    getInfo,
    getRegisterSet,
    getTerms,
    getAgent,
    getSetting,
    register,
    setProxySetting,
    thdLoginQq,
    getDownloadUrl,
    checkRatio
};