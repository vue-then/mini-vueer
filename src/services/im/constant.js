let obj = {
    // window.location.origin 
    BASE_URL: 'http://localhost:5000' + "/api/goimfiles", //视频、图标拼接的地址;
    DEFAULT_AVATAR: require('@/assets/img/im/morentouxiang@2x.png'),
    REG_IMAGE: /(gif|jpg|jpeg|png|swf)$/,
    REG_VIDEO: /(mp4)$/,

    IS_MINE: 1, // 1=自己（会员） 2=非自己（管理员、其他会员）
    NO_MINE: 2,

    IS_ADMIN: 2,// 1=非管理员 2=管理员
    NO_ADMIN: 1,

    TYPE_CHAT: 1, //聊天室
    TYPE_PUBLIC: 2, //公群
    TYPE_PRIVATE: 3, //私群
    TYPE_MEMBER: 4, //会员

    RECEIVE_TYPE_PRIVATE: 1, //receiveType 私聊
    RECEIVE_TYPE_PUBLIC: 2, //receiveType 群聊

    SEND_MSG_STATUS_LOADING: 1,//發送消息顯示loading
    SEND_MSG_STATUS_SUCCESS: 2,//發送消息成功
    SEND_MSG_STATUS_FAIL: 3,//發送消息失敗

    // im消息类型
    IM_MSG_TYPE_TEXT: 1, // 文本
    IM_MSG_TYPE_PICTURE: 2, // 图片
    IM_MSG_TYPE_VIDEO: 3, // 视频
    IM_MSG_TYPE_VOICE: 4, // 语音
    IM_MSG_TYPE_RED: 5, // 红包
    IM_MSG_TYPE_BET: 6, // 投注计划-跟投
    IM_MSG_TYPE_NOTIFICSTION: 7, // 通知
    IM_MSG_TYPE_FOLLOW: 8, // 跟单

    // im通知消息类型
    IM_NOTICE_MESS_TYPE_SYSTEM: 1,  // 系统通知
    IM_NOTICE_MESS_TYPE_ONLINE: 2,  // 上线通知
    IM_NOTICE_MESS_TYPE_OFFLINE: 3,  // 下线通知
    IM_NOTICE_MESS_TYPE_FORBIDDEN: 4,  // 禁言通知
    IM_NOTICE_MESS_TYPE_DEL: 5,  // 删除消息通知
    IM_NOTICE_MESS_TYPE_RELEASE: 6,  // 解除禁言
    IM_NOTICE_MESS_TYPE_RED: 7,  // 红包领取通知
    IM_NOTICE_FOLLOW: 8,  // 跟投
    IM_NOTICE_MESS_TYPE_KICK: 9,  // 踢人
    IM_NOTICE_MESS_TYPE_FORBIDDEN_GROUP: 10, // 群体禁言
    IM_NOTICE_MESS_TYPE_HAS_BEEN_KICK: 11, // 被踢
    IM_NOTICE_MESS_TYPE_OUT_GROUP: 12, // 退出群聊
    IM_NOTICE_MESS_TYPE_CHANGE_BALANCE: 13, // 账变消息
    IM_NOTICE_MESS_TYPE_POST: 14, // 公告消息
    IM_NOTICE_MESS_TYPE_WJDC: 15, // 问卷调查
    IM_NOTICE_MESS_TYPE_JOIN_GROUP: 16, // 申请加入群聊通过 - 系统消息
    IM_NOTICE_MESS_TYPE_JOIN_CROUP_NOTICE: 17, // 其他会员入群通知
    IM_NOTICE_MESS_TYPE_JOIN_CROUP_DISBAND: 18, // 解散
    IM_NOTICE_MESS_TYPE_CROUP_UPDATE_INFO: 19, // 群信息修改
    IM_NOTICE_MESS_TYPE_JOIN_GROUP_DEL: 20, // 删除聊天室

    FACE_CHINESE_ARR: [
        "微笑",
        "偷亲",
        "色",
        "飞吻",
        "献爱心",
        "鼓掌",
        "擦汗",
        "得意",
        "发呆",
        "流汗",
        "破涕为笑",
        "调皮",
        "脸红",
        "惊恐",
        "无语",
        "嘿哈",
        "捂脸",
        "奸笑",
        "机智",
        "皱眉",
        "吓",
        "抽烟",
        "傲娇",
        "愉快",
        "害羞",
        "眨眼",
        "晕",
        "闭嘴",
        "厉害",
        "耶",
        "打脸",
        "大笑",
        "哈欠",
        "睁不开眼",
        "疑问",
        "捂嘴",
        "耍帅",
        "偷笑",
        "思考",
        "吐血",
        "可怜",
        "嘘",
        "不屑",
        "汗",
        "奸笑2",
        "抓狂",
        "笑哭",
        "财迷",
        "亲亲",
        "眼角泛泪",
        "抠鼻",
        "流泪",
        "捂脸痛哭",
        "委屈",
        "鄙视",
        "拜拜",
        "尔康",
        "海绵宝宝",
        "吃瓜",
        "呲牙",
        "满头大汗",
        "真棒",
        "睡",
        "吐",
        "满眼星星",
        "敲打",
        "奋斗",
        "大哭",
        "我想静静",
        "哇哦",
        "难过",
        "尴尬",
        "白眼",
        "撇嘴",
        "困",
        "惊呆",
        "友善",
        "咒骂",
        "再见",
        "左哼哼",
        "右哼哼",
        "坏笑",
        "口罩",
        "不关我事",
        "小黄鸭",
        "大兵",
        "原谅",
        "摸头",
        "烈焰红唇",
        "抓抓",
        "吐籽",
        "完啦",
        "衰",
        "怒",
        "彩虹",
        "求关注",
        "互粉",
        "加好友",
        "真棒",
        "垃圾",
        "握手",
        "剪刀手",
        "抱拳",
        "勾引",
        "拳头",
        "ok",
        "合十",
        "强壮",
        "合作愉快",
        "指点",
        "拍手",
        "比心",
        "强强联合",
        "向左",
        "向右",
        "玫瑰",
        "凋谢",
        "嘴唇",
        "爱心",
        "心碎",
        "庆祝",
        "蛋糕",
        "礼物",
        "红包",
        "蛋糕2",
        "发财",
        "威武",
        "给力",
        "六六六",
        "黄瓜",
        "啤酒",
        "西瓜",
        "咖啡",
        "太阳",
        "月亮",
        "炸弹",
        "大便",
        "十八禁",
        "菜刀",
        "去污粉",
        "猪头",
        "看不到",
        "狗头",
        "阿拉斯加",
        "哈士奇",
        "狗头问号",
        "熊样",
        "鬼脸1",
        "黑脸",
        "鬼脸2",
    ],

}

