import axios from "./axios";
import api from "./api";


//积分变动明细
function getIntergChange(data) {
    return axios.post(api.INTERGRAL_CHANGE,data).then(res => {
        return res.data;
    });
}
//签到
function intergSignin() {
    return axios.post(api.INTERGRAL_SIGNIN).then(res => {
        return res.data;
    });
}

//获取会员积分信息
function intergMerber() {
    return axios.post(api.INTERGRAL_MEMBER).then(res => {
        return res.data;
    });
}

//获取等级说明
function intergLevel() {
    return axios.post(api.INTERGRAL_LEVLS).then(res => {
        return res.data;
    });
}

export {
    getIntergChange,
    intergSignin,
    intergMerber,
    intergLevel
};

