import React from 'react';
import {connect} from 'react-redux';
// import {withRouter} from "react-router-dom";
// import action from '../store/action/index';
import action from "../store/action/index";
class Header extends React.Component {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount(){
        let headerStyle= this.props.headerStyle;
        if(typeof headerStyle ==="object"){
            for (let key in headerStyle) {
                if (!headerStyle.hasOwnProperty(key)) break;
                 this.refs.headerBox.style[key]=headerStyle[key];
            }
        }
    }
    render() {
        return (<header className={'headerBox'} ref='headerBox'>
            {this.props.children}
        </header>)
    }
}
export default connect(state=>({...state.more}),action.more)(Header);