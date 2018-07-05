import React from 'react';
import {connect} from 'react-redux';


//less
import"../../static/css/Land.less"
class Zhanglei extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <ul>
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

    }
}

export default connect()(Zhanglei);
