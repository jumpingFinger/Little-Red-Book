import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from "react-router-dom";
import Footer from '../component/Footer';
import Header from "../component/Header";
import PersonHome from "./Person/PersonHome";



class Person extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        return <section >
            <Switch>
                <Route path='/person' component={PersonHome}/>
                <Redirect to='/person'/>
            </Switch>
        </section>
    }
}
export default Person