const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    utils = require('../utils/utils');

let formidable = require('formidable');

route.get('/info', (req, res) => {
    const personID = req.session.personID;
    let personInfo = req.personData.find(item => {
        return parseFloat(item.id) === personID;
    });
    personInfo.password = null;
    res.send({state: 0, message: 'ok!', data: personInfo});
});


route.post('/revise', (req, res) => {
    const personID = req.session.personID;
    let {type, value} = req.body;
    let personInfo = req.personData.find(item => {
        return parseFloat(item.id) === personID;
    });
    personInfo[type] = value;
    writeFile(LOGIN_PATH, req.personData).then(() => {
        res.send({state: 0, message: 'ok!'});
    }).catch(() => {
        res.send({state: 1, msg: 'NO!'});
    });
});

route.post('/addNode', (req, res) => {
    const personID = req.session.personID;
    let nodeInfo = {
        personID,
        nodeId: req.nodeList.length === 0 ? 1 : (parseFloat(req.nodeList[req.nodeList.length - 1].nodeId) + 1),
        content: '',
        likes: [],
        collect: [],
        time: utils.getDate(),
        nodeImg: []
    };
    req.body.nodeImg = JSON.parse(req.body.nodeImg);
    nodeInfo = {...nodeInfo, ...req.body};
    req.nodeList.push(nodeInfo);
    let item = req.personData.find(item => parseFloat(item.id) === personID);
    utils.isExit(item.node, nodeInfo.nodeId);
    Promise.all([writeFile(NODELIST_PATH, req.nodeList), writeFile(LOGIN_PATH, req.personData)]).then(() => {
        let nodeList = JSON.stringify(item.node);
        res.send({state: 0, message: 'ok', nodeList: nodeList});
    }).catch(() => {
        res.send({state: 1, message: 'no'});
    });
});

route.post('/addDraft', (req, res) => {
    const personID = req.session.personID;
    let draftInfo = {
        personID,
        draftId: req.draftList.length === 0 ? 1 : (parseFloat(req.draftList[req.draftList.length - 1].draftId) + 1),
        content: '',
        time: utils.getDate(),
        nodeImg: []
    };
    req.body.nodeImg = JSON.parse(req.body.nodeImg);
    draftInfo = {...draftInfo, ...req.body};
    req.draftList.push(draftInfo);
    let item = req.personData.find(item => parseFloat(item.id) === personID);
    utils.isExit(item.draft, draftInfo.draftId);
    Promise.all([writeFile(DRAFTLIST_PATH, req.draftList), writeFile(LOGIN_PATH, req.personData)]).then(() => {
        let draftList = JSON.stringify(item.draft);
        res.send({state: 0, message: 'ok', draftList: draftList});
    }).catch(() => {
        res.send({state: 1, message: 'no'});
    });
});


