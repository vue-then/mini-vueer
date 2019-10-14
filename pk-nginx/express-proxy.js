var express = require('express');
var proxy = require("express-http-proxy");

var app = express();

app.use("/", express.static(__dirname + "/dist"));

// app.use(
//     '/app/api/v2/',
//     proxy({ target: 'https://zzya.pkbeta.com', changeOrigin: true })
// );
app.use("/app/api/v2", proxy("https://zzya.pkbeta.com"));
app.listen(3001,function(){
    console.log('正在监听'+3001+"端口")
});