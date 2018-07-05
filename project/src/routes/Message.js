import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from "react-router-dom";
import Footer from '../component/Footer';
import Header from "../component/Header";
class Message extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        return <section >
                <Header></Header>
                <Footer></Footer>
        </section>
    }
}
export default Message;