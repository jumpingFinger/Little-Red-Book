import React from 'react';
import {connect} from 'react-redux';

class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div>
            个人中心
        </div>;
    }
}

export default connect()(Register);
