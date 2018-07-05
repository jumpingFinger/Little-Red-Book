const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    LOGIN_PATH = './json/person.json',
    utils = require('../utils/utils');

//=>把临时存储在SESSION中的STORE信息，增加到JSON文件中（登录后）
function add_temp_store(req, res) {
    let storeList = req.session.storeList || [];
    if (storeList.length === 0) return;
    storeList.map(item => {
        return utils.ADD_STORE(req, res, parseFloat(item));
    });
    Promise.all(storeList).then(() => {
        //...
    });
    req.session.storeList = [];
}

route.post('/enter', (req, res) => {
    let {name, password} = req.body || {};
    //n
    password = password.substr(4, 24).split('').reverse().join('');
    let nameExist = false;
    const item = req.personData.find(item => {
        nameExist = item.name === name || item.email === name || item.phone === name;
        return nameExist && item.password === password;
    });
    console.log(item);
    if (item) {
        req.session.personID = parseFloat(item.id);
        add_temp_store(req, res);
        res.send({state: true, message: '验证成功'});
        return;
    }
    if (nameExist) {
        res.send({state: false, message: '密码错误'});
    }
    res.send({state: false, message: '账号不存在'});
});

// route.get('/login', (req, res) => {
//     const personID = req.session.personID;
//     if (personID) {
//         res.send({code: 0, msg: 'OK!'});
//         return;
//     }
//     res.send({code: 1, msg: 'NO!'});
// });

route.post('/register', (req, res) => {
    console.log(req.body);
    let exitPhone = req.personData.some(item => {
        return parseFloat(item.phone) == parseFloat(req.body.phone);
    });
    if (exitPhone)  {
        return res.send({state: 2, message: '电话号码已存在'});
    }
    let personInfo = {
        id: req.personData.length === 0 ? 1 : (parseFloat(req.personData[req.personData.length - 1].id) + 1),
        name: '',
        email: '',
        phone: '',
        password: '8376ac810bb9f231d28fcf1f'
    };
    req.body.password = req.body.password.substr(4, 24).split('').reverse().join('');
    personInfo = {...personInfo, ...req.body};
    req.personData.push(personInfo);
    writeFile(LOGIN_PATH, req.personData).then(() => {
        req.session.personID = parseFloat(personInfo.id);
        add_temp_store(req, res);
        res.send({state: 0, message: '注册成功'});
    }).catch(() => {
        res.send({state: 1, message: '注册失败'});
    });
});

// route.get('/info', (req, res) => {
//     const personID = req.session.personID;
//     if (personID) {
//         let personInfo = req.personalDATA.find(item => {
//             return parseFloat(item.id) === personID;
//         });
//         personInfo.password = null;
//         res.send({code: 0, msg: 'OK!', data: personInfo});
//         return;
//     }
//     res.send({code: 1, msg: 'NO!', data: null});
// });


route.get('/out', (req, res) => {
    req.session.personID = null;
    res.send({code: 0, message: '退出成功'});
});

module.exports = route;