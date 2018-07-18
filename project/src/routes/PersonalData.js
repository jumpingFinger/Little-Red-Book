import React from 'react';
import {connect} from 'react-redux';
import  "../static/css/personalData.less";
import {Route,Switch,Redirect} from "react-router-dom";
import action from "../store/action/index";
import PersonDataHome from "./PersonData/PersonDataHome";
import Rename from "./PersonData/Rename";
import Sex from "./PersonData/Sex";
import Bio from "./PersonData/Bio";
import Birthday from "./PersonData/Birthday";
class PersonalData extends React.Component{
    constructor(props,context){
        super(props,context);

    }
    render(){
      return <div  className={'personalDataBox'}>
          <Switch>
              <Route path={'/personalData'} exact component={PersonDataHome}/>
              <Route path={'/personalData/rename'}  exact component={Rename}/>
              <Route path={'/personalData/birthday'}  exact component={Birthday}/>
              <Route path={'/personalData/bio'} exact component={Bio}/>
              <Redirect to='/personData'/>
          </Switch>
      </div>
    }
}
// export default connect(state=>({...state.more,...state.person}),{...action.more,...action.person})(PersonalData);
export default connect()(PersonalData)