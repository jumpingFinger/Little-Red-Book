import React from 'react';
import {connect} from 'react-redux';
// import {withRouter,NavLink} from "react-router-dom";
// import  {Icon} from 'antd';

class Footer extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        return <footer>
          
        </footer>
    }
}
export default withRouter(connect ()(Footer));