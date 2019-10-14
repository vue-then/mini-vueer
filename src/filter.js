/*
 * @Description: 
 * @Author: xwl
 * @Date: 2019-05-29 15:18:10
 * @LastEditors: xwl
 * @LastEditTime: 2019-05-30 08:57:28
 */
import moment from "moment";
//过滤时间
export const filterDate = (date, fmt = 'YYYY-MM-DD HH:mm') => {
    /**
     * 
     * date 1.支持10位unix时间戳 
     *      2.支持 new Date()
     *      3.fmt 默认返回格式'YYYY-MM-DD HH:mm' 可自行传递。
     */
    var timezone = 8; //目标时区时间，东八区
    var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
    if (!date) {
        return '';
    }
    if (typeof date === 'number') {
        date = new Date(date * 1000);
    } 
    var nowDate = date.getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);

    var o = {
        'M+': targetDate.getMonth() + 1,
        'D+': targetDate.getDate(),
        'h+': targetDate.getHours() % 12 === 0 ? 12 : targetDate.getHours() % 12,
        'H+': targetDate.getHours(),
        'm+': targetDate.getMinutes(),
        's+': targetDate.getSeconds(),
        'q+': Math.floor((targetDate.getMonth() + 3) / 3),
        'S': targetDate.getMilliseconds()
    }
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (targetDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

//解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
export const ModalHelper = ((bodyCls) => {
    let scrollTop;
    return {
        open: function () {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        close: function () {
            document.body.classList.remove(bodyCls);
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})('dialog-open');

//过滤银行卡
export const filterBankNum = ((value) => {
    if (value) {
        return `${value.substr(0, 4)}    ****    ****    ${value.substr(value.length - 4)}`
    } else {
        return "";
    }
})

// 数字金额大写转换(可以处理整数,小数,负数)
export const filterAmount = ((n) => {
    if (isNaN(n) || typeof (n) !== 'number' || n == 0) return '';

    let fraction = ['角', '分'];
    let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    let unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    let head = n < 0 ? '欠' : '';
    n = Math.abs(n);

    let s = '';

    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);

    for (let i = 0; i < unit[0].length && n > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
})

// 货币过滤器
export const currency = ((value, _currency, decimals) => {
    var digitsRE = /(\d{3})(?=\d)/g;
    value = parseFloat(value);
    if (!isFinite(value) || !value && value !== 0) return '';
    _currency = _currency != null ? _currency : '$';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
});


// 时间字符串转换为时间戳
export const makeTimes = (value) => {
    var str = Math.round(parseInt((new Date(value)).valueOf()) / 1000);
    if (isNaN(str)) {
        str = 0
    }
    return str
}
// 时分秒的格式化 1为原时间转换，2为将字符串转换为北京时间戳
export const filterTimeStamp = (date, status = 1, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    var str = date;
    if (status === 1) {
        if (isNaN(str)) {
            str = 0
        }
        str = Math.round(parseInt(date.valueOf()) / 1000);
        str = moment(str * 1000).format(fmt);
    } else if (status === 2) {
        str = makeTimes(filterDate(makeTimes(str)));
    }
    console.log(str, 'timeStamp');
    return str;
}
// 原生Date对象
export const LOCAL_TODAY = ((status = 1) => {
    var datesThreeAgo = moment((moment().unix() - 3 * 30 * 24 * 60 * 60) * 1000 + (24 * 60 * 60 * 1000)).format("YYYY-MM-DD 00:00:00");
    var todayDatesStart = moment().format("YYYY-MM-DD 00:00:00");
    var todayDatesEnd = moment().format("YYYY-MM-DD 23:59:59");
    var MINDAY = "1900-1-1 00:00:00"
    switch (status) {
        case -1:
            return new Date(MINDAY);
            break
        case 1:
            var today = todayDatesEnd.replace(/-/g, "/");
            return new Date(today);
            break
        default:
            return null
            break
    }
})
// sourceType数据来源类型
export const filterSourceType = ((value)=>{
    let obj = {
        1:"公司入款",
        2:"线上入款",
        3:"额度转换",
        4:"人工存入",
        5:"人工取出",
        7:"系统取消出款",
        8:"线上取款",
        9:"自助优惠",
        10:"优惠活动",
        12:"会员返佣",
        13:"红包优惠",
        14:"返水优惠",
        15:"返水冲销",
        16:"返佣冲销",
        17:"自助返水",
        18:"PK体育下注",
        19:"PK体育派彩",
        20:"PK彩票下注",
        21:"PK彩票派彩",
        22:"莱利彩票下注",
        23:"莱利彩票派彩",
        24:"EG电子下注",
        25:"EG电子派彩",
        26:"EG棋牌下注",
        27:"EG棋牌派彩",
        29:"会员导入",
        30:"注册优惠",
        31:"IG视讯下注",
        32:"IG视讯派彩",
        33:"大转盘领取",
        100:"系统彩下注",
        101:"系统彩派彩",
        102:"系统彩撤单",
        110:"系统彩下注",
        111:"系统彩派彩",
        112:"系统彩撤单",
        115:"取消注单",
        116:"初始化注单",
        34:"聊天室红包",
        35:"晋级奖励",
    };
    if (value) {
        return obj[value];
    } else {
        return "";
    }
})

