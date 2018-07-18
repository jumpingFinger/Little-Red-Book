import * as TYPES from '../action-types'
import {queryBanner,queryList,queryShopCart} from '../../api/shopping'

let shop={
    queryBanner(){
        return async dispatch=>{
            let bannerData=await queryBanner();
            dispatch({
                type:TYPES.COURSE_QUERY_BANNER,
                bannerData
            })
        }
    },

    queryList(payload={}){
        let {limit = 6, page = 1,flag='push'} = payload;
        return async dispatch => {
            let result = await queryList({
                limit,
                page,
            });
            console.log(result);
            dispatch({
                type: TYPES.COURSE_QUERY_LIST,
                result,
                flag
            });
        }
    },

    queryUnpay(){
        return async dispach=>{
            let result=await queryShopCart(0);
            dispach({
                type:TYPES.COURSE_UNPAY,
                result
            })
        }
    },
    queryPay(){
        return async dispach=>{
            let result=await queryShopCart(1);
            dispach({
                type:TYPES.COURSE_PAY,
                result
            })
        }
    }



};

export default shop;
