const mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var admSQL = require('./db/AdminSQL');
var userSQL = require('./db/UserSQL');
var playerbasicinfoSQL = require('./db/PlayerBasicInfoSQL');
var playergameinfoSQL = require('./db/PlayerGameInfoSQL');
var announcementSQL = require('./db/AnnouncementSQL');
var feedbackSQL = require('./db/FeedbackSQL')
var express = require('express');
var app = express();

const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');
bodyParserXml(bodyParser);
// var multer = require('multer');

// 创建 application/x-www-form-urlencoded 编码解析
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/public', express.static('public'));

app.use(bodyParser.xml(),
    bodyParser.json(),
    bodyParser.raw({ type: 'application/arraybuffer', limit: '100mb' }),
    bodyParser.urlencoded({ extended: true })
    // multer()
);

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + "/" + "adm.html");
})

app.get('/admin_house', function (req, res) {
    res.sendFile(__dirname + '/' + 'manager.html');
})

app.get('/man_home.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'man_home.html');
})

app.get('/man_users.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'man_users.html');
})

app.get('/man_announcement.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'man_announcement.html');
})

app.get('/man_feedback.html', function (req, res) {
    res.sendFile(__dirname + '/' + 'man_feedback.html');
})

app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
})

app.get('/level_choosing', function (req, res) {
    res.sendFile(__dirname + '/' + 'level_choosing.html');
})

app.get('/level1', function (req, res) {
    res.sendFile(__dirname + '/' + 'level1.html');
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

// 使用DBConfig.js的配置信息创建一个MySql链接池
var pool = mysql.createPool(dbConfig.mysql);
// 响应一个JSON数据

app.post('/admlogin', function (req, res) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        let param = req.body;
        let UserName = param.username;
        let Password = param.password;
        // console.log(UserName, Password);

        connection.query(admSQL.queryAll, function (err, result) {
            let isTrue = false;
            if (result) { //获取用户列表，循环遍历判断当前用户是否存在
                for (let i = 0; i < result.length; i++) {
                    if (result[i].aname == UserName && result[i].apwd == Password) {
                        isTrue = true;
                    }
                }
            }
            let data = {};
            data.isLogin = isTrue;
            if (isTrue) {  //如果isTrue布尔值为true则登陆成功 false则失败
                data.result = {
                    code: 200,
                    msg: '登陆成功'
                };
            }
            else {
                data.result = {
                    code: 500,
                    msg: '登陆失败'
                }
            }
            if (err) data.err = err;

            // 以json形式，把操作结果返回给前台页面
            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '登录失败'
                });
            } else {
                res.json(data);
            }

            // 释放链接
            connection.release();

        });
    });
});

app.post('/reg', function (req, res) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        let param = req.body;
        let UserName = param.username;
        let Password = param.password;

        connection.query(userSQL.getUserByName, UserName, function (err, result) {
            let isTrue = false;
            if (result.length > 0) { //获取用户列表，循环遍历判断当前用户是否存在
                isTrue = true; //用户已存在
            }
            let data = {};
            data.reged = isTrue;
            if (isTrue) { //如果isTrue布尔值为true则用户已存在
                data.result = {
                    code: 200,
                    msg: '用户已存在'
                }
            }
            else  //用户不存在则继续注册
            {
                connection.query(userSQL.insert, [UserName, Password], function (err, result) {
                    if (err) {
                        data.err = err;
                        data.result = {
                            code: 500,
                            msg: '注册失败'
                        }
                    }
                    else {
                        // console.log(result);
                        data.result = {
                            code: 200,
                            msg: '注册成功'
                        }
                    }
                })
                connection.query(playerbasicinfoSQL.insert, [UserName, '一个萌新', '来自天外', '这个用户很懒，什么也没有留下'], function (err, result) {
                    if (err) {
                        data.err = err;
                        data.result = {
                            code: 500,
                            msg: '注册失败'
                        }
                    }
                    else {
                        // console.log(result);
                        data.result = {
                            code: 200,
                            msg: '注册成功'
                        }
                    }
                })
                connection.query(playergameinfoSQL.insert, [UserName, 0, 0], function (err, result) {
                    if (err) {
                        data.err = err;
                        data.result = {
                            code: 500,
                            msg: '注册失败'
                        }
                    }
                    else {
                        // console.log(result);
                        data.result = {
                            code: 200,
                            msg: '注册成功'
                        }
                    }
                })
            }
            if (err) data.err = err;

            // 以json形式，把操作结果返回给前台页面
            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '登录失败'
                });
            } else {
                res.json(data);
            }

            // 释放链接
            connection.release();

        });
    });
});

app.post('/login', function (req, res) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        let param = req.body;
        let UserName = param.username;
        let Password = param.password;
        // console.log(UserName, Password);

        connection.query(userSQL.getUserByName, UserName, function (err, result) {
            let isTrue = false;
            if (result.length > 0) { //如果用户名存在，判断密码是否正确，密码正确则登陆成功
                for (let i = 0; i < result.length; i++) {
                    if (result[i].pwd == Password) {
                        isTrue = true;
                    }
                }
            }
            let data = {};
            data.isLogin = isTrue; //如果isTrue布尔值为true则登陆成功 有false则失败
            if (isTrue) {  //如果isTrue布尔值为true则登陆成功 false则失败
                data.result = {
                    code: 200,
                    msg: '登陆成功'
                };
            }
            else {
                data.result = {
                    code: 500,
                    msg: '登陆失败'
                }
            }
            if (err) data.err = err;

            // 以json形式，把操作结果返回给前台页面
            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '登录失败'
                });
            } else {
                res.json(data);
            }

            // 释放链接
            connection.release();

        });
    });
});

