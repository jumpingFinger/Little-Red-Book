import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from "react-router-dom";
import Footer from '../component/Footer';

class Message extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        return <section >
            <Switch>
                <Footer></Footer>
            </Switch>
        </section>
    }
}
export default Message;