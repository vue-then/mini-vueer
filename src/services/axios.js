
import axios from 'axios';
import Vue from 'vue';
import router from '../router';
const vue = new Vue({
    router
});

axios.interceptors.request.use(config => {
    config.baseURL = "/app/api/v2"; //配合proxy代理使用
    config.timeout = 60 * 1000; // Timeout
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(response => {
    let code = response.data.code;
    if (code === 71001 || code === 1008) {
        sessionStorage.removeItem('token');
        vue.$router.push({
            name: 'login'
        });
    }
    if (code === 71006) {
        sessionStorage.removeItem('token');
        vue.$router.push({
            name: '402'
        });
    }
    return response;
}, error => {
    console.log(error)
    return Promise.resolve(error.response)
});


const post = (url, data) => {
    let TOKEN = sessionStorage.getItem("token");
    return axios({
        method: 'post',
        url,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8;',
            'data': '2&4.0.1&black&xxhdpi&zh&aaa_a&53496937f5bc02807d3934ac9fcf5ac9',
            'platform': 'wap',
            'sid': TOKEN
        },
        data: JSON.stringify(data),
    }).then(response => {
        return response;
    }).catch(err => {
        console.log(err);
    })
}

const form = (url, data) => {
    let TOKEN = sessionStorage.getItem("token");
    return axios({
        method: 'post',
        url,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8;',
            'data': '2&4.0.1&black&xxhdpi&zh&aaa_a&53496937f5bc02807d3934ac9fcf5ac9',
            'platform': 'wap',
            'sid': TOKEN
        },
        data,
    }).then(response => {
        return response;
    }).catch(err => {
        console.log(err);
    })
}
export default {
    post,
    form
}