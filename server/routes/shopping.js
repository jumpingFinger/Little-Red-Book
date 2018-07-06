const express = require('express'),
    route = express.Router();
const {writeFile} = require('../utils/promiseFS');
const utils = require('../utils/utils');
route.get('/banner', (req, res) => {
    let data = req.bannerData.reverse().slice(0, 3);
    /*循环数据*/
    // let newAry=[];
    // newAry=JSON.parse(JSON.stringify(req.shoppingData));
    // req.shoppingData.forEach((item, index) => {
    //     let aaa=item.id;
    //      aaa=aaa+160;
    //      item.id=aaa;
    //     // newAry.push(item);
    // });
    //  req.shoppingData=[...newAry,... req.shoppingData];
    //  writeFile(SHOPPING_PATH, req.shoppingData);
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

route.get('/detail', (req, res) => {
    let {shoppingID} = req.query;
    shoppingID = parseFloat(shoppingID);
    let item = req.shoppingData.find(item => {
        return parseFloat(item.id) === shoppingID;
    });
    if (item) {
        res.send({
            state: 0,
            message: 'OK!',
            data: item
        });
        return;
    }
    res.send({
        state: 1,
        msg: 'NO!',
        data: null
    });
});

route.get('/list', (req, res) => {
    let {limit = 8, page = 1} = req.query;
    limit = parseFloat(limit);
    page = parseFloat(page);

    // //=>分页
    let total = Math.ceil(req.shoppingData.length / limit),
        result = [];
    if (page <= total) {
        for (let i = (page - 1) * limit; i <= (page * limit - 1); i++) {
            let item = req.shoppingData[i];
            if (!item) break;
            result.push(item);
        }
    }
    res.send({
        state: 0,
        message: 'OK!',
        total,
        limit,
        page,
        data: result
    });
});

module.exports = route;