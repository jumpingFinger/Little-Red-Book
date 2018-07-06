import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from "react-router-dom";
import Footer from '../component/Footer';
import Header from "../component/Header";
import MessageHome from "./Message/MssageHome";
import action from "../store/action";


class Message extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            isShow:this.props.moreIsShow
        }
    }

    render(){
        return <section >
            <Switch>
                <Route path='/message' component={MessageHome}></Route>
                <Redirect to='/message'></Redirect>
            </Switch>
        </section>
    }
}
export default connect(state=>({...state.more}),action.more)(Message);