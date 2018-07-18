import * as TYPES from '../action-types';

let INIT_STATE={
    bannerData:[],
    courseData: {
        total: 1,
        limit: 6,
        page: 1,
        data: []
    },
    page:1,
    shopCart:{
        unpay:[],
        pay:[]
    }
};
export default function  shop(state=INIT_STATE,action) {
    state=JSON.parse(JSON.stringify(state));
    switch (action.type){
        case TYPES.COURSE_QUERY_BANNER:
            let {code,data}=action.bannerData;
            if(parseFloat(code)===0){
                state.bannerData=data;
            }
            break;
        case  TYPES.COURSE_QUERY_LIST:
            let {result,flag} = action;
            if (parseFloat(result.state) === 0) {
                state.courseData.total = parseFloat(result.total);
                state.courseData.limit = parseFloat(result.limit);
                state.courseData.page = parseFloat(result.page);
               state.courseData.data = flag === 'push' ? state.courseData.data.concat(result.data) : result.data;
                state.page=parseFloat(result.page);
            }
            break;
        case TYPES.COURSE_UNPAY:
            if (parseFloat(action.result.state)===0){
                state.shopCart.unpay=action.result.data;
            }
            break;
        case TYPES.COURSE_PAY:
            if (parseFloat(action.result.state)===0){
                state.shopCart.pay=action.result.data;
            }
            break;
            
    };
    return state;

}