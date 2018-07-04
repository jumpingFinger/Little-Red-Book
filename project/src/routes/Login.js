import React from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import Land from "./login/Land";
import Register from "./login/Register";
import LoginInfo from "./login/LoginInfo";

export default class banner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <section>
            <Switch>
                <Route path={'/login'} exact component={LoginInfo}/>
                <Route path={'/login/land'}  component={Land}/>
                <Route path={'/login/register'}  component={Register}/>
            </Switch>
        </section>;
    }
}

