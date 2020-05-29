var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var userSQL = require('./db/AdminSQL');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/public', express.static('public'));

app.get('/admin', function (req, res) {
    console.log('连接成功');
    res.sendFile(__dirname + "/" + "adm.html");
})

app.get('/index', function (req,res) {
    res.sendFile(__dirname + '/' + 'index.html');
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据

app.post('/login', urlencodedParser, function (req, res) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        var param = req.body;
        var UserName = param.username;
        var Password = param.password;

        connection.query(userSQL.queryAll, function (err, result, field) {
            var isTrue = false;
            if (result) { //获取用户列表，循环遍历判断当前用户是否存在
                for (var i = 0; i < result.length; i++) {
                    if (result[i].aname == UserName && result[i].apwd == Password) {
                        isTrue = true;
                    }
                }
            }
            var data = {};
            data.isLogin = isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
            if (isTrue) {
                data.userInfo = {};
                data.userInfo.aname = UserName;
                data.userInfo.apwd = Password;
            } //登录成功返回用户信息
            if (field) {
                data.result = {
                    code: 200,
                    msg: 'succeed'
                };
            }
            if (err) data.err = err;

            // 以json形式，把操作结果返回给前台页面
            if (typeof data === 'undefined') {
                res.json({
                    code: '-200',
                    msg: '操作失败'
                });
            } else {
                res.json(data);
            }

            // 释放链接
            connection.release();

        });
    });
});