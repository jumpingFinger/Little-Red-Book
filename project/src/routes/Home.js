import React from 'react';
import {connect} from 'react-redux';
<<<<<<< HEAD
import {Switch, Route, Redirect} from "react-router-dom";
// import List from "./course/List";
=======
import {Switch,Route,Redirect} from "react-router-dom";
import Footer from '../component/Footer';
>>>>>>> 6005672917cf0b5409a87830ac0145832906d7c8

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <section>
            <Switch>
<<<<<<< HEAD

                <Route path={'/course/info'} component={Info}></Route>
=======
<<<<<<< HEAD
             
                {/*<Route path={'/course/info'} component={Info}></Route>*/}
=======
                <Footer></Footer>
>>>>>>> 26a147a8f61824f61914a23f80ec17107b573a20
>>>>>>> 6005672917cf0b5409a87830ac0145832906d7c8
            </Switch>
        </section>
    }
}
export default Home;