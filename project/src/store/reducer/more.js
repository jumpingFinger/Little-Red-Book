import * as Types from '../action-types';

export default function more (state={
    moreIsShow:false
},action){
    state=JSON.parse(JSON.stringify(state));
    switch(action.type){
        case Types.More_isShow:
            state.moreIsShow=action.value;
            break;
    }
    return state;
};


