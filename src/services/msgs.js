import axios from "./axios";
import api from "./api";

function getBillChange(data) {
    return axios.post(api.CASH_LIST, data).then(res => {
        return res.data;
    });
}
function getBillChangeInfo(data) {
    return axios.post(api.CASH_INFO, data).then(res => {
		return res.data;
	});
}


export {
    getBillChange,
    getBillChangeInfo
}