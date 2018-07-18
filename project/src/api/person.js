import axios from './index';


//=>询问详细信息
export  async function queryInfoAPI(item){
    return  await axios.get('/person/info',item);
}

//=>修改个人中心的信息
export  function reviseInfoAPI(item){
    return  axios.post('/person/revise',item);
}

//=>增加个人笔记
export function addNodeAPI(item){
    return  axios.post('/person/addNode',item);
}

//=>存储草稿箱
export function addDraftAPI(item){
    return  axios.post('/person/addDraft',item);
}

//=>拉取草稿箱
export function queryDraftAPI(){
    return  axios.get('/person/queryDraft');
}

//=>删除草稿

export function removeDraftAPI(item){
    return  axios.post('/person/removeDraft',item);
}


//=>修改草稿
export function reviseDraftAPI(item){
    return  axios.post('/person/reviseDraft',item);
}

//=>请求关注的个人笔记
export function getAttentionInfoAPI(){
    return  axios.get('/person/getAttentionInfo');
}

//=>喜欢
export function addLikeAPI(nodeId){
    return  axios.post('/person/like',nodeId);
}
//=>取消喜欢
export function removeLikeAPI(nodeId){
    return  axios.post('/person/CancelLike',nodeId);
}
//=>搜藏
export function addcollectAPI(nodeId){
    return  axios.post('/person/collect',nodeId);
}
//=>取消搜藏
export function removecollectAPI(nodeId){
    return  axios.post('/person/CancelCollect',nodeId);
}

//=>拉取个人收藏
export function queryMyLikesAPI(){
    return  axios.get('/person/myLikes');
}

//=>拉取自己的笔记
export function queryMyNodeAPI(){
    return axios.get('/person/myNode11');
}

//=>获取关注的人
export function queryAttentionPersonAPI(){
    return axios.get('/person/attentionPersonList');
}

//=>获取感兴趣的人

export function queryInterestingPersonAPI(){
    return axios.get('/person/interestingPersonList');
}

//=>.取消关注
export function removeAttentionAPI(item){
    return axios.post('/person/removeAttentionPerson',item);
}

//=>关注
export function addAttentionPersonAPI(item){
    return axios.post('/person/addAttentionPerson',item);
}
