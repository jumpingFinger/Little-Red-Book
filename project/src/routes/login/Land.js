import React from 'react';
import {connect} from 'react-redux';
import { Input,Button } from 'antd';
import "../../static/css/Land.less"


class Land extends React.Component {
    constructor(props, context) {
        super(props, context);
    }




    render() {
        return <div className="login-land">
            <div className="login-operation">
                <h3>输入手机号码</h3>
                <p><Input placeholder="输入手机号码" /></p>
                <a href="javascript:void 0;" className="Determine">确定</a>
            </div>
            <ul>
                <li className="wx">
                    <a href="javascript:void 0;">
                        <img src={require('../../static/images/icon-wx.png')} alt=""/>
                        微信
                    </a>
                </li>
                <li className="qq">
                    <a href="javascript:void 0;">
                        <img src={require('../../static/images/icon-qq.png')} alt=""/>
                        QQ
                    </a>
                </li>
                <li className="weibo">
                    <a href="javascript:void 0;">
                        <img src={require('../../static/images/icon-weibo.png')} alt=""/>
                        微博
                    </a>
                </li>
                <li className="fb">
                    <a href="javascript:void 0;">
                        <img src={require('../../static/images/icon-facebook.png')} alt=""/>
                        facebook
                    </a>
                </li>
            </ul>
        </div>;
    }
}


export default connect()(Land);
