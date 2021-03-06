import React from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink,Link} from "react-router-dom";
import {Icon} from 'antd';

class Footer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <footer className={'footerNavBox'}>
            <NavLink to={'/home'}>首页</NavLink>
            <NavLink to={'/shopping'}>商城</NavLink>
            <Link to={'/myNotes'}>
                <Icon type="plus-square" className={'icon'}/>
            </Link>
            <NavLink to={'/message'}>消息</NavLink>
            <NavLink to={'/person'}>我</NavLink>
        </footer>
    }
}

export default withRouter(connect()(Footer));