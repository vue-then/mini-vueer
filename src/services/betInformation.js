import axios from "./axios";
import api from "./api";


//彩种下拉
function fcTypeSelect(data) {
    return axios.post(api.BET_SELECT,data).then(res => {
        return res.data;
    });
}

//投注资讯数据
function getBetInfo(data) {
    return axios.post(api.BET_INFORMATION,data).then(res => {
        return res.data;
    });
}


export {
    fcTypeSelect,
    getBetInfo,
};

