import * as Types from '../action-types';


let home ={
    changeFocus(activeIndex){
        console.log(1);
        return {
            type:Types.CHANGEFOCUS,
            activeIndex
        }
    }
};

export default home;