route.post('/addImage', (req, res) => {
    //const personID=req.session.personID;
    const domain = "http://localhost:8000",
        AVATAR_UPLOAD_FOLDER = 'public/file';
    let form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8';
    form.uploadDir = AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;

    form.parse(req, function (err, fields, files) {
        let newPath = files.file.path;
        newPath = newPath.replace(/\\/g, "/");
        newPath=newPath.replace(/public\//,'');
        if (err) {
            res.send({state: 1, message: 'NO!'});
            return;
        }
        let showUrl = domain + '/' + newPath;
        res.send({
            state: 0,
            message: 'ok!',
            showUrl: showUrl
        });
    });
});

route.get('/queryDraft', (req, res) => {
    const personID = req.session.personID;
    if(personID){
        let draftIndex = req.personData.find(item => parseFloat(item.id) === personID)['draft'];
        let draftList = [];
        draftIndex.forEach(draftId => {
            let item = req.draftList.find(item => item.draftId === draftId && item.personID === personID);
            if(item){
                draftList.push(item);
            }
        });
        res.send({
            state: 0,
            message: 'ok!',
            draftList: draftList
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });

});

route.post('/removeDraft', (req, res) => {
    let {removeDraft} = req.body,
        personID = req.session.personID,
        obj = req.personData.find(item => parseFloat(item.id) === personID),
        draftIndexList = obj['draft'];
    removeDraft = JSON.parse(removeDraft);
    draftIndexList = utils.removeEle(draftIndexList, removeDraft);
    obj.draft = draftIndexList;
    req.draftList = req.draftList.filter(item => {
        return !removeDraft.find(index => index === item.draftId)
    });
    let draftList=[];
    draftIndexList.forEach((draftId)=>{
        let item=req.draftList.find(item=>item.draftId===draftId && item.personID === personID);
        if(item){
            draftList.push(item);
        }
    });
    Promise.all([writeFile(DRAFTLIST_PATH,req.draftList),writeFile(LOGIN_PATH, req.personData)]).then(() => {
        res.send({
            state: 0,
            message: 'OK!',
            personInfo:obj,
            draftList:draftList
        });
    }).catch(() => {
        res.send({state: 1, message: 'NO!'});
    })
});

route.post('/reviseDraft', (req, res) => {
      const  personID = req.session.personID;
    let draftInfo = {
        personID,
        draftId:null,
        content: '',
        time: utils.getDate(),
        nodeImg: []
    };
    req.body.nodeImg = JSON.parse(req.body.nodeImg);
    req.body.draftId=parseFloat(req.body.draftId);
    draftInfo = {...draftInfo, ...req.body};
    let draftId=draftInfo.draftId;
    let index=req.draftList.findIndex(item=>parseFloat(item.draftId)===parseFloat(draftId));
    req.draftList.splice(index,0,draftInfo);

    let draftIndex = req.personData.find(item => parseFloat(item.id) === personID)['draft'];
    let draftList = [];
    draftIndex.forEach(draftId => {
        let item = req.draftList.find(item => item.draftId === draftId && item.personID === personID);
        if(item){
            draftList.push(item);
        }
    });

    writeFile(DRAFTLIST_PATH, req.draftList).then(()=>{
        res.send({state: 0, message: 'ok', draftList: draftList});
    }).catch(() => {
        res.send({state: 1, message: 'no'});
    });
});

route.get('/getAttentionInfo',(req,res)=>{
    const  personID = req.session.personID;
    if(personID){
        let follow = req.personData.find(item => parseFloat(item.id) === personID)['follow'];
        follow.push(personID);
        let followNodeList = [];
        follow.forEach(personID=>{
           let ary= req.nodeList.filter(item=>item.personID===personID);
           //=>写入关注用的公开信息
          let followPerson=req.personData.find(item => parseFloat(item.id) === personID);
          let obj={};
            for (let key in followPerson) {
                if (!followPerson.hasOwnProperty(key)) break;
                if(key==="name" || key==="birth" || key==="bio"  || key==="userImg"){
                    obj[key]=followPerson[key]
                }
            }
            let newAry=[];
           ary.forEach(item=>{
               newAry.push({...item,...obj}) ;
           });
            followNodeList= utils.isExit(followNodeList,newAry);
        });
        followNodeList.sort((a,b)=>{
            a=new Date(a.time);
            b=new Date(b.time);
            return b-a
        });
        res.send({
            state: 0,
            message: 'ok!',
            followNodeList: {
                data:followNodeList
            }
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});

route.post('/like',(req,res)=>{
    const  personID = req.session.personID;
    let {nodeId}=req.body;
    nodeId=parseFloat(nodeId);
    if(personID){
        let nodeLike=req.nodeList.find(item=>item.nodeId===nodeId);
        let likes=nodeLike['likes'];

        utils.isExit(likes,nodeId);

        let personInfo=req.personData.find(item=>item.id===personID);
        let myLike=personInfo['likes'];

        utils.isExit(myLike,nodeId);

        Promise.all([writeFile(NODELIST_PATH, req.nodeList), writeFile(LOGIN_PATH, req.personData)]).then(() => {
            res.send({state: 0, message: 'ok', personInfo: personInfo});
        }).catch(() => {
            res.send({state: 1, message: 'no'});
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});
route.post('/CancelLike',(req,res)=>{
    const  personID = req.session.personID;
    let {nodeId}=req.body;
    nodeId=parseFloat(nodeId);
    if(personID){
        let likes=req.nodeList.find(item=>item.nodeId===nodeId)['likes'];

        utils.removeEle(likes,personID);

        let personInfo=req.personData.find(item=>item.id===personID);
        let myLike=personInfo['likes'];

        utils.removeEle(myLike,nodeId);

        Promise.all([writeFile(NODELIST_PATH, req.nodeList), writeFile(LOGIN_PATH, req.personData)]).then(() => {
            res.send({state: 0, message: 'ok', personInfo: personInfo});
        }).catch(() => {
            res.send({state: 1, message: 'no'});
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});

route.post('/collect',(req,res)=>{
    const  personID = req.session.personID;
    let {nodeId}=req.body;
    nodeId=parseFloat(nodeId);
    if(personID){
        let collect=req.nodeList.find(item=>item.nodeId===nodeId)['collect'];

        utils.isExit(collect,nodeId);

        let personInfo=req.personData.find(item=>item.id===personID);
        let myCollect=personInfo['collect'];

        utils.isExit(myCollect,nodeId);

        Promise.all([writeFile(NODELIST_PATH, req.nodeList), writeFile(LOGIN_PATH, req.personData)]).then(() => {
            res.send({state: 0, message: 'ok', personInfo: personInfo});
        }).catch(() => {
            res.send({state: 1, message: 'no'});
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});


route.post('/CancelCollect',(req,res)=>{
    const  personID = req.session.personID;
    let {nodeId}=req.body;
    nodeId=parseFloat(nodeId);
    if(personID){
        let collect=req.nodeList.find(item=>item.nodeId===nodeId)['collect'];

        utils.removeEle(collect,personID);

        let personInfo=req.personData.find(item=>item.id===personID);
        let myCollect=personInfo['collect'];

        utils.removeEle(myCollect,nodeId);
        Promise.all([writeFile(NODELIST_PATH, req.nodeList), writeFile(LOGIN_PATH, req.personData)]).then(() => {
            res.send({state: 0, message: 'ok', personInfo: personInfo});
        }).catch(() => {
            res.send({state: 1, message: 'no'});
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});

route.get('/myLikes',(req,res)=>{
    const  personID = req.session.personID;
    if(personID) {
        let myCollect = req.personData.find(item => item.id === personID)['likes'];
        let likeList = [];
        myCollect.forEach(nodeId => {
            let item = req.nodeList.find(item => item.nodeId === nodeId);
            let followPerson=req.personData.find(item => parseFloat(item.id) === personID);
            let obj={};
            for (let key in followPerson) {
                if (!followPerson.hasOwnProperty(key)) break;
                if(key==="name"  || key==="userImg"){
                    obj[key]=followPerson[key]
                }
            }
            if (item) {
                likeList.push({...item,...obj});
            }
        });
        res.send({
            state: 0,
            message: 'ok!',
            likeList
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});

route.get('/myNode11',(req,res)=>{
    const  personID = req.session.personID;
    if(personID) {
        let myNode = req.personData.find(item => item.id === personID)['node'];
        let nodeList = [];
        myNode.forEach(nodeId => {
            let item = req.nodeList.find(item => item.nodeId === nodeId && item.personID===personID);
            if (item) {
                nodeList.push(item);
            }
        });
        console.log(nodeList);
        res.send({
            state: 0,
            message: 'ok!',
            nodeList
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});


route.get('/attentionPersonList',(req,res)=>{
    const  personID = req.session.personID;
    if(personID) {
        let myFollow = req.personData.find(item => item.id === personID)['follow'];
        let attentionPersonList = [];
        myFollow.forEach(personID => {
            let userInfo = req.personData.find(item => item.id === personID);
            let {id,userImg,node,fens,name}=userInfo;
            attentionPersonList.push({id,userImg,node,fens,name});
        });
        res.send({
            state: 0,
            message: 'ok!',
            attentionPersonList
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});

route.get('/interestingPersonList',(req,res)=>{
    const  personID = req.session.personID;
    if(personID) {
        let myFollow = req.personData.find(item => item.id === personID)['follow'];
        myFollow.push(parseFloat(personID));
        let AllId=[];
        let length=req.personData.length;
        for (let i = 1; i < length+1; i++) {
            AllId.push(i);
        }
        console.log(AllId,"AllId");
        let newAry=utils.removeEle(AllId,myFollow);
        let newAry1=[];
        let a=newAry.length;
        for (let i = 0; i <3; i++) {
            let index= Math.floor(Math.random()*a);
            newAry1.push(newAry[index]);
        }
        let interestingPersonList = [];
        console.log(newAry1);
        newAry1.forEach(personID => {
            let userInfo = req.personData.find(item => item.id === personID);
            let {id,userImg,bio,name}=userInfo;
            interestingPersonList.push({id,userImg,bio,name});
        });
        console.log(interestingPersonList);
        res.send({
            state: 0,
            message: 'ok!',
            interestingPersonList
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});

route.post('/addAttentionPerson',(req,res)=>{
    const  personID = req.session.personID;
    let {id}=req.body;
    id=parseFloat(id);
    if(personID) {
        let personInfo=req.personData.find(item =>item.id === personID);
        let myFollow =personInfo['follow'];
        utils.isExit(myFollow,id);
        let otherPersonFollow=req.personData.find(item => item.id === id)['follow'];
        utils.isExit(otherPersonFollow,personID);
        writeFile(LOGIN_PATH, req.personData).then(()=>{
            res.send({state: 0, message: 'ok', personInfo: personInfo});
        }).catch(() => {
            res.send({state: 1, message: 'no'});
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});

route.post('/removeAttentionPerson',(req,res)=>{
    const  personID = req.session.personID;
    let {id}=req.body;
    id=parseFloat(id);
    if(personID) {
        let personInfo=req.personData.find(item => item.id === personID);
        let myFollow =personInfo['follow'];
        utils.removeEle(myFollow,id);
        let otherPersonFollow=req.personData.find(item => item.id === id)['follow'];
        utils.isExit(otherPersonFollow,personID);
        writeFile(LOGIN_PATH, req.personData).then(()=>{
            res.send({state: 0, message: 'ok', personInfo: personInfo});
        }).catch(() => {
            res.send({state: 1, message: 'no'});
        });
        return;
    }
    res.send({
        state: 1,
        message: 'no!',
    });
});

module.exports = route;


