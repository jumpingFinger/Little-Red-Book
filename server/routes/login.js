const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    LOGIN_PATH = './json/person.json',
    utils = require('../utils/utils');

//=>把临时存储在SESSION中的STORE信息，增加到JSON文件中（登录后）
// function add_temp_store(req, res) {
//     let storeList = req.session.storeList || [];
//     if (storeList.length === 0) return;
//     storeList.map(item => {
//         return utils.ADD_STORE(req, res, parseFloat(item));
//     });
//     Promise.all(storeList).then(() => {
//         //...
//     });
//     req.session.storeList = [];
// }

route.post('/enter', (req, res) => {
    let {name, password} = req.body || {};
    password = password.substr(4, 24).split('').reverse().join('');
    let nameExist = false;
    const item = req.personData.find(item => {
        nameExist = item.name === name || item.email === name || item.phone == name;
        return nameExist && item.password === password;
    });
    if (item) {
        req.session.personID = parseFloat(item.id);
        res.send({state: true, message: '验证成功'});
        return;
    }
    if (nameExist) {
        res.send({state: false, message: '密码错误'});
    }
    res.send({state: false, message: '账号不存在'});
});

route.post('/register', (req, res) => {
    let exitPhone = req.personData.some(item => {
        return parseFloat(item.phone) === parseFloat(req.body.phone);
    });
    if (exitPhone) return res.send({state: 2, message: '电话号码已存在'});
    let personInfo = {
        id: req.personData.length === 0 ? 1 : (parseFloat(req.personData[req.personData.length - 1].id) + 1),
        name: '',
        email: '',
        phone: '',
        password: '8376ac810bb9f231d28fcf1f',
        userImg: "https://img.xiaohongshu.com/avatar/5a96b46ad1d3b97ead20f245.jpg@160w_160h_92q_1e_1c_1x.jpg",
        birth: "1993-10-15",
        sex: "1",
        bio: "超级帅的男孩子",
        follow: [

        ],
        fens: [

        ]
    };
    req.body.password = req.body.password.substr(4, 24).split('').reverse().join('');
    personInfo = {...personInfo, ...req.body};
    req.personData.push(personInfo);
    writeFile(LOGIN_PATH, req.personData).then(() => {
        //req.session.personID = parseFloat(personInfo.id);
        res.send({state: 0, message: '注册成功'});
    }).catch(() => {
        res.send({state: 1, message: '注册失败'});
    });
});


route.get('/out', (req, res) => {
    req.session.personID = null;
    res.send({state: 0, message: '退出成功'});
});

module.exports = route;