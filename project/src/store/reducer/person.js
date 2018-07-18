import * as Types from '../action-types';
import action from "../action";
export default function person(state = {
    personInfo: {
        id: 0,
        bio: '',
        birth: '',
        draft: [],
        email: '',
        fen: [],
        follow: [],
        name: "",
        node: [],
        phone: "",
        sex: '0',
        userImg: '',
        likes:[],
        collect:[]
    },
    draftInfo: [
        {
            personID: 0,
            draftId: -1,
            content: "",
            likes: [],
            collect: [],
            time: "",
            nodeImg: []
        }
    ],
    isQueryDraftList: false,
    attentionInfo:[],
    updateHome:0,
    likeList:[],
    nodeList:[],
    attentionPersonList:[],
    interestingList:[]
}, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case Types.PERSON_QUERY_BASEINFO:
            state.personInfo = action.payload.data;
            break;
        case Types.REVICE_BASEINFO:
            let {type, value} = action.payload;
            state.personInfo[type] = value;
            break;
        case Types.PERSON_ADDNODE:
            let {nodeList} = action.payload;
            state.personInfo.node = nodeList;
            break;
        case Types.PERSON_ADDDRAFT:
            let {draftList} = action.payload;
            state.personInfo.draft = JSON.parse(draftList);
            break;
        case Types.PERSON_QUERY_DRAFT: {
            let {draftList} = action.payload;
            state.draftInfo = draftList;
        }
            break;
        case Types.IS_QUERY_DRAFTIST:
            state.isQueryDraftList = action.value;
            break;
        case Types.REMOVE_DRAFT: {
            let {personInfo, draftList} = action.payload;
            state.personInfo = personInfo;
            state.draftInfo = draftList;
        }
            break;
        case Types.REVISE_DRAFT: {
            let {draftList} = action.payload;
            state.draftInfo = draftList;
        }
            break;
        case Types.GETATTENTIONINFO:{
            let {followNodeList} = action.payload;
            state.attentionInfo=followNodeList.data;
            break;
        }
        case Types.UPDATAHOME:
            state.updateHome=action.value;
            break;
        case Types.ADDLIKE:
            state.personInfo=action.payload.personInfo;
            break;
        case Types.REMOVELIKE:
            state.personInfo=action.payload.personInfo;
            break;
        case Types.ADDCOLLET:
            state.personInfo=action.payload.personInfo;
            break;
        case Types.REMOVECOLLET:
            state.personInfo=action.payload.personInfo;
            break;
        case Types.QUERY_MYLIKES:{
            state.likeList=action.payload.likeList;
            break;
        }
        case Types.QUERY_MYNODE:{
            state.nodeList=action.payload.nodeList;
            break;
        }
        case Types.ATTENTIONPERSONLIST:{
            state.attentionPersonList=action.payload.attentionPersonList;
            break;
        }
        case Types.INTERESTINGPERSONLIST:{
            console.log(action.payload);
            state.interestingList=action.payload.interestingPersonList;
            break;
        }
        case Types.ADDATTENTIONPERSON:{
            state.personInfo=action.payload.personInfo;
            break;
        }
        case Types.REMOVEATTENTIONPERSON:{
            state.personInfo=action.payload.personInfo;
            break;
        }
    }
    return state;
};
