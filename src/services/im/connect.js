import axios from '@/services/axios';
import api from '@/services/api';
import Bus from '@/services/im/bus';

var IMkey = "";
function IM() {
    const rawHeaderLen = 16;
    const packetOffset = 0;
    const headerOffset = 4;
    const verOffset = 6;
    const opOffset = 8;
    const seqOffset = 12;

    var Client = function () {
        Bus.isConnect = true; //TODO ①
        var MAX_CONNECT_TIMES = 10;
        var DELAY = 1500;
        this.createConnect(MAX_CONNECT_TIMES, DELAY);
    };

    Client.prototype.createConnect = function (max, delay) {
        var self = this;
        if (max === 0) {
            return;
        }
        connect();
        async function getIMKey() {
            let res = await axios.post(api.IM_KEY);
            if (res.status === 200) {
                if (res.data.success) {
                    return res.data.data;
                }
            }
        }
        var textDecoder = new TextDecoder();
        var textEncoder = new TextEncoder();
        window.heartbeatInterval;

        async function connect() {
            console.log("进入练接。。。。。")
            IMkey = await getIMKey();
            // ---- 当conn接口未返回时，直接return。
            if (!IMkey) {
                return;
            }
            var wsUrl;
            if (window.location.protocol === "https:") {
                wsUrl = "wss://" + window.location.host + "/sub"; //线上环境
            } else {
                console.log('IMkey', IMkey)
                if (window.location.host == "10.18.3.84:8092") {
                    wsUrl = "ws://" + IMkey.server + "/sub"; //135 本地
                } else {
                    wsUrl = "ws://" + window.location.host + "/sub"; //线上环境
                }

            }
            var ws = new WebSocket(wsUrl);
            ws.binaryType = "arraybuffer";
            ws.onopen = function () {
                auth();
            };

            ws.onmessage = function (evt) {
                var data = evt.data;
                var dataView = new DataView(data, 0);
                var packetLen = dataView.getInt32(packetOffset);
                var headerLen = dataView.getInt16(headerOffset);
                var ver = dataView.getInt16(verOffset);
                var op = dataView.getInt32(opOffset);
                var seq = dataView.getInt32(seqOffset);
                // console.log("receiveHeader: packetLen=" + packetLen, "headerLen=" + headerLen, "ver=" + ver, "op=" + op, "seq=" + seq);
                switch (op) {
                    case 8:
                        // auth reply ok
                        // document.getElementById("status").innerHTML = "<color style='color:green'>ok<color>";
                        console.log("receive: auth reply");
                        // send a heartbeat to server

                        heartbeat();
                        window.heartbeatInterval = setInterval(heartbeat, 10 * 1000);
                        break;
                    case 3:
                        // receive a heartbeat from server
                        console.log("receive: heartbeat reply");
                        break;
                    case 9:
                        // batch message
                        for (var offset = rawHeaderLen; offset < data.byteLength; offset += packetLen) {
                            // parse
                            var packetLen = dataView.getInt32(offset);
                            var headerLen = dataView.getInt16(offset + headerOffset);
                            var ver = dataView.getInt16(offset + verOffset);
                            var op = dataView.getInt32(offset + opOffset);
                            var seq = dataView.getInt32(offset + seqOffset);
                            var msgBody = textDecoder.decode(data.slice(offset + headerLen, offset + packetLen));
                            messageReceived(ver, msgBody);
                        }
                        break;
                    default:
                        var msgBody = textDecoder.decode(data.slice(headerLen, packetLen));
                        messageReceived(ver, msgBody);
                        break;
                }
            };

            ws.onclose = function () {
                console.error("onclose-私聊和密聊重新连接--->链接失败");
                setTimeout(reConnect, delay);
            };

            function heartbeat() {
                var headerBuf = new ArrayBuffer(rawHeaderLen);
                var headerView = new DataView(headerBuf, 0);
                headerView.setInt32(packetOffset, rawHeaderLen);
                headerView.setInt16(headerOffset, rawHeaderLen);
                headerView.setInt16(verOffset, 1);
                headerView.setInt32(opOffset, 2);
                headerView.setInt32(seqOffset, 1);
                ws.send(headerBuf);
                // console.log("send: heartbeat");
            }

            function auth() {
                var token = {
                    isAdmin: 1,
                    userId: IMkey.mid,
                    siteId: 'aaa',
                    siteIndexId: 'a',
                };
                token = JSON.stringify(token);
                var headerBuf = new ArrayBuffer(rawHeaderLen);
                var headerView = new DataView(headerBuf, 0);
                var bodyBuf = textEncoder.encode(token);
                headerView.setInt32(packetOffset, rawHeaderLen + bodyBuf.byteLength);
                headerView.setInt16(headerOffset, rawHeaderLen);
                headerView.setInt16(verOffset, 1);
                headerView.setInt32(opOffset, 7);
                headerView.setInt32(seqOffset, 1);
                ws.send(mergeArrayBuffer(headerBuf, bodyBuf));
                console.log("send: auth token: " + token);
            }

            function messageReceived(ver, body) {
                console.log('messageReceived', body)
                let data = typeof body === 'string' ? JSON.parse(body) : body;
                Bus.$emit('IM', data); //通过vue的event bus 来实现每个页面接受收到的消息
            }

            function mergeArrayBuffer(ab1, ab2) {
                var u81 = new Uint8Array(ab1),
                    u82 = new Uint8Array(ab2),
                    res = new Uint8Array(ab1.byteLength + ab2.byteLength);
                res.set(u81, 0);
                res.set(u82, ab1.byteLength);
                return res.buffer;
            }
        }

        function reConnect() {
            self.createConnect(--max, delay * 2);
        }
    };
    //第一次是登录 Bus.isConnect=undefined 调用 
    // 之后在 本文件 TODO ① Bus.isConnect = true;

    // 第二次是首页调用，Bus.isConnect = true; //不连接

    //第三次刷新页面 Bus.isConnect=undefined 调用-回到第一次

    if (!Bus.isConnect) {
        new Client();
    }
}

export default IM;