import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from "react-router-dom";
import Footer from '../component/Footer';

class Home extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        return <section >
            <Switch>
<<<<<<< HEAD
             
                {/*<Route path={'/course/info'} component={Info}></Route>*/}
=======
                <Footer></Footer>
>>>>>>> 26a147a8f61824f61914a23f80ec17107b573a20
            </Switch>
        </section>
    }
}
export default Home