app.get('/searchname', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let UserName = '%' + param.search + '%';

        let searchSQL = `SELECT a.*, SUM(b.P_score) AS totalScore 
                       FROM PlayerBasicInfo a INNER JOIN PlayerGameInfo b ON a.username=b.username 
                       WHERE a.username LIKE ? 
                       GROUP BY b.username` ;

        connection.query(searchSQL, UserName, function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '查询失败'
                }
            }
            else {
                // console.log(result);
                data.searching = result;
                data.result = {
                    code: 200,
                    msg: '查询成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '登录失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/ann_add', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let Title = param.title;
        let Detail = param.detail;

        connection.query(announcementSQL.insert, [Title, Detail], function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '插入失败'
                }
            }
            else {
                // console.log(result);
                data.result = {
                    code: 200,
                    msg: '插入成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '插入失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/ann_load', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(announcementSQL.queryAllByTime, function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '查询失败'
                }
            }
            else {
                // console.log(result);
                data.searching = result;
                data.result = {
                    code: 200,
                    msg: '查询成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '查询失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/ann_del', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let ID = param.AnnID;

        connection.query(announcementSQL.deleteAnn, ID, function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '删除失败'
                }
            }
            else {
                // console.log(result);
                data.result = {
                    code: 200,
                    msg: '删除成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '删除失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/user_info_load', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let username = param.username;

        connection.query(playerbasicinfoSQL.getUserByNameExact, username, function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '查询失败'
                }
            }
            else {
                // console.log(result);
                data.searching = result;
                data.result = {
                    code: 200,
                    msg: '查询成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '查询失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/user_ann_load', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(announcementSQL.queryAllByTime, function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '查询失败'
                }
            }
            else {
                // console.log(result);
                data.searching = result;
                data.result = {
                    code: 200,
                    msg: '查询成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '查询失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/user_rank_load', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let username = param.username;

        let searchSQL = `SELECT a.username, SUM(b.P_score) AS totalScore 
                       FROM PlayerBasicInfo a INNER JOIN PlayerGameInfo b ON a.username=b.username
                       GROUP BY b.username
                       ORDER BY totalScore DESC` ;

        connection.query(searchSQL, function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '查询失败'
                }
            }
            else {
                // console.log(result);
                data.searching = result.slice(0, 10);
                for (let i = 0; i < result.length; i++) {
                    if (result[i].username == username) {
                        data.rank_self = {
                            ranking: i + 1,
                            username: username,
                            totalScore: result[i].totalScore
                        }
                    }
                }
                // data.searching.push()
                data.result = {
                    code: 200,
                    msg: '查询成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '查询失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/feedback_add', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let Detail = param.detail;
        let Username = param.username;

        connection.query(feedbackSQL.insert, [Detail, Username], function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '插入失败'
                }
            }
            else {
                // console.log(result);
                data.result = {
                    code: 200,
                    msg: '插入成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '插入失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/feedback_load', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(feedbackSQL.queryAllByTime, function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '查询失败'
                }
            }
            else {
                // console.log(result);
                data.searching = result;
                data.result = {
                    code: 200,
                    msg: '查询成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '查询失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/feedback_toUnread', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let ID = param.FeedbackID;

        connection.query(feedbackSQL.updateFeedback, [0, ID], function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '修改失败'
                }
            }
            else {
                // console.log(result);
                data.result = {
                    code: 200,
                    msg: '修改成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '修改失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/feedback_toRead', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let ID = param.FeedbackID;

        connection.query(feedbackSQL.updateFeedback, [1, ID], function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '修改失败'
                }
            }
            else {
                // console.log(result);
                data.result = {
                    code: 200,
                    msg: '修改成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '修改失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/feedback_del', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let ID = param.FeedbackID;

        connection.query(feedbackSQL.deleteFeedback, ID, function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '删除失败'
                }
            }
            else {
                // console.log(result);
                data.result = {
                    code: 200,
                    msg: '删除成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '删除失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})

app.get('/user_info_update', function (req, res) {
    pool.getConnection(function (err, connection) {
        let param = req.query;
        let NickName = param.nickname;
        let Gender = param.gender;
        let Signature = param.signature;
        let UserName = param.username;

        connection.query(playerbasicinfoSQL.updatePlayerBasicInfo, [NickName, Gender, Signature, UserName], function (err, result) {
            let data = {};
            if (err) {
                data.err = err;
                data.result = {
                    code: 500,
                    msg: '修改失败'
                }
            }
            else {
                // console.log(result);
                data.result = {
                    code: 200,
                    msg: '修改成功'
                }
            }

            if (typeof data === 'undefined') {
                res.json({
                    code: 500,
                    msg: '修改失败'
                });
            } else {
                res.json(data);
            }

            connection.release();
        })
    })
})