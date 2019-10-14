import axios from "./axios";
import api from "./api";

function getUserInfo(data) {
    return axios.post(api.GET_USER_INFO, data).then(res => {
			return res.data;
		});
}

function updateUser(data) {
    return axios.post(api.UPD_USERINFO, data).then(res => {
		return res.data;
	});
}




export {
    getUserInfo,
    updateUser
}