//表情库
//每20位组成一个数组
function spArray(num, arr) {
    let newArr = [], i;
    for (i = 0; i < arr.length;) {
        newArr.push(arr.slice(i, i += num))
    }
    return newArr
}

// 获取本地表情图标
function makeFace(faceChineseArr) {
    let arr = [];
    for (let i = 0; i < faceChineseArr.length; i++) {
        let key = "[" + faceChineseArr[i] + "]";
        let value = require("@/assets/img/im/face/" + (i + 1) + ".png")
        arr.push({
            key: key,
            value: value,
        });
    }
    return spArray(20, arr)
}


let newObj = Object.assign({}, obj, {
    SEND_MSG_TYPE_ARRAY: [
        obj.IM_MSG_TYPE_TEXT,
        obj.IM_MSG_TYPE_PICTURE,
        obj.IM_MSG_TYPE_VIDEO,
        obj.IM_MSG_TYPE_VOICE,
        obj.IM_MSG_TYPE_RED,
        obj.IM_MSG_TYPE_BET,
        obj.IM_MSG_TYPE_FOLLOW
    ],
})

export const handleMessage = (msg, type) => {
    var msgTextOb = JSON.parse(msg);
    var msgText = "";
    switch (type) {
        case obj.IM_MSG_TYPE_TEXT:
            msgText = msgTextOb.message;
            break;
        case obj.IM_MSG_TYPE_PICTURE:
            msgText = "[图片]";
            break;
        case obj.IM_MSG_TYPE_VIDEO:
            msgText = "[视频]";
            break;
        case obj.IM_MSG_TYPE_VOICE:
            msgText = "[语音]";
            break;
        case obj.IM_MSG_TYPE_RED:
            msgText = "[红包]";
            break;
        case obj.IM_MSG_TYPE_BET:
            msgText = "[投注计划]";
            break;
    }
    return msgText;
}

//表情库
var faces = (function () {
    var arr = [];
    for (var i = 0; i < obj.FACE_CHINESE_ARR.length; i++) {
        var key = "[" + obj.FACE_CHINESE_ARR[i] + "]";
        var value = require("@/assets/img/im/face/" + (i + 1) + ".png");
        arr[key] = value;
    }
    return arr;
})();

export const translateHTML = (content) => {

    //支持的html标签
    var html = function (end) {
        return new RegExp("\\n*\\[" + (end || "") + "(code|pre|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*", "g");
    };
    content = (content || "")
        .replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;") //XSS
        .replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2') //转义@

        .replace(/\[([^\s\[\]]+?)\]/g, function (face) {
            //转义表情
            var alt = face.replace(/^/g, "");
            let newfaceChineseArr = obj.FACE_CHINESE_ARR.map(item => `[${item}]`);
            if (newfaceChineseArr.includes(alt)) {
                return '<img class="w22" alt="' + alt + '" title="' + alt + '" src="' + faces[alt] + '">';
            } else {
                return alt;
            }
        })
        .replace(html(), "<$1 $2>")
        .replace(html("/"), "</$1>"); //转移HTML代码
    return content;
}

export const FACE_IMG_ARR = makeFace(obj.FACE_CHINESE_ARR);

export default newObj;