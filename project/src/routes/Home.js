import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from "react-router-dom";
// import List from "./course/List";

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <section>
            <Switch>

                <Route path={'/course/info'} component={Info}></Route>
            </Switch>
        </section>
    }
}
export default Home;