import React from 'react';
import {connect} from 'react-redux';
// import {withRouter} from "react-router-dom";

// import action from '../store/action/index';

import action from "../store/action/index";






class Header extends React.Component {
    constructor(props, context) {
        super(props, context);

    }


    render() {
        return (<header className={'headerBox'}>
            {this.props.children}
        </header>)
    }
}

export default connect(state=>({...state.more}),action.more)(Header);