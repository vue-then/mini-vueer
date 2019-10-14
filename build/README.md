# pk-skin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### 字体
```html
<div class="fs-10">fontSize-10</div>
<div class="fs-12">fontSize-12</div>
<div class="fs-14">fontSize-14</div>
<div class="fs-16">fontSize-16</div>
<div class="fs-18">fontSize-18</div>
<div class="fs-20">fontSize-20</div>
<div class="fs-22">fontSize-22</div>
```
### 接口对数组和对象的操作
```js
    //数组
    message.addMsg3(1.1);
    message.addMsg3(1.2);
    message.addMsg3(1.3);
    //对象
    message.getMsg4Map().set("a", "b");
    message.getMsg4Map().set("a1", "b1");
    message.getMsg4Map().set("a2", "b2");
    message.getMsg4Map().set("a3", "b4");
```

### 格式化pb文件
```js
/**
 * ab.exports.js:activity_pb,back_water_pb,
 * c.exports.js:captcha_pb,contact_pb,error_pb
 * index.exports.js:index_pb
 * m.exports.js:member_deposit_pb,member_info_pb,member_noauth_pb,member_switch_pb,message_pb
 * ps.exports.js:proxy_pb,rebate_pb,spread_pb
 * tw.exports.js:turntable_pb,wallet_pb,withdraw_pb
**/
browserify a_b.exports.js > ab_exports.js 
browserify c.exports.js > c_exports.js
browserify index.exports.js > i_exports.js
browserify m.exports.js > m_exports.js
browserify p_s.exports.js > ps_exports.js
browserify t_w.exports.js > tw_exports.js
```