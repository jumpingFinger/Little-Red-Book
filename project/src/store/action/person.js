import * as Types from '../action-types';
import {queryInfoAPI,reviseInfoAPI,addNodeAPI,addDraftAPI,queryDraftAPI,removeDraftAPI,reviseDraftAPI,getAttentionInfoAPI,addcollectAPI,addLikeAPI,removecollectAPI,removeLikeAPI,queryMyLikesAPI,queryMyNodeAPI,queryAttentionPersonAPI,queryInterestingPersonAPI,removeAttentionAPI,addAttentionPersonAPI} from "../../api/person";
let person ={
   // queryPersonInfo(){
   //     return async dispatch=>{
   //         let personInfo=await queryInfo();
   //         dispatch({
   //             type:Types.PERSON_QUERY_BASEINFO,
   //             personInfo
   //         })
   //     }
   // }
   async queryPersonInfo(){
        return {
            type:Types.PERSON_QUERY_BASEINFO,
            payload:await queryInfoAPI()
        }
    },

    async reviseBaseInfo(item){
        let data= await reviseInfoAPI(item);
        return {
            type:Types.REVICE_BASEINFO,
            payload:{
                ...item
            }
        }
    },
    async addNode(item){
        return {
            type:Types.PERSON_ADDNODE,
            payload:await  addNodeAPI(item)
        }
    },
    async addDraft(item){
        return {
            type:Types.PERSON_ADDDRAFT,
            payload:await  addDraftAPI(item)
        }
    },
    async queryDraft(){
        return {
            type:Types.PERSON_QUERY_DRAFT,
            payload:await  queryDraftAPI()
        }
    },
    isQueryDraftListFun(value){
        return {
            type:Types.IS_QUERY_DRAFTIST,
            value
        }
    },
   async removeDraftFun(item){
       return {
           type:Types.REMOVE_DRAFT,
           payload:await removeDraftAPI(item)
       }
    },
    async reviseDratFun(item){
        return {
            type:Types.REVICE_BASEINFO,
            payload:await reviseDraftAPI(item)
        }
    },
    async getAttentionInfo(){
        return {
            type:Types.GETATTENTIONINFO,
            payload:await getAttentionInfoAPI()
        }
    },
    updateHome(value){
        return {
            type:Types.UPDATAHOME,
            value
        }
    },
   async addcollect(value){
        return {
            type:Types.ADDCOLLET,
            payload:await addcollectAPI(value)
        }
    },
    async addLike(value){
        return {
            type:Types.ADDLIKE,
            payload:await addLikeAPI(value)
        }
    },
    async removecollect(value){
        return {
            type:Types.REMOVECOLLET,
            payload:await removecollectAPI(value)
        }
    },
    async removeLike(value){
        return {
            type:Types.REMOVELIKE,
            payload:await removeLikeAPI(value)
        }
    },
    async queryMyLikes(){
        return {
            type:Types.QUERY_MYLIKES,
            payload:await queryMyLikesAPI()
        }
    },
    async queryMyNode(){
        return {
            type:Types.QUERY_MYNODE,
            payload:await queryMyNodeAPI()
        }
    },
    async queryAttentionPerson(){
        return {
            type:Types.ATTENTIONPERSONLIST,
            payload:await queryAttentionPersonAPI()
        }
    },
    async queryInterestingPerson(){
        return {
            type:Types.INTERESTINGPERSONLIST,
            payload:await queryInterestingPersonAPI()
        }
    },
    async removeAttention(item){
        return {
            type:Types.ADDATTENTIONPERSON,
            payload:await removeAttentionAPI(item)
        }
    },
    async addAttentionPerson(item){
        return {
            type:Types.REMOVEATTENTIONPERSON,
            payload:await addAttentionPersonAPI(item)
        }
    }
};

export default person;

