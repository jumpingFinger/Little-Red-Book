import React from 'react';
import {connect} from 'react-redux';


import {Switch,Route,Redirect} from "react-router-dom";
import Footer from '../component/Footer';

import Header from "../component/Header";
import More from "../routes/More";
import {Icon} from 'antd';
import action from "../store/action";
import HomeNative from "./Home/HomeNative";
import HomeNative备份 from "./Home/HomeNative备份";


class Home extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            isShow:this.props.moreIsShow
        }
    }
    render() {
        return (<section >

            <Switch>
                <Route path='/home' component={HomeNative备份}/>
                <Redirect to='/home'/>
            </Switch>
        </section>)
    }
}

export default connect(state => ({...state.more}), action.more)(Home);


