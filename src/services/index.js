/*
 * @Description: 
 * @Author: xwl
 * @Date: 2019-05-29 15:25:25
 * @LastEditors: xwl
 * @LastEditTime: 2019-05-30 08:35:39
 */
import axios from './axios';
import api from './api';


function getCarouse() {
    return axios.post(api.BANNER).then(res => {
        return res.data
    })
}

function getAnnouncement(type) {
    let data = {
        noticeAddress: type
    }
    return axios.post(api.ANNOUNCEMENT, data).then(res => {
        return res.data
    })
}

function getGameList() {
    return axios.post(api.INDEX_GAME_LIST).then(res => {
        return res.data
    });
}

function getImgUrl() {
    return axios.post(api.INDEX_GAME_IMG_URL).then(res => {
        return res.data
    })
}

function getGameType() {
    return axios.post(api.INDEX_GAME_TYPE).then(res => {
        return res.data
    })
}

function getDzGameList(data) {
    return axios.post(api.INDEX_DZ_GAME_LIST, data).then(res => {
        return res.data
    })
}

function getAnimation() {
    return axios.post(api.INDEX_ANIMATION).then(res => {
        return res.data
    })
}

function recovery() {
    return axios.post(api.INDEX_RECOVERY).then(res => {
        return res.data
    })
}

function getRedStyle() {
    return axios.post(api.INDEX_GET_RED_STYLE).then(res => {
        return res.data
    })
}

function openRed(data) {
    return axios.post(api.INDEX_OPEN_RED, data).then(res => {
        return res.data
    })
}

function getPopMsg() {
    return axios.post(api.INDEX_POP_MSG).then(res => {
        return res.data
    })
}

function openGame(data) {
    return axios.post(api.INDEX_OPEN_GAME, data).then(res => {
        return res.data
    })
}

function getBottomBanner(data) {
    return axios.post(api.INDEX_BOTTOM_BANNER, data).then(res => {
        return res.data
    })
}

function getGameBanner(data) {
    return axios.post(api.INDEEX_GAME_BANNER, data).then(res => {
        return res.data
    })
}
function thdQQlogin(data){
    return axios.post(api.INDEX_QQ_LOGIN, data).then(res => {
        return res.data
    })
}
function getLogo(){
    return axios.post(api.INDEX_LOGIN).then(res => {
        return res.data
    })
}

//广告点击统计
function postAdvStatis(data) {  
    return axios.post(api.ADV_STATISTICS,data).then(res => {
        return res.data
    })
}
//获取热门游戏推荐和广告轮播
function getHotGames() {
    return axios.post(api.HOTGAMES_ADV).then(res => {
        return res.data
    })
}

//问卷查询
function getQS(){
    return axios.post(api.INDEX_QS).then(res => {
        return res.data
    })
}

export {
    getCarouse,
    getAnnouncement,
    getGameList,
    getImgUrl,
    getGameType,
    getDzGameList,
    getAnimation,
    recovery,
    getRedStyle,
    openRed,
    getPopMsg,
    openGame,
    getBottomBanner,
    getGameBanner,
    thdQQlogin,
    getLogo,
    postAdvStatis,
    getHotGames,
    getQS
}