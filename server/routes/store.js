const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    utils = require('../utils/utils');


route.post('/add', (req, res) => {
    let personID = req.session.personID,
        {shoppingID} = req.body,
        obj = req.collectList.find(item => item['id'] === personID),
        curCollect = obj['collectList'];

    shoppingID = JSON.parse(shoppingID);
    if (typeof shoppingID === "number") {
        utils.isExit(curCollect, shoppingID);
    } else {
        curCollect = utils.isExit(curCollect, shoppingID);
        obj.collectList = curCollect;
    }
    writeFile(COLLECTLIST_PATH, req.collectList).then(() => {
        res.send({state: 0, msg: 'OK!'});
    }).catch(() => {
        res.send({state: 1, msg: 'NO!'});
    });
});


route.post('/remove', (req, res) => {
    let personID = req.session.personID,
        {shoppingID = 0} = req.body,
        obj = req.collectList.find(item => item['id'] === personID),
        curCollect = obj['collectList'];
    shoppingID = JSON.parse(shoppingID);
    if (typeof shoppingID === "number") {
        utils.removeEle(curCollect, shoppingID);
    } else {
        curCollect = utils.removeEle(curCollect, shoppingID);
        obj.collectList = curCollect;
    }

    writeFile(COLLECTLIST_PATH, req.collectList).then(() => {
        res.send({state: 0, msg: 'OK!'});
    }).catch(() => {
        res.send({state: 1, msg: 'NO!'});
    });
});


route.post('/pay', (req, res) => {
    let {shoppingID} = req.body,
        personID = req.session.personID,
        obj = req.collectList.find(item => item['id'] === personID),
        {paid, collectList} = obj;
    shoppingID = JSON.parse(shoppingID);
    if (typeof shoppingID === "number") {
        utils.isExit(paid, shoppingID);
        utils.removeEle(collectList, shoppingID);
    } else {
        paid = utils.isExit(paid, shoppingID);
        obj.paid = paid;
        curCollect = utils.removeEle(collectList, shoppingID);
        obj.collectList = curCollect;
    }
    writeFile(COLLECTLIST_PATH, req.collectList).then(() => {
        res.send({state: 0, msg: 'OK!'});
    }).catch(() => {
        res.send({state: 1, msg: 'NO!'});
    });
});

route.get('/info', (req, res) => {
    let personID = req.session.personID,
        data = [];
   let storeList = req.collectList.find(item => parseFloat(item.id) === personID)['collectList'];
    storeList.forEach(shoppingID => {
        let item = req.shoppingData.find(item => parseFloat(item.id) === shoppingID);
        data.push(item);
    });
    res.send({
        state: 0,
        msg: 'OK!',
        data
    });
});
route.get('/paidInfo', (req, res) => {
    let personID = req.session.personID,
        storeList = [];
    if (personID) {
        storeList = req.collectList.find(item => parseFloat(item.id) === personID)['paid'];
    }
    let data = [];
    storeList.forEach(shoppingID => {
        let item = req.shoppingData.find(item => parseFloat(item.id) === shoppingID);
        data.push(item);
    });
    res.send({
        state: 0,
        msg: 'OK!',
        data
    });
});


module.exports = route;

