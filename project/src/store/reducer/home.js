import * as Types from '../action-types';

export default function home (state={
    activeIndex:0
},action){
    state=JSON.parse(JSON.stringify(state));
    switch(action.type){
        case Types.CHANGEFOCUS:
            state.activeIndex=action.activeIndex;
            break;
    }
    return state;
};
