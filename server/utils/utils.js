const {writeFile} = require('../utils/promiseFS'),
    STORE_PATH = './json/store.json';

function ADD_STORE(req, res, courseID) {
    let personID = req.session.personID,
        storeInfo = {
            id: req.storeDATA.length === 0 ? 1 : (parseFloat(req.storeDATA[req.storeDATA.length - 1].id) + 1),
            courseID,
            personID,
            state: 0,
            time: new Date().getTime()
        };
    req.storeDATA.push(storeInfo);
    return writeFile(STORE_PATH, req.storeDATA);
}


function dedupe(array) {
    return Array.from(new Set(array));
}

function isExit(data, id) {
    if(typeof id === "number"){
        let isExitCur = data.find(item => item === id);
        !isExitCur ? data.push(id) : null;
        return;
    }
    return dedupe(data.concat(id));
}

function removeEle (data,id){
    if(typeof id === "number"){
        let index=data.indexOf(id);
        data.splice(index,1);
        return ;
    }
    let temp = [],
        tempAry = [];
    for (let i = 0; i < id.length; i++) {
        temp[id[i]] = true;
    }
    for (let i = 0; i < data.length; i++) {
        if (!temp[data[i]]) {
            tempAry.push(data[i]);
        }
    }
    return tempAry

}
module.exports = {
    ADD_STORE,
    isExit,
    removeEle
};

