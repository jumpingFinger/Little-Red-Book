import React from 'react';
import {Link} from 'react-router-dom'

export default class Login extends React.Component{
    constructor(props,context){
        super(props,context);
    }

    render(){
        return <div>
            这里是登录
            <Link to="/home">
                <button >点我跳转</button>
            </Link>

        </div>
    }
}