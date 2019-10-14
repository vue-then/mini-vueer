import axios from "./axios";
import api from "./api";

function getRankingInfo(data) {
    return axios.post(api.GETRANKING, data).then(res => {
			return res.data;
		});
}



export {
    getRankingInfo